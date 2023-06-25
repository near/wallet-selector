/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import { setupMeteorWallet } from "./meteor-wallet";
import type { MeteorWallet as MeteorWalletSdk } from "@meteorwallet/sdk";

const accountId = "amirsaran.testnet";
const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

const createMeteorWallet = async (deps: MockWalletDependencies = {}) => {
  const meteorWalletSdk = mock<MeteorWalletSdk>();

  const { wallet } = await mockWallet<InjectedWallet>(
    setupMeteorWallet(),
    deps
  );

  return {
    meteorWalletSdk,
    wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it.skip("sign into meteor wallet", async () => {
    const { wallet, meteorWalletSdk } = await createMeteorWallet();

    await wallet.signIn({ contractId: "test.testnet" });

    expect(meteorWalletSdk.requestSignIn).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it.skip("sign out of meteor wallet", async () => {
    const { wallet, meteorWalletSdk } = await createMeteorWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(meteorWalletSdk.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it.skip("returns array of accounts", async () => {
    const { wallet } = await createMeteorWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(result).toEqual([{ accountId, publicKey }]);
  });
});

describe("signAndSendTransaction", () => {
  it.skip("sign transaction in meteor wallet", async () => {
    const { wallet, meteorWalletSdk } = await createMeteorWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(meteorWalletSdk.account).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it.skip("sign transactions in meteor wallet", async () => {
    const { wallet, meteorWalletSdk } = await createMeteorWallet();

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

    expect(meteorWalletSdk.account).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
