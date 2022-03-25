import { NetworkConfiguration } from "../network";

export type BuiltInWalletId =
  | "near-wallet"
  | "sender-wallet"
  | "ledger-wallet"
  | "math-wallet";
export type NetworkId = "mainnet" | "testnet" | "betanet";
export type Theme = "dark" | "light" | "auto";

export interface Options {
  wallets: Array<BuiltInWalletId>;
  network: NetworkId | NetworkConfiguration;
  contractId: string;
  methodNames?: Array<string>;
  ui?: {
    theme?: Theme;
    description?: string;
  };
}
