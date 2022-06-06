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

export declare class NightlyInjected {
  near: NearNightly;
  private readonly _nightlyEventsMap;
  constructor();
  invalidate(): void;
}

export declare class NearNightly {
  account: NearAccount;
  _onDisconnect: () => void;
  private readonly _nightlyEventsMap;
  constructor(eventMap: Map<string, (data: unknown) => unknown>);
  connect(
    onDisconnect?: () => void,
    eagerConnect?: boolean
  ): Promise<NearAccount>;
  disconnect(): Promise<void>;
  signTransaction: (
    transaction: NearTransaction
  ) => Promise<NearSignedTransaction>;
  signAllTransactions: (
    transaction: Array<NearTransaction>
  ) => Promise<Array<NearSignedTransaction>>;
}
