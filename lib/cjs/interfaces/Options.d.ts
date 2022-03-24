export declare type BuiltInWalletId = "near-wallet" | "sender-wallet" | "ledger-wallet" | "metamask-wallet";
export declare type NetworkId = "mainnet" | "betanet" | "testnet";
export declare type Theme = "dark" | "light" | "auto";
export interface Options {
    wallets: Array<BuiltInWalletId>;
    networkId: NetworkId;
    contract: {
        contractId: string;
        methodNames?: Array<string>;
    };
    ui?: {
        theme?: Theme;
        description?: string;
    };
}
