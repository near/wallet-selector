import IWallet from "./IWallet";

export default interface ILedgerWallet extends IWallet {
  setDerivationPath(derivationPath: string): void;
  getPublicKey(): Uint8Array;
  encodePublicKey(publicKey: Uint8Array): string;
}
