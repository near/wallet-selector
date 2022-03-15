export type BuiltInWalletId =
  | "near-wallet"
  | "sender-wallet"
  | "ledger-wallet"
  | "math-wallet";
export type NetworkId = "mainnet" | "betanet" | "testnet";
export type Theme = "dark" | "light" | "auto";

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
