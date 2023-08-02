/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";

import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";
import { setupMathWallet } from "./math-wallet";
import type { MathAccount } from "./injected-math-wallet";
import type { MathSigner } from "./injected-math-wallet";

const accountId = "amirsaran.testnet";
const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

const mockMathWalletOnWindow = () => {
  window.nearWalletApi = {
    signer: mock<MathSigner>({
      createKey: jest.fn(),
      signMessage: jest.fn().mockReturnValue({
        signature: Buffer.from([
          86, 38, 222, 143, 115, 251, 107, 14, 115, 59, 92, 98, 66, 174, 173,
          124, 209, 189, 191, 180, 89, 25, 125, 254, 97, 240, 178, 98, 65, 70,
          238, 108, 105, 122, 165, 249, 193, 70, 118, 194, 126, 218, 117, 100,
          250, 124, 202, 161, 173, 12, 232, 146, 105, 194, 138, 35, 207, 53, 84,
          218, 45, 220, 10, 4,
        ]),
        publicKey,
      }),
      getPublicKey: jest.fn().mockReturnValue(publicKey),
    }),
    login: jest.fn().mockReturnValue(mock<MathAccount>()),
    logout: jest.fn().mockReturnValue(true),
  };

  return window.nearWalletApi;
};

const createMathWallet = async (deps: MockWalletDependencies = {}) => {
  const injectedMathWallet = mockMathWalletOnWindow();
  const { wallet } = await mockWallet<InjectedWallet>(setupMathWallet(), deps);

  return {
    wallet,
    injectedMathWallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into math wallet", async () => {
    const { wallet, injectedMathWallet } = await createMathWallet();

    injectedMathWallet.signer.account = null;
    await wallet.signIn({ contractId: "test.testnet" });

    expect(injectedMathWallet.login).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of math wallet", async () => {
    const { wallet, injectedMathWallet } = await createMathWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(injectedMathWallet.logout).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, injectedMathWallet } = await createMathWallet();

    injectedMathWallet.signer.account = {
      name: "",
      accountId,
      publicKey,
      permission: "",
      network: "testnet",
    };
    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(result).toEqual([{ accountId, publicKey }]);
  });
});

describe("signAndSendTransaction", () => {
  it("sign transaction in math wallet", async () => {
    const { wallet, injectedMathWallet } = await createMathWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: "test.testnet",
      actions: [],
    });

    expect(injectedMathWallet.signer.signMessage).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("sign transactions in math wallet", async () => {
    const { wallet, injectedMathWallet } = await createMathWallet();

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

    expect(injectedMathWallet.signer.signMessage).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});
