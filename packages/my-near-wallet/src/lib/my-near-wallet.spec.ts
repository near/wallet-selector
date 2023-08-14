/* eslint-disable @nx/enforce-module-boundaries */
import type {
  Near,
  WalletConnection,
  ConnectedWalletAccount,
} from "near-api-js";
import type { BlockResult } from "near-api-js/lib/providers/provider";
import { type AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { BrowserWallet } from "../../../core/src/lib/wallet";
import type { PublicKey, KeyPair } from "near-api-js/lib/utils";
import type { AccessKey } from "near-api-js/lib/transaction";

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
    const publicKey1 = mock<PublicKey>();
    const keyPair1 = mock<KeyPair>({
      getPublicKey: () => publicKey1,
    });
    const walletConnection = mock<WalletConnection>();

    const account = mock<ConnectedWalletAccount>({
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
        return mock<AccessKey>({});
      },
    });

    walletConnection.account.calledWith().mockReturnValue(account);
    walletConnection.isSignedIn.calledWith().mockReturnValue(true);

    jest.mock("near-api-js", () => {
      const module = jest.requireActual("near-api-js");
      return {
        ...module,
        connect: jest.fn().mockResolvedValue(mock<Near>()),
        WalletConnection: jest.fn().mockReturnValue(walletConnection),
      };
    });
    const { setupMyNearWallet } = require("./my-near-wallet");
    const { wallet } = await mockWallet<BrowserWallet>(setupMyNearWallet(), {});

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signIn({ contractId: "test2.testnet" });

    const result = await wallet.signAndSendTransactions({
      transactions: [
        {
          receiverId: "test.testnet",
          actions: [],
        },
        {
          receiverId: "test2.testnet",
          actions: [],
        },
      ],
    });
  });
});
