import { NetworkConfiguration } from "../network";

export type BuiltInWalletId = "near-wallet" | "sender-wallet" | "ledger-wallet";
export type NetworkId = "mainnet" | "betanet" | "testnet" | "customnet";
export type Theme = "dark" | "light" | "auto";

export interface Options {
  wallets: Array<BuiltInWalletId>;
  networkId: NetworkId;
  network?: NetworkConfiguration;
  contract: {
    contractId: string;
    methodNames?: Array<string>;
  };
  ui?: {
    theme?: Theme;
    description?: string;
  };
}
