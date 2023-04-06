import type { Action } from "@near-wallet-selector/core";

export interface WelldoneWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

export interface ViewAccessKeyParams {
  accountId: string;
  publicKey: string;
}

export interface SignAndSendTransactionParams {
  signerId?: string;
  receiverId?: string;
  actions: Array<Action>;
}

export interface RequestParams {
  jsonrpc?: "2.0";
  id?: number;
  method: string;
  params?: object;
}

export interface WalletProvider {
  getAccount: () => Promise<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (chain: string, args: RequestParams) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (message: string, listener: (...args: Array<any>) => void) => void;
}

export interface WelldoneWalletState {
  wallet?: WalletProvider;
  account?: ViewAccessKeyParams;
}
