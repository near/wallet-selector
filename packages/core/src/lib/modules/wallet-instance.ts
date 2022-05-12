import {
  EventEmitter,
  logger,
  Provider,
  JsonStorage,
  StorageService,
} from "../services";
import { Wallet, WalletEvents, WalletModule } from "../wallet";
import { ModuleState, Store } from "../store.types";
import { WalletSelectorEvents } from "../wallet-selector.types";
import { PACKAGE_NAME, PENDING_SELECTED_WALLET_ID } from "../constants";
import { Options } from "../options.types";

interface WalletInstanceParams {
  modules: Array<ModuleState>;
  module: WalletModule;
  storage: StorageService;
  store: Store;
  options: Options;
  emitter: EventEmitter<WalletSelectorEvents>;
}

export const setupWalletInstance = async ({
  modules,
  module,
  storage,
  store,
  options,
  emitter,
}: WalletInstanceParams) => {
  const walletEmitter = new EventEmitter<WalletEvents>();
  const jsonStorage = new JsonStorage(storage, PACKAGE_NAME);

  const handleDisconnected = (walletId: string) => {
    store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: { walletId },
    });
  };

  const disconnect = async (walletId: string) => {
    const walletModule = modules.find((x) => x.id === walletId)!;
    const wallet = await walletModule.wallet();

    await wallet.disconnect().catch((err) => {
      logger.log(`Failed to disconnect ${walletId}`);
      logger.error(err);

      // At least clean up state on our side.
      handleDisconnected(walletId);
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
        await jsonStorage.setItem(PENDING_SELECTED_WALLET_ID, walletId);
      }

      return;
    }

    if (selectedWalletId && selectedWalletId !== walletId) {
      await disconnect(selectedWalletId);
    }

    store.dispatch({
      type: "WALLET_CONNECTED",
      payload: { walletId, accounts },
    });
  };

  walletEmitter.on("disconnected", () => {
    handleDisconnected(module.id);
  });

  walletEmitter.on("connected", (event) => {
    handleConnected(module.id, event);
  });

  walletEmitter.on("accountsChanged", async ({ accounts }) => {
    if (!accounts.length) {
      return disconnect(module.id);
    }

    store.dispatch({
      type: "ACCOUNTS_CHANGED",
      payload: { walletId: module.id, accounts },
    });
  });

  walletEmitter.on("networkChanged", ({ networkId }) => {
    emitter.emit("networkChanged", { walletId: module.id, networkId });
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
      storage: new JsonStorage(storage, [PACKAGE_NAME, module.id]),
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
