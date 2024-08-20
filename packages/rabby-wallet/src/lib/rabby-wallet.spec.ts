/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import type { ProviderService } from "packages/core/src/lib/services";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";

import { setupRabbyWallet } from "./rabby-wallet";
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { AccessKey, SignOutResponse } from "./injected-rabby-wallet";
import type { InjectedWallet } from "../../../core/src/lib/wallet";

const accountId = "test-account.testnet";
const transactions = [
  {
    signerId: accountId,
    receiverId: "test.testnet",
    actions: [],
  },
];

jest.mock("near-api-js/lib/transaction", () => {
  return {
    ...jest.requireActual("near-api-js/lib/transaction"),
    SignedTransaction: {
      ...jest.requireActual("near-api-js/lib/transaction").SignedTransaction,
      decode: jest.fn().mockReturnValue({}),
    },
  };
});

const mockRabby = () => {
  const rabbyWallet = {
    near: {
      getAccountId: jest.fn().mockReturnValue(""),
      requestSignIn: jest.fn(async () => {
        window.rabby.near!.getAccountId = jest.fn().mockReturnValue(accountId);

        return {
          accountId,
          accessKey: mock<AccessKey>(),
          error: "",
        };
      }),
      signOut: jest.fn().mockReturnValue(mock<SignOutResponse>()),
      isSignedIn: jest.fn().mockReturnValue(true),
      on: jest.fn(),
      signTransaction: jest.fn().mockResolvedValue("signedTx"),
      requestSignTransactions: jest.fn().mockResolvedValue({
        txs: [{ signedTx: "signedTx" }],
      }),
    },
  };

  window.rabby = rabbyWallet;

  return window.rabby.near;
};

const createRabbyWallet = async () => {
  const injectedRabby = mockRabby();
  const provider = mock<ProviderService>();
  provider.sendTransaction.mockResolvedValue(mock<FinalExecutionOutcome>());
  const { wallet } = await mockWallet<InjectedWallet>(setupRabbyWallet(), {
    provider,
  });

  return {
    wallet,
    injectedRabby: injectedRabby,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into rabby wallet", async () => {
    const { wallet, injectedRabby } = await createRabbyWallet();
    const accounts = await wallet.signIn({ contractId: "test.testnet" });
    expect(injectedRabby!.requestSignIn).toHaveBeenCalled();
    expect(accounts[0]?.accountId).toBe(accountId);
  });
});

describe("signOut", () => {
  it("sign out of rabby wallet", async () => {
    const { wallet, injectedRabby } = await createRabbyWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedRabby!.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns accounts", async () => {
    const { wallet, injectedRabby } = await createRabbyWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedRabby!.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signTransaction", () => {
  it("sign transaction in rabby wallet", async () => {
    const { wallet, injectedRabby } = await createRabbyWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedRabby!.signTransaction).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in rabby wallet", async () => {
    const { wallet, injectedRabby } = await createRabbyWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedRabby!.requestSignTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
