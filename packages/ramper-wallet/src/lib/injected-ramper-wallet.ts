import type { Transaction } from "@near-wallet-selector/core";
import type {
  NearNetwork,
  RamperInstance,
  SignInResult,
  SignInWithProvider,
  TransactionResultType,
  User,
} from "@ramper/near";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";

type TransactionResult = {
  type: TransactionResultType;
  result?: string | Error;
};

type SendTransactionResult = Omit<TransactionResult, "result"> & {
  type: TransactionResultType;
  txHashes: Array<string>;
  result?: Array<FinalExecutionOutcome | Error> | Error;
};

type SendTransactionParams = {
  transactionActions: Array<Transaction>;
  network?: NearNetwork;
};

export interface InjectedRamperWallet extends RamperInstance {
  signIn: (clientAPIKey?: string) => Promise<SignInResult>;
  signInWithProvider: SignInWithProvider;
  signOut: () => void;
  getUser: () => User;
  openWallet: () => void;
  sendTransaction: (
    params: SendTransactionParams
  ) => Promise<SendTransactionResult>;
}
