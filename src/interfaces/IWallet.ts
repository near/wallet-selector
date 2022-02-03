export interface FunctionCallAction {
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
}

export interface ViewParams {
  contractId: string;
  methodName: string;
  args?: object;
}

export interface CallParams {
  receiverId: string;
  actions: Array<FunctionCallAction>;
}

export default interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;
  getShowWallet(): boolean;

  walletSelected(): void;
  init(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): Promise<boolean>;
  setWalletAsSignedIn(): Promise<void>;
  signIn(): Promise<void>;
  getAccount(): Promise<any>;
  view(params: ViewParams): Promise<any>;
  call(params: CallParams): Promise<any>;
}
