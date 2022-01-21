import IWallet from "./IWallet";

export default interface ILedgerWallet extends IWallet {
  setDerivationPath(derivationPath: string): void;
  getPublicKey(): Uint8Array;
  setAccountId(accountId: string): void;
  encodePublicKey(publicKey: Uint8Array): string;
}
