import { providers } from "near-api-js";

export interface RequestSignInResponse {
  accessKey: boolean;
  error: string | { type: string };
}

export type SignOutResponse = true | { error: string | { type: string } };

export interface RequestSignInParams {
  contractId: string;
  methodNames?: Array<string>;
  amount?: string;
}

export interface RpcChangedResponse {
  explorerUrl: string;
  helperUrl: string;
  index: number;
  name: string;
  network: string;
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  wrapNearContract: string;
}

export interface Action {
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
}

export interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<Action>;
}

export interface SignAndSendTransactionResponse {
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
}

export interface SignAndSendTransactionsResponse {
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

export interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

export interface TokenaryEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

export interface InjectedTokenary {
  isTokenary: boolean;
  callbacks: Record<keyof TokenaryEvents, unknown>;
  getAccountId: () => string | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
  on: <Event extends keyof TokenaryEvents>(
    event: Event,
    callback: TokenaryEvents[Event]
  ) => void;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
}
