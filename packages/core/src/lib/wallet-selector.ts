import { resolveOptions } from "./options";
import { createStore } from "./store";
import {
  WalletSelector,
  WalletSelectorEvents,
  WalletSelectorParams,
} from "./wallet-selector.types";
import { WalletSelectorModal } from "./modal/modal.types";
import { setupModal } from "./modal/modal";
import { EventEmitter, Logger } from "./services";
import { setupWalletModules } from "./wallet-modules";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const options = resolveOptions(params);
  Logger.debug = options.debug;

  const emitter = new EventEmitter<WalletSelectorEvents>();
  const store = createStore();

  await setupWalletModules({
    factories: params.modules,
    options,
    store,
    emitter,
  });

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
    // wallet: <WalletVariation extends Wallet = Wallet>(walletId?: string) => {
    //   const module = null; // controller.getModule<WalletVariation>(walletId);
    //
    //   if (!module) {
    //     if (walletId) {
    //       throw new Error("Invalid wallet id");
    //     }
    //
    //     throw new Error("No wallet selected");
    //   }
    //
    //   return {
    //     connect: async (args: never) => {
    //       const wallet = await module.wallet();
    //
    //       return wallet.connect(args);
    //     },
    //     disconnect: async () => {
    //       const wallet = await module.wallet();
    //
    //       return wallet.disconnect();
    //     },
    //     getAccounts: async () => {
    //       const wallet = await module.wallet();
    //
    //       return wallet.getAccounts();
    //     },
    //     signAndSendTransaction: async (args: never) => {
    //       const wallet = await module.wallet();
    //
    //       return wallet.signAndSendTransaction(args);
    //     },
    //     signAndSendTransactions: async (args: never) => {
    //       const wallet = await module.wallet();
    //
    //       return wallet.signAndSendTransactions(args);
    //     },
    //   } as WalletBehaviour<WalletVariation>;
    // },
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
