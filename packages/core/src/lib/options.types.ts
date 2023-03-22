export type NetworkId = "mainnet" | "testnet";

export interface Network {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
  indexerUrl: string;
}

export interface Options {
  languageCode: string;
  network: Network;
  debug: boolean;
  optimizeWalletOrder: boolean;
  randomizeWalletOrder: boolean;
}
