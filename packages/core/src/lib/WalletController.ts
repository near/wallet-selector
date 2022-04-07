import { logger, storage, Provider, EventEmitter } from "./services";
import { Wallet, WalletEvents } from "./wallet";
import { Network } from "./network";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";
import { WalletSelectorOptions } from "./WalletSelector.types";
import { Store, WalletState } from "./store.types";

class WalletController {
  private options: WalletSelectorOptions;
  private network: Network;
  private provider: Provider;
  private store: Store;

  constructor(
    options: WalletSelectorOptions,
    store: Store
  ) {
    const { network } = store.getState();

    this.options = options;
    this.network = network;
    this.provider = new Provider(network.nodeUrl);
    this.store = store;
  }

  private setupWalletModules() {
    const selectedWalletId = storage.getItem<string>(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    const wallets = this.options.wallets.map((module) => {
      const emitter = new EventEmitter<WalletEvents>();

      const wallet = module({
        options: this.options,
        network: this.network,
        provider: this.provider,
        emitter,
        store: this.store,
        logger,
        storage,
      });

      emitter.on("init", this.handleInitOrAccounts(wallet.id));
      emitter.on("accounts", this.handleInitOrAccounts(wallet.id));
      emitter.on("connected", this.handleConnected(wallet.id));
      emitter.on("disconnected", this.handleDisconnected(wallet.id));

      return wallet;
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

  private handleInitOrAccounts =
    (walletId: string) =>
    ({ accounts }: WalletEvents["accounts"]) => {
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
