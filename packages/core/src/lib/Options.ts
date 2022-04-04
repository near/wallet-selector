import { NetworkConfiguration } from "./network";
import { WalletModule } from "./wallet";

export type NetworkId = "mainnet" | "testnet" | "betanet";
export type Theme = "dark" | "light" | "auto";

export interface Options {
  network: NetworkId | NetworkConfiguration;
  contractId: string;
  wallets: Array<WalletModule>;
  methodNames?: Array<string>;
  ui?: {
    theme?: Theme;
    description?: string;
  };
}
