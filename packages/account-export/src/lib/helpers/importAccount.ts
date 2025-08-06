import nacl from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from "tweetnacl-util";

import type { AccountImportData } from "@near-wallet-selector/core";

interface DecryptAccountDataProps {
  ciphertext: string;
  secretKey: string;
}

interface EncryptAccountDataProps {
  accountData: Array<AccountImportData>;
  secretKey: string;
}

export const encryptAccountData = ({
  accountData,
  secretKey,
}: EncryptAccountDataProps): string => {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }
  try {
    const keyUint8Array = decodeBase64(
      Buffer.from(secretKey).toString("base64")
    );
    const messageUint8Array = decodeUTF8(JSON.stringify(accountData));
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const box = nacl.secretbox(messageUint8Array, nonce, keyUint8Array);
    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return encodeBase64(fullMessage);
  } catch (e) {
    throw new Error("Unable to encrypt account data");
  }
};

export const decryptAccountData = ({
  ciphertext,
  secretKey,
}: DecryptAccountDataProps): Array<AccountImportData> => {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }
  try {
    const keyUint8Array = decodeBase64(
      Buffer.from(secretKey).toString("base64")
    );
    const messageWithNonceAsUint8Array = decodeBase64(ciphertext);
    const nonce = messageWithNonceAsUint8Array.slice(
      0,
      nacl.secretbox.nonceLength
    );
    const message = messageWithNonceAsUint8Array.slice(
      nacl.secretbox.nonceLength,
      ciphertext.length
    );
    const decrypted = nacl.secretbox.open(message, nonce, keyUint8Array);
    if (!decrypted) {
      throw new Error("Unable to decrypt account data");
    }
    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  } catch {
    throw new Error("Unable to decrypt account data");
  }
};

export const generateSecretKey = (): string => {
  const random = nacl.randomBytes(24);
  return encodeBase64(random);
};
