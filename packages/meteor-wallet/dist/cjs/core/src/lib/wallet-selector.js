"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWalletSelector = void 0;
const options_1 = require("./options");
const store_1 = require("./store");
const services_1 = require("./services");
let walletSelectorInstance = null;
const createSelector = (options, store, walletModules, emitter) => {
    return {
        options,
        store: store.toReadOnly(),
        wallet: async (id) => {
            const { selectedWalletId } = store.getState();
            const wallet = await walletModules.getWallet(id || selectedWalletId);
            if (!wallet) {
                if (id) {
                    throw new Error("Invalid wallet id");
                }
                throw new Error("No wallet selected");
            }
            return wallet;
        },
        setActiveAccount: (accountId) => {
            const { accounts } = store.getState();
            if (!accounts.some((account) => account.accountId === accountId)) {
                throw new Error("Invalid account id");
            }
            store.dispatch({
                type: "SET_ACTIVE_ACCOUNT",
                payload: { accountId },
            });
        },
        setRememberRecentWallets: () => {
            const { rememberRecentWallets } = store.getState();
            store.dispatch({
                type: "SET_REMEMBER_RECENT_WALLETS",
                payload: { rememberRecentWallets },
            });
        },
        isSignedIn() {
            const { accounts } = store.getState();
            return Boolean(accounts.length);
        },
        on: (eventName, callback) => {
            return emitter.on(eventName, callback);
        },
        off: (eventName, callback) => {
            emitter.off(eventName, callback);
        },
    };
};
/**
 * Initiates a wallet selector instance
 * @param {WalletSelectorParams} params Selector parameters (network, modules...)
 * @returns {Promise<WalletSelector>} Returns a WalletSelector object
 */
const setupWalletSelector = async (params) => {
    const { options, storage } = (0, options_1.resolveOptions)(params);
    services_1.Logger.debug = options.debug;
    const emitter = new services_1.EventEmitter();
    const store = await (0, store_1.createStore)(storage);
    const network = await (0, options_1.getNetworkPreset)(options.network.networkId, params.fallbackRpcUrls);
    const rpcProviderUrls = params.fallbackRpcUrls && params.fallbackRpcUrls.length > 0
        ? params.fallbackRpcUrls
        : [network.nodeUrl];
    const walletModules = new services_1.WalletModules({
        factories: params.modules,
        storage,
        options,
        store,
        emitter,
        provider: new services_1.Provider(rpcProviderUrls),
    });
    await walletModules.setup();
    if (params.allowMultipleSelectors) {
        return createSelector(options, store, walletModules, emitter);
    }
    if (!walletSelectorInstance) {
        walletSelectorInstance = createSelector(options, store, walletModules, emitter);
    }
    return walletSelectorInstance;
};
exports.setupWalletSelector = setupWalletSelector;
