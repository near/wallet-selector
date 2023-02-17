import type { Action } from "@near-wallet-selector/core";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      request: <T>(
        request:
          | SnapRpcMethodRequest
          | {
              method: string;
              params?: SignTransactionRequestParams | unknown;
            }
      ) => Promise<T>;
    };
  }
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskNearRpcRequest];
}

export type MetamaskNearRpcRequest = GetAccountRequest | SignTransactionRequest;

export interface GetAccountRequest {
  method: "near_getAccount";
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
  nonce: number;
  recentBlockHash: string;
}
export interface SignTransactionRequest {
  method: "near_signTransactions";
  params: SignTransactionRequestParams;
}
export interface SignTransactionRequestParams {
  network: "testnet" | "mainnet";
  transactions: Array<Transaction>;
}

export type GetAccountPayload = {
  accountId: string;
  publicKey: string;
};
