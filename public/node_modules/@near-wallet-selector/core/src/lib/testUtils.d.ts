import type { WalletModuleFactory, Wallet } from "./wallet";
import type { ProviderService, StorageService } from "./services";
import type { Options } from "./options.types";
export interface MockWalletDependencies {
    options?: Options;
    provider?: ProviderService;
}
export declare const mockWallet: <Variation extends Wallet>(factory: WalletModuleFactory, deps?: MockWalletDependencies) => Promise<{
    wallet: Variation;
    storage: StorageService;
}>;
