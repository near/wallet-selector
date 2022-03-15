import { PublicKey, Signature } from "near-api-js/lib/utils/key_pair";

interface MathAccount {
  networkUnique: string;
  address: string;
  name: string;
  authority: string;
  selected: boolean;
  type: string;

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

export interface InjectedMathWallet {
  signer: {
    account: MathAccount | null;
    network: MathNetwork;
    createKey(accountId: string, networkId?: string): Promise<PublicKey>;
    getPublicKey(accountId?: string, networkId?: string): Promise<PublicKey>;
    signMessage(
      message: Uint8Array,
      accountId?: string,
      networkId?: string
    ): Promise<Signature>;
  };
  login: (param: object) => Promise<MathAccount>;
  logout: () => Promise<boolean>;
}
