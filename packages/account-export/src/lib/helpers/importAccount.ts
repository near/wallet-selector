import type { AccountImportData } from "@near-wallet-selector/core";
import { secretbox } from "@noble/ciphers/salsa";
import { randomBytes } from "@noble/hashes/utils";
import { base64 } from "ethers/lib/utils";

interface DecryptAccountDataProps {
  ciphertext: string;
  secretKey: string;
}

interface EncryptAccountDataProps {
  accountData: Array<AccountImportData>;
  secretKey: string;
}

const Sizes = {
  NONCE: 24,
};

export const encryptAccountData = ({
  accountData,
  secretKey,
}: EncryptAccountDataProps): string => {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }
  try {
    const keyUint8Array = base64.decode(
      Buffer.from(secretKey).toString("base64")
    );

    const messageUint8Array = stringToUint8Array(JSON.stringify(accountData));
    const nonce = randomBytes(Sizes.NONCE);
    const box = secretbox(keyUint8Array, nonce).seal(messageUint8Array);
    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return Buffer.from(fullMessage).toString("base64");
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
    const keyUint8Array = base64.decode(
      Buffer.from(secretKey).toString("base64")
    );
    const messageWithNonceAsUint8Array = base64.decode(ciphertext);
    const nonce = messageWithNonceAsUint8Array.slice(0, Sizes.NONCE);
    const message = messageWithNonceAsUint8Array.slice(
      Sizes.NONCE,
      ciphertext.length
    );
    const decrypted = secretbox(keyUint8Array, nonce).open(message);
    if (!decrypted) {
      throw new Error("Unable to decrypt account data");
    }

    return JSON.parse(uint8ArrayToString(decrypted));
  } catch {
    throw new Error("Unable to decrypt account data");
  }
};

export const generateSecretKey = (): string => {
  const random = randomBytes(Sizes.NONCE);
  return Buffer.from(random).toString("base64");
};

const stringToUint8Array = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const uint8ArrayToString = (arr: Uint8Array) => {
  const decoder = new TextDecoder();
  return decoder.decode(arr);
};
