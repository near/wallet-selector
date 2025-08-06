// Interfaces based on "documentation": https://github.com/SenderWallet/sender-wallet-integration-tutorial

// Empty string if we haven't signed in before.
import type { Account, providers } from "near-api-js";

interface AccessKey {
  publicKey: {
    data: Uint8Array;
    keyType: number;
  };
  secretKey: string;
}

interface RequestSignInResponse {
  accessKey: AccessKey;
  error: string | { type: string };
  notificationId: number;
  type: "sender-wallet-result";
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
  notificationId: number;
  rpc: RpcInfo;
  type: "sender-wallet-result";
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

// Seems to reuse signAndSendTransactions internally, hence the wrong method name and list of responses.
interface SignAndSendTransactionResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
  type: "sender-wallet-extensionResult";
}

interface SignAndSendTransactionsResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
  type: "sender-wallet-extensionResult";
}

interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

interface SenderEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

export interface InjectedSender {
  isSender: boolean;
  callbacks: Record<keyof SenderEvents, unknown>;
  getAccountId: () => string | null;
  getRpc: () => Promise<GetRpcResponse>;
  account(): Account | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
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
