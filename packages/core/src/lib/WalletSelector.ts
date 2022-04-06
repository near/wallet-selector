import WalletController from "./WalletController";
import { resolveNetwork } from "./network";
import { createStore } from "./store";
import { WalletSelector, WalletSelectorOptions } from "./WalletSelector.types";
import { setupModal } from "./modal/setupModal";
import { Wallet } from "./wallet";

export const setupWalletSelector = async (
  options: WalletSelectorOptions
): Promise<WalletSelector> => {
  const store = createStore({
    network: resolveNetwork(options.network),
    contractId: options.contractId,
    methodNames: options.methodNames || null,
  });
  const controller = new WalletController(options, store);

  await controller.init();

  const selector: WalletSelector = {
    store: {
      getState: () => store.getState(),
      toObservable: () => store.observable,
    },
    show: () => {
      store.dispatch({
        type: "UPDATE",
        payload: {
          showModal: true,
          showWalletOptions: true,
          showLedgerDerivationPath: false,
          showWalletNotInstalled: null,
          showSwitchNetwork: false,
        },
      });
    },
    hide: () => {
      store.dispatch({
        type: "UPDATE",
        payload: {
          showModal: false,
        },
      });
    },
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
  };

  // TODO: Extract into separate package.
  setupModal(selector, store, options.ui);

  return selector;
};
