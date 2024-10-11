"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMyNearWallet = setupMyNearWallet;
const wallet_account_1 = require("@near-js/wallet-account");
const keystores_browser_1 = require("@near-js/keystores-browser");
const transactions_1 = require("@near-js/transactions");
const utils_1 = require("@near-js/utils");
const crypto_1 = require("@near-js/crypto");
const near_api_js_1 = require("near-api-js");
const wallet_utils_1 = require("@near-wallet-selector/wallet-utils");
const icon_1 = __importDefault(require("./icon"));
const resolveWalletUrl = (network, walletUrl) => {
    if (walletUrl) {
        return walletUrl;
    }
    switch (network.networkId) {
        case "mainnet":
            return "https://app.mynearwallet.com";
        case "testnet":
            return "https://testnet.mynearwallet.com";
        default:
            throw new Error("Invalid wallet url");
    }
};
const setupWalletState = async (params, network) => {
    const keyStore = new keystores_browser_1.BrowserLocalStorageKeyStore();
    const near = await (0, near_api_js_1.connect)({
        keyStore,
        // deps: { keyStore },
        walletUrl: params.walletUrl,
        ...network,
        headers: {},
    });
    const wallet = new wallet_account_1.WalletConnection(near, "near_app");
    return {
        wallet,
        keyStore,
    };
};
const MyNearWallet = async ({ metadata, options, store, params, logger, id }) => {
    const _state = await setupWalletState(params, options.network);
    const getAccounts = async () => {
        const accountId = _state.wallet.getAccountId();
        const account = _state.wallet.account();
        if (!accountId || !account) {
            return [];
        }
        const publicKey = await account.connection.signer.getPublicKey(account.accountId, options.network.networkId);
        return [
            {
                accountId,
                publicKey: publicKey ? publicKey.toString() : "",
            },
        ];
    };
    const transformTransactions = async (transactions) => {
        const account = _state.wallet.account();
        const { networkId, signer, provider } = account.connection;
        const localKey = await signer.getPublicKey(account.accountId, networkId);
        return Promise.all(transactions.map(async (transaction, index) => {
            const actions = transaction.actions.map((action) => (0, wallet_utils_1.createAction)(action));
            const accessKey = await account.accessKeyForTransaction(transaction.receiverId, actions, localKey);
            if (!accessKey) {
                throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
            }
            const block = await provider.block({ finality: "final" });
            const nonce = accessKey.access_key.nonce + BigInt(index + 1);
            return (0, transactions_1.createTransaction)(account.accountId, crypto_1.PublicKey.from(accessKey.public_key), transaction.receiverId, nonce, actions, (0, utils_1.baseDecode)(block.header.hash));
        }));
    };
    return {
        async signIn({ contractId, methodNames, successUrl, failureUrl }) {
            const existingAccounts = await getAccounts();
            if (existingAccounts.length) {
                return existingAccounts;
            }
            await _state.wallet.requestSignIn({
                contractId,
                methodNames,
                successUrl,
                failureUrl,
                keyType: "ed25519",
            });
            return getAccounts();
        },
        async signOut() {
            if (_state.wallet.isSignedIn()) {
                _state.wallet.signOut();
            }
        },
        async getAccounts() {
            return getAccounts();
        },
        async verifyOwner() {
            throw new Error(`Method not supported by ${metadata.name}`);
        },
        async signMessage({ message, nonce, recipient, callbackUrl, state }) {
            logger.log("sign message", { message });
            if (id !== "my-near-wallet") {
                throw Error(`The signMessage method is not supported by ${metadata.name}`);
            }
            const locationUrl = typeof window !== "undefined" ? window.location.href : "";
            const url = callbackUrl || locationUrl;
            if (!url) {
                throw new Error(`The callbackUrl is missing for ${metadata.name}`);
            }
            const href = new URL(params.walletUrl);
            href.pathname = "sign-message";
            href.searchParams.append("message", message);
            href.searchParams.append("nonce", nonce.toString("base64"));
            href.searchParams.append("recipient", recipient);
            href.searchParams.append("callbackUrl", url);
            if (state) {
                href.searchParams.append("state", state);
            }
            window.location.replace(href.toString());
            return;
        },
        async signAndSendTransaction({ signerId, receiverId, actions, callbackUrl, }) {
            // console.log('alohaws mnw signAndSendTransaction', signerId, receiverId, actions, callbackUrl)
            logger.log("signAndSendTransaction", {
                signerId,
                receiverId,
                actions,
                callbackUrl,
            });
            const { contract } = store.getState();
            if (!_state.wallet.isSignedIn() || !contract) {
                throw new Error("Wallet not signed in");
            }
            const account = _state.wallet.account();
            return account["signAndSendTransaction"]({
                receiverId: receiverId || contract.contractId,
                actions: actions.map((action) => (0, wallet_utils_1.createAction)(action)),
                walletCallbackUrl: callbackUrl,
            });
        },
        async signAndSendTransactions({ transactions, callbackUrl }) {
            logger.log("signAndSendTransactions", { transactions, callbackUrl });
            if (!_state.wallet.isSignedIn()) {
                throw new Error("Wallet not signed in");
            }
            return _state.wallet.requestSignTransactions({
                transactions: await transformTransactions(transactions),
                callbackUrl,
            });
        },
        buildImportAccountsUrl() {
            return `${params.walletUrl}/batch-import`;
        },
    };
};
function setupMyNearWallet({ walletUrl, iconUrl = icon_1.default, deprecated = false, successUrl = "", failureUrl = "", } = {}) {
    return async (moduleOptions) => {
        return {
            id: "my-near-wallet",
            type: "browser",
            metadata: {
                name: "MyNearWallet",
                description: "NEAR wallet to store, buy, send and stake assets for DeFi.",
                iconUrl,
                deprecated,
                available: true,
                successUrl,
                failureUrl,
                walletUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl),
            },
            init: (options) => {
                return MyNearWallet({
                    ...options,
                    params: {
                        walletUrl: resolveWalletUrl(options.options.network, walletUrl),
                    },
                });
            },
        };
    };
}
