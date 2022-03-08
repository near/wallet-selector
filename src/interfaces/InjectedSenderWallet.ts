// Interfaces based on "documentation": https://github.com/SenderWallet/sender-wallet-integration-tutorial

// Empty string if we haven't signed in before.
import { FinalExecutionOutcome } from "near-api-js/lib/providers";

interface AccessKey {
  publicKey: {
    data: Uint8Array;
    keyType: number;
  };
  secretKey: string;
}

export interface RequestSignInResponse {
  accessKey: AccessKey;
  error: string;
  notificationId: number;
  type: "sender-wallet-result";
}

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
  responses?: Array<FinalExecutionOutcome>;
  type: "sender-wallet-extensionResult";
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

export interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

export interface SenderWalletEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

interface InjectedSenderWallet {
  isSender: boolean;
  getAccountId: () => string;
  getRpc: () => Promise<GetRpcResponse>;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => boolean;
  isSignedIn: () => boolean;
  on: <Event extends keyof SenderWalletEvents>(
    event: Event,
    callback: SenderWalletEvents[Event]
  ) => void;
  // TODO: Determine return type.
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  // TODO: Determine return type.
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<unknown>;
}

export default InjectedSenderWallet;
