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

  return window.near;
};

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedSender = mockSenderOnWindow();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupSender } = require("./sender");
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
  it("sign into near wallet", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    // Allow `requestSignIn` to be invoked
    // getAccounts depends on window.near.getAccountId
    // so by default the mocked account would be returned.
    injectedSender.getAccountId = jest.fn().mockReturnValue("");

    await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedSender.requestSignIn).toHaveBeenCalled();
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
    expect(result).toEqual([
      { accountId: "test-account.testnet", publicKey: undefined },
    ]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in sender", async () => {
    const { wallet, injectedSender } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: "test-account.testnet",
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedSender.signAndSendTransaction).toHaveBeenCalled();
  });
});
