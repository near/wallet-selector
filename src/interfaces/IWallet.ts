export default interface IWallet {
  getName(): string;
  getDescription(): string;
  getIcon(): string;

  walletSelected(): void;
  init(): void;
  connect(): void;
  disconnect(): void;
  isConnected(): boolean;
}
