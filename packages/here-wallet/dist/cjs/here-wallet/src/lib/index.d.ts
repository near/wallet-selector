import type { HereInitializeOptions } from "@here-wallet/core";
import type { WalletModuleFactory, InjectedWallet } from "@near-wallet-selector/core";
import icon from "./icon";
export { icon };
interface Options {
    deprecated?: boolean;
    iconUrl?: string;
    walletOptions?: HereInitializeOptions;
}
export declare function setupHereWallet({ deprecated, iconUrl, walletOptions, }?: Options): WalletModuleFactory<InjectedWallet>;
//# sourceMappingURL=index.d.ts.map