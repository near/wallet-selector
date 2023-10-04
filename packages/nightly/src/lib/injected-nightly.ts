import type {
  AccountImportData,
  SignedMessage,
  SignMessageParams,
} from "@near-wallet-selector/core";
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
  importWalletsNear: (privKeys: Array<AccountImportData>) => Promise<void>;
}
export interface InjectedNightly {
  near: NearNightly;
  invalidate: () => void;
}
