import { Transaction } from "@near-wallet-selector/core";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { PublicKey as NearPublicKey } from "near-api-js/lib/utils";

export interface NearAccount {
  accountId: string;
  publicKey: NearPublicKey;
}

export interface XDEFIAccount {
  accountId: string;
  publicKey: NearPublicKey;
}

export interface NearXDEFI {
  accounts: XDEFIAccount[];
  connected: boolean;
  signAndSendTransaction: (transaction: Transaction) => Promise<FinalExecutionOutcome>;
  signAndSendTransactions: (transactions: Array<Transaction>) => Promise<Array<FinalExecutionOutcome>>;
  connect: () => Promise<XDEFIAccount[]>;
  disconnect: () => Promise<void>;
}

export interface InjectedXDEFI {
  near: NearXDEFI;
}
