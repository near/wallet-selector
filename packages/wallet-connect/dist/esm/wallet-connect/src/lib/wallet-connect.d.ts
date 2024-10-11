import type { SignClientTypes } from "@walletconnect/types";
import type { WalletModuleFactory, BridgeWallet } from "@near-wallet-selector/core";
export interface WalletConnectParams {
    projectId: string;
    metadata: SignClientTypes.Metadata;
    relayUrl?: string;
    iconUrl?: string;
    chainId?: string;
    deprecated?: boolean;
    methods?: Array<string>;
    events?: Array<string>;
}
export declare function setupWalletConnect({ projectId, metadata, chainId, relayUrl, iconUrl, deprecated, methods, events, }: WalletConnectParams): WalletModuleFactory<BridgeWallet>;
//# sourceMappingURL=wallet-connect.d.ts.map