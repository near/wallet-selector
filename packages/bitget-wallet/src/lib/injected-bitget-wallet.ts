import type { Account, providers } from "near-api-js";
import type { AccountImportData } from "@near-wallet-selector/core";

export interface AccessKey {
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
  type: "bitget-wallet-result";
}

export type SignOutResponse = true | { error: string | { type: string } };

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
  type: "bitget-wallet-result";
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

export interface FunctionCallError {
  error: {
    index: number;
    kind: object;
    message: string;
    transaction_outcome: object;
    type: "FunctionCallError";
  };
}

// Seems to reuse signAndSendTransactions internally, hence the wrong method name and list of responses.
export interface SignAndSendTransactionResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
  type: "bitget-wallet-extensionResult";
}

interface SignAndSendTransactionsResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome> | FunctionCallError;
  type: "bitget-wallet-extensionResult";
}

interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

export interface BitgetWalletEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

export interface batchImportParams {
  keystore: Array<AccountImportData>;
  network: string;
}

export interface InjectedBitgetWallet {
  isBitKeepChrome: boolean;
  callbacks: Record<keyof BitgetWalletEvents, unknown>;
  getAccountId: () => string | null;
  // getPublicKey: Promise<string>;
  getRpc: () => Promise<GetRpcResponse>;
  account(): Account | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
  on: <Event extends keyof BitgetWalletEvents>(
    event: Event,
    callback: BitgetWalletEvents[Event]
  ) => void;
  // TODO: Determine return type.
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
  batchImport: (params: batchImportParams) => Promise<unknown>;
}
