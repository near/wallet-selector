import type { WalletModuleFactory, BrowserWallet } from "@near-wallet-selector/core";
export interface MyNearWalletParams {
    walletUrl?: string;
    iconUrl?: string;
    deprecated?: boolean;
    successUrl?: string;
    failureUrl?: string;
}
export declare function setupMyNearWallet({ walletUrl, iconUrl, deprecated, successUrl, failureUrl, }?: MyNearWalletParams): WalletModuleFactory<BrowserWallet>;
//# sourceMappingURL=my-near-wallet.d.ts.map