import type { AccountView } from "near-api-js/lib/providers/provider";
import type { Network } from "@near-wallet-selector/core";

export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

export type Account = AccountView & {
  account_id: string;
};

export interface VerifySignatureParams {
  publicKey: string;
  signature: string;
  message: string;
  nonce: Buffer;
  receiver: string;
}

export interface FetchUserKeysParams {
  accountId: string;
  network: Network;
}

export interface KeyBelongsToUserParams {
  publicKey: string;
  accountId: string;
  network: Network;
}
