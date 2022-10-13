import { Web3AuthParams } from "./wallet-selector.types";

export type NetworkId = "mainnet" | "testnet";

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
  web3auth?: Web3AuthParams;
}
