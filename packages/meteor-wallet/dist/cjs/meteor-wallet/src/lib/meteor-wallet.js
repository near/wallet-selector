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
exports.setupMeteorWallet = setupMeteorWallet;
const nearAPI = __importStar(require("near-api-js"));
const sdk_1 = require("@meteorwallet/sdk");
const icon_1 = __importDefault(require("./icon"));
const setupWalletState = async (params, network) => {
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage, "_meteor_wallet");
    const near = await nearAPI.connect({
        keyStore,
        ...network,
        headers: {},
    });
    const wallet = new sdk_1.MeteorWallet({ near, appKeyPrefix: "near_app" });
    return {
        wallet,
        keyStore,
    };
};
const createMeteorWalletInjected = async ({ options, logger, store, params }) => {
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
    return {
        async signIn({ contractId, methodNames = [] }) {
            logger.log("MeteorWallet:signIn", {
                contractId,
                methodNames,
            });
            if (methodNames.length) {
                await _state.wallet.requestSignIn({
                    methods: methodNames,
                    type: sdk_1.EMeteorWalletSignInType.SELECTED_METHODS,
                    contract_id: contractId,
                });
            }
            else {
                await _state.wallet.requestSignIn({
                    type: sdk_1.EMeteorWalletSignInType.ALL_METHODS,
                    contract_id: contractId,
                });
            }
            const accounts = await getAccounts();
            logger.log("MeteorWallet:signIn", {
                contractId,
                methodNames,
                account: accounts[0],
            });
            return accounts;
        },
        async signOut() {
            if (_state.wallet.isSignedIn()) {
                await _state.wallet.signOut();
            }
        },
        async isSignedIn() {
            if (!_state.wallet) {
                return false;
            }
            return _state.wallet.isSignedIn();
        },
        async getAccounts() {
            return getAccounts();
        },
        async verifyOwner({ message }) {
            logger.log("MeteorWallet:verifyOwner", { message });
            const response = await _state.wallet.verifyOwner({
                message,
            });
            if (response.success) {
                return response.payload;
            }
            else {
                throw new Error(`Couldn't verify owner: ${response.message}`);
            }
        },
        async signMessage({ message, nonce, recipient, state }) {
            logger.log("MeteorWallet:signMessage", {
                message,
                nonce,
                recipient,
                state,
            });
            const accountId = _state.wallet.getAccountId();
            const response = await _state.wallet.signMessage({
                message,
                nonce,
                recipient,
                accountId,
                state,
            });
            if (response.success) {
                return response.payload;
            }
            else {
                throw new Error(`Couldn't sign message owner: ${response.message}`);
            }
        },
        async signAndSendTransaction({ signerId, receiverId, actions }) {
            logger.log("MeteorWallet:signAndSendTransaction", {
                signerId,
                receiverId,
                actions,
            });
            const { contract } = store.getState();
            if (!_state.wallet.isSignedIn()) {
                throw new Error("Wallet not signed in");
            }
            if (!receiverId && !contract) {
                throw new Error("No receiver found to send the transaction to");
            }
            const account = _state.wallet.account();
            return account["signAndSendTransaction_direct"]({
                receiverId: receiverId ?? contract.contractId,
                actions,
            });
        },
        async signAndSendTransactions({ transactions }) {
            logger.log("MeteorWallet:signAndSendTransactions", {
                transactions,
            });
            if (!_state.wallet.isSignedIn()) {
                throw new Error("Wallet not signed in");
            }
            return _state.wallet.requestSignTransactions({
                transactions,
            });
        },
        buildImportAccountsUrl() {
            return `https://wallet.meteorwallet.app/batch-import?network=${_state.wallet._networkId}`;
        },
    };
};
function setupMeteorWallet({ iconUrl = icon_1.default, deprecated = false, } = {}) {
    return async () => {
        return {
            id: "meteor-wallet",
            type: "injected",
            metadata: {
                available: true,
                name: "Meteor Wallet",
                description: "Securely store and stake your NEAR tokens and compatible assets with Meteor.",
                iconUrl,
                deprecated,
                downloadUrl: "https://wallet.meteorwallet.app",
                useUrlAccountImport: true,
            },
            init: (options) => {
                return createMeteorWalletInjected({
                    ...options,
                    params: {
                        iconUrl,
                    },
                });
            },
        };
    };
}
