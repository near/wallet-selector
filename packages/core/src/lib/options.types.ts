export type NetworkId = "mainnet" | "testnet" | "betanet";

export interface Network {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
  indexerUrl: string;
}

export interface Options {
  network: Network;
  debug: boolean;
}
