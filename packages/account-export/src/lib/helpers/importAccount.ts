import CryptoJS from "crypto-js";
import generator from "generate-password";

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
    return CryptoJS.AES.encrypt(
      JSON.stringify(accountData),
      secretKey
    ).toString();
  } catch {
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
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    throw new Error("Unable to decrypt account data");
  }
};

export const generateSecretKey = (): string =>
  generator.generate({
    length: 32,
    numbers: true,
    strict: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  });
