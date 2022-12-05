/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type {
  Near,
  WalletConnection,
  ConnectedWalletAccount,
} from "near-api-js";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<WalletConnection>();
  // @ts-ignore
  window.near = {
    isSender: true,
    ...walletConnection,
    isSignedIn: jest.fn().mockReturnValue(false),
    // @ts-ignore
    batchImport: jest.fn(),
  };
  const account = mock<ConnectedWalletAccount>();
  jest.mock("near-api-js", () => {
    const module = jest.requireActual("near-api-js");
    return {
      ...module,
      connect: jest.fn().mockResolvedValue(mock<Near>()),
      WalletConnection: jest.fn().mockReturnValue(walletConnection),
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupSender } = require("./sender");
  const { wallet } = await mockWallet<InjectedWallet>(setupSender(), deps);

  return {
    nearApiJs: require("near-api-js"),
    wallet,
    walletConnection,
    account,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("importAccountsInSecureContext", () => {
  it("returns import url", async () => {
    const { wallet } = await createSenderWallet();
    expect(wallet.importAccountsInSecureContext).toBeDefined();
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
