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

export interface DojoAccount {
  accountId: string;
  publicKey: NearPublicKey;
}
export interface NearDojo {
  account: DojoAccount;
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
  ) => Promise<DojoAccount>;
  disconnect: () => Promise<void>;
}
export interface InjectedDojo {
  near: NearDojo;
  invalidate: () => void;
}
