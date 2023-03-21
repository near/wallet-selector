/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import type { InjectedSender, SenderEvents } from "./injected-sender";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import type { SignOutResponse } from "./injected-sender";

declare global {
  interface Window {
    near: InjectedSender | undefined;
  }
}

const mockSenderOnWindow = () => {
  window.near = {
    isSender: true,
    callbacks: mock<SenderEvents>(),
    getAccountId: jest.fn().mockReturnValue("test-account.testnet"),
    getRpc: jest.fn(),
    account: jest.fn().mockReturnValue({
      connection: {
        signer: {
          getPublicKey: jest.fn().mockReturnValue(""),
        },
      },
    }),
    requestSignIn: jest
      .fn()
      .mockReturnValue({ accessKey: "accessKey", error: "" }),
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
    requestSignTransactions: jest.fn().mockReturnValue(null),
  };
};

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  mockSenderOnWindow();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupSender } = require("./sender");
  const { wallet } = await mockWallet<InjectedWallet>(setupSender(), deps);

  return {
    wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet } = await createSenderWallet();

    // Allow `requestSignIn` to be invoked
    // getAccounts depends on window.near.getAccountId
    // so by default the mocked account would be returned.
    window.near!.getAccountId = jest.fn().mockReturnValue("");

    await wallet.signIn({ contractId: "test.testnet" });

    expect(window.near!.requestSignIn).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of sender wallet", async () => {
    const { wallet } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(window.near!.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(window.near!.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([
      { accountId: "test-account.testnet", publicKey: undefined },
    ]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in sender", async () => {
    const { wallet } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: "test-account.testnet",
      receiverId: "test.testnet",
      actions: [],
    });

    expect(window.near!.signAndSendTransaction).toHaveBeenCalled();
  });
});
