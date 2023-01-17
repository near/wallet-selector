import type { AccountImportData } from "@near-wallet-selector/core";

import {
  encryptAccountData,
  decryptAccountData,
  encodeAccountData,
  decodeAccountData,
} from "./importAccount";

describe("import account utils", () => {
  const accountData: Array<AccountImportData> = [
    {
      accountId: "test.near",
      privateKey: "test123",
    },
    {
      accountId: "test2.near",
      privateKey: "test456",
    },
  ];
  it("encryption and decription accountData", () => {
    const secretKey = "mE@~H?QyyC8fpy,PC7sv#//w5W4SFfYO";

    const ciphertext = encryptAccountData({ accountData, secretKey });
    const decryptedAccountData = decryptAccountData({ ciphertext, secretKey });

    expect(accountData).toEqual(decryptedAccountData);
  });

  it("encode and decode accountData", () => {
    const encodedAccountData = encodeAccountData(accountData);
    const decodedAccountData = decodeAccountData(encodedAccountData);

    expect(accountData).toEqual(decodedAccountData);
  });
});
