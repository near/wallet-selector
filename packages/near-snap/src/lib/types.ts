
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      request: <T>(
        request: SnapRpcMethodRequest | { method: string; params?: any[] }
      ) => Promise<T>;
    };
  }
}


export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskNearRpcRequest];
}

export type MetamaskNearRpcRequest =
  | GetAccountRequest
  | SignTransactionRequest;

export interface GetAccountRequest {
  method: "near_getAccount";
}

export interface SignTransactionRequest {
  method: "near_signTransactions";
  params: {
    network: "testnet" | "mainnet",
    transactions: {
      receiverId: string,
      actions: Array<any>,
      nonce: number,
      recentBlockHash: string,
    }[]
  }
}

export type GetSnapsResponse = {
  [k: string]: {
    permissionName?: string;
    id?: string;
    version?: string;
    initialPermissions?: { [k: string]: unknown };
  };
};
