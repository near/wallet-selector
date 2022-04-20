// Interfaces based on "documentation": https://github.com/SenderWallet/sender-wallet-integration-tutorial

// Empty string if we haven't signed in before.
import { providers } from "near-api-js";

interface AccessKey {
  publicKey: {
    data: Uint8Array;
    keyType: number;
  };
  secretKey: string;
}

export interface RequestSignInResponse {
  accessKey: AccessKey;
  error:
    | string
    | {
        type: string;
      };
  notificationId: number;
  type: "sender-wallet-result";
}

export type SignOutResponse = boolean | { error: string | { type: string } };

export interface RpcInfo {
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

export interface GetRpcResponse {
  method: "getRpc";
  notificationId: number;
  rpc: RpcInfo;
  type: "sender-wallet-result";
}

export interface RequestSignInParams {
  contractId: string;
  methodNames?: Array<string>;
  amount?: string; // in yoctoⓃ
}

export interface RpcChangedResponse {
  method: "rpcChanged";
  notificationId: number;
  rpc: RpcInfo;
  type: "sender-wallet-fromContent";
}

export interface SendMoneyParams {
  receiverId: string;
  amount: string;
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

// Seems to reuse signAndSendTransactions internally, hence the wrong method name and list of responses.
export interface SignAndSendTransactionResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
  type: "sender-wallet-extensionResult";
}

export interface SignAndSendTransactionsResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
  type: "sender-wallet-extensionResult";
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

export interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

export interface SenderEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

export interface InjectedSender {
  isSender: boolean;
  getAccountId: () => string | null;
  getRpc: () => Promise<GetRpcResponse>;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  on: <Event extends keyof SenderEvents>(
    event: Event,
    callback: SenderEvents[Event]
  ) => void;
  // TODO: Determine return type.
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
}
