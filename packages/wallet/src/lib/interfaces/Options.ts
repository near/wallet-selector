import { NetworkConfiguration } from "./network/network";
import { WalletModule } from "../wallet";
export type NetworkId = "mainnet" | "testnet" | "betanet";
export type Theme = "dark" | "light" | "auto";

export interface Options {
  wallets: Array<WalletModule>;
  network: NetworkId | NetworkConfiguration;
  contractId: string;
  methodNames?: Array<string>;
  ui?: {
    theme?: Theme;
    description?: string;
  };
}
