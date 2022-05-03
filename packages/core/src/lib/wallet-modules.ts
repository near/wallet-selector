import { Options } from "./options.types";
import { Store } from "./store.types";
import { logger, storage, Provider, EventEmitter } from "./services";
import { WalletSelectorEvents } from "./wallet-selector.types";
import {
  Wallet,
  WalletModule,
  WalletModuleFactory,
} from "./wallet/wallet.types";
import { WalletEvents } from "./wallet";

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
  const instances: Record<string, Wallet> = {};

  for (let i = 0; i < factories.length; i += 1) {
    const module = await factories[i]();

    // Filter out wallets that aren't available.
    if (!module) {
      continue;
    }

    modules.push({
      id: module.id,
      type: module.type,
      metadata: module.metadata,
      wallet: async () => {
        let instance = instances[module.id];

        if (instance) {
          return instance;
        }

        instance = {
          id: module.id,
          type: module.type,
          metadata: module.metadata,
          ...(await module.init({
            id: module.id,
            type: module.type,
            metadata: module.metadata,
            options,
            provider: new Provider(options.network.nodeUrl),
            emitter: new EventEmitter<WalletEvents>(),
            logger,
            storage,
          })),
        } as Wallet;

        instances[module.id] = instance;

        return instance;
      },
    });
  }

  const getWallet = async (id: string) => {
    const module = modules.find((x) => x.id === id);

    if (!module) {
      return null;
    }

    return module.wallet();
  };

  store.dispatch({
    type: "SETUP_WALLET_MODULES",
    payload: {
      modules,
      accounts: [],
      selectedWalletId: null,
    },
  });
};
