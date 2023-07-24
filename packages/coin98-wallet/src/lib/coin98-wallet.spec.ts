/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import { setupCoin98Wallet } from "./coin98-wallet";
import type { Signer } from "near-api-js/lib/signer";

const accountId = "amirsaran.testnet";
const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

const mockCoin98WalletOnWindow = () => {
  window.coin98 = {
    near: {
      account: "",
      signer: mock<Signer>({
        createKey: jest.fn(),
        signMessage: jest.fn().mockReturnValue({
          signature: Buffer.from([
            86, 38, 222, 143, 115, 251, 107, 14, 115, 59, 92, 98, 66, 174, 173,
            124, 209, 189, 191, 180, 89, 25, 125, 254, 97, 240, 178, 98, 65, 70,
            238, 108, 105, 122, 165, 249, 193, 70, 118, 194, 126, 218, 117, 100,
            250, 124, 202, 161, 173, 12, 232, 146, 105, 194, 138, 35, 207, 53,
            84, 218, 45, 220, 10, 4,
          ]),
          publicKey,
        }),
        getPublicKey: jest.fn().mockReturnValue(publicKey),
      }),
      connect: jest.fn(async () => {
        window.coin98.near.account = accountId;
        return "";
      }),
      disconnect: jest.fn(),
    },
  };

  return window.coin98;
};

const createCoin98Wallet = async (deps: MockWalletDependencies = {}) => {
  const injectedCoin98Wallet = mockCoin98WalletOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(
    setupCoin98Wallet(),
    deps
  );

  return {
    wallet,
    injectedCoin98Wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into coin98 wallet", async () => {
    const { wallet, injectedCoin98Wallet } = await createCoin98Wallet();

    await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedCoin98Wallet.near.connect).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of coin98 wallet", async () => {
    const { wallet, injectedCoin98Wallet } = await createCoin98Wallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedCoin98Wallet.near.disconnect).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, injectedCoin98Wallet } = await createCoin98Wallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedCoin98Wallet.near.signer.getPublicKey).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey }]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in coin98", async () => {
    const { wallet, injectedCoin98Wallet } = await createCoin98Wallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedCoin98Wallet.near.signer.signMessage).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in coin98", async () => {
    const { wallet, injectedCoin98Wallet } = await createCoin98Wallet();

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

    expect(injectedCoin98Wallet.near.signer.signMessage).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
