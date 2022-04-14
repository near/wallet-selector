import WalletController from "./wallet-controller";
import { resolveOptions } from "./options";
import { createStore } from "./store";
import { WalletSelector, WalletSelectorParams } from "./wallet-selector.types";
import { setupModal } from "./modal/setupModal";
import { Wallet } from "./wallet";

export const setupWalletSelector = async (
  params: WalletSelectorParams
): Promise<WalletSelector> => {
  const options = resolveOptions(params);
  const store = createStore({ options });
  const controller = new WalletController(options, params.wallets, store);

  await controller.init();

  // TODO: Remove omit once modal is a separate package.
  const selector: Omit<WalletSelector, "show" | "hide"> = {
    store: {
      getState: () => store.getState(),
      observable: store.observable.asObservable(),
    },
    get connected() {
      const { accounts } = store.getState();

      return Boolean(accounts.length);
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
  const modal = setupModal(selector, store, params.ui);

  return {
    ...selector,
    ...modal,
  };
};
