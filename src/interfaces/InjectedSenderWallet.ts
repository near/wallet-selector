// Interfaces based on "documentation": https://github.com/SenderWallet/sender-wallet-integration-tutorial

export interface InitParams {
  contractId: string;
}

// Empty string if we haven't signed in before.
export interface InitResponse {
  accessKey: "" | {
    publicKey: {
      data: Uint8Array;
      keyType: number;
    };
    secretKey: string;
  };
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
}

export interface SignOutResponse {
  // TODO: Figure out when this isn't "success".
  result: "success";
}

export type AccountChangedCallback = (newAccountId: string) => void;

export interface RpcChangedResponse {
  method: "rpcChanged";
  notificationId: number;
  rpc: RpcInfo;
  type: "sender-wallet-fromContent";
}

export type RpcChangedCallback = (newRpc: RpcChangedResponse) => void;

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

export interface SignAndSendTransactionResponse {
  error?: string;
  method: "signAndSendTransaction";
  notificationId: number;
  // TODO: Heavily nested objects. Define if needed.
  res?: Array<object>;
  type: "sender-wallet-result";
  url: string;
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

export interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

interface InjectedSenderWallet {
  init: (params: InitParams) => Promise<InitResponse>;
  getAccountId: () => string;
  getRpc: () => Promise<GetRpcResponse>;
  requestSignIn: (params: RequestSignInParams) => Promise<InitResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  onAccountChanged: (callback: AccountChangedCallback) => void;
  onRpcChanged: (callback: RpcChangedCallback) => void;
  // TODO: Determine return type.
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction : (params: SignAndSendTransactionParams) => Promise<SignAndSendTransactionResponse>;
  // TODO: Determine return type.
  requestSignTransactions : (params: RequestSignTransactionsParams) => Promise<unknown>;
}

export default InjectedSenderWallet;