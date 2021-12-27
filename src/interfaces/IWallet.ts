export default interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;

  walletSelected(): void;
  init(): Promise<void>;
  connect(): void;
  disconnect(): void;
  isConnected(): Promise<boolean>;
  setWalletAsSignedIn(): Promise<void>;
  signIn(): Promise<void>;
}
