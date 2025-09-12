import type {
  SignedMessage,
  SignMessageParams,
} from "@near-wallet-selector/core";
import type {
  SignedTransaction as NearSignedTransaction,
  Transaction as NearTransaction,
} from "near-api-js/lib/transaction.js";
import type { PublicKey as NearPublicKey } from "near-api-js/lib/utils/index.js";
interface NightlyAccount {
  accountId: string;
  publicKey: NearPublicKey;
}
export interface NearNightly {
  account: NightlyAccount;
  isConnected: boolean;
  signMessage: (params: SignMessageParams) => Promise<SignedMessage>;
  signTransaction: (
    transaction: NearTransaction
  ) => Promise<NearSignedTransaction>;
  signAllTransactions: (
    transaction: Array<NearTransaction>
  ) => Promise<Array<NearSignedTransaction>>;
  connect: (
    onAccountChange?: (acc?: NightlyAccount) => void,
    eagerConnect?: boolean
  ) => Promise<NightlyAccount>;
  disconnect: () => Promise<void>;
}
export interface InjectedNightly {
  near: NearNightly;
  invalidate: () => void;
}
