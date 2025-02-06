import { SignedMessage } from "@near-wallet-selector/core";
import { serialize } from "borsh";
import { Account, Connection, InMemorySigner, KeyPair, Near } from "near-api-js";
import { SignAndSendTransactionOptions } from "near-api-js/lib/account";
import { KeyStore } from "near-api-js/lib/key_stores";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Action, SCHEMA, Transaction, createTransaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import { base_decode } from "near-api-js/lib/utils/serialize";

const LOGIN_WALLET_URL_SUFFIX = '/login/';
const MULTISIG_HAS_METHOD = 'add_request_and_confirm';
const LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key';
const PENDING_ACCESS_KEY_PREFIX = 'pending_key'; // browser storage key for a pending access key (i.e. key has been generated but we are not sure it was added yet)


const DEFAULT_POPUP_WIDTH = 480;
const DEFAULT_POPUP_HEIGHT = 640;
const POLL_INTERVAL = 300;

interface SignInOptions {
    contractId?: string;
    methodNames?: string[];
    // TODO: Replace following with single callbackUrl
    successUrl?: string;
    failureUrl?: string;
    keyType?: 'ed25519' | 'secp256k1'
}

interface WalletMessage {
    status: 'success' | 'failure' | 'pending';
    transactionHashes?: string;
    error?: string;
    [key: string]: unknown;
    signedRequest?: SignedMessage;
    errorMessage?: string;
    errorCode?: string;
}

/**
 * Information to send NEAR wallet for signing transactions and redirecting the browser back to the calling application
 */
interface RequestSignTransactionsOptions {
    /** list of transactions to sign */
    transactions: Transaction[];
    /** url NEAR Wallet will redirect to after transaction signing is complete */
    callbackUrl?: string;
    /** meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param */
    meta?: string;
}

/**
 * This class is not intended for use outside the browser. Without `window` (i.e. in server contexts), it will instantiate but will throw a clear error when used.
 * 
 * @see [https://docs.near.org/tools/near-api-js/quick-reference#wallet](https://docs.near.org/tools/near-api-js/quick-reference#wallet)
 * @example
 * ```js
 * // create new WalletConnection instance
 * const wallet = new WalletConnection(near, 'my-app');
 * 
 * // If not signed in redirect to the NEAR wallet to sign in
 * // keys will be stored in the BrowserLocalStorageKeyStore
 * if(!wallet.isSignedIn()) return wallet.requestSignIn()
 * ```
 */
export class MyNearWalletConnection {
    /** @hidden */
    _walletBaseUrl: string;

    /** @hidden */
    _authDataKey: string;

    /** @hidden */
    _keyStore: KeyStore;

    /** @hidden */
    _authData: { accountId?: string; allKeys?: string[] };

    /** @hidden */
    _networkId: string;

    /** @hidden */
    // _near: Near;
    _near: Near;

    /** @hidden */
    _connectedAccount: MyNearConnectedWalletAccount;

    /** @hidden */
    _completeSignInPromise: Promise<void>;

    constructor(near: Near, appKeyPrefix: string) {
        if (typeof (appKeyPrefix) !== 'string') {
            throw new Error('Please define a clear appKeyPrefix for this WalletConnection instance as the second argument to the constructor');
        }

        this._near = near;
        const authDataKey = appKeyPrefix + LOCAL_STORAGE_KEY_SUFFIX;
        const authData = JSON.parse(window.localStorage.getItem(authDataKey || '') || '{}');
        this._networkId = near.config.networkId;
        this._walletBaseUrl = near.config.walletUrl;
        appKeyPrefix = appKeyPrefix || near.config.contractName || 'default';
        this._keyStore = (near.connection.signer as InMemorySigner).keyStore;
        this._authData = authData || { allKeys: [] };
        this._authDataKey = authDataKey;
        if (!this.isSignedIn()) {
            this._completeSignInPromise = this._completeSignInWithAccessKey();
        }
    }

    /**
     * Returns true, if this WalletConnection is authorized with the wallet.
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.isSignedIn();
     * ```
     */
    isSignedIn() {
        return !!this._authData.accountId;
    }

    /**
     * Returns promise of completing signing in after redirecting from wallet
     * @example
     * ```js
     * // on login callback page
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.isSignedIn(); // false
     * await wallet.isSignedInAsync(); // true
     * ```
     */
    async isSignedInAsync() {
        if (!this._completeSignInPromise) {
            return this.isSignedIn();
        }

        await this._completeSignInPromise;
        return this.isSignedIn();
    }

    /**
     * Returns authorized Account ID.
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.getAccountId();
     * ```
     */
    getAccountId() {
        return this._authData.accountId || '';
    }

    /**
     * Constructs string URL to the wallet authentication page.
     * @param options An optional options object
     * @param options.contractId The NEAR account where the contract is deployed
     * @param options.successUrl URL to redirect upon success. Default: current url
     * @param options.failureUrl URL to redirect upon failure. Default: current url
     *
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * // return string URL to the NEAR Wallet
     * const url = await wallet.requestSignInUrl({ contractId: 'account-with-deploy-contract.near' });
     * ```
     */
    async requestSignInUrl({ contractId, methodNames, successUrl, failureUrl, keyType = 'ed25519' }: SignInOptions): Promise<string> {
        const currentUrl = new URL(window.location.href);
        const newUrl = new URL(this._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX);
        newUrl.searchParams.set('success_url', successUrl || currentUrl.href);
        newUrl.searchParams.set('failure_url', failureUrl || currentUrl.href);
        if (contractId) {
            /* Throws exception if contract account does not exist */
            const contractAccount = await this._near.account(contractId);
            await contractAccount.state();

            newUrl.searchParams.set('contract_id', contractId);
            const accessKey = KeyPair.fromRandom(keyType);
            newUrl.searchParams.set('public_key', accessKey.getPublicKey().toString());
            await this._keyStore.setKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(), accessKey);
        }

        if (methodNames) {
            methodNames.forEach(methodName => {
                newUrl.searchParams.append('methodNames', methodName);
            });
        }

        return newUrl.toString();
    }

    async handlePopupTransaction<T>(
        url: string,
        callback: (result: WalletMessage) => T
    ): Promise<T> {

        const screenWidth = window.innerWidth || screen.width;
        const screenHeight = window.innerHeight || screen.height;
        const left = (screenWidth - DEFAULT_POPUP_WIDTH) / 2;
        const top = (screenHeight - DEFAULT_POPUP_HEIGHT) / 2;
        const childWindow = window.open(
            url,
            "My Near Wallet",
            `width=${DEFAULT_POPUP_WIDTH},height=${DEFAULT_POPUP_HEIGHT},top=${top},left=${left}`
        );

        if (!childWindow) {
            throw new Error('Popup window blocked. Please allow popups for this site.');
        }

        return new Promise((resolve, reject) => {
            const messageHandler = this.setupMessageHandler(resolve, reject, childWindow, callback);

            const intervalId = setInterval(() => {
                if (childWindow.closed) {
                    window.removeEventListener('message', messageHandler);
                    clearInterval(intervalId);
                    reject(new Error('User closed the window'));
                }
            }, POLL_INTERVAL);
        });
    }

    private setupMessageHandler<T>(
        resolve: (value: T) => void,
        reject: (reason?: unknown) => void,
        childWindow: Window | null,
        callback: (result: WalletMessage) => T
    ): (event: MessageEvent) => Promise<any> {
        const handler = async (event: MessageEvent) => {

            const message = event.data as WalletMessage;

            // check if the URL are the same
            const origin = new URL(event.origin);
            const walletBaseUrl = new URL(this._walletBaseUrl);
            if (origin.origin !== walletBaseUrl.origin) {
                console.warn('Ignoring message from different origin', origin.origin);
                return;
            }

            switch (message.status) {
                case 'success':
                    childWindow?.close();
                    resolve(callback(message));
                    break;
                case 'failure':
                    childWindow?.close();
                    reject(new Error(message.errorMessage || 'Transaction failed'));
                    break;
                default:
                    console.warn('Unhandled message status:', message.status);
            }
        };

        window.addEventListener('message', handler);
        return handler;
    }
    /**
     * Redirects current page to the wallet authentication page.
     * @param options An optional options object
     * @param options.contractId The NEAR account where the contract is deployed
     * @param options.successUrl URL to redirect upon success. Default: current url
     * @param options.failureUrl URL to redirect upon failure. Default: current url
     *
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * // redirects to the NEAR Wallet
     * wallet.requestSignIn({ contractId: 'account-with-deploy-contract.near' });
     * ```
     */
    async requestSignIn(options: SignInOptions) {

        const url = await this.requestSignInUrl(options);
        return await this.handlePopupTransaction(url, async (data) => {
            const { public_key: publicKey, all_keys: allKeys, account_id: accountId } = data as any;
            await this.completeSignInWithAccessKeys({ accountId, publicKey, allKeys });
            return [{ accountId, publicKey }];
        });
    }

    /**
     * Constructs string URL to the wallet to sign a transaction or batch of transactions.
     * 
     * @param options A required options object
     * @param options.transactions List of transactions to sign
     * @param options.callbackUrl URL to redirect upon success. Default: current url
     * @param options.meta Meta information the wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param
     * 
     */
    requestSignTransactionsUrl({ transactions, meta, callbackUrl }: RequestSignTransactionsOptions): string {
        const currentUrl = new URL(window.location.href);
        const newUrl = new URL('sign', this._walletBaseUrl);

        newUrl.searchParams.set('transactions', transactions
            .map(transaction => serialize(SCHEMA.Transaction, transaction))
            .map(serialized => Buffer.from(serialized).toString('base64'))
            .join(','));
        newUrl.searchParams.set('callbackUrl', callbackUrl || currentUrl.href);
        if (meta) newUrl.searchParams.set('meta', meta);

        return newUrl.toString();
    }

    /**
     * Requests the user to quickly sign for a transaction or batch of transactions by redirecting to the wallet.
     * 
     * @param options A required options object
     * @param options.transactions List of transactions to sign
     * @param options.callbackUrl URL to redirect upon success. Default: current url
     * @param options.meta Meta information the wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param
     * 
     */
    requestSignTransactions(options: RequestSignTransactionsOptions): void {
        const url = this.requestSignTransactionsUrl(options);

        window.location.assign(url);
    }


    requestSignTransaction(options: RequestSignTransactionsOptions): Promise<string> {
        const url = this.requestSignTransactionsUrl(options);

        return this.handlePopupTransaction(url, (data) => data?.transactionHashes) as Promise<string>;
    }

    /**
     * @hidden
     * Complete sign in for a given account id and public key. To be invoked by the app when getting a callback from the wallet.
     */
    async _completeSignInWithAccessKey() {
        const currentUrl = new URL(window.location.href);
        const publicKey = currentUrl.searchParams.get('public_key') || '';
        const allKeys = (currentUrl.searchParams.get('all_keys') || '').split(',');
        const accountId = currentUrl.searchParams.get('account_id') || '';
        // TODO: Handle errors during login
        if (accountId) {
            const authData = {
                accountId,
                allKeys
            };
            window.localStorage.setItem(this._authDataKey, JSON.stringify(authData));
            if (publicKey) {
                await this._moveKeyFromTempToPermanent(accountId, publicKey);
            }
            this._authData = authData;
        }
        currentUrl.searchParams.delete('public_key');
        currentUrl.searchParams.delete('all_keys');
        currentUrl.searchParams.delete('account_id');
        currentUrl.searchParams.delete('meta');
        currentUrl.searchParams.delete('transactionHashes');

        window.history.replaceState({}, document.title, currentUrl.toString());
    }

    async completeSignInWithAccessKeys({ accountId, allKeys, publicKey }: { accountId: string, allKeys: string[], publicKey: string }) {
        const authData = {
            accountId,
            allKeys
        };
        window.localStorage.setItem(this._authDataKey, JSON.stringify(authData));
        if (publicKey) {
            await this._moveKeyFromTempToPermanent(accountId, publicKey);
        }
        this._authData = authData;
        this.updateAccount()
    }

    /**
     * @hidden
     * @param accountId The NEAR account owning the given public key
     * @param publicKey The public key being set to the key store
     */
    async _moveKeyFromTempToPermanent(accountId: string, publicKey: string) {
        const keyPair = await this._keyStore.getKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
        await this._keyStore.setKey(this._networkId, accountId, keyPair);
        await this._keyStore.removeKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
    }

    /**
     * Sign out from the current account
     * @example
     * walletConnection.signOut();
     */
    signOut() {
        this._authData = {};
        window.localStorage.removeItem(this._authDataKey);
        this._keyStore.clear();
    }

    /**
     * Returns the current connected wallet account
     */
    account() {
        if (!this._connectedAccount) {
            this._connectedAccount = new MyNearConnectedWalletAccount(this, this._near.connection, this._authData.accountId || "");
        }
        return this._connectedAccount;
    }

    updateAccount() {
        this._connectedAccount = new MyNearConnectedWalletAccount(this, this._near.connection, this._authData.accountId || "");
    }
}

/**
 * {@link Account} implementation which redirects to wallet using {@link WalletConnection} when no local key is available.
 */

export class MyNearConnectedWalletAccount extends Account {
    walletConnection: MyNearWalletConnection;

    constructor(walletConnection: MyNearWalletConnection, connection: Connection, accountId: string) {
        super(connection, accountId);
        this.walletConnection = walletConnection;
    }

    // Overriding Account methods

    /**
     * Sign a transaction by redirecting to the NEAR Wallet
     * @see {@link WalletConnection#requestSignTransactions}
     * @param options An optional options object
     * @param options.receiverId The NEAR account ID of the transaction receiver.
     * @param options.actions An array of transaction actions to be performed.
     * @param options.walletMeta Additional metadata to be included in the wallet signing request.
     * @param options.walletCallbackUrl URL to redirect upon completion of the wallet signing process. Default: current URL.
     */
    async signAndSendTransaction({ receiverId, actions, walletMeta, walletCallbackUrl = window.location.href }: SignAndSendTransactionOptions): Promise<FinalExecutionOutcome> {
        const localKey = await this.connection.signer.getPublicKey(this.accountId, this.connection.networkId);
        let accessKey = await this.accessKeyForTransaction(receiverId, actions, localKey);
        if (!accessKey) {
            throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
        }

        if (localKey && localKey.toString() === accessKey.public_key) {
            try {
                return await super.signAndSendTransaction({ receiverId, actions });
            } catch (e: unknown) {
                if (typeof e === 'object' && e !== null && 'type' in e && (e as any).type === 'NotEnoughAllowance') {
                    accessKey = await this.accessKeyForTransaction(receiverId, actions);
                } else {
                    throw e;
                }
            }
        }

        const block = await this.connection.provider.block({ finality: 'final' });
        const blockHash = base_decode(block.header.hash);

        const publicKey = PublicKey.from(accessKey.public_key);
        // TODO: Cache & listen for nonce updates for given access key
        const nonce = accessKey.access_key.nonce + BigInt("1");
        const transaction = createTransaction(this.accountId, publicKey, receiverId, nonce, actions, blockHash);
        const transactionHashes = await this.walletConnection.requestSignTransaction({
            transactions: [transaction],
            meta: walletMeta,
            callbackUrl: walletCallbackUrl
        });

        return new Promise(async (resolve, reject) => {
            const result = await this.connection.provider.txStatus(transactionHashes, 'unused', "NONE");
            resolve(result);
            setTimeout(() => {
                reject(new Error('Failed to redirect to sign transaction'));
            }, 1000);
        });

        // TODO: Aggregate multiple transaction request with "debounce".
        // TODO: Introduce TransactionQueue which also can be used to watch for status?
    }

    /**
     * Check if given access key allows the function call or method attempted in transaction
     * @param accessKey Array of \{access_key: AccessKey, public_key: PublicKey\} items
     * @param receiverId The NEAR account attempting to have access
     * @param actions The action(s) needed to be checked for access
     */
    async accessKeyMatchesTransaction(accessKey: any, receiverId: string, actions: Action[]): Promise<boolean> {
        const { access_key: { permission } } = accessKey;
        if (permission === 'FullAccess') {
            return true;
        }

        if (permission.FunctionCall) {
            const { receiver_id: allowedReceiverId, method_names: allowedMethods } = permission.FunctionCall;
            /********************************
            Accept multisig access keys and let wallets attempt to signAndSendTransaction
            If an access key has itself as receiverId and method permission add_request_and_confirm, then it is being used in a wallet with multisig contract: https://github.com/near/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
            ********************************/
            if (allowedReceiverId === this.accountId && allowedMethods.includes(MULTISIG_HAS_METHOD)) {
                return true;
            }
            if (allowedReceiverId === receiverId) {
                if (actions.length !== 1) {
                    return false;
                }
                const [{ functionCall }] = actions;
                return functionCall &&
                    (!functionCall.deposit || functionCall.deposit.toString() === '0') && // TODO: Should support charging amount smaller than allowance?
                    (allowedMethods.length === 0 || allowedMethods.includes(functionCall.methodName));
                // TODO: Handle cases when allowance doesn't have enough to pay for gas
            }
        }
        // TODO: Support other permissions than FunctionCall

        return false;
    }

    /**
     * Helper function returning the access key (if it exists) to the receiver that grants the designated permission
     * @param receiverId The NEAR account seeking the access key for a transaction
     * @param actions The action(s) sought to gain access to
     * @param localKey A local public key provided to check for access
     */
    async accessKeyForTransaction(receiverId: string, actions: Action[], localKey?: PublicKey): Promise<any> {
        const accessKeys = await this.getAccessKeys();

        if (localKey) {
            const accessKey = accessKeys.find(key => key.public_key.toString() === localKey.toString());
            if (accessKey && await this.accessKeyMatchesTransaction(accessKey, receiverId, actions)) {
                return accessKey;
            }
        }

        const walletKeys = this.walletConnection._authData.allKeys;
        for (const accessKey of accessKeys) {
            if (walletKeys && walletKeys.indexOf(accessKey.public_key) !== -1 && await this.accessKeyMatchesTransaction(accessKey, receiverId, actions)) {
                return accessKey;
            }
        }

        return null;
    }
}
