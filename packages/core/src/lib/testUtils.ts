import { mock } from "jest-mock-extended";

import type { WalletModuleFactory, Wallet, WalletEvents } from "./wallet";
import type { Options } from "./options.types";
import type {
  ProviderService,
  EventEmitterService,
  LoggerService,
  JsonStorageService,
} from "./services";
import { getNetworkPreset } from "./options";
import type { Store } from "./store.types";

export interface MockWalletDependencies {
  options?: Options;
  store?: Store;
  provider?: ProviderService;
  emitter?: EventEmitterService<WalletEvents>;
  logger?: LoggerService;
  storage?: JsonStorageService;
}

export const mockWallet = async <Variation extends Wallet>(
  factory: WalletModuleFactory,
  deps: MockWalletDependencies = {}
) => {
  const options = deps.options || {
    network: getNetworkPreset("testnet"),
    contractId: "test.testnet",
    debug: false,
  };

  const module = await factory();

  if (!module) {
    return null;
  }

  const storeMock = mock<Store>({
    getState: jest.fn(() => {
      return {
        contract: {
          contractId: "guest-book.testnet",
          methodNames: [],
        },
        modules: [],
        accounts: [],
        selectedWalletId: null,
      };
    }),
  });

  const wallet = await module.init({
    id: module.id,
    type: module.type,
    metadata: module.metadata,
    options,
    store: deps.store || storeMock,
    provider: deps.provider || mock<ProviderService>(),
    emitter: deps.emitter || mock<EventEmitterService<WalletEvents>>(),
    logger: deps.logger || mock<LoggerService>(),
    storage: deps.storage || mock<JsonStorageService>(),
  });

  return wallet as Variation;
};
