import type { Signer } from "near-api-js/lib/signer";

interface LoginParams {
  contractId?: string;
  publicKey?: string;
}

export interface MathAccount {
  name: string;
  accountId: string;
  publicKey: string;
  permission: string;
  network: string;
}

interface MathNetwork {
  id: string;
  name: string;
  blockchain: string;
  chainId: string;
  nodeAddress: string;
  nodeAddress2: string;
  nodeAddress3: string;
  enable: boolean;
  custom: boolean;
  extra: string;
}

export type MathSigner = Signer & {
  account: MathAccount | null;
  network: MathNetwork;
};

export interface InjectedMathWallet {
  signer: MathSigner;
  login: (param: LoginParams) => Promise<MathAccount>;
  logout: () => Promise<boolean>;
}
