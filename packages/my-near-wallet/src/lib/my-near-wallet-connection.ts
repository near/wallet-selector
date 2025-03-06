import type { SignedMessage } from "@near-wallet-selector/core";
import { serialize } from "borsh";
import type { Connection, InMemorySigner, Near } from "near-api-js";
import { Account, KeyPair } from "near-api-js";
import type { SignAndSendTransactionOptions } from "near-api-js/lib/account";
import type { KeyStore } from "near-api-js/lib/key_stores";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import type { AccessKeyInfoView } from "near-api-js/lib/providers/provider";
import type { Action, Transaction } from "near-api-js/lib/transaction";
import { SCHEMA, createTransaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import { base_decode } from "near-api-js/lib/utils/serialize";

const LOGIN_WALLET_URL_SUFFIX = "/login/";
const MULTISIG_HAS_METHOD = "add_request_and_confirm";
const LOCAL_STORAGE_KEY_SUFFIX = "_wallet_auth_key";
const PENDING_ACCESS_KEY_PREFIX = "pending_key"; // browser storage key for a pending access key (i.e. key has been generated but we are not sure it was added yet)

const DEFAULT_POPUP_WIDTH = 480;
const DEFAULT_POPUP_HEIGHT = 640;
const POLL_INTERVAL = 300;

interface SignInOptions {
  contractId?: string;
  methodNames?: Array<string>;
  successUrl?: string;
  failureUrl?: string;
  keyType?: "ed25519" | "secp256k1";
}

interface WalletMessage {
  status: "success" | "failure" | "pending";
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
  transactions: Array<Transaction>;
  /** url NEAR Wallet will redirect to after transaction signing is complete */
  callbackUrl?: string;
  /** meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param */
  meta?: string;
}

interface AuthData {
  accountId?: string;
  allKeys?: Array<string>;
}

interface WalletResponseData extends WalletMessage {
  public_key?: string;
  all_keys?: Array<string>;
  account_id?: string;
}

export class MyNearWalletConnection {
  _walletBaseUrl: string;
  _authDataKey: string;
  _keyStore: KeyStore;
  _authData: AuthData;
  _networkId: string;
  _near: Near;
  _connectedAccount?: MyNearConnectedWalletAccount | null;
  _completeSignInPromise?: Promise<void>;

  constructor(near: Near, appKeyPrefix: string) {
    if (typeof appKeyPrefix !== "string") {
      throw new Error(
        "Please define a clear appKeyPrefix for this WalletConnection instance"
      );
    }

    this._near = near;
    const authDataKey = appKeyPrefix + LOCAL_STORAGE_KEY_SUFFIX;
    const authData = JSON.parse(
      window.localStorage.getItem(authDataKey) || "{}"
    ) as AuthData;

    this._networkId = near.config.networkId;
    this._walletBaseUrl = near.config.walletUrl;
    this._keyStore = (near.connection.signer as InMemorySigner).keyStore;
    this._authData = authData;
    this._authDataKey = authDataKey;
  }

  isSignedIn(): boolean {
    return !!this._authData.accountId;
  }

  async isSignedInAsync(): Promise<boolean> {
    if (!this._completeSignInPromise) {
      return this.isSignedIn();
    }

    await this._completeSignInPromise;
    return this.isSignedIn();
  }

  getAccountId(): string {
    return this._authData.accountId || "";
  }

  async requestSignInUrl({
    contractId,
    methodNames,
    successUrl,
    failureUrl,
    keyType = "ed25519",
  }: SignInOptions): Promise<string> {
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(this._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX);
    newUrl.searchParams.set("success_url", successUrl || currentUrl.href);
    newUrl.searchParams.set("failure_url", failureUrl || currentUrl.href);
    if (contractId) {
      /* Throws exception if contract account does not exist */
      const contractAccount = await this._near.account(contractId);
      await contractAccount.state();

      newUrl.searchParams.set("contract_id", contractId);
      const accessKey = KeyPair.fromRandom(keyType);
      newUrl.searchParams.set(
        "public_key",
        accessKey.getPublicKey().toString()
      );
      await this._keyStore.setKey(
        this._networkId,
        PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(),
        accessKey
      );
    }

    if (methodNames) {
      methodNames.forEach((methodName) => {
        newUrl.searchParams.append("methodNames", methodName);
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
      throw new Error(
        "Popup window blocked. Please allow popups for this site."
      );
    }

    return new Promise<T>((resolve, reject) => {
      const messageHandler = this.setupMessageHandler(
        resolve,
        reject,
        childWindow,
        callback
      );

      const intervalId = setInterval(() => {
        if (childWindow.closed) {
          window.removeEventListener("message", messageHandler);
          clearInterval(intervalId);
          reject(new Error("User closed the window"));
        }
      }, POLL_INTERVAL);
    });
  }

  private setupMessageHandler<T>(
    resolve: (value: T) => void,
    reject: (reason?: unknown) => void,
    childWindow: Window | null,
    callback: (result: WalletMessage) => T
  ): (event: MessageEvent) => Promise<void> {
    const handler = async (event: MessageEvent) => {
      const message = event.data as WalletMessage;

      // check if the URL are the same
      const origin = new URL(event.origin);
      const walletBaseUrl = new URL(this._walletBaseUrl);
      if (origin.origin !== walletBaseUrl.origin) {
        // eslint-disable-next-line no-console
        console.warn("Ignoring message from different origin", origin.origin);
        return;
      }

      switch (message.status) {
        case "success":
          childWindow?.close();
          resolve(callback(message));
          break;
        case "failure":
          childWindow?.close();
          reject(new Error(message.errorMessage || "Transaction failed"));
          break;
        default:
          // eslint-disable-next-line no-console
          console.warn("Unhandled message status:", message.status);
      }
    };

    window.addEventListener("message", handler);
    return handler;
  }

  async requestSignIn(
    options: SignInOptions
  ): Promise<Array<{ accountId: string; publicKey: string }>> {
    const url = await this.requestSignInUrl(options);
    return await this.handlePopupTransaction(url, async (data) => {
      const responseData = data as WalletResponseData;
      const {
        public_key: publicKey,
        all_keys: allKeys,
        account_id: accountId,
      } = responseData;

      if (accountId && publicKey && allKeys) {
        await this.completeSignInWithAccessKeys({
          accountId,
          publicKey,
          allKeys,
        });
        return [{ accountId, publicKey }];
      }
      throw new Error("Invalid response data from wallet");
    });
  }

  requestSignTransactionsUrl(options: RequestSignTransactionsOptions): string {
    const { transactions, meta, callbackUrl } = options;
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL("sign", this._walletBaseUrl);

    newUrl.searchParams.set(
      "transactions",
      transactions
        .map((transaction) => serialize(SCHEMA.Transaction, transaction))
        .map((serialized) => Buffer.from(serialized).toString("base64"))
        .join(",")
    );
    newUrl.searchParams.set("callbackUrl", callbackUrl || currentUrl.href);

    if (meta) {
      newUrl.searchParams.set("meta", meta);
    }

    return newUrl.toString();
  }

  async requestSignTransactions(
    options: RequestSignTransactionsOptions
  ): Promise<Array<FinalExecutionOutcome>> {
    const url = this.requestSignTransactionsUrl(options);
    const transactionsHashes = (
      await this.handlePopupTransaction(url, (data) => data.transactionHashes)
    )?.split(",");

    if (!transactionsHashes) {
      throw new Error("No transaction hashes received");
    }

    return Promise.all(
      transactionsHashes.map((hash) =>
        this._near.connection.provider.txStatus(hash, "unused", "NONE")
      )
    );
  }

  requestSignTransaction(
    options: RequestSignTransactionsOptions
  ): Promise<string> {
    const url = this.requestSignTransactionsUrl(options);

    return this.handlePopupTransaction(
      url,
      (data) => data?.transactionHashes
    ) as Promise<string>;
  }

  async completeSignInWithAccessKeys({
    accountId,
    allKeys,
    publicKey,
  }: {
    accountId: string;
    allKeys: Array<string>;
    publicKey: string;
  }) {
    const authData = {
      accountId,
      allKeys,
    };
    window.localStorage.setItem(this._authDataKey, JSON.stringify(authData));
    if (publicKey) {
      await this._moveKeyFromTempToPermanent(accountId, publicKey);
    }
    this._authData = authData;
    this.updateAccount();
  }

  async _moveKeyFromTempToPermanent(accountId: string, publicKey: string) {
    const keyPair = await this._keyStore.getKey(
      this._networkId,
      PENDING_ACCESS_KEY_PREFIX + publicKey
    );
    await this._keyStore.setKey(this._networkId, accountId, keyPair);
    await this._keyStore.removeKey(
      this._networkId,
      PENDING_ACCESS_KEY_PREFIX + publicKey
    );
  }

  signOut() {
    this._authData = {};
    window.localStorage.removeItem(this._authDataKey);
    this._keyStore.clear();
  }

  /* eslint-disable @typescript-eslint/no-use-before-define */
  account() {
    if (!this._connectedAccount) {
      this._connectedAccount = new MyNearConnectedWalletAccount(
        this,
        this._near.connection,
        this._authData.accountId || ""
      );
    }
    return this._connectedAccount;
  }

  updateAccount() {
    this._connectedAccount = new MyNearConnectedWalletAccount(
      this,
      this._near.connection,
      this._authData.accountId || ""
    );
  }
  /* eslint-enable @typescript-eslint/no-use-before-define */
}

export class MyNearConnectedWalletAccount extends Account {
  walletConnection: MyNearWalletConnection;

  constructor(
    walletConnection: MyNearWalletConnection,
    connection: Connection,
    accountId: string
  ) {
    super(connection, accountId);
    this.walletConnection = walletConnection;
  }

  async signAndSendTransaction({
    receiverId,
    actions,
    walletMeta,
    walletCallbackUrl = window.location.href,
  }: SignAndSendTransactionOptions): Promise<FinalExecutionOutcome> {
    const localKey = await this.connection.signer.getPublicKey(
      this.accountId,
      this.connection.networkId
    );
    let accessKey = await this.accessKeyForTransaction(
      receiverId,
      actions,
      localKey
    );
    if (!accessKey) {
      throw new Error(
        `Cannot find matching key for transaction sent to ${receiverId}`
      );
    }

    if (localKey && localKey.toString() === accessKey.public_key) {
      try {
        return await super.signAndSendTransaction({ receiverId, actions });
      } catch (e: unknown) {
        /* eslint-disable @typescript-eslint/no-use-before-define */
        if (
          typeof e === "object" &&
          e !== null &&
          "type" in e &&
          (e as any).type === "NotEnoughAllowance" // eslint-disable-line @typescript-eslint/no-explicit-any
        ) {
          accessKey = await this.accessKeyForTransaction(receiverId, actions);
        } else {
          throw e;
        }
        /* eslint-enable @typescript-eslint/no-use-before-define */
      }
    }

    const block = await this.connection.provider.block({ finality: "final" });
    const blockHash = base_decode(block.header.hash);

    if (!accessKey) {
      throw new Error("No matching key found for transaction");
    }
    const publicKey = PublicKey.from(accessKey.public_key);
    // TODO: Cache & listen for nonce updates for given access key
    const nonce = accessKey.access_key.nonce + BigInt("1");
    const transaction = createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash
    );
    const transactionHashes =
      await this.walletConnection.requestSignTransaction({
        transactions: [transaction],
        meta: walletMeta,
        callbackUrl: walletCallbackUrl,
      });

    return new Promise((resolve, reject) => {
      this.connection.provider
        .txStatus(transactionHashes, "unused", "NONE")
        .then(resolve)
        .catch(reject);

      setTimeout(() => {
        reject(new Error("Failed to redirect to sign transaction"));
      }, 1000);
    });

    // TODO: Aggregate multiple transaction request with "debounce".
    // TODO: Introduce TransactionQueue which also can be used to watch for status?
  }

  async accessKeyMatchesTransaction(
    accessKey: AccessKeyInfoView,
    receiverId: string,
    actions: Array<Action>
  ): Promise<boolean> {
    const {
      access_key: { permission },
    } = accessKey;
    if (permission === "FullAccess") {
      return true;
    }

    if (permission.FunctionCall) {
      const { receiver_id: allowedReceiverId, method_names: allowedMethods } =
        permission.FunctionCall;
      /********************************
            Accept multisig access keys and let wallets attempt to signAndSendTransaction
            If an access key has itself as receiverId and method permission add_request_and_confirm, then it is being used in a wallet with multisig contract: https://github.com/near/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
            ********************************/
      if (
        allowedReceiverId === this.accountId &&
        allowedMethods.includes(MULTISIG_HAS_METHOD)
      ) {
        return true;
      }
      if (allowedReceiverId === receiverId) {
        if (actions.length !== 1) {
          return false;
        }
        const [{ functionCall }] = actions;
        return !!(
          functionCall &&
          (!functionCall.deposit || functionCall.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
          (allowedMethods.length === 0 ||
            allowedMethods.includes(functionCall.methodName))
        );
        // TODO: Handle cases when allowance doesn't have enough to pay for gas
      }
    }
    // TODO: Support other permissions than FunctionCall

    return false;
  }

  async accessKeyForTransaction(
    receiverId: string,
    actions: Array<Action>,
    localKey?: PublicKey
  ): Promise<AccessKeyInfoView | null> {
    const accessKeys = await this.getAccessKeys();

    if (localKey) {
      const accessKey = accessKeys.find(
        (key) => key.public_key.toString() === localKey.toString()
      );
      if (
        accessKey &&
        (await this.accessKeyMatchesTransaction(accessKey, receiverId, actions))
      ) {
        return accessKey;
      }
    }

    const walletKeys = this.walletConnection._authData.allKeys;
    for (const accessKey of accessKeys) {
      if (
        walletKeys &&
        walletKeys.indexOf(accessKey.public_key) !== -1 &&
        (await this.accessKeyMatchesTransaction(accessKey, receiverId, actions))
      ) {
        return accessKey;
      }
    }

    return null;
  }
}
