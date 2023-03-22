import type { SupportedLanguage } from "./translate/translate";

export type NetworkId = "mainnet" | "testnet";

export interface Network {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
  indexerUrl: string;
}

export interface Options {
  languageCode: SupportedLanguage | undefined;
  network: Network;
  debug: boolean;
  optimizeWalletOrder: boolean;
  randomizeWalletOrder: boolean;
}
