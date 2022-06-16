import {
  SignedTransaction as NearSignedTransaction,
  Transaction as NearTransaction,
} from "near-api-js/lib/transaction";
import { PublicKey as NearPublicKey } from "near-api-js/lib/utils";
export interface NearAccount {
  accountId: string;
  publicKey: NearPublicKey;
}
export interface WalletAdapter {
  account: NearAccount;
  connected: boolean;
  signTransaction: (
    transaction: NearTransaction
  ) => Promise<NearSignedTransaction>;
  signAllTransactions: (
    transaction: Array<NearTransaction>
  ) => Promise<Array<NearSignedTransaction>>;
  connect: (onDisconnect?: () => void) => Promise<NearAccount>;
  disconnect: () => Promise<void>;
}

export interface NightlyAccount {
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
}
export interface InjectedNightly {
  near: NearNightly;
  invalidate: () => void;
}
