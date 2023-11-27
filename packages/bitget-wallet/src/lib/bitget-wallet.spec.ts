/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import type {
  AccessKey,
  BitgetWalletEvents,
  SignOutResponse,
} from "./injected-bitget-wallet";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { setupBitgetWallet } from "./bitget-wallet";

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

const mockBitgetWalletOnWindow = () => {
  window.bitkeep = {
    near: {
      isBitKeepChrome: true,
      callbacks: mock<BitgetWalletEvents>(),
      getAccountId: jest.fn().mockReturnValue(""),
      requestSignIn: jest.fn(async () => {
        window.bitkeep.near!.getAccountId = jest
          .fn()
          .mockReturnValue(accountId);

        return {
          accessKey: mock<AccessKey>(),
          error: "",
          notificationId: 0,
          type: "bitget-wallet-result" as const,
        };
      }),
      signOut: jest.fn().mockReturnValue(mock<SignOutResponse>()),
      isSignedIn: jest.fn().mockReturnValue(true),
      remove: jest.fn(),
      on: jest.fn(),
      signAndSendTransaction: jest.fn().mockReturnValue(
        Promise.resolve({
          error: undefined,
          response: mock<FinalExecutionOutcome>(),
        })
      ),
      getPublicKey: jest.fn().mockReturnValue(""),
      verifyOwner: jest.fn(),
      requestSignTransactions: jest.fn().mockReturnValue(
        Promise.resolve({
          error: undefined,
          response: mock<Array<FinalExecutionOutcome>>(
            new Array(transactions.length).fill({})
          ),
        })
      ),
    },
  };
  return window.bitkeep.near;
};

const createBitgetWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedBitgetWallet = mockBitgetWalletOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(
    setupBitgetWallet(),
    deps
  );

  return {
    wallet,
    injectedBitgetWallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into Bitget Wallet", async () => {
    const { wallet, injectedBitgetWallet } = await createBitgetWallet();

    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedBitgetWallet?.requestSignIn).toHaveBeenCalled();
    expect(accounts).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signOut", () => {
  it("sign out of Bitget Wallet", async () => {
    const { wallet, injectedBitgetWallet } = await createBitgetWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedBitgetWallet?.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, injectedBitgetWallet } = await createBitgetWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedBitgetWallet?.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in Bitget Wallet", async () => {
    const { wallet, injectedBitgetWallet } = await createBitgetWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedBitgetWallet?.signAndSendTransaction).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in Bitget Wallet", async () => {
    const { wallet, injectedBitgetWallet } = await createBitgetWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedBitgetWallet?.requestSignTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
