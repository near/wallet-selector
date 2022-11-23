import { resolveOptions } from "./options";
import { createStore } from "./store";
import type {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import type { StorageService } from "./services";
import {
  EventEmitter,
  JsonStorage,
  Logger,
  Provider,
  WalletModules,
} from "./services";
import type { Wallet } from "./wallet";
import { CONTRACT, PACKAGE_NAME, SELECTED_WALLET_ID } from "./constants";
import type { ContractState, Store } from "./store.types";
import type { Options } from "./options.types";

// this function is needed because the network switching feature was added
// it will update the storage to use new naming convention that uses network id
async function updateStorageCompatibility(storage: StorageService) {
  const jsonStorage = new JsonStorage(storage, PACKAGE_NAME);

  const selectedWalletId = await jsonStorage.getItem<string>(
    SELECTED_WALLET_ID
  );
  const contract = await jsonStorage.getItem<ContractState>(CONTRACT);

  if (!selectedWalletId || !contract) {
    return;
  }

  const detectedNetworkId =
    contract.contractId.split(".")[1] === "near" ? "mainnet" : "testnet";

  await jsonStorage.setItem(
    SELECTED_WALLET_ID + ":" + detectedNetworkId,
    selectedWalletId
  );
  await jsonStorage.setItem(CONTRACT + ":" + detectedNetworkId, contract);
  await jsonStorage.removeItem(SELECTED_WALLET_ID);
  await jsonStorage.removeItem(CONTRACT);
}

type WalletModulesNetwork = {
  walletModules: WalletModules;
  options: Options;
  store: Store;
};

const walletModulesNetworks: Array<WalletModulesNetwork> = [];
let activeNetworkId: string | null = null;

function getActiveWalletModule() {
  if (!activeNetworkId) {
    throw new Error("Active network id is null");
  }

  const walletModule = walletModulesNetworks.find(
    (walletModuleNetwork) =>
      walletModuleNetwork.options.network.networkId === activeNetworkId
  );

  if (!walletModule) {
    throw new Error("Wallet module not found");
  }

  return walletModule;
}

export const setupWalletSelector = async (
  listOfParams: Array<WalletSelectorParams>
): Promise<WalletSelector> => {
  const emitter = new EventEmitter<WalletSelectorEvents>();

  for (let i = 0; i < listOfParams.length; i++) {
    const params = listOfParams[i];

    const { options, storage } = resolveOptions(params);
    Logger.debug = options.debug;

    await updateStorageCompatibility(storage);

    const store = await createStore(storage, options.network);
    const walletModules = new WalletModules({
      factories: params.modules,
      storage,
      options,
      store,
      emitter,
      provider: new Provider(options.network.nodeUrl),
    });

    await walletModules.setup();

    walletModulesNetworks.push({
      walletModules,
      options,
      store,
    });
  }

  activeNetworkId = walletModulesNetworks[0].options.network.networkId;

  return {
    getOptions: () => {
      const { options } = getActiveWalletModule();
      return options;
    },
    getStore: () => {
      const { store } = getActiveWalletModule();
      return store.toReadOnly();
    },
    wallet: async <Variation extends Wallet = Wallet>(id?: string) => {
      const { store, walletModules } = getActiveWalletModule();
      const { selectedWalletId } = store.getState();
      const wallet = await walletModules.getWallet<Variation>(
        id || selectedWalletId
      );

      if (!wallet) {
        if (id) {
          throw new Error("Invalid wallet id");
        }

        throw new Error("No wallet selected");
      }

      return wallet;
    },
    setActiveAccount: (accountId: string) => {
      const { store } = getActiveWalletModule();
      const { accounts } = store.getState();

      if (!accounts.some((account) => account.accountId === accountId)) {
        throw new Error("Invalid account id");
      }

      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId },
      });
    },
    isSignedIn() {
      const { store } = getActiveWalletModule();
      const { accounts } = store.getState();

      return Boolean(accounts.length);
    },
    on: (eventName, callback) => {
      return emitter.on(eventName, callback);
    },
    off: (eventName, callback) => {
      emitter.off(eventName, callback);
    },
  };
};
