import {
  generateAccountId,
  isValidAccountId,
  formatNearAmount,
  WebAuthnWalletError,
  ERROR_CODES,
} from "./utils";

describe("utils", () => {
  describe("generateAccountId", () => {
    it("should generate account ID with testnet suffix", () => {
      const accountId = generateAccountId("testnet");

      expect(accountId).toMatch(/^[a-z]+-[a-z]+-\d+\.testnet$/);
    });

    it("should generate account ID with mainnet suffix", () => {
      const accountId = generateAccountId("mainnet");

      expect(accountId).toMatch(/^[a-z]+-[a-z]+-\d+\.near$/);
    });
  });

  describe("isValidAccountId", () => {
    it("should validate correct testnet account IDs", () => {
      expect(isValidAccountId("test-account.testnet")).toBe(true);
      expect(isValidAccountId("happy-wallet-123.testnet")).toBe(true);
      expect(isValidAccountId("user_name.testnet")).toBe(true);
      expect(isValidAccountId("abc-123.testnet")).toBe(true);
    });

    it("should validate correct mainnet account IDs", () => {
      expect(isValidAccountId("test-account.near")).toBe(true);
      expect(isValidAccountId("happy-wallet-123.near")).toBe(true);
      expect(isValidAccountId("user_name.near")).toBe(true);
    });

    it("should reject invalid account IDs", () => {
      expect(isValidAccountId("invalid")).toBe(false);
      expect(isValidAccountId("UPPERCASE.testnet")).toBe(false);
      expect(isValidAccountId("no-suffix")).toBe(false);
      expect(isValidAccountId("space name.testnet")).toBe(false);
      expect(isValidAccountId(".testnet")).toBe(false);
      expect(isValidAccountId("")).toBe(false);
    });
  });
});
