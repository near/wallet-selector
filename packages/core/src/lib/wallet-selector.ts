import { resolveOptions } from "./options";
import { createStore } from "./store";
import type {
  SetupWalletSelectorParams,
  SetupWalletSelectorResponse,
  WalletSelectorEvents,
  WalletSelectorNetworks,
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
import type { ContractState } from "./store.types";

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

const walletSelectorInstances: WalletSelectorNetworks = {};

async function createWalletSelectorInstance(params: WalletSelectorParams) {
  const { options, storage } = resolveOptions(params);
  Logger.debug = options.debug;

  await updateStorageCompatibility(storage);

  const emitter = new EventEmitter<WalletSelectorEvents>();
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

  walletSelectorInstances[options.network.networkId] = {
    options,
    store: store.toReadOnly(),
    wallet: async <Variation extends Wallet = Wallet>(id?: string) => {
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

  return walletSelectorInstances[options.network.networkId];
}

export const setupWalletSelector = async <T extends SetupWalletSelectorParams>(
  params: T
): Promise<SetupWalletSelectorResponse<T>> => {
  if (params instanceof Array) {
    for (let i = 0; i < params.length; i++) {
      await createWalletSelectorInstance(params[i]);
    }
    return walletSelectorInstances as SetupWalletSelectorResponse<T>;
  } else {
    const selector = await createWalletSelectorInstance(params);
    return selector as SetupWalletSelectorResponse<T>;
  }
};
