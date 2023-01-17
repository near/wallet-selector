import CryptoJS from "crypto-js";

import type { AccountImportData } from "@near-wallet-selector/core";

export const encodeAccountData = (
  accountsData: Array<AccountImportData>
): string => encodeURIComponent(JSON.stringify(accountsData));

export const decodeAccountData = (
  encodedAccountsData: string
): Array<AccountImportData> =>
  JSON.parse(decodeURIComponent(encodedAccountsData));

interface encryptAccountDataProps {
  accountData: Array<AccountImportData>;
  secretKey: string;
}

export const encryptAccountData = ({
  accountData,
  secretKey,
}: encryptAccountDataProps): CryptoJS.lib.CipherParams => {
  return CryptoJS.AES.encrypt(JSON.stringify(accountData), secretKey);
};

interface decryptAccountDataProps {
  ciphertext: CryptoJS.lib.CipherParams;
  secretKey: string;
}

export const decryptAccountData = ({
  ciphertext,
  secretKey,
}: decryptAccountDataProps): Array<AccountImportData> => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
