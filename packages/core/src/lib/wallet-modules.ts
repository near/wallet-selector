import { Options } from "./options.types";
import { AccountState, Store } from "./store.types";
import { logger, storage, Provider, EventEmitter } from "./services";
import { WalletSelectorEvents } from "./wallet-selector.types";
import {
  Wallet,
  WalletModule,
  WalletModuleFactory,
} from "./wallet/wallet.types";
import { WalletEvents } from "./wallet";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";

interface WalletModulesParams {
  factories: Array<WalletModuleFactory>;
  options: Options;
  store: Store;
  emitter: EventEmitter<WalletSelectorEvents>;
}

const getSelectedWalletId = () => {
  return storage.getItem<string>(LOCAL_STORAGE_SELECTED_WALLET_ID);
};

const setSelectedWalletId = (walletId: string) => {
  storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, walletId);
};

const removeSelectedWalletId = () => {
  return storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
};

export const setupWalletModules = async ({
  factories,
  options,
  store,
  emitter,
}: WalletModulesParams) => {
  const modules: Array<WalletModule> = [];
  const instances: Record<string, Wallet> = {};

  for (let i = 0; i < factories.length; i += 1) {
    const module = await factories[i]();

    // Filter out wallets that aren't available.
    if (!module) {
      continue;
    }

    modules.push({
      id: module.id,
      type: module.type,
      metadata: module.metadata,
      wallet: async () => {
        let instance = instances[module.id];

        if (instance) {
          return instance;
        }

        instance = {
          id: module.id,
          type: module.type,
          metadata: module.metadata,
          ...(await module.init({
            id: module.id,
            type: module.type,
            metadata: module.metadata,
            options,
            provider: new Provider(options.network.nodeUrl),
            emitter: new EventEmitter<WalletEvents>(),
            logger,
            storage,
          })),
        } as Wallet;

        instances[module.id] = instance;

        return instance;
      },
    });
  }

  const getWallet = async <Variation extends Wallet = Wallet>(
    id: string | null
  ) => {
    const module = modules.find((x) => x.id === id);

    if (!module) {
      return null;
    }

    const wallet = await module.wallet();

    return wallet as Variation;
  };

  let selectedWalletId = getSelectedWalletId();
  let accounts: Array<AccountState> = [];
  const selectedWallet = await getWallet(selectedWalletId);

  if (selectedWallet) {
    // Ensure our persistent state aligns with the selected wallet.
    // For example a wallet is selected, but it returns no accounts (not connected).
    accounts = await selectedWallet.getAccounts().catch((err) => {
      logger.log(
        `Failed to get accounts for ${selectedWallet.id} during setup`
      );
      logger.error(err);

      return [];
    });
  }

  if (!accounts.length) {
    removeSelectedWalletId();
    selectedWalletId = null;
  }

  store.dispatch({
    type: "SETUP_WALLET_MODULES",
    payload: {
      modules,
      accounts,
      selectedWalletId,
    },
  });

  return {
    getWallet: async <Variation extends Wallet = Wallet>(id?: string) => {
      const walletId = id || store.getState().selectedWalletId;
      const wallet = await getWallet<Variation>(walletId);

      if (!wallet) {
        if (walletId) {
          throw new Error("Invalid wallet id");
        }

        throw new Error("No wallet selected");
      }

      return wallet;
    },
  };
};
