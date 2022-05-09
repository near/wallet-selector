import { mock } from "jest-mock-extended";

import { WalletModuleFactory, Wallet, WalletEvents } from "./wallet";
import { Options } from "./options.types";
import {
  ProviderService,
  EventEmitterService,
  LoggerService,
  StorageService,
} from "./services";
import { getNetworkPreset } from "./options";

export interface MockWalletDependencies {
  options?: Options;
  provider?: ProviderService;
  emitter?: EventEmitterService<WalletEvents>;
  logger?: LoggerService;
  storage?: StorageService;
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

  const wallet = await module.init({
    id: module.id,
    type: module.type,
    metadata: module.metadata,
    options,
    provider: deps.provider || mock<ProviderService>(),
    emitter: deps.emitter || mock<EventEmitterService<WalletEvents>>(),
    logger: deps.logger || mock<LoggerService>(),
    storage: deps.storage || mock<StorageService>(),
  });

  return wallet as Variation;
};
