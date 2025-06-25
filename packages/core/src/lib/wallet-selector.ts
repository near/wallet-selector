import { getNetworkPreset, resolveOptions } from "./options";
import { createStore } from "./store";
import type {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import { EventEmitter, Logger, WalletModules, Provider } from "./services";
import type { Wallet } from "./wallet";
import type { Store, WalletSelectorState } from "./store.types";
import type { NetworkId, Options } from "./options.types";

let walletSelectorInstance: WalletSelector | null = null;

const createSelector = (
  options: Options,
  store: Store,
  walletModules: WalletModules,
  emitter: EventEmitter<WalletSelectorEvents>
): WalletSelector => {
  return {
    options,
    store: store.toReadOnly(),
    wallet: async <Variation extends Wallet = Wallet>(id?: string) => {
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet<Variation>(
        id || selectedWalletId
      );

      if (!wallet) {
        if (id) {
          throw new Error("Invalid wallet id");
        }

        throw new Error("No wallet selected");
      }
      return wallet;
    },
    setActiveAccount: (accountId: string) => {
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
    subscribeOnAccountChange(onAccountChangeFn) {
      this.store.observable.subscribe(async (state: WalletSelectorState) => {
        const signedAccount = state?.accounts.find(
          (account) => account.active
        )?.accountId;

        onAccountChangeFn(signedAccount || "");
      });
    },
  };
};

/**
 * Initiates a wallet selector instance
 * @param {WalletSelectorParams} params Selector parameters (network, modules...)
 * @returns {Promise<WalletSelector>} Returns a WalletSelector object
 */
export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const { options, storage } = resolveOptions(params);
  Logger.debug = options.debug;

  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = await createStore(storage);
  const network = await getNetworkPreset(
    options.network.networkId as NetworkId,
    params.fallbackRpcUrls
  );

  const rpcProviderUrls =
    params.fallbackRpcUrls && params.fallbackRpcUrls.length > 0
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
  await walletModules.setupV2(params.modulesV2 || []);
  await walletModules.resolveState();

  if (params.allowMultipleSelectors) {
    return createSelector(options, store, walletModules, emitter);
  }

  if (!walletSelectorInstance) {
    walletSelectorInstance = createSelector(
      options,
      store,
      walletModules,
      emitter
    );
  }

  return walletSelectorInstance;
};
