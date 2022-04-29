import { Options } from "./options.types";
import { Store } from "./store.types";
import { EventEmitter } from "./services";
import { WalletSelectorEvents } from "./wallet-selector.types";
import { WalletModule, WalletModuleFactory } from "./wallet/wallet.types";

interface WalletModulesParams {
  factories: Array<WalletModuleFactory>;
  options: Options;
  store: Store;
  emitter: EventEmitter<WalletSelectorEvents>;
}

export const setupWalletModules = async ({
  factories,
  options,
  store,
  emitter,
}: WalletModulesParams) => {
  const modules: Array<WalletModule> = [];

  for (let i = 0; i < factories.length; i += 1) {
    const module = await factories[i]();

    // Filter out wallets that aren't available.
    if (!module) {
      continue;
    }

    modules.push(module);
  }

  store.dispatch({
    type: "SETUP_WALLET_MODULES",
    payload: {
      modules,
      accounts: [],
      selectedWalletId: null,
    },
  });
};
