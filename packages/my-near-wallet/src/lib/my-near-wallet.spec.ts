/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "./my-near-wallet";
import type { MyNearWalletConnector } from "./mnw-connect";

const accountId = "amirsaran.testnet";
const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

const createMyNearWallet = async (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<MyNearWalletConnector>();

  const { wallet } = await mockWallet<InjectedWallet>(
    setupMyNearWallet(),
    deps
  );

  return {
    walletConnection,
    wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it.skip("sign into meteor wallet", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });

    expect(walletConnection.requestSignIn).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it.skip("sign out of meteor wallet", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(walletConnection.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it.skip("returns array of accounts", async () => {
    const { wallet } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(result).toEqual([{ accountId, publicKey }]);
  });
});

describe("signAndSendTransaction", () => {
  it.skip("sign transaction in meteor wallet", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(walletConnection.signAndSendTransaction).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it.skip("sign transactions in meteor wallet", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

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

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(walletConnection.signAndSendTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
