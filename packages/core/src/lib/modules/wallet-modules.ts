import { Options } from "../options.types";
import { AccountState, ModuleState, Store } from "../store.types";
import { logger, EventEmitter, storage } from "../services";
import { WalletSelectorEvents } from "../wallet-selector.types";
import { WalletModuleFactory, Wallet } from "../wallet";
import { setupWalletInstance } from "./wallet-instance";
import { PENDING_SELECTED_WALLET_ID } from "../constants";

interface WalletModulesParams {
  factories: Array<WalletModuleFactory>;
  options: Options;
  store: Store;
  emitter: EventEmitter<WalletSelectorEvents>;
}

export const setupWalletModules = async ({
  factories,
  options,
  store,
  emitter,
}: WalletModulesParams) => {
  const modules: Array<ModuleState> = [];
  const instances: Record<string, Wallet> = {};

  const getWallet = async <Variation extends Wallet = Wallet>(
    id: string | null
  ) => {
    const module = modules.find((x) => x.id === id);

    if (!module) {
      return null;
    }

    return (await module.wallet()) as Variation;
  };

  const validateWallet = async (id: string | null) => {
    let accounts: Array<AccountState> = [];
    const wallet = await getWallet(id);

    if (wallet) {
      // Ensure our persistent state aligns with the selected wallet.
      // For example a wallet is selected, but it returns no accounts (not connected).
      accounts = await wallet.getAccounts().catch((err) => {
        logger.log(`Failed to validate ${wallet.id} during setup`);
        logger.error(err);

        return [];
      });
    }

    return accounts;
  };

  const getSelectedWallet = async () => {
    const pendingSelectedWalletId = storage.getItem<string>(
      PENDING_SELECTED_WALLET_ID
    );

    if (pendingSelectedWalletId) {
      const accounts = await validateWallet(pendingSelectedWalletId);

      storage.removeItem(PENDING_SELECTED_WALLET_ID);

      if (accounts.length) {
        const { selectedWalletId } = store.getState();
        const selectedWallet = await getWallet(selectedWalletId);

        if (selectedWallet) {
          await selectedWallet.disconnect().catch((err) => {
            logger.log("Failed to disconnect existing wallet");
            logger.error(err);
          });
        }

        return {
          accounts,
          selectedWalletId: pendingSelectedWalletId,
        };
      }
    }

    const { selectedWalletId } = store.getState();
    const accounts = await validateWallet(selectedWalletId);

    return {
      accounts,
      selectedWalletId: accounts.length ? selectedWalletId : null,
    };
  };

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

        instance = await setupWalletInstance({
          modules,
          module,
          store,
          options,
          emitter,
        });

        instances[module.id] = instance;

        return instance;
      },
    });
  }

  const { accounts, selectedWalletId } = await getSelectedWallet();

  store.dispatch({
    type: "SETUP_WALLET_MODULES",
    payload: {
      modules,
      accounts,
      selectedWalletId,
    },
  });

  return {
    getWallet,
  };
};
