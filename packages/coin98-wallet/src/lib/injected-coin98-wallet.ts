import type { Signer } from "near-api-js/lib/signer";
import type {
  SignedMessage,
  SignMessageParams,
} from "@near-wallet-selector/core";

interface IConnectParams {
  prefix: string;
  contractId: string;
}

interface ICoin98Near {
  account: string;
  signer: Signer;
  connect: (params: IConnectParams) => Promise<string>;
  disconnect: () => Promise<void>;
  signMessage: (params: SignMessageParams) => Promise<SignedMessage>;
}

export interface InjectedCoin98 {
  near: ICoin98Near;
}
