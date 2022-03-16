import { Signer } from "near-api-js/lib/signer";

export interface LoginParams {
  contractId?: string;
  publicKey?: string;
}

export interface SignedInAccount {
  name: string;
  accountId: string;
  publicKey: string;
  permission: string;
  network: string;
}

export interface PreviouslySignedInAccount {
  networkUnique: string;
  address: string;
  name: string;
  authority: string;
  selected: boolean;
  type: string;
}

export type MathAccount = SignedInAccount | PreviouslySignedInAccount;

export interface MathNetwork {
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
  login: (param: LoginParams) => Promise<SignedInAccount>;
  logout: () => Promise<boolean>;
}
