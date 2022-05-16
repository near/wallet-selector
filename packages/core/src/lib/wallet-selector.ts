import { resolveOptions } from "./options";
import { createStore } from "./store";
import {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import { WalletSelectorModal } from "./modal/modal.types";
import { EventEmitter, Logger, WalletModules } from "./services";
import { Wallet } from "./wallet";
import { setupModal } from "./modal/modal";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const { options, storage } = resolveOptions(params);
  Logger.debug = options.debug;

  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = await createStore(storage);
  const walletModules = new WalletModules({
    factories: params.modules,
    storage,
    options,
    store,
    emitter,
  });

  await walletModules.setup();

  // TODO: Remove omit once modal is a separate package.
  const selector: Omit<WalletSelector, keyof WalletSelectorModal> = {
    store: {
      getState: () => store.getState(),
      observable: store.observable.asObservable(),
    },
    get connected() {
      const { accounts } = store.getState();

      return Boolean(accounts.length);
    },
    options,
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
    on: (eventName, callback) => {
      return emitter.on(eventName, callback);
    },
    off: (eventName, callback) => {
      emitter.off(eventName, callback);
    },
  };

  // TODO: Extract into separate package.
  const modal = setupModal(selector, params.ui);

  return {
    ...selector,
    ...modal,
  };
};
