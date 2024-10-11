import { getNetworkPreset, resolveOptions } from "./options";
import { createStore } from "./store";
import { EventEmitter, Logger, WalletModules, Provider } from "./services";
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
export const setupWalletSelector = async (params) => {
    const { options, storage } = resolveOptions(params);
    Logger.debug = options.debug;
    const emitter = new EventEmitter();
    const store = await createStore(storage);
    const network = await getNetworkPreset(options.network.networkId, params.fallbackRpcUrls);
    const rpcProviderUrls = params.fallbackRpcUrls && params.fallbackRpcUrls.length > 0
        ? params.fallbackRpcUrls
        : [network.nodeUrl];
    const walletModules = new WalletModules({
        factories: params.modules,
        storage,
        options,
        store,
        emitter,
        provider: new Provider(rpcProviderUrls),
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
