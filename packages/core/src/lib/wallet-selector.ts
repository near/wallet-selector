import { resolveOptions } from "./options";
import { createStore } from "./store";
import {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import { EventEmitter, Logger } from "./services";
import { Wallet } from "./wallet";
import { setupWalletModules } from "./modules/wallet-modules";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const { options, storage } = resolveOptions(params);
  Logger.debug = options.debug;

  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = await createStore(storage);
  const walletModules = await setupWalletModules({
    factories: params.modules,
    storage,
    options,
    store,
    emitter,
  });

  // TODO: Remove omit once modal is a separate package.
  const selector: WalletSelector = {
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

  if (params.ui) {
    params
      .ui()
      .then((ui) => {
        ui.setSelector(selector);
      })
      .catch((err) => {
        const logger = new Logger();
        logger.log("Could not set up the UI");
        logger.error(err);
      });
  }

  return selector;
};
