export type NetworkId = "mainnet" | "testnet";

export interface Network {
  networkId: NetworkId;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
  indexerUrl: string;
}

export interface Options {
  network: Network;
  debug: boolean;
  optimizeWalletOrder: boolean;
}
