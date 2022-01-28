interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;
  getShowWallet(): boolean;

  walletSelected(): void;
  init(): Promise<void>;
  disconnect(): void;
  isConnected(): Promise<boolean>;
  setWalletAsSignedIn(): Promise<void>;
  signIn(): Promise<void>;
  getAccount(): Promise<any>;
  callContract(
    method: string,
    args?: any,
    gas?: string,
    deposit?: string
  ): Promise<any>;
}
export default IWallet;
