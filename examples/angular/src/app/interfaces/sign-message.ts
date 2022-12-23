import type { Network } from "@near-wallet-selector/core";

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
