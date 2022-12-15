import type {
  SignedTransaction as NearSignedTransaction,
  Transaction as NearTransaction,
} from "near-api-js/lib/transaction";
import type { PublicKey as NearPublicKey } from "near-api-js/lib/utils";
import type {
  SignedMessage,
  SignMessageParams,
} from "@near-wallet-selector/core";
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
    onDisconnect?: () => void,
    eagerConnect?: boolean
  ) => Promise<NightlyAccount>;
  disconnect: () => Promise<void>;
  signMessage: (params: SignMessageParams) => Promise<SignedMessage>;
}
export interface InjectedNightly {
  near: NearNightly;
  invalidate: () => void;
}
