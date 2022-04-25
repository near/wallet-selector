import { mock } from "jest-mock-extended";

import { Wallet, WalletEvents, WalletModule } from "./wallet";
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

export const mockWallet = <WalletVariation extends Wallet>(
  { wallet, ...metadata }: WalletModule,
  deps: MockWalletDependencies = {}
) => {
  const options = deps.options || {
    network: getNetworkPreset("testnet"),
    contractId: "test.testnet",
    debug: false,
  };

  return wallet({
    options,
    metadata,
    provider: deps.provider || mock<ProviderService>(),
    emitter: deps.emitter || mock<EventEmitterService<WalletEvents>>(),
    logger: deps.logger || mock<LoggerService>(),
    storage: deps.storage || mock<StorageService>(),
  }) as WalletVariation;
};
