import type { Transaction } from "@near-wallet-selector/core";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers/index.js";
import type { PublicKey as NearPublicKey } from "near-api-js/lib/utils/index.js";

export interface NearAccount {
  accountId: string;
  publicKey: NearPublicKey;
}

export interface XDEFIAccount {
  accountId: string;
  publicKey: NearPublicKey;
}

export interface NearXDEFI {
  accounts: Array<XDEFIAccount>;
  connected: boolean;
  signAndSendTransaction: (
    transaction: Transaction
  ) => Promise<FinalExecutionOutcome>;
  signAndSendTransactions: (
    transactions: Array<Transaction>
  ) => Promise<Array<FinalExecutionOutcome>>;
  connect: (network: string) => Promise<Array<XDEFIAccount>>;
  disconnect: () => Promise<void>;
}

export interface InjectedXDEFI {
  near: NearXDEFI;
}
