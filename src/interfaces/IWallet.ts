export default interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;

  walletSelected(): void;
  init(): void;
  connect(): void;
  disconnect(): void;
  isConnected(): boolean;
  setWalletAsSignedIn(): void;
  on(event: string, callback: (self: IWallet) => void): void;
}
