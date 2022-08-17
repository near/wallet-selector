import { Signer } from "near-api-js/lib/signer";

interface IConnectParams {
  prefix: string;
  contractId: string;
}

interface ICoin98Near {
  account: string;
  signer: Signer;
  connect: (params: IConnectParams) => Promise<string>;
  disconnect: () => Promise<void>;
}

export interface InjectedCoin98 {
  near: ICoin98Near;
}
