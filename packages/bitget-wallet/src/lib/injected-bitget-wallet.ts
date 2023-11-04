import type { providers } from "near-api-js";
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

interface signMessageResponse {
  accountId: string;
  message: string;
  blockId: string;
  publicKey: string;
  keyType: "0"; // TODO: get keyType from sdk wallet
  signature: string;
}

export interface InjectedBitgetWallet {
  isBitKeepChrome: boolean;
  callbacks: Record<keyof BitgetWalletEvents, unknown>;
  getAccountId: () => string | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
  getPublicKey: () => string;
  signMessage: (
    encoded: string,
    accountId: string | null,
    networkId: string
  ) => Promise<signMessageResponse>;
  on: <Event extends keyof BitgetWalletEvents>(
    event: Event,
    callback: BitgetWalletEvents[Event]
  ) => void;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
  batchImport: (params: batchImportParams) => Promise<unknown>;
}
