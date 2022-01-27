import IWallet from "./IWallet";

type ILedgerWallet = {
  setDerivationPath(derivationPath: string): void;
  getPublicKey(): Uint8Array;
  encodePublicKey(publicKey: Uint8Array): string;
} & IWallet;
export default ILedgerWallet;
