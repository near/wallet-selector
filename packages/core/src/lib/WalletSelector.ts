import WalletController from "./WalletController";
import { resolveOptions } from "./options";
import { createStore } from "./store";
import { WalletSelector, WalletSelectorParams } from "./WalletSelector.types";
import { setupModal } from "./modal/setupModal";
import { Wallet } from "./wallet";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const options = resolveOptions(params);
  const store = createStore({ options });
  const controller = new WalletController(options, params.wallets, store);

  await controller.init();

  const selector: WalletSelector = {
    store: {
      getState: () => store.getState(),
      observable: store.observable.asObservable(),
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
  setupModal(selector, store, params.ui);

  return selector;
};
