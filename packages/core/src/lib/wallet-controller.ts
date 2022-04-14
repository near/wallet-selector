import { logger, storage, Provider, EventEmitter } from "./services";
import { Wallet, WalletEvents, WalletModule } from "./wallet";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";
import { AccountState, Store } from "./store.types";
import { Options } from "./options.types";

class WalletController {
  private options: Options;
  private modules: Array<WalletModule>;
  private wallets: Array<Wallet>;
  private store: Store;

  constructor(options: Options, modules: Array<WalletModule>, store: Store) {
    this.options = options;
    this.modules = modules;
    this.store = store;
    this.wallets = [];
  }

  private getSelectedWalletId() {
    return storage.getItem<string>(LOCAL_STORAGE_SELECTED_WALLET_ID);
  }

  private setSelectedWalletId(walletId: string) {
    storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, walletId);
  }

  private removeSelectedWalletId() {
    return storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);
  }

  private setupWalletModule({ wallet, ...metadata }: WalletModule) {
    const emitter = new EventEmitter<WalletEvents>();
    const provider = new Provider(this.options.network.nodeUrl);

    emitter.on("connected", this.handleConnected(metadata.id));
    emitter.on("disconnected", this.handleDisconnected(metadata.id));
    emitter.on("accountsChanged", this.handleAccountsChanged(metadata.id));
    emitter.on("networkChanged", this.handleNetworkChanged(metadata.id));

    return {
      ...metadata,
      ...wallet({
        options: this.options,
        metadata,
        provider,
        emitter,
        // TODO: Make a scoped logger.
        logger,
        // TODO: Make a scoped storage.
        storage,
      }),
    } as Wallet;
  }

  private async setupWalletModules() {
    let selectedWalletId = this.getSelectedWalletId();
    let accounts: Array<AccountState> = [];

    const wallets = this.modules.map((module) => {
      return this.setupWalletModule(module);
    });

    const selectedWallet = wallets.find((x) => x.id === selectedWalletId);

    if (selectedWallet) {
      // Ensure our persistent state aligns with the selected wallet.
      // For example a wallet is selected, but it returns no accounts (not connected).
      accounts = await selectedWallet.connect().catch((err) => {
        logger.log(`Failed to connect to ${selectedWallet.id} during setup`);
        logger.error(err);

        return [];
      });
    }

    if (!accounts.length) {
      this.removeSelectedWalletId();
      selectedWalletId = null;
    }

    this.wallets = wallets;

    this.store.dispatch({
      type: "SETUP_WALLET_MODULES",
      payload: { wallets, selectedWalletId, accounts },
    });
  }

  private handleConnected =
    (walletId: string) =>
    async ({ pending = false, accounts = [] }: WalletEvents["connected"]) => {
      const existingWallet = this.getWallet();

      if (existingWallet && existingWallet.id !== walletId) {
        await existingWallet.disconnect().catch((err) => {
          logger.log("Failed to disconnect existing wallet");
          logger.error(err);

          // At least clean up state on our side.
          this.handleDisconnected(existingWallet.id)();
        });
      }

      if (pending || accounts.length) {
        this.setSelectedWalletId(walletId);
      }

      this.store.dispatch({
        type: "WALLET_CONNECTED",
        payload: { walletId, pending, accounts },
      });
    };

  private handleDisconnected = (walletId: string) => () => {
    this.removeSelectedWalletId();

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

  async init() {
    await this.setupWalletModules();
  }

  getWallet<WalletVariation extends Wallet = Wallet>(walletId?: string) {
    const lookupWalletId = walletId || this.getSelectedWalletId();
    const wallet = this.wallets.find((x) => x.id === lookupWalletId) || null;

    return wallet as WalletVariation | null;
  }
}

export default WalletController;
