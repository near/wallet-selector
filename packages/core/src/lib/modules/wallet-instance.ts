import { EventEmitter, logger, Provider, storage } from "../services";
import { Wallet, WalletEvents, WalletModule } from "../wallet";
import { ModuleState, Store } from "../store.types";
import { WalletSelectorEvents } from "../wallet-selector.types";
import { PENDING_SELECTED_WALLET_ID } from "../constants";
import { Options } from "../options.types";

interface WalletInstanceParams {
  modules: Array<ModuleState>;
  module: WalletModule;
  store: Store;
  options: Options;
  emitter: EventEmitter<WalletSelectorEvents>;
}

export const setupWalletInstance = async ({
  modules,
  module,
  store,
  options,
  emitter,
}: WalletInstanceParams) => {
  const walletEmitter = new EventEmitter<WalletEvents>();

  const handleDisconnected = (walletId: string) => {
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

    if (!accounts.length) {
      // We can't guarantee the user will actually sign in with browser wallets.
      // Best we can do is set in storage and validate on init.
      if (module.type === "browser") {
        storage.setItem(PENDING_SELECTED_WALLET_ID, walletId);
      }

      return;
    }

    if (selectedWalletId && selectedWalletId !== walletId) {
      const selectedModule = modules.find((x) => x.id === selectedWalletId)!;
      const selectedWallet = await selectedModule.wallet();

      await selectedWallet.disconnect().catch((err) => {
        logger.log("Failed to disconnect existing wallet");
        logger.error(err);

        // At least clean up state on our side.
        handleDisconnected(selectedWallet.id);
      });
    }

    store.dispatch({
      type: "WALLET_CONNECTED",
      payload: { walletId, accounts },
    });
  };

  const handleAccountsChanged = async (
    walletId: string,
    { accounts }: WalletEvents["accountsChanged"]
  ) => {
    if (!accounts.length) {
      const walletModule = modules.find((x) => x.id === walletId)!;
      const wallet = await walletModule.wallet();

      return wallet.disconnect().catch((err) => {
        logger.log("Failed to disconnect existing wallet");
        logger.error(err);

        // At least clean up state on our side.
        handleDisconnected(walletId);
      });
    }

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

  return wallet;
};
