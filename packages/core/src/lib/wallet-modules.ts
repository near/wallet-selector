import { Options } from "./options.types";
import { AccountState, ModuleState, Store } from "./store.types";
import { logger, storage, Provider, EventEmitter } from "./services";
import { WalletSelectorEvents } from "./wallet-selector.types";
import { WalletModuleFactory, Wallet, WalletEvents } from "./wallet";
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
  const modules: Array<ModuleState> = [];
  const instances: Record<string, Wallet> = {};

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
        const instance = instances[module.id];

        if (instance) {
          return instance;
        }

        const walletEmitter = new EventEmitter<WalletEvents>();

        const handleDisconnected = (walletId: string) => {
          removeSelectedWalletId();

          store.dispatch({
            type: "WALLET_DISCONNECTED",
            payload: { walletId },
          });
        };

        const handleConnected = async (
          walletId: string,
          { accounts = [] }: WalletEvents["connected"]
        ) => {
          const { selectedWalletId } = store.getState();

          // We use the pending flag because we can't guarantee the user will
          // actually sign in. Best we can do is set in storage and validate on init.
          const pending = module.type === "browser";

          if (selectedWalletId && selectedWalletId !== walletId) {
            const wallet = (await getWallet(selectedWalletId))!;

            await wallet.disconnect().catch((err) => {
              logger.log("Failed to disconnect existing wallet");
              logger.error(err);

              // At least clean up state on our side.
              handleDisconnected(wallet.id);
            });
          }

          if (pending || accounts.length) {
            setSelectedWalletId(walletId);
          }

          store.dispatch({
            type: "WALLET_CONNECTED",
            payload: { walletId, pending, accounts },
          });
        };

        const handleAccountsChanged = (
          walletId: string,
          { accounts }: WalletEvents["accountsChanged"]
        ) => {
          store.dispatch({
            type: "ACCOUNTS_CHANGED",
            payload: { walletId, accounts },
          });
        };

        const handleNetworkChanged = (
          walletId: string,
          { networkId }: WalletEvents["networkChanged"]
        ) => {
          emitter.emit("networkChanged", { walletId, networkId });
        };

        walletEmitter.on("disconnected", () => {
          handleDisconnected(module.id);
        });

        walletEmitter.on("connected", (event) => {
          handleConnected(module.id, event);
        });

        walletEmitter.on("accountsChanged", (event) => {
          handleAccountsChanged(module.id, event);
        });

        walletEmitter.on("networkChanged", (event) => {
          handleNetworkChanged(module.id, event);
        });

        const wallet = {
          id: module.id,
          type: module.type,
          metadata: module.metadata,
          ...(await module.init({
            id: module.id,
            type: module.type,
            metadata: module.metadata,
            options,
            provider: new Provider(options.network.nodeUrl),
            emitter: walletEmitter,
            logger,
            storage,
          })),
        } as Wallet;

        const _connect = wallet.connect;
        const _disconnect = wallet.disconnect;

        wallet.connect = async (params: never) => {
          const accounts = await _connect(params);

          await handleConnected(wallet.id, { accounts });
          return accounts;
        };

        wallet.disconnect = async () => {
          await _disconnect();

          handleDisconnected(wallet.id);
        };

        instances[module.id] = wallet;

        return wallet;
      },
    });
  }

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
