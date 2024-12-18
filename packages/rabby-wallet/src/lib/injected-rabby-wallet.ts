export interface AccessKey {
  publicKey: string;
  secretKey: string;
}

interface RequestSignInResponse {
  accessKey: AccessKey;
  accountId: string;
  error: string | { type: string };
}

export type SignOutResponse = true | { error: string | { type: string } };

interface RequestSignInParams {
  contractId?: string;
  methodNames?: Array<string>;
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

export interface SignAndSendTransactionResponse {
  method: string;
  txHash: string;
  code: number;
}

interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

interface RequestSignTransactionsResponse {
  txs: Array<{
    signedTx: string;
  }>;
}

export interface RabbyEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
}

export interface InjectedRabby {
  getAccountId: () => string | null;
  requestSignIn: (
    params: RequestSignInParams
  ) => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: () => boolean;
  on: <Event extends keyof RabbyEvents>(
    event: Event,
    callback: RabbyEvents[Event]
  ) => void;
  signTransaction: (params: SignAndSendTransactionParams) => Promise<string>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<RequestSignTransactionsResponse>;
}
