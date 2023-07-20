/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import { setupNarwallets } from "./narwallets";
import type { InjectedWallet } from "@near-wallet-selector/core";

const accountId = "test-account.testnet";
const transactions = [
  {
    signerId: accountId,
    receiverId: "test.testnet",
    actions: [],
  },
  {
    signerId: accountId,
    receiverId: "test.testnet",
    actions: [],
  },
];

const mockNarWalletOnWindow = () => {
  window.postMessage = jest.fn();
  window.narwallets = mock<InjectedWallet>();

  return window.narwallets;
};

const createNarWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedNarWallet = mockNarWalletOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(setupNarwallets(), deps);

  return {
    wallet,
    injectedNarWallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it.skip("sign into nar wallet", async () => {
    const { wallet, injectedNarWallet } = await createNarWallet();

    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedNarWallet.signIn).toHaveBeenCalled();
    expect(accounts).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signOut", () => {
  it.skip("sign out of nar wallet", async () => {
    const { wallet, injectedNarWallet } = await createNarWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedNarWallet.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it.skip("returns array of accounts", async () => {
    const { wallet, injectedNarWallet } = await createNarWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedNarWallet.getAccounts).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signAndSendTransaction", () => {
  it.skip("sign transaction in nar wallet", async () => {
    const { wallet, injectedNarWallet } = await createNarWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedNarWallet.signAndSendTransaction).toHaveBeenCalled();
  });
});
describe("signAndSendTransactions", () => {
  it.skip("sign transactions in nar wallet", async () => {
    const { wallet, injectedNarWallet } = await createNarWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedNarWallet.signAndSendTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
