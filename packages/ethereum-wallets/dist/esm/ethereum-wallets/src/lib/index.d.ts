import { type WalletModuleFactory, type InjectedWallet } from "@near-wallet-selector/core";
import { type Config } from "@wagmi/core";
type WagmiCoreActionsType = typeof import("@wagmi/core");
export interface EthereumWalletsParams {
    wagmiConfig: Config;
    web3Modal?: {
        open: () => void;
        close: () => void;
        subscribeEvents: (f: (event: {
            data: {
                event: string;
            };
        }) => void) => () => void;
        getState: () => {
            open: boolean;
            selectedNetworkId?: number;
        };
    };
    wagmiCore?: WagmiCoreActionsType;
    chainId?: number;
    alwaysOnboardDuringSignIn?: boolean;
    iconUrl?: string;
    devMode?: boolean;
    devModeAccount?: string;
    deprecated?: boolean;
    nearNodeUrl?: string;
}
export declare function setupEthereumWallets(params: EthereumWalletsParams): WalletModuleFactory<InjectedWallet>;
export {};
//# sourceMappingURL=index.d.ts.map