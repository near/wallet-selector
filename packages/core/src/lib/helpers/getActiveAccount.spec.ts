import { getActiveAccount } from "./getActiveAccount";
import type { WalletSelectorState } from "../store.types";

describe("getActiveAccount", () => {
  it("should return the active account when one exists", () => {
    const state: WalletSelectorState = {
      contract: null,
      modules: [],
      accounts: [
        {
          accountId: "alice.near",
          active: false,
        },
        {
          accountId: "bob.near",
          active: true,
        },
        {
          accountId: "charlie.near",
          active: false,
        },
      ],
      selectedWalletId: "wallet-2",
      recentlySignedInWallets: [],
      rememberRecentWallets: "true",
    };

    const result = getActiveAccount(state);

    expect(result).toEqual({
      accountId: "bob.near",
      active: true,
    });
    expect(result?.accountId).toBe("bob.near");
  });

  it("should return null when no active account exists", () => {
    const state: WalletSelectorState = {
      contract: null,
      modules: [],
      accounts: [
        {
          accountId: "alice.near",
          active: false,
        },
        {
          accountId: "bob.near",
          active: false,
        },
      ],
      selectedWalletId: null,
      recentlySignedInWallets: [],
      rememberRecentWallets: "true",
    };

    const result = getActiveAccount(state);

    expect(result).toBeNull();
  });

  it("should return null when accounts array is empty", () => {
    const state: WalletSelectorState = {
      contract: null,
      modules: [],
      accounts: [],
      selectedWalletId: null,
      recentlySignedInWallets: [],
      rememberRecentWallets: "true",
    };

    const result = getActiveAccount(state);

    expect(result).toBeNull();
  });

  it("should return the account when only one account exists and it is active", () => {
    const state: WalletSelectorState = {
      contract: null,
      modules: [],
      accounts: [
        {
          accountId: "single.near",
          active: true,
        },
      ],
      selectedWalletId: "wallet-1",
      recentlySignedInWallets: [],
      rememberRecentWallets: "true",
    };

    const result = getActiveAccount(state);

    expect(result).not.toBeNull();
    expect(result?.accountId).toBe("single.near");
    expect(result?.active).toBe(true);
  });

  it("should return the first active account when multiple active accounts exist", () => {
    const state: WalletSelectorState = {
      contract: null,
      modules: [],
      accounts: [
        {
          accountId: "first.near",
          active: true,
        },
        {
          accountId: "second.near",
          active: true,
        },
      ],
      selectedWalletId: "wallet-1",
      recentlySignedInWallets: [],
      rememberRecentWallets: "true",
    };

    const result = getActiveAccount(state);

    expect(result?.accountId).toBe("first.near");
  });
});
