import { logger, storage, Provider, EventEmitter } from "./services";
import { Wallet, WalletEvents, WalletModule } from "./wallet";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "./constants";
import { AccountState, Store, WalletModuleState } from "./store.types";
import { Options } from "./options.types";
import { WalletSelectorEvents } from "./wallet-selector.types";

class WalletController {
  private options: Options;
  private modules: Array<WalletModule>;
  private store: Store;
  private emitter: EventEmitter<WalletSelectorEvents>;

  constructor(
    options: Options,
    modules: Array<WalletModule>,
    store: Store,
    emitter: EventEmitter<WalletSelectorEvents>
  ) {
    this.options = options;
    this.modules = modules;
    this.store = store;
    this.emitter = emitter;
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

  // TODO: Add "cache" for "wallet" call.
  private setupWalletModule(module: WalletModule): WalletModuleState {
    const emitter = new EventEmitter<WalletEvents>();
    const provider = new Provider(this.options.network.nodeUrl);

    emitter.on("connected", this.handleConnected(module.id));
    emitter.on("disconnected", this.handleDisconnected(module.id));
    emitter.on("accountsChanged", this.handleAccountsChanged(module.id));
    emitter.on("networkChanged", this.handleNetworkChanged(module.id));

    return {
      ...module,
      wallet: () => {
        return module.wallet({
          options: this.options,
          metadata: {
            id: module.id,
            name: module.name,
            description: module.description,
            iconUrl: module.iconUrl,
            type: module.type,
          },
          provider,
          emitter,
          // TODO: Make a scoped logger.
          logger,
          // TODO: Make a scoped storage.
          storage,
        });
      },
    };
  }

  // TODO: Move isAvailable to module level and filter out here.
  private async setupWalletModules() {
    let selectedWalletId = this.getSelectedWalletId();
    let accounts: Array<AccountState> = [];

    const modules = this.modules.map((module) => {
      return this.setupWalletModule(module);
    });

    const selectedModule = modules.find((x) => x.id === selectedWalletId);

    if (selectedModule) {
      // Ensure our persistent state aligns with the selected wallet.
      // For example a wallet is selected, but it returns no accounts (not connected).
      const wallet = await selectedModule.wallet();

      accounts = await wallet.getAccounts().catch((err) => {
        logger.log(
          `Failed to get accounts for ${selectedModule.id} during setup`
        );
        logger.error(err);

        return [];
      });
    }

    if (!accounts.length) {
      this.removeSelectedWalletId();
      selectedWalletId = null;
    }

    this.store.dispatch({
      type: "SETUP_WALLET_MODULES",
      payload: { modules, accounts, selectedWalletId },
    });
  }

  private handleConnected =
    (walletId: string) =>
    async ({ pending = false, accounts = [] }: WalletEvents["connected"]) => {
      const existingModule = this.getModule();

      if (existingModule && existingModule.id !== walletId) {
        const wallet = await existingModule.wallet();

        await wallet.disconnect().catch((err) => {
          logger.log("Failed to disconnect existing wallet");
          logger.error(err);

          // At least clean up state on our side.
          this.handleDisconnected(existingModule.id)();
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
      const { selectedWalletId } = this.store.getState();

      // TODO: Move this check into the store.
      if (walletId !== selectedWalletId) {
        return;
      }

      this.store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: { accounts },
      });
    };

  private handleNetworkChanged =
    (walletId: string) =>
    ({ networkId }: WalletEvents["networkChanged"]) => {
      this.emitter.emit("networkChanged", { walletId, networkId });
    };

  async init() {
    await this.setupWalletModules();
  }

  getModule<WalletVariation extends Wallet = Wallet>(walletId?: string) {
    const lookupWalletId = walletId || this.getSelectedWalletId();
    const module = this.modules.find((x) => x.id === lookupWalletId) || null;

    return module as WalletModuleState<WalletVariation> | null;
  }
}

export default WalletController;
