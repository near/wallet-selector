/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import type { AccessKey, SignOutResponse } from "./injected-wallet";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { setupFinerWallet } from "./finer";

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

const mockFinerOnWindow = () => {
  window.finer = {
    near: {
      isSender: false,
      isFiner: true,
      getAccountId: jest.fn().mockReturnValue(""),
      getRpc: jest.fn(),
      account: jest.fn().mockReturnValue({
        connection: {
          signer: {
            getPublicKey: jest.fn().mockReturnValue(""),
          },
        },
      }),
      requestSignIn: jest.fn(async () => {
        window.finer.near!.getAccountId = jest.fn().mockReturnValue(accountId);
        return {
          accessKey: mock<AccessKey>(),
          error: "",
          notificationId: 0,
          type: "sender-wallet-result" as const,
        };
      }),
      signOut: jest.fn().mockReturnValue(mock<SignOutResponse>()),
      isSignedIn: jest.fn().mockReturnValue(true),
      remove: jest.fn(),
      on: jest.fn(),
      sendMoney: jest.fn(),
      signAndSendTransaction: jest.fn().mockReturnValue(
        Promise.resolve({
          error: undefined,
          response: mock<FinalExecutionOutcome>(),
        })
      ),
      requestSignTransactions: jest.fn().mockReturnValue(
        Promise.resolve({
          error: undefined,
          response: mock<Array<FinalExecutionOutcome>>(
            new Array(transactions.length).fill({})
          ),
        })
      ),
      signMessage: jest.fn(),
    },
  };

  return window.finer;
};

const createFinerWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedFiner = mockFinerOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(setupFinerWallet(), deps);

  return {
    wallet,
    injectedFiner,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into sender wallet", async () => {
    const { wallet, injectedFiner } = await createFinerWallet();

    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedFiner.near?.requestSignIn).toHaveBeenCalled();
    expect(accounts).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signOut", () => {
  it("sign out of sender wallet", async () => {
    const { wallet, injectedFiner } = await createFinerWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedFiner.near?.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, injectedFiner } = await createFinerWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedFiner.near?.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in sender", async () => {
    const { wallet, injectedFiner } = await createFinerWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedFiner.near?.signAndSendTransaction).toHaveBeenCalled();
  });
});
describe("signAndSendTransactions", () => {
  it("sign transactions in sender", async () => {
    const { wallet, injectedFiner } = await createFinerWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedFiner.near?.requestSignTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
