/* eslint-disable @nx/enforce-module-boundaries */
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import { setupWelldoneWallet } from "./welldone";
import type { RequestParams } from "./injected-welldone";

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextDecoder = require("util").TextDecoder;

const accountId = "amirsaran.testnet";
const publicKey = "ed25519:GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";
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

const mockWelldoneOnWindow = () => {
  window.dapp = {
    getAccount: jest.fn(),
    request: jest.fn(async (chain: string, args: RequestParams) => {
      if (chain === "near" && args.method === "dapp:accounts") {
        return {
          near: {
            address: accountId,
            pubKey: publicKey,
          },
        };
      } else if (chain === "near" && args.method === "query") {
        return {
          permission: "FullAccess",
        };
      } else if (chain === "near" && args.method === "dapp:signMessage") {
        return [
          {
            signature:
              "0x8f77971cdd4813c82f27dfce119472f78adc7552ddec4d6ac72dcc3c3deebb31c6d2d85fc7d1b68c1d22a7aa1a749e0a3607403603af9b7afc3fbe2115921509",
            publicKey,
          },
        ];
      } else if (chain === "near" && args.method === "dapp:signTransaction") {
        return [
          {
            signature:
              "0x0000000000e27d386ac7c349f60af93979f9e9c916660f83a5814c6d28aaf1668c2b85c81f819c8bbc365a000000000000d7bbdd188195d2a74dc6cc6f77457f131fd9c48f20376e4967b6f76f377ee98200000000",
            publicKey,
          },
        ];
      } else {
        return null;
      }
    }),
    on: jest.fn(),
  };

  return window.dapp;
};

const createWelldoneWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedWelldone = mockWelldoneOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(
    setupWelldoneWallet(),
    deps
  );

  return {
    wallet,
    injectedWelldone,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it.skip("sign into welldone wallet", async () => {
    const { wallet, injectedWelldone } = await createWelldoneWallet();

    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedWelldone.request).toHaveBeenCalledWith("near", {
      method: "query",
      params: {
        request_type: "view_access_key",
        finality: "final",
        account_id: accountId,
        public_key: publicKey,
      },
    });
    expect(accounts).toEqual([{ accountId, publicKey }]);
  });
});

describe("signOut", () => {
  it.skip("sign out of welldone wallet", async () => {
    const { wallet } = await createWelldoneWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();
  });
});

describe("getAccounts", () => {
  it.skip("returns array of accounts", async () => {
    const { wallet, injectedWelldone } = await createWelldoneWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedWelldone.request).toHaveBeenCalledWith("near", {
      method: "dapp:accounts",
    });
    expect(result).toEqual([{ accountId, publicKey }]);
  });
});

describe("signAndSendTransaction", () => {
  it.skip("sign transaction in welldone", async () => {
    const { wallet, injectedWelldone } = await createWelldoneWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction(transactions[0]);

    expect(injectedWelldone.request).toHaveBeenCalledTimes(3);
  });
});
describe("signAndSendTransactions", () => {
  it.skip("sign transactions in welldone", async () => {
    const { wallet, injectedWelldone } = await createWelldoneWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedWelldone.request).toHaveBeenCalledTimes(4);
    expect(result.length).toEqual(transactions.length);
  });
});
