/* eslint-disable @nx/enforce-module-boundaries */
import * as nearAPI from "near-api-js";
import type {
  Near,
  WalletConnection,
  ConnectedWalletAccount,
} from "near-api-js";
import type {
  AccessKeyInfoView,
  BlockResult,
} from "near-api-js/lib/providers/provider";
import { type AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { BrowserWallet } from "../../../core/src/lib/wallet";
import { PublicKey } from "near-api-js/lib/utils";

const createMyNearWallet = async (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<WalletConnection>();
  const account = mock<ConnectedWalletAccount>({
    connection: {
      signer: {
        getPublicKey: jest.fn().mockReturnValue("key1"),
      },
    },
  });

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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupMyNearWallet } = require("./my-near-wallet");
  const { wallet } = await mockWallet<BrowserWallet>(setupMyNearWallet(), deps);

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

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet, nearApiJs } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });

    expect(nearApiJs.connect).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of near wallet", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signOut();

    expect(walletConnection.signOut).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, walletConnection } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
    const result = await wallet.getAccounts();

    expect(walletConnection.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([
      { accountId: "test-account.testnet", publicKey: "" },
    ]);
  });
});

describe("signAndSendTransaction", () => {
  // TODO: Figure out why imports to core are returning undefined.
  it("signs and sends transaction", async () => {
    const { wallet, walletConnection, account } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });
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

describe("buildImportAccountsUrl", () => {
  it("returns import url", async () => {
    const { wallet } = await createMyNearWallet();

    expect(typeof wallet.buildImportAccountsUrl).toBe("function");

    // @ts-ignore
    expect(wallet?.buildImportAccountsUrl()).toEqual(
      "https://testnet.mynearwallet.com/batch-import"
    );
  });
});

describe("multipleAppSignin", () => {
  it("should choose the appropriate function access key for transaction", async () => {
    const publicKey1 = PublicKey.fromString(
      "ed25519:6tV76e7uYUjWKXiAWeWcfNYFQYVEgRvTWFfcysBkpsFx"
    );
    const publicKey2 = PublicKey.fromString(
      "ed25519:GGUEz8sFXe3aLTB3XLq5oh3cSLPsxZK2FinSvSeEvmeQ"
    );

    const account1 = mock<ConnectedWalletAccount>({
      connection: {
        signer: {
          getPublicKey: async (
            accountId?: string | undefined,
            networkId?: string | undefined
          ) => publicKey1,
        },
        provider: {
          block: async () =>
            mock<BlockResult>({
              header: {
                hash: "abc",
              },
            }),
        },
      },
      accessKeyForTransaction: async (receiverId, actions, localKey) => {
        if (receiverId === "test.testnet") {
          return mock<AccessKeyInfoView>({
            public_key: publicKey1.toString(),
          });
        } else {
          return null;
        }
      },
    });

    const account2 = mock<ConnectedWalletAccount>({
      connection: {
        signer: {
          getPublicKey: async (
            accountId?: string | undefined,
            networkId?: string | undefined
          ) => publicKey1,
        },
        provider: {
          block: async () =>
            mock<BlockResult>({
              header: {
                hash: "abc",
              },
            }),
        },
      },
      accessKeyForTransaction: async (receiverId, actions, localKey) => {
        if (receiverId === "test2.testnet") {
          return mock<AccessKeyInfoView>({
            public_key: publicKey1.toString(),
          });
        } else {
          return null;
        }
      },
    });

    const walletConnection1 = mock<WalletConnection>();
    walletConnection1.account.calledWith().mockReturnValue(account1);
    walletConnection1.getAccountId
      .calledWith()
      .mockReturnValue("test-account.testnet");
    walletConnection1.isSignedIn.calledWith().mockReturnValue(true);

    const walletConnection2 = mock<WalletConnection>();
    walletConnection2.account.calledWith().mockReturnValue(account2);
    walletConnection2.getAccountId
      .calledWith()
      .mockReturnValue("test-account.testnet");
    walletConnection2.isSignedIn.calledWith().mockReturnValue(true);

    jest.mock("near-api-js", () => {
      const module = jest.requireActual("near-api-js");
      return {
        ...module,
        connect: jest.fn().mockResolvedValue(mock<Near>()),
        WalletConnection: jest.fn((near, appKeyPrefix) => {
          if (appKeyPrefix === "near_app") {
            return walletConnection1;
          } else {
            return walletConnection2;
          }
        }),
      };
    });

    const { setupMyNearWallet } = require("./my-near-wallet");
    const { wallet } = await mockWallet<BrowserWallet>(setupMyNearWallet(), {});

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      receiverId: "test.testnet",
      actions: [],
    });

    expect(account1.signAndSendTransaction).toHaveBeenCalled();
    expect(account1.signAndSendTransaction).toHaveBeenCalledWith({
      receiverId: "test.testnet",
      actions: [],
    });
    expect(account2.signAndSendTransaction).not.toHaveBeenCalled();

    nearAPI.utils.KeyPair.fromRandom = jest.fn().mockReturnValue({
      getPublicKey: () => publicKey2,
    });

    await wallet.addContractConnection!("test2.testnet", []);
    await wallet.signAndSendTransaction({
      receiverId: "test2.testnet",
      actions: [],
    });

    expect(account2.signAndSendTransaction).toHaveBeenCalled();
    expect(account2.signAndSendTransaction).toHaveBeenCalledWith({
      receiverId: "test2.testnet",
      actions: [],
    });
  });
});
