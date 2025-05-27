import type { providers } from "near-api-js";
import type { AccountImportData, Action } from "@near-wallet-selector/core";

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

export interface FunctionCallError {
  error: {
    index: number;
    kind: object;
    message: string;
    transaction_outcome: object;
    type: "FunctionCallError";
  };
}

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

interface verifyOwnerResponse {
  accountId: string;
  message: string;
  blockId: string;
  publicKey: string;
  keyType: 0; // TODO: get keyType from sdk wallet
  signature: string;
}

interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<Action>;
}

interface requestSignTransactionsParams {
  transactions: Array<{
    receiverId: string;
    actions: Array<Action>;
  }>;
}

export interface InjectedBitgetWallet {
  isBitKeepChrome: boolean;
  callbacks: Record<keyof BitgetWalletEvents, unknown>;
  getAccountId: () => string;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  remove: (event: string) => void;
  getPublicKey: () => Promise<string>;
  verifyOwner: (
    encoded: string,
    accountId: string | null,
    networkId: string
  ) => Promise<verifyOwnerResponse>;
  on: <Event extends keyof BitgetWalletEvents>(
    event: Event,
    callback: BitgetWalletEvents[Event]
  ) => void;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: requestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
}
