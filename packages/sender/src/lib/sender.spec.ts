/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import type {
  AccessKey,
  SenderEvents,
  SignOutResponse,
} from "./injected-sender";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { setupSender } from "./sender";

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

const mockSenderOnWindow = () => {
  window.near = {
    isSender: true,
    callbacks: mock<SenderEvents>(),
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
      window.near!.getAccountId = jest.fn().mockReturnValue(accountId);
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
    signMessage: jest.fn().mockResolvedValue({
      error: undefined,
      response: {
        accountId,
        publicKey: "ed25519:test",
        signature: "testSignature",
      },
    }),
    batchImport: jest.fn(),
  };

  return window.near;
};

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedSender = mockSenderOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(setupSender(), deps);

  return {
    wallet,
    injectedSender,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into sender wallet", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    const accounts = await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedSender.requestSignIn).toHaveBeenCalled();
    expect(accounts).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signOut", () => {
  it("sign out of sender wallet", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedSender.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedSender.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in sender", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedSender.signAndSendTransaction).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in sender", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedSender.requestSignTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});

describe("importAccountsInSecureContext", () => {
  it("returns import url", async () => {
    const { wallet } = await createSenderWallet();

    expect(typeof wallet.importAccountsInSecureContext).toBe("function");

    const accountsData = [
      { accountId: "test.testnet", privateKey: "ed25519:test" },
    ];

    if (wallet.importAccountsInSecureContext) {
      await wallet.importAccountsInSecureContext({ accounts: accountsData });
      // @ts-ignore
      expect(window.near.batchImport).toHaveBeenCalledWith({
        keystore: accountsData,
        network: "testnet",
      });
    }
  });
});

describe("signMessage", () => {
  it("sign message", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    const message = {
      message: "test message",
      nonce: Buffer.from("30990309-30990309-390A303-292090"),
      recipient: "test.app",
    };

    const result = await wallet.signMessage!(message);

    expect(injectedSender?.signMessage).toHaveBeenCalled();
    expect(result).toEqual({
      accountId,
      publicKey: "ed25519:test",
      signature: "testSignature",
    });
  });
});
