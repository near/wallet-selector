import { Action } from "@near-wallet-selector/core";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      request: <T>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: SnapRpcMethodRequest | { method: string; params?: Array<any> }
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
  params: {
    network: "testnet" | "mainnet";
    transactions: Array<Transaction>;
  };
}

export type GetSnapsResponse = {
  [k: string]: {
    permissionName?: string;
    id?: string;
    version?: string;
    initialPermissions?: { [k: string]: unknown };
  };
};

export type GetAccountPayload = {
  accountId: string;
  publicKey: string;
};
