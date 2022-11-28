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
import {
  ACTIVE_NETWORK_ID,
  CONTRACT,
  PACKAGE_NAME,
  SELECTED_WALLET_ID,
} from "./constants";
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

export const walletSelectors: Array<WalletSelector> = [];
export function getActiveWalletSelector() {
  let walletSelector = null;
  const networkId = window.localStorage.getItem(ACTIVE_NETWORK_ID);
  if (networkId) {
    walletSelector = walletSelectors.find(
      (s) => s.options.network.networkId === networkId
    );
    if (!walletSelector) {
      throw new Error("No " + networkId + " network");
    }
  } else {
    walletSelector = walletSelectors[0];
  }
  return walletSelector;
}

export const setupWalletSelector = async (
  listOfParams: Array<WalletSelectorParams>
): Promise<WalletSelector> => {
  if (listOfParams.length < 1) {
    throw new Error("List of params length must 1 or more");
  }

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

    walletSelectors.push({
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
      setActiveNetwork: (networkId: string) => {
        window.localStorage.setItem(ACTIVE_NETWORK_ID, networkId);
        emitter.emit("networkChanged", {
          walletId: store.getState().selectedWalletId,
          networkId,
          selector: getActiveWalletSelector(),
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
    });
  }

  return getActiveWalletSelector();
};
