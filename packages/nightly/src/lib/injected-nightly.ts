import type {
  SignedTransaction as NearSignedTransaction,
  Transaction as NearTransaction,
} from "near-api-js/lib/transaction";
import type { PublicKey as NearPublicKey } from "near-api-js/lib/utils";
interface NightlyAccount {
  accountId: string;
  publicKey: NearPublicKey;
}
export interface NearNightly {
  account: NightlyAccount;
  connected: boolean;
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
