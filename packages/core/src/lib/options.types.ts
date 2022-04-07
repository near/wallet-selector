import { ModalOptions } from "./modal/setupModal.types";
import { WalletSelectorParams } from "./WalletSelector.types";

export type NetworkId = "mainnet" | "testnet" | "betanet";

export interface Network {
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
  restApiUrl: string;
}

export type Options = Pick<
  WalletSelectorParams,
  "contractId" | "methodNames"
> & {
  network: Network;
};
