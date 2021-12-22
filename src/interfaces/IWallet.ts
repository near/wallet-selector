export default interface IWallet {
  getName(): string;
  getDescription(): string;
  getIcon(): string;

  connect(): void;
  disconnect(): void;
  isConnected(): boolean;
}
