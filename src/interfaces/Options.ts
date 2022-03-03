export type BuiltInWalletId = "near-wallet" | "sender-wallet" | "ledger-wallet";
export type NetworkId = "mainnet" | "testnet" | "betanet";
export type Theme = "dark" | "light";

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
