export interface FunctionCallAction {
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
}

export interface WalletInfo {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface CallParams {
  receiverId: string;
  actions: Array<FunctionCallAction>;
}

export interface AccountInfo {
  accountId: string;
  balance: string;
}

export default interface IWallet {
  getShowWallet(): boolean;

  init(): Promise<void>;
  getInfo(): WalletInfo;
  disconnect(): Promise<void>;
  isConnected(): Promise<boolean>;
  signIn(): Promise<void>;
  getAccount(): Promise<AccountInfo | null>;
  // TODO: Determine standardised response.
  call(params: CallParams): Promise<unknown>;
}
