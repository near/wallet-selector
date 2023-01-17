import type { AccountImportData } from "../wallet";

export const encodeAccountData = (
  accountsData: Array<AccountImportData>
): string => encodeURIComponent(JSON.stringify(accountsData));

export const decodeAccountData = (
  encodedAccountsData: string
): Array<AccountImportData> =>
  JSON.parse(decodeURIComponent(encodedAccountsData));
