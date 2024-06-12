/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import type { ProviderService } from "packages/core/src/lib/services";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";

import { setupOKXWallet } from "./okx-wallet";
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { AccessKey, SignOutResponse } from "./injected-okx-wallet";
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

const mockOkx = () => {
  const okxwallet = {
    near: {
      getAccountId: jest.fn().mockReturnValue(""),
      requestSignIn: jest.fn(async () => {
        window.okxwallet.near!.getAccountId = jest
          .fn()
          .mockReturnValue(accountId);

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

  window.okxwallet = okxwallet;

  return window.okxwallet.near;
};

const createOKXWallet = async () => {
  const injectedOkx = mockOkx();
  const provider = mock<ProviderService>();
  provider.sendTransaction.mockResolvedValue(mock<FinalExecutionOutcome>());
  const { wallet } = await mockWallet<InjectedWallet>(setupOKXWallet(), {
    provider,
  });

  return {
    wallet,
    injectedOkx,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into okx wallet", async () => {
    const { wallet, injectedOkx } = await createOKXWallet();
    const accounts = await wallet.signIn({ contractId: "test.testnet" });
    expect(injectedOkx!.requestSignIn).toHaveBeenCalled();
    expect(accounts[0]?.accountId).toBe(accountId);
  });
});

describe("signOut", () => {
  it("sign out of okx wallet", async () => {
    const { wallet, injectedOkx } = await createOKXWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedOkx!.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns accounts", async () => {
    const { wallet, injectedOkx } = await createOKXWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(injectedOkx!.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId, publicKey: undefined }]);
  });
});

describe("signTransaction", () => {
  it("sign transaction in okx wallet", async () => {
    const { wallet, injectedOkx } = await createOKXWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedOkx!.signTransaction).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in okx wallet", async () => {
    const { wallet, injectedOkx } = await createOKXWallet();
    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.signAndSendTransactions({
      transactions,
    });

    expect(injectedOkx!.requestSignTransactions).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
