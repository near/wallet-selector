import { logger, storage, Provider, EventEmitter } from "./services";
import { Wallet, WalletEvents, WalletModule } from "./wallet";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";
import { Store, WalletState } from "./store.types";
import { Options } from "./options.types";

class WalletController {
  private options: Options;
  private wallets: Array<WalletModule>;
  private store: Store;

  constructor(options: Options, wallets: Array<WalletModule>, store: Store) {
    this.options = options;
    this.wallets = wallets;
    this.store = store;
  }

  private setupWalletModule(module: WalletModule) {
    const emitter = new EventEmitter<WalletEvents>();
    const provider = new Provider(this.options.network.nodeUrl);

    emitter.on("init", this.handleAccountsChanged(module.id));
    emitter.on("connected", this.handleConnected(module.id));
    emitter.on("disconnected", this.handleDisconnected(module.id));
    emitter.on("accountsChanged", this.handleAccountsChanged(module.id));
    emitter.on("networkChanged", this.handleNetworkChanged(module.id));
    emitter.on("uninstalled", this.handleUninstalled(module.id));

    return {
      id: module.id,
      name: module.name,
      description: module.description,
      iconUrl: module.iconUrl,
      type: module.type,
      ...module.wallet({
        options: this.options,
        provider,
        emitter,
        // TODO: Make a scoped logger.
        logger,
        // TODO: Make a scoped storage.
        storage,
      }),
    } as Wallet;
  }

  private setupWalletModules() {
    const selectedWalletId = storage.getItem<string>(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    const wallets = this.wallets.map((module) => {
      return this.setupWalletModule(module);
    });

    // Discard invalid id in storage.
    if (!wallets.some((wallet) => wallet.id === selectedWalletId)) {
      storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
    }

    this.store.dispatch({
      type: "SETUP_WALLET_MODULES",
      payload: { wallets, selectedWalletId },
    });
  }

  // Ensure our persistent state aligns with the selected wallet.
  // For example a wallet is selected, but it returns no accounts (not connected).
  private async syncSelectedWallet() {
    const selectedWallet = this.getWallet();

    if (selectedWallet) {
      await selectedWallet.init();

      const { accounts } = this.store.getState();

      if (!accounts.length) {
        await selectedWallet
          .disconnect()
          .catch(() => logger.error("Failed to disconnect invalid wallet"));
      }
    }
  }

  private handleConnected =
    (walletId: string) =>
    async ({ pending = false, accounts = [] }: WalletEvents["connected"]) => {
      const selectedWallet = this.getWallet();

      if (selectedWallet) {
        await selectedWallet.disconnect().catch(() => {
          logger.error("Failed to disconnect existing wallet");

          // At least clean up state on our side.
          this.handleDisconnected(selectedWallet.id)();
        });
      }

      if (pending || accounts.length) {
        storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, walletId);
      }

      this.store.dispatch({
        type: "WALLET_CONNECTED",
        payload: { walletId, pending, accounts },
      });
    };

  private handleDisconnected = (walletId: string) => () => {
    storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

    this.store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: { walletId },
    });
  };

  private handleAccountsChanged =
    (walletId: string) =>
    ({ accounts }: WalletEvents["accountsChanged"]) => {
      const { wallets } = this.store.getState();
      const selected = wallets.some((wallet) => {
        return wallet.id === walletId && wallet.selected;
      });

      if (!selected) {
        return;
      }

      this.store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: { accounts },
      });
    };

  private handleNetworkChanged = (walletId: string) => () => {
    this.store.dispatch({
      type: "UPDATE",
      payload: {
        showModal: true,
        showWalletOptions: false,
        showSwitchNetwork: walletId,
      },
    });
  };

  private handleUninstalled = (walletId: string) => () => {
    this.store.dispatch({
      type: "UPDATE",
      payload: {
        showWalletOptions: false,
        showWalletNotInstalled: walletId,
      },
    });
  };

  async init() {
    this.setupWalletModules();
    await this.syncSelectedWallet();
  }

  getWallet<WalletVariation extends Wallet = Wallet>(walletId?: string) {
    const state = this.store.getState();
    const wallet = walletId
      ? state.wallets.find((x) => x.id === walletId)
      : state.wallets.find((x) => x.selected);

    return (wallet || null) as WalletState<WalletVariation> | null;
  }
}

export default WalletController;
