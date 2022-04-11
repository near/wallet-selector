/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Near, WalletConnection, ConnectedWalletAccount } from "near-api-js";
import { AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

import {
  mockWallet,
  MockWalletDependencies,
} from "../../../core/src/lib/testUtils";
import { BrowserWallet } from "../../../core/src/lib/wallet";

const createNearWallet = (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<WalletConnection>();
  const account = mock<ConnectedWalletAccount>();

  jest.mock("near-api-js", () => {
    const module = jest.requireActual("near-api-js");
    return {
      ...module,
      connect: jest.fn().mockResolvedValue(mock<Near>()),
      WalletConnection: jest.fn().mockReturnValue(walletConnection),
    };
  });

  walletConnection.isSignedIn.calledWith().mockReturnValue(true);
  walletConnection.getAccountId
    .calledWith()
    .mockReturnValue("test-account.testnet");
  walletConnection.account.calledWith().mockReturnValue(account);
  // @ts-ignore
  // near-api-js marks this method as protected.
  // TODO: return value instead of null
  account.signAndSendTransaction.calledWith().mockReturnValue(null);
  account.state.calledWith().mockResolvedValue(
    mock<AccountView>({
      amount: "1000000000000000000000000",
    })
  );

  const { setupNearWallet } = require("./near-wallet");
  const nearWallet = mockWallet<BrowserWallet>(setupNearWallet(), deps);

  return {
    nearApiJs: require("near-api-js"),
    wallet: nearWallet,
    walletConnection,
    account,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("isAvailable", () => {
  it("returns true", async () => {
    const { wallet } = createNearWallet();
    expect(wallet.isAvailable()).toBe(true);
  });
});

describe("init", () => {
  it("connects to near and clears storage", async () => {
    const { wallet, nearApiJs } = createNearWallet();
    await wallet.init();
    expect(nearApiJs.connect).toHaveBeenCalled();
  });
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.connect();
    expect(walletConnection.requestSignIn).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of near wallet", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.disconnect();
    expect(walletConnection.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.connect();
    const result = wallet.getAccounts();
    expect(walletConnection.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([{ accountId: "test-account.testnet" }]);
  });
});

describe("signAndSendTransaction", () => {
  // TODO: Figure out why imports to core are returning undefined.
  it.skip("signs and sends transaction", async () => {
    const { wallet, walletConnection, account } = createNearWallet();
    await wallet.init();
    await wallet.connect();
    const result = await wallet.signAndSendTransaction({
      receiverId: "guest-book.testnet",
      actions: [],
    });
    expect(walletConnection.account).toHaveBeenCalled();
    // near-api-js marks this method as protected.
    // @ts-ignore
    expect(account.signAndSendTransaction).toHaveBeenCalled();
    // @ts-ignore
    expect(account.signAndSendTransaction).toBeCalledWith({
      actions: [],
      receiverId: "guest-book.testnet",
    });
    expect(result).toEqual(null);
  });
});
