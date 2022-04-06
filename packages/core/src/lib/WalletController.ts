import { logger, storage, Provider, Emitter, EventEmitter } from "./services";
import { Wallet, WalletEvents } from "./wallet";
import { Network } from "./network";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";
import { WalletSelectorOptions } from "./WalletSelector.types";
import {
  WalletSelectorState,
  WalletSelectorStore,
  WalletState,
} from "./store.types";

class WalletController {
  private options: WalletSelectorOptions;
  private network: Network;
  private provider: Provider;
  private emitter: Emitter<WalletEvents>;
  private store: WalletSelectorStore<WalletSelectorState>;

  constructor(
    options: WalletSelectorOptions,
    store: WalletSelectorStore<WalletSelectorState>
  ) {
    this.options = options;
    this.emitter = new EventEmitter<WalletEvents>();
    this.store = store;

    const { network } = store.getState();
    this.provider = new Provider(network.nodeUrl);
  }

  private setupWalletModules() {
    const selectedWalletId = storage.getItem<string>(
      LOCAL_STORAGE_SELECTED_WALLET_ID
    );

    const wallets = this.options.wallets.map((module) => {
      return module({
        options: this.options,
        network: this.network,
        provider: this.provider,
        emitter: this.emitter,
        store: this.store,
        logger,
        storage,
      });
    });

    this.store.dispatch({
      type: "SETUP_WALLET_MODULES",
      payload: { wallets, selectedWalletId },
    });
  }

  private async synchroniseSelectedWallet() {
    const selectedWallet = this.getWallet();

    if (!selectedWallet) {
      return;
    }

    await selectedWallet.init();
    const { accounts } = this.store.getState();

    if (!accounts.length) {
      storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

      this.store.dispatch({
        type: "WALLET_DISCONNECTED",
        payload: { id: selectedWallet.id },
      });
    }
  }

  private handleAccounts({ accounts }: WalletEvents["accounts"]) {
    this.store.dispatch({
      type: "ACCOUNTS_CHANGED",
      payload: { accounts },
    });
  }

  private async handleConnected({
    id,
    pending = false,
    accounts = [],
  }: WalletEvents["connected"]) {
    const selectedWallet = this.getWallet();

    if (selectedWallet) {
      await selectedWallet
        .disconnect()
        .catch(() => logger.error("Failed to disconnect existing wallet"));
    }

    storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, id);

    this.store.dispatch({
      type: "WALLET_CONNECTED",
      payload: { id, pending, accounts },
    });
  }

  private handleDisconnected({ id }: WalletEvents["disconnected"]) {
    storage.removeItem(LOCAL_STORAGE_SELECTED_WALLET_ID);

    this.store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: { id },
    });
  }

  async init() {
    this.emitter.on("accounts", this.handleAccounts);
    this.emitter.on("connected", this.handleConnected);
    this.emitter.on("disconnected", this.handleDisconnected);

    this.setupWalletModules();

    return this.synchroniseSelectedWallet();
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
