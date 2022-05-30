export type NetworkId = "mainnet" | "testnet" | "betanet";

export interface Network {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

export interface Options {
  network: Network;
  debug: boolean;
}
