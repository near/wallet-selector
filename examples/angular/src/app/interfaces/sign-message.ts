import type { Network } from "@near-wallet-selector/core";

export interface VerifySignatureParams {
  publicKey: string;
  signature: string;
  message: string;
  receiver: string;
  nonce: Buffer;
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
