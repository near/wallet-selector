import type { Network } from "../../options.types";
import { KeyType } from "@near-js/crypto";

export interface IPublicKey {
  keyType: KeyType,
  data: Uint8Array
}

export interface VerifySignatureParams {
  publicKey: IPublicKey;
  signature: string;
  message: string;
  nonce: Buffer;
  recipient: string;
  callbackUrl?: string;
}

export interface VerifyFullKeyBelongsToUserParams {
  publicKey: IPublicKey;
  accountId: string;
  network: Network;
}

export interface ViewAccessKeyParams {
  publicKey: IPublicKey;
  accountId: string;
  network: Network;
}
