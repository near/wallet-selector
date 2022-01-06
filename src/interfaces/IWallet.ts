export default interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;
  getShowWallet(): boolean;

  walletSelected(): void;
  getWallet(): Promise<any>;
  getContract(): Promise<void>;
  setContract(viewMethods: any, changeMethods: any): Promise<boolean>;
  init(): Promise<void>;
  connect(): void;
  disconnect(): void;
  isConnected(): Promise<boolean>;
  setWalletAsSignedIn(): Promise<void>;
  signIn(): Promise<void>;

  createContract(contractAddress: string, viewMethods: string[], changeMethods: string[]): Promise<any>;
  callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any>;
}
