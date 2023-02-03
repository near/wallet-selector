// based on @near-wallet-selector/sender

import type { Account, providers } from "near-api-js";

interface AccessKey {
  publicKey: string;
  secretKey: string;
}

interface RequestSignInResponse {
  accessKey: AccessKey;
  error: string | { type: string };
}

type SignOutResponse = true | { error: string | { type: string } };

interface RpcInfo {
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

interface GetRpcResponse {
  method: "getRpc";
  rpc: RpcInfo;
}

interface RequestSignInParams {
  contractId: string;
  methodNames?: Array<string>;
  amount?: string; // in yoctoⓃ
}

interface RpcChangedResponse {
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

interface SendMoneyParams {
  receiverId: string;
  amount: string;
}

interface Action {
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
}

interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<Action>;
}

interface FunctionCallError {
  error: {
    index: number;
    kind: object;
    message: string;
    transaction_outcome: object;
    type: "FunctionCallError";
  };
}

interface SignAndSendTransactionResponse {
  method: "signAndSendTransactions";
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
}

interface SignAndSendTransactionsResponse {
  method: "signAndSendTransactions";
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
}

interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

interface FinerEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

interface SignMessageData {
  accountId: string;
  message: string;
  blockId: string;
  publicKey: string;
  keyType: number;
  signature: string;
}

interface SignMessageResponse {
  method: "signMessage";
  error?: string;
  response?: SignMessageData;
}

export interface InjectedFiner {
  isSender: boolean;
  isFiner: boolean;
  getAccountId: () => string | null;
  getRpc: () => Promise<GetRpcResponse>;
  account(): Account | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
  on: <Event extends keyof FinerEvents>(
    event: Event,
    callback: FinerEvents[Event]
  ) => void;
  // TODO: Determine return type.
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
  signMessage: (message: string) => Promise<SignMessageResponse>;
}
