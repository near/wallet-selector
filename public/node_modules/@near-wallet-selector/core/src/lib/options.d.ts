import type { WalletSelectorParams } from "./wallet-selector.types";
import type { Options, Network, NetworkId } from "./options.types";
export declare const getNetworkPreset: (networkId: NetworkId, fallbackRpcUrls?: Array<string>) => Network;
export declare const resolveNetwork: (network: NetworkId | Network) => Network;
export declare const resolveOptions: (params: WalletSelectorParams) => {
    options: Options;
    storage: import("./services").StorageService;
};
