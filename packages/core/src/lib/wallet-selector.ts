import WalletController from "./wallet-controller";
import { resolveOptions } from "./options";
import { createStore } from "./store";
import {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
// import { WalletSelectorModal } from "../../../../oldmodal/modal.types";
// import { setupModal } from "../../../../oldmodal/modal";
import { Wallet } from "./wallet";
import { EventEmitter, Logger } from "./services";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const options = resolveOptions(params);
  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = createStore();
  const controller = new WalletController(
    options,
    params.wallets,
    store,
    emitter
  );

  Logger.debug = options.debug;
  const logger = new Logger();
  await controller.init();

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
    wallet: <WalletVariation extends Wallet = Wallet>(walletId?: string) => {
      const wallet = controller.getWallet<WalletVariation>(walletId);

      if (!wallet) {
        if (walletId) {
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
        logger.log("Could not set up the UI");
        logger.error(err);
      });
  }

  return selector;
};
