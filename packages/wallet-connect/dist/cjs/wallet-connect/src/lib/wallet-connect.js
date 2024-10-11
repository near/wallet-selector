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
exports.setupWalletConnect = setupWalletConnect;
const nearAPI = __importStar(require("near-api-js"));
const core_1 = require("@near-wallet-selector/core");
const wallet_utils_1 = require("@near-wallet-selector/wallet-utils");
const wallet_connect_client_1 = __importDefault(require("./wallet-connect-client"));
const icon_js_1 = __importDefault(require("./icon.js"));
const WC_METHODS = [
    "near_signIn",
    "near_signOut",
    "near_getAccounts",
    "near_signTransaction",
    "near_signTransactions",
    "near_verifyOwner",
    "near_signMessage",
];
const WC_EVENTS = ["chainChanged", "accountsChanged"];
const setupWalletConnectState = async (id, params, emitter) => {
    const client = new wallet_connect_client_1.default(emitter);
    let session = null;
    const keystore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage, `near-wallet-selector:${id}:keystore:`);
    await client.init({
        projectId: params.projectId,
        metadata: params.metadata,
        relayUrl: params.relayUrl,
    });
    if (client.session.length) {
        const lastKeyIndex = client.session.keys.length - 1;
        session = client.session.get(client.session.keys[lastKeyIndex]);
    }
    return {
        client,
        session,
        keystore,
        subscriptions: [],
    };
};
const connect = async ({ state, chainId, qrCodeModal, projectId, methods, events, }) => {
    return await state.client.connect({
        requiredNamespaces: {
            near: {
                chains: [chainId],
                methods: methods || WC_METHODS,
                events: events || WC_EVENTS,
            },
        },
    }, qrCodeModal, projectId, chainId);
};
const disconnect = async ({ state }) => {
    await state.client.disconnect({
        topic: state.session.topic,
        reason: {
            code: 5900,
            message: "User disconnected",
        },
    });
};
const WalletConnect = async ({ id, options, store, params, provider, emitter, logger }) => {
    const _state = await setupWalletConnectState(id, params, emitter);
    const getChainId = () => {
        if (params.chainId) {
            return params.chainId;
        }
        const { networkId } = options.network;
        if (["mainnet", "testnet"].includes(networkId)) {
            return `near:${networkId}`;
        }
        throw new Error("Invalid chain id");
    };
    const getAccounts = async () => {
        const accounts = _state.session?.namespaces["near"].accounts || [];
        const newAccounts = [];
        for (let i = 0; i < accounts.length; i++) {
            const signer = new nearAPI.InMemorySigner(_state.keystore);
            const publicKey = await signer.getPublicKey(accounts[i].split(":")[2], options.network.networkId);
            newAccounts.push({
                accountId: accounts[i].split(":")[2],
                publicKey: publicKey ? publicKey.toString() : "",
            });
        }
        return newAccounts;
    };
    const cleanup = async () => {
        _state.subscriptions.forEach((subscription) => subscription.remove());
        _state.subscriptions = [];
        _state.session = null;
    };
    const validateAccessKey = (transaction, accessKey) => {
        if (accessKey.permission === "FullAccess") {
            return accessKey;
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { receiver_id, method_names } = accessKey.permission.FunctionCall;
        if (transaction.receiverId !== receiver_id) {
            return null;
        }
        return transaction.actions.every((action) => {
            if (action.type !== "FunctionCall") {
                return false;
            }
            const { methodName, deposit } = action.params;
            if (method_names.length && method_names.includes(methodName)) {
                return false;
            }
            return parseFloat(deposit) <= 0;
        });
    };
    const signTransactions = async (transactions) => {
        const signer = new nearAPI.InMemorySigner(_state.keystore);
        const signedTransactions = [];
        const block = await provider.block({ finality: "final" });
        for (let i = 0; i < transactions.length; i += 1) {
            const transaction = transactions[i];
            const publicKey = await signer.getPublicKey(transaction.signerId, options.network.networkId);
            if (!publicKey) {
                throw new Error("No public key found");
            }
            const accessKey = await provider.query({
                request_type: "view_access_key",
                finality: "final",
                account_id: transaction.signerId,
                public_key: publicKey.toString(),
            });
            if (!validateAccessKey(transaction, accessKey)) {
                throw new Error("Invalid access key");
            }
            const tx = nearAPI.transactions.createTransaction(transactions[i].signerId, nearAPI.utils.PublicKey.from(publicKey.toString()), transactions[i].receiverId, accessKey.nonce + i + 1, transaction.actions.map((action) => (0, wallet_utils_1.createAction)(action)), nearAPI.utils.serialize.base_decode(block.header.hash));
            const [, signedTx] = await nearAPI.transactions.signTransaction(tx, signer, transactions[i].signerId, options.network.networkId);
            signedTransactions.push(signedTx);
        }
        return signedTransactions;
    };
    const requestAccounts = async () => {
        return _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_getAccounts",
                params: {},
            },
        });
    };
    const requestVerifyOwner = async (accountId, message) => {
        return _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_verifyOwner",
                params: { accountId, message },
            },
        });
    };
    const requestSignMessage = async (messageParams) => {
        const { message, nonce, recipient, callbackUrl, accountId } = messageParams;
        return _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_signMessage",
                params: {
                    message,
                    nonce,
                    recipient,
                    ...(callbackUrl && { callbackUrl }),
                    ...(accountId && { accountId }),
                },
            },
        });
    };
    const requestSignTransaction = async (transaction) => {
        const accounts = await requestAccounts();
        const account = accounts.find((x) => x.accountId === transaction.signerId);
        if (!account) {
            throw new Error("Invalid signer id");
        }
        const [block, accessKey] = await Promise.all([
            provider.block({ finality: "final" }),
            provider.query({
                request_type: "view_access_key",
                finality: "final",
                account_id: transaction.signerId,
                public_key: account.publicKey,
            }),
        ]);
        const tx = nearAPI.transactions.createTransaction(transaction.signerId, nearAPI.utils.PublicKey.from(account.publicKey), transaction.receiverId, accessKey.nonce + 1, transaction.actions.map((action) => (0, wallet_utils_1.createAction)(action)), nearAPI.utils.serialize.base_decode(block.header.hash));
        const result = await _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_signTransaction",
                params: { transaction: tx.encode() },
            },
        });
        return nearAPI.transactions.SignedTransaction.decode(Buffer.from(result));
    };
    const requestSignTransactions = async (transactions) => {
        if (!transactions.length) {
            return [];
        }
        const txs = [];
        const [block, accounts] = await Promise.all([
            provider.block({ finality: "final" }),
            requestAccounts(),
        ]);
        for (let i = 0; i < transactions.length; i += 1) {
            const transaction = transactions[i];
            const account = accounts.find((x) => x.accountId === transaction.signerId);
            if (!account) {
                throw new Error("Invalid signer id");
            }
            const accessKey = await provider.query({
                request_type: "view_access_key",
                finality: "final",
                account_id: transaction.signerId,
                public_key: account.publicKey,
            });
            txs.push(nearAPI.transactions.createTransaction(transaction.signerId, nearAPI.utils.PublicKey.from(account.publicKey), transaction.receiverId, accessKey.nonce + i + 1, transaction.actions.map((action) => (0, wallet_utils_1.createAction)(action)), nearAPI.utils.serialize.base_decode(block.header.hash)));
        }
        const results = await _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_signTransactions",
                params: { transactions: txs.map((x) => x.encode()) },
            },
        });
        return results.map((result) => {
            return nearAPI.transactions.SignedTransaction.decode(Buffer.from(result));
        });
    };
    const createLimitedAccessKeyPairs = async () => {
        const accounts = await getAccounts();
        return accounts.map(({ accountId }) => ({
            accountId,
            keyPair: nearAPI.utils.KeyPair.fromRandom("ed25519"),
        }));
    };
    const requestSignIn = async (permission) => {
        const keyPairs = await createLimitedAccessKeyPairs();
        const limitedAccessAccounts = keyPairs.map(({ accountId, keyPair }) => ({
            accountId,
            publicKey: keyPair.getPublicKey().toString(),
        }));
        await _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_signIn",
                params: {
                    permission: permission,
                    accounts: limitedAccessAccounts,
                },
            },
        });
        for (let i = 0; i < keyPairs.length; i += 1) {
            const { accountId, keyPair } = keyPairs[i];
            await _state.keystore.setKey(options.network.networkId, accountId, keyPair);
        }
    };
    const requestSignOut = async () => {
        const accounts = await getAccounts();
        const limitedAccessAccounts = [];
        for (let i = 0; i < accounts.length; i += 1) {
            const account = accounts[i];
            const keyPair = await _state.keystore.getKey(options.network.networkId, account.accountId);
            if (!keyPair) {
                continue;
            }
            limitedAccessAccounts.push({
                accountId: account.accountId,
                publicKey: keyPair.getPublicKey().toString(),
            });
        }
        if (!limitedAccessAccounts.length) {
            return;
        }
        await _state.client.request({
            topic: _state.session.topic,
            chainId: getChainId(),
            request: {
                method: "near_signOut",
                params: {
                    accounts: limitedAccessAccounts,
                },
            },
        });
    };
    const signOut = async () => {
        if (_state.session) {
            await requestSignOut();
            await disconnect({ state: _state });
        }
        await cleanup();
    };
    const setupEvents = async () => {
        _state.subscriptions.push(_state.client.on("session_update", async (event) => {
            logger.log("Session Update", event);
            if (event.topic === _state.session?.topic) {
                _state.session = {
                    ..._state.client.session.get(event.topic),
                    namespaces: event.params.namespaces,
                };
                emitter.emit("accountsChanged", { accounts: await getAccounts() });
            }
        }));
        _state.subscriptions.push(_state.client.on("session_delete", async (event) => {
            logger.log("Session Deleted", event);
            if (event.topic === _state.session?.topic) {
                await cleanup();
                emitter.emit("signedOut", null);
            }
        }));
    };
    if (_state.session) {
        await setupEvents();
    }
    return {
        async signIn({ contractId, methodNames = [], qrCodeModal = true }) {
            try {
                const { contract } = store.getState();
                if (_state.session && !contract) {
                    await disconnect({ state: _state });
                    await cleanup();
                }
                const chainId = getChainId();
                _state.session = await connect({
                    state: _state,
                    chainId,
                    qrCodeModal,
                    projectId: params.projectId,
                    methods: params.methods,
                    events: params.events,
                });
                await requestSignIn({ receiverId: contractId, methodNames });
                await setupEvents();
                return await getAccounts();
            }
            catch (err) {
                await signOut();
                throw err;
            }
        },
        signOut,
        async getAccounts() {
            return getAccounts();
        },
        async verifyOwner({ message }) {
            logger.log("WalletConnect:verifyOwner", { message });
            const { contract } = store.getState();
            if (!_state.session || !contract) {
                throw new Error("Wallet not signed in");
            }
            const account = (0, core_1.getActiveAccount)(store.getState());
            if (!account) {
                throw new Error("No active account");
            }
            return requestVerifyOwner(account.accountId, message);
        },
        async signMessage({ message, nonce, recipient, callbackUrl }) {
            logger.log("WalletConnect:signMessage", { message, nonce, recipient });
            try {
                const chainId = getChainId();
                if (!_state.session) {
                    _state.session = _state.session = await connect({
                        state: _state,
                        chainId,
                        qrCodeModal: true,
                        projectId: params.projectId,
                    });
                }
                const account = (0, core_1.getActiveAccount)(store.getState());
                return await requestSignMessage({
                    message,
                    nonce,
                    recipient,
                    callbackUrl,
                    accountId: account?.accountId,
                });
            }
            catch (err) {
                await disconnect({ state: _state });
                await cleanup();
                throw err;
            }
        },
        async signAndSendTransaction({ signerId, receiverId, actions }) {
            logger.log("signAndSendTransaction", { signerId, receiverId, actions });
            const { contract } = store.getState();
            if (!_state.session || !contract) {
                throw new Error("Wallet not signed in");
            }
            const account = (0, core_1.getActiveAccount)(store.getState());
            if (!account) {
                throw new Error("No active account");
            }
            const resolvedTransaction = {
                signerId: signerId || account.accountId,
                receiverId: receiverId || contract.contractId,
                actions,
            };
            try {
                const [signedTx] = await signTransactions([resolvedTransaction]);
                return provider.sendTransaction(signedTx);
            }
            catch (err) {
                logger.log("Falling back to WalletConnect to sign transaction", err);
                const signedTx = await requestSignTransaction(resolvedTransaction);
                return provider.sendTransaction(signedTx);
            }
        },
        async signAndSendTransactions({ transactions }) {
            logger.log("signAndSendTransactions", { transactions });
            const { contract } = store.getState();
            if (!_state.session || !contract) {
                throw new Error("Wallet not signed in");
            }
            const account = (0, core_1.getActiveAccount)(store.getState());
            if (!account) {
                throw new Error("No active account");
            }
            const resolvedTransactions = transactions.map((x) => ({
                signerId: x.signerId || account.accountId,
                receiverId: x.receiverId,
                actions: x.actions,
            }));
            try {
                const signedTxs = await signTransactions(resolvedTransactions);
                const results = [];
                for (let i = 0; i < signedTxs.length; i += 1) {
                    results.push(await provider.sendTransaction(signedTxs[i]));
                }
                return results;
            }
            catch (err) {
                const signedTxs = await requestSignTransactions(resolvedTransactions);
                const results = [];
                for (let i = 0; i < signedTxs.length; i += 1) {
                    results.push(await provider.sendTransaction(signedTxs[i]));
                }
                return results;
            }
        },
    };
};
function setupWalletConnect({ projectId, metadata, chainId, relayUrl = "wss://relay.walletconnect.com", iconUrl = icon_js_1.default, deprecated = false, methods, events, }) {
    return async () => {
        return {
            id: "wallet-connect",
            type: "bridge",
            metadata: {
                name: "WalletConnect",
                description: "Bridge wallet for NEAR.",
                iconUrl,
                deprecated,
                available: true,
            },
            init: (options) => {
                return WalletConnect({
                    ...options,
                    params: {
                        projectId,
                        metadata,
                        relayUrl,
                        chainId,
                        methods,
                        events,
                    },
                });
            },
        };
    };
}
