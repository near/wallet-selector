import IWallet from "./IWallet";

export default interface ILedgerWallet extends IWallet {
  setDerivationPath(derivationPath: string): void;
  setAccountId(accountId: string): void;
}
