import { NetworkConfiguration } from "../network";
import { WalletModule } from "../wallets/Wallet";

export type BuiltInWalletId =
  | "near-wallet"
  | "sender-wallet"
  | "ledger-wallet"
  | "math-wallet";
export type NetworkId = "mainnet" | "testnet" | "betanet";
export type Theme = "dark" | "light" | "auto";

export interface Options {
  wallets: Array<BuiltInWalletId | WalletModule>;
  network: NetworkId | NetworkConfiguration;
  contractId: string;
  methodNames?: Array<string>;
  ui?: {
    theme?: Theme;
    description?: string;
  };
}
