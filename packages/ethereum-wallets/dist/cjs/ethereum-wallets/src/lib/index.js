"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEthereumWallets = setupEthereumWallets;
const nearAPI = __importStar(require("near-api-js"));
const providers_1 = require("@near-js/providers");
const transactions_1 = require("@near-js/transactions");
const utils_1 = require("@near-js/utils");
const wallet_utils_1 = require("@near-wallet-selector/wallet-utils");
const viem_1 = require("viem");
const bs58_1 = __importDefault(require("bs58"));
let wagmiCore = null;
const importWagmiCore = async () => {
    // Commonjs support NA with @wagmi/core:
    // https://wagmi.sh/core/guides/migrate-from-v1-to-v2#dropped-commonjs-support
    return Promise.resolve().then(() => __importStar(require("@wagmi/core"))).then((module) => {
        wagmiCore = module;
    });
};
const icon_1 = __importDefault(require("./icon"));
const modal_1 = require("./modal");
const utils_2 = require("./utils");
const setupEthereumWalletsState = async (id) => {
    const keystore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage, `near-wallet-selector:${id}:keystore:`);
    return {
        keystore,
        subscriptions: [],
        isConnecting: false,
    };
};
const EthereumWallets = async ({ id, options, store, provider, emitter, logger, params: { wagmiConfig, web3Modal, chainId, alwaysOnboardDuringSignIn = false, devMode, devModeAccount = "eth-wallet.testnet", nearNodeUrl, }, }) => {
    if (!wagmiCore) {
        throw new Error("@wagmi/core not imported.");
    }
    const _state = await setupEthereumWalletsState(id);
    const expectedChainId = chainId ?? (options.network.networkId === "mainnet" ? 397 : 398);
    const chain = wagmiConfig.chains.find((c) => c.id === expectedChainId);
    if (!chain) {
        throw new Error("Failed to parse NEAR chain from wagmiConfig.");
    }
    const nearRpc = chain.rpcUrls.default.http[0];
    if (!nearRpc) {
        throw new Error("Failed to parse NEAR rpc url from wagmiConfig.");
    }
    const nearExplorer = chain.blockExplorers?.default.url;
    if (!nearExplorer) {
        throw new Error("Failed to parse NEAR explorer url from wagmiConfig.");
    }
    // NOTE: use a custom provider because the failover provider doesn't give error details.
    const nearProvider = new providers_1.JsonRpcProvider(nearNodeUrl ??
        // @ts-expect-error
        provider.provider.connection ??
        // @ts-expect-error
        provider.provider.providers[
        // @ts-expect-error
        provider.provider.currentProviderIndex].connection);
    const getAccounts = async () => {
        const address = wagmiCore.getAccount(wagmiConfig).address?.toLowerCase();
        const account = devMode ? address + "." + devModeAccount : address;
        if (!account || !address) {
            return [];
        }
        const keyPair = await _state.keystore.getKey(options.network.networkId, account);
        const accountLogIn = {
            accountId: account,
            publicKey: keyPair ? keyPair.getPublicKey().toString() : undefined,
        };
        return [accountLogIn];
    };
    const cleanup = async () => {
        _state.subscriptions.forEach((subscription) => subscription.remove());
        _state.subscriptions = [];
    };
    const executeTransaction = async ({ tx, relayerPublicKey, }) => {
        const to = (/^0x([A-Fa-f0-9]{40})$/.test(tx.receiverId)
            ? tx.receiverId
            : "0x" + (0, viem_1.keccak256)((0, viem_1.toHex)(tx.receiverId)).slice(26));
        // Created this defaults variable during the process
        // of getting wallet selector packages and near-js packages
        // working smoothly on LTS node version.
        // Feel free to update/remove/whatever
        let ethTxDefaults = {
            abi: [],
            functionName: "",
            address: `0x`,
            chain: undefined,
            account: `0x`
        };
        let ethTx;
        switch (tx.actions[0].type) {
            case "CreateAccount":
                break;
            case "DeployContract":
                break;
            case "Stake":
                break;
            case "DeleteAccount":
                break;
            case "AddKey": {
                const publicKey = (0, viem_1.bytesToHex)(bs58_1.default.decode(tx.actions[0].params.publicKey.split(":")[1]));
                if (tx.actions[0].params.accessKey.permission === "FullAccess") {
                    const args = [
                        0, // 0 stands for ed25519
                        publicKey,
                        BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
                        true,
                        false, // Not used with is_full_access
                        BigInt(0), // Not used with is_full_access
                        "", // Not used with is_full_access
                        [], // Not used with is_full_access
                    ];
                    ethTx = {
                        abi: utils_2.ETHEREUM_ACCOUNT_ABI,
                        address: to,
                        account: ethTxDefaults.account,
                        chain: ethTxDefaults.chain,
                        functionName: "addKey",
                        args,
                        chainId: expectedChainId,
                        type: "legacy",
                    };
                    throw new Error("Requesting a FullAccess key is not allowed.");
                }
                else {
                    const allowance = BigInt(tx.actions[0].params.accessKey.permission.allowance ??
                        utils_2.DEFAULT_ACCESS_KEY_ALLOWANCE);
                    const args = [
                        0, // 0 stands for ed25519
                        publicKey,
                        BigInt(tx.actions[0].params.accessKey.nonce ?? 0),
                        false,
                        allowance > 0 ? true : false,
                        allowance,
                        tx.actions[0].params.accessKey.permission.receiverId,
                        tx.actions[0].params.accessKey.permission.methodNames ?? [],
                    ];
                    ethTx = {
                        abi: utils_2.ETHEREUM_ACCOUNT_ABI,
                        address: to,
                        account: ethTxDefaults.account,
                        chain: ethTxDefaults.chain,
                        functionName: "addKey",
                        args,
                        gasPrice: tx.actions[0].params.publicKey === relayerPublicKey &&
                            tx.receiverId ===
                                tx.actions[0].params.accessKey.permission.receiverId
                            ? // Free onboarding tx: fix 1 wei gasPrice because some wallets ignore 0 gasPrice.
                                // Rpc will also return a dust eth_getBalance for accounts not yet onboarded to trick wallets
                                // into accepting this free transaction even before the user owns NEAR.
                                BigInt(1)
                            : undefined,
                        chainId: expectedChainId,
                        type: "legacy",
                        // uhhh
                    };
                }
                break;
            }
            case "DeleteKey": {
                const publicKey = (0, viem_1.bytesToHex)(bs58_1.default.decode(tx.actions[0].params.publicKey.split(":")[1]));
                const args = [
                    0, // 0 stands for ed25519
                    publicKey,
                ];
                ethTx = {
                    abi: utils_2.ETHEREUM_ACCOUNT_ABI,
                    address: to,
                    account: ethTxDefaults.account,
                    chain: ethTxDefaults.chain,
                    functionName: "deleteKey",
                    args,
                    chainId: expectedChainId,
                    type: "legacy",
                };
                break;
            }
            case "FunctionCall": {
                const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
                const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
                const requestedGas = BigInt(tx.actions[0].params.gas);
                const nearGas = requestedGas <= utils_2.MAX_TGAS ? requestedGas : utils_2.MAX_TGAS;
                const args = [
                    tx.receiverId,
                    tx.actions[0].params.methodName,
                    (0, viem_1.bytesToHex)((0, transactions_1.stringifyJsonOrBytes)(tx.actions[0].params.args)),
                    nearGas,
                    +yoctoNear.toString(),
                ];
                ethTx = {
                    abi: utils_2.ETHEREUM_ACCOUNT_ABI,
                    address: to,
                    account: ethTxDefaults.account,
                    chain: ethTxDefaults.chain,
                    functionName: "functionCall",
                    args,
                    value,
                    chainId: expectedChainId,
                    type: "legacy",
                };
                break;
            }
            case "Transfer": {
                const yoctoNear = BigInt(tx.actions[0].params.deposit) % BigInt(1e6);
                const value = BigInt(tx.actions[0].params.deposit) / BigInt(1e6);
                const args = [tx.receiverId, +yoctoNear.toString()];
                ethTx = {
                    abi: utils_2.ETHEREUM_ACCOUNT_ABI,
                    address: to,
                    account: ethTxDefaults.account,
                    chain: ethTxDefaults.chain,
                    functionName: "transfer",
                    args,
                    value,
                    chainId: expectedChainId,
                    type: "legacy",
                };
                break;
            }
            default: {
                throw new Error("Invalid action type");
            }
        }
        // NOTE: re-add simulateContract and parse errors after eth_call implements errors.
        // const { request } = await wagmiCore!.simulateContract(wagmiConfig, ethTx);
        const result = await wagmiCore.writeContract(wagmiConfig, ethTx);
        return result;
    };
    // Watch Ethereum wallet changes.
    const setupEvents = async () => {
        const unwatchAccount = wagmiCore.watchAccount(wagmiConfig, {
            onChange: async (data) => {
                // Ethereum wallet disconnected: also disconnect NEAR account.
                if (!data.address && data.status === "disconnected") {
                    emitter.emit("signedOut", null);
                    return;
                }
                // Ethereum wallet switched connected account: also switch NEAR account if already signed in or disconnect.
                if (data.address && data.status === "connected") {
                    if (store.getState().contract?.contractId) {
                        const address = data.address.toLowerCase();
                        const keyPair = await _state.keystore.getKey(options.network.networkId, devMode ? address + "." + devModeAccount : address);
                        if (!keyPair) {
                            try {
                                wagmiCore.disconnect(wagmiConfig);
                            }
                            catch (error) {
                                logger.error(error);
                            }
                            emitter.emit("signedOut", null);
                            return;
                        }
                    }
                    emitter.emit("accountsChanged", { accounts: await getAccounts() });
                }
            },
        });
        _state.subscriptions.push({ remove: () => unwatchAccount() });
    };
    setupEvents();
    // Add signerId and receiverId defaults.
    const transformTransactions = async (transactions) => {
        const state = store.getState();
        const { contract } = state;
        const [accountLogIn] = await getAccounts();
        if (!accountLogIn) {
            throw new Error("No active account");
        }
        return transactions.map((transaction) => {
            if (!contract && !transaction.receiverId) {
                throw new Error(`Missing receiverId, got '${transaction.receiverId}'`);
            }
            return {
                ...transaction,
                signerId: transaction.signerId || accountLogIn.accountId,
                receiverId: transaction.receiverId || contract.contractId,
            };
        });
    };
    // Separate actions into individual transactions because not available in 0x accounts.
    const transformEthereumTransactions = (transactions) => {
        return transactions
            .map((transaction) => {
            return transaction.actions.map((action) => {
                return {
                    signerId: transaction.signerId,
                    receiverId: transaction.receiverId,
                    actions: [action],
                };
            });
        })
            .flat();
    };
    // Check if accessKey is usable to execute all transaction.
    const validateAccessKey = ({ transactions, accessKey, }) => {
        if (accessKey.permission === "FullAccess") {
            return true;
        }
        return transactions.every((tx) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { receiver_id, method_names } = accessKey.permission.FunctionCall;
            if (receiver_id !== tx.receiverId) {
                return false;
            }
            return tx.actions.every((action) => {
                if (action.type !== "FunctionCall") {
                    return false;
                }
                const { methodName, deposit } = action.params;
                if (method_names.length && !method_names.includes(methodName)) {
                    return false;
                }
                return BigInt(deposit) <= 0;
            });
        });
    };
    // Get the relayer public key and onboarding transaction if needed.
    const getRelayerOnboardingInfo = async ({ accountId, }) => {
        let relayerPublicKey;
        try {
            const response = await fetch(nearRpc, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 3,
                    method: "near_getPublicKey",
                }),
            });
            const { result } = await response.json();
            relayerPublicKey =
                "ed25519:" + bs58_1.default.encode(Buffer.from(result.public_key, "hex"));
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to fetch the relayer's public key.");
        }
        try {
            const key = await nearProvider.query({
                request_type: "view_access_key",
                finality: "final",
                account_id: accountId,
                public_key: relayerPublicKey,
            });
            logger.log("User account ready, relayer access key onboarded.", relayerPublicKey, key);
            return { relayerPublicKey, onboardingTransaction: null };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            logger.error(error);
            if (!error.message?.includes("does not exist while viewing") &&
                !error.message?.includes("doesn't exist") &&
                !error.message?.includes("does not exist") &&
                !error.message?.includes("has never been observed on the node")) {
                throw new Error("Failed to view the relayer public key (view_access_key).");
            }
            logger.warn("Need to add the relayer access key:", relayerPublicKey);
            // Add the relayer's access key on-chain.
            return {
                relayerPublicKey,
                onboardingTransaction: {
                    signerId: accountId,
                    receiverId: accountId,
                    actions: [
                        {
                            type: "AddKey",
                            params: {
                                publicKey: relayerPublicKey,
                                accessKey: {
                                    nonce: 0,
                                    permission: {
                                        receiverId: accountId,
                                        allowance: "0",
                                        methodNames: [utils_2.RLP_EXECUTE],
                                    },
                                },
                            },
                        },
                    ],
                },
            };
        }
    };
    const switchChain = async () => {
        const account = wagmiCore.getAccount(wagmiConfig);
        if (account.chainId !== expectedChainId) {
            const { showModal, hideModal } = (0, modal_1.createChainSwitchModal)({
                chain,
            });
            showModal();
            try {
                await wagmiCore.switchChain(wagmiConfig, {
                    chainId: expectedChainId,
                });
            }
            catch (error) {
                logger.error(error);
                // TODO: add the link to onboarding page when available.
                throw new Error("Wallet didn't connect to NEAR Protocol network, try adding and selecting the network manually inside wallet settings.");
                // NOTE: we don't hide the modal in case of error to allow the user to add the network manually.
            }
            hideModal();
        }
    };
    const signAndSendTransactions = async (transactions) => {
        const nearTxs = await transformTransactions(transactions);
        const [accountLogIn] = await getAccounts();
        // If transactions can be executed with FunctionCall access key do it, otherwise execute 1 by 1 with Ethereum wallet.
        if (accountLogIn.publicKey && nearTxs.length) {
            let accessKeyUsable;
            try {
                const accessKey = await nearProvider.query({
                    request_type: "view_access_key",
                    finality: "final",
                    account_id: accountLogIn.accountId,
                    public_key: accountLogIn.publicKey,
                });
                accessKeyUsable = validateAccessKey({
                    transactions: nearTxs,
                    accessKey,
                });
            }
            catch (error) {
                logger.error(error);
                accessKeyUsable = false;
            }
            if (accessKeyUsable) {
                const signer = new nearAPI.InMemorySigner(_state.keystore);
                const signedTransactions = await (0, wallet_utils_1.signTransactions)(nearTxs, signer, options.network);
                const results = [];
                for (let i = 0; i < signedTransactions.length; i += 1) {
                    const nearTx = await nearProvider.sendTransaction(signedTransactions[i]);
                    logger.log("NEAR transaction:", nearTx);
                    if (typeof nearTx.status === "object" &&
                        typeof nearTx.status.Failure === "object" &&
                        nearTx.status.Failure !== null) {
                        logger.error("Transaction execution error.");
                        throw (0, utils_1.parseRpcError)(nearTx.status.Failure);
                    }
                    results.push(nearTx);
                }
                return results;
            }
        }
        const { relayerPublicKey, onboardingTransaction } = await getRelayerOnboardingInfo({
            accountId: accountLogIn.accountId,
        });
        let txs = transformEthereumTransactions(nearTxs);
        if (onboardingTransaction) {
            // Onboard the relayer before executing other transactions.
            txs = [onboardingTransaction, ...txs];
        }
        await switchChain();
        const results = [];
        await (() => {
            return new Promise((resolve, reject) => {
                const { showModal, hideModal, renderTxs } = (0, modal_1.createTxModal)({
                    onCancel: () => {
                        reject("User canceled Ethereum wallet transaction(s).");
                    },
                    txs,
                    relayerPublicKey,
                    explorerUrl: nearExplorer,
                });
                showModal();
                (async () => {
                    try {
                        const ethTxHashes = [];
                        for (const [index, tx] of txs.entries()) {
                            let txHash;
                            let txError = null;
                            while (!txHash) {
                                try {
                                    await (() => {
                                        return new Promise((resolveTx, rejectTx) => {
                                            renderTxs({
                                                selectedIndex: index,
                                                ethTxHashes,
                                                error: txError,
                                                onConfirm: async () => {
                                                    try {
                                                        txError = null;
                                                        renderTxs({
                                                            selectedIndex: index,
                                                            ethTxHashes,
                                                            error: txError,
                                                        });
                                                        txHash = await executeTransaction({
                                                            tx,
                                                            relayerPublicKey,
                                                        });
                                                        resolveTx();
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    }
                                                    catch (err) {
                                                        logger.error(err);
                                                        if (!err.message?.includes("reject") &&
                                                            !err.message?.includes("denied")) {
                                                            txError = "Transaction execution error.";
                                                        }
                                                        rejectTx(new utils_2.EthTxError("Transaction request error."));
                                                    }
                                                },
                                            });
                                        });
                                    })();
                                }
                                catch (error) {
                                    logger.error(error);
                                    if (!(error instanceof utils_2.EthTxError)) {
                                        throw new Error("Ethereum modal render error.");
                                    }
                                }
                            }
                            logger.log(`Sent transaction: ${txHash}`);
                            ethTxHashes.push(txHash);
                            renderTxs({
                                selectedIndex: index,
                                ethTxHashes,
                            });
                            await new Promise((r) => setTimeout(r, 2000));
                            let receipt;
                            try {
                                // NOTE: error is thrown if tx failed so we catch it to get the receipt.
                                receipt = await wagmiCore.waitForTransactionReceipt(wagmiConfig, {
                                    hash: txHash,
                                    chainId: expectedChainId,
                                });
                            }
                            catch (error) {
                                logger.error(error);
                                while (!receipt) {
                                    try {
                                        await new Promise((r) => setTimeout(r, 1000));
                                        receipt = await wagmiCore.getTransactionReceipt(wagmiConfig, {
                                            hash: txHash,
                                            chainId: expectedChainId,
                                        });
                                    }
                                    catch (err) {
                                        logger.log(err);
                                    }
                                }
                            }
                            logger.log("Receipt:", receipt);
                            let nearTx;
                            while (!nearTx) {
                                try {
                                    await new Promise((r) => setTimeout(r, 1000));
                                    nearTx = await nearProvider.txStatus(
                                    /* // @ts-expect-error */
                                    receipt.nearTransactionHash, accountLogIn.accountId);
                                }
                                catch (err) {
                                    logger.log(err);
                                }
                            }
                            logger.log("NEAR transaction:", nearTx);
                            if (receipt.status !== "success") {
                                const failedOutcome = nearTx.receipts_outcome.find(({ outcome }) => typeof outcome.status === "object" &&
                                    typeof outcome.status.Failure === "object" &&
                                    outcome.status.Failure !== null &&
                                    outcome.executor_id === tx.receiverId);
                                if (failedOutcome) {
                                    reject((0, utils_1.parseRpcError)(failedOutcome.outcome.status.Failure));
                                }
                                else {
                                    reject("Transaction execution error, failed to parse failure reason.");
                                }
                                // NOTE: after return, `finally { hideModal() }` will run.
                                return;
                            }
                            results.push(nearTx);
                        }
                        resolve();
                    }
                    catch (error) {
                        logger.error(error);
                        reject(error);
                    }
                    finally {
                        hideModal();
                    }
                })();
            });
        })();
        return results;
    };
    const signOut = async () => {
        const [accountLogIn] = await getAccounts();
        if (accountLogIn.publicKey) {
            try {
                // Check that the key exists before making a transaction.
                await nearProvider.query({
                    request_type: "view_access_key",
                    finality: "final",
                    account_id: accountLogIn.accountId,
                    public_key: accountLogIn.publicKey,
                });
                // If there is a connection problem with the wallet, the user can cancel from the modal to skip the disconnect transaction.
                // If not deleted, the access key will be reused during signIn.
                await signAndSendTransactions([
                    {
                        signerId: accountLogIn.accountId,
                        receiverId: accountLogIn.accountId,
                        actions: [
                            {
                                type: "DeleteKey",
                                params: {
                                    publicKey: accountLogIn.publicKey,
                                },
                            },
                        ],
                    },
                ]);
                _state.keystore.removeKey(options.network.networkId, accountLogIn.accountId);
            }
            catch (error) {
                logger.error(error);
            }
        }
        try {
            wagmiCore.disconnect(wagmiConfig);
        }
        catch (error) {
            logger.error(error);
        }
        emitter.emit("signedOut", null);
        cleanup();
    };
    return {
        async signIn({ contractId, methodNames = [] }) {
            logger.log("EthereumWallets:signIn", { contractId, methodNames });
            if (_state.isConnecting) {
                throw new Error("SignIn request already received.");
            }
            try {
                _state.isConnecting = true;
                let unwatchAccountConnected;
                let unsubscribeCloseModal;
                let account = wagmiCore.getAccount(wagmiConfig);
                let address = account.address?.toLowerCase();
                // Open web3Modal and wait for a wallet to be connected or for the web3Modal to be closed.
                if (!address) {
                    try {
                        if (web3Modal) {
                            web3Modal.open();
                            await (() => {
                                return new Promise((resolve, reject) => {
                                    try {
                                        unwatchAccountConnected = wagmiCore.watchAccount(wagmiConfig, {
                                            onChange: (data) => {
                                                if (!data.address) {
                                                    return;
                                                }
                                                resolve(data);
                                            },
                                        });
                                        unsubscribeCloseModal = web3Modal.subscribeEvents((event) => {
                                            const newAccount = wagmiCore.getAccount(wagmiConfig);
                                            if (event.data.event === "MODAL_CLOSE" &&
                                                !newAccount.address) {
                                                reject("Web3Modal closed without connecting to an Ethereum wallet.");
                                            }
                                        });
                                    }
                                    catch (error) {
                                        reject("User rejected");
                                    }
                                });
                            })();
                        }
                        else {
                            await wagmiCore.connect(wagmiConfig, {
                                connector: wagmiCore.injected(),
                            });
                        }
                        account = wagmiCore.getAccount(wagmiConfig);
                        address = account.address?.toLowerCase();
                        if (!address) {
                            throw new Error("Failed to get Ethereum wallet address");
                        }
                    }
                    catch (error) {
                        logger.error(error);
                        throw new Error("Failed to connect Ethereum wallet.");
                    }
                    finally {
                        try {
                            // Prevent overshadowing the original exception
                            if (unwatchAccountConnected) {
                                unwatchAccountConnected();
                            }
                            if (unsubscribeCloseModal) {
                                unsubscribeCloseModal();
                            }
                        }
                        catch (error) {
                            logger.error(error);
                        }
                    }
                }
                else {
                    logger.log("Wallet already connected");
                }
                await switchChain();
                // Login with FunctionCall access key, reuse keypair or create a new one.
                const accountId = devMode ? address + "." + devModeAccount : address;
                let publicKey;
                if (contractId) {
                    const keyPair = await _state.keystore.getKey(options.network.networkId, accountId);
                    let reUseKeyPair = false;
                    if (keyPair) {
                        try {
                            await nearProvider.query({
                                request_type: "view_access_key",
                                finality: "final",
                                account_id: accountId,
                                public_key: keyPair.getPublicKey().toString(),
                            });
                            reUseKeyPair = true;
                        }
                        catch (error) {
                            logger.warn("Local access key cannot be reused.");
                            _state.keystore.removeKey(options.network.networkId, accountId);
                        }
                    }
                    if (reUseKeyPair) {
                        publicKey = keyPair.getPublicKey().toString();
                        logger.log("Reusing existing publicKey:", publicKey);
                    }
                    else {
                        const newAccessKeyPair = nearAPI.utils.KeyPair.fromRandom("ed25519");
                        publicKey = newAccessKeyPair.getPublicKey().toString();
                        logger.log("Created new publicKey:", publicKey);
                        await signAndSendTransactions([
                            {
                                signerId: accountId,
                                receiverId: accountId,
                                actions: [
                                    {
                                        type: "AddKey",
                                        params: {
                                            publicKey,
                                            accessKey: {
                                                nonce: 0,
                                                permission: {
                                                    receiverId: contractId,
                                                    allowance: utils_2.DEFAULT_ACCESS_KEY_ALLOWANCE,
                                                    methodNames,
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        ]);
                        await _state.keystore.setKey(options.network.networkId, accountId, newAccessKeyPair);
                    }
                }
                else if (alwaysOnboardDuringSignIn) {
                    // Check onboarding status and onboard the relayer if needed.
                    await signAndSendTransactions([]);
                }
                const accountLogIn = {
                    accountId,
                    publicKey,
                };
                emitter.emit("signedIn", {
                    contractId: contractId,
                    methodNames: methodNames ?? [],
                    accounts: [accountLogIn],
                });
                if (!_state.subscriptions.length) {
                    setupEvents();
                }
                _state.isConnecting = false;
                try {
                    // Hide modal which stays open after adding a new network.
                    if (web3Modal) {
                        web3Modal.close();
                    }
                }
                catch (error) {
                    logger.error(error);
                }
                return [accountLogIn];
            }
            catch (error) {
                _state.isConnecting = false;
                try {
                    // Prevent overshadowing the original exception
                    // Disconnect to let user start again from the beginning: wallet selection.
                    wagmiCore.disconnect(wagmiConfig);
                }
                catch (err) {
                    logger.error(err);
                }
                throw error;
            }
        },
        signOut,
        getAccounts,
        async verifyOwner({ message }) {
            logger.log("EthereumWallets:verifyOwner", { message });
            throw new Error("Not implemented: ed25519 N/A, '\x19Ethereum Signed Message:\n' prefix is not compatible, use personal_sign or eth_signTypedData_v4 instead.");
        },
        async signMessage({ message, nonce, recipient }) {
            logger.log("EthereumWallets:signMessage", { message, nonce, recipient });
            throw new Error("Not implemented: ed25519 N/A, '\x19Ethereum Signed Message:\n' prefix is not compatible, use personal_sign or eth_signTypedData_v4 instead.");
        },
        async signAndSendTransaction(transaction) {
            logger.log("EthereumWallets:signAndSendTransaction", transaction);
            const outcomes = await signAndSendTransactions([transaction]);
            // Return the last transaction outcome.
            return outcomes[outcomes.length - 1];
        },
        async signAndSendTransactions({ transactions }) {
            logger.log("EthereumWallets:signAndSendTransactions", { transactions });
            return await signAndSendTransactions(transactions);
        },
    };
};
function setupEthereumWallets(params) {
    return async () => {
        if (!wagmiCore) {
            if (params.wagmiCore) {
                wagmiCore = params.wagmiCore;
            }
            else {
                await importWagmiCore();
            }
        }
        return {
            id: "ethereum-wallets",
            type: "injected",
            metadata: {
                name: "Ethereum Wallet",
                description: "Ethereum wallets (EOA) on NEAR Protocol.",
                iconUrl: params.iconUrl ?? icon_1.default,
                deprecated: params.deprecated ?? false,
                available: true,
                downloadUrl: "",
            },
            init: (config) => {
                return EthereumWallets({
                    ...config,
                    params,
                });
            },
        };
    };
}
