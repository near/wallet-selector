/* eslint-disable @nx/enforce-module-boundaries */
import * as nearAPI from "near-api-js";
import { ConnectedWalletAccount } from "near-api-js";
import type { Near, WalletConnection } from "near-api-js";
import type {
  AccessKeyInfoView,
  AccessKeyView,
  BlockResult,
  FinalExecutionOutcome,
} from "near-api-js/lib/providers/provider";
import { type AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type {
  BrowserWallet,
  WalletMetadata,
} from "../../../core/src/lib/wallet";
import type { stringify } from "querystring";
import { BN } from "bn.js";
import type { Action } from "near-api-js/lib/transaction";
import type { SignAndSendTransactionOptions } from "near-api-js/lib/account";

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
    const borsh = require("borsh");
    const originalBaseDecode = borsh.baseDecode;

    borsh.baseDecode = function (value: string) {
      const bufferResult = originalBaseDecode(value);
      return new Uint8Array(bufferResult);
    };

    const mainKeyPair = nearAPI.KeyPair.fromRandom("ed25519");
    const accountId = "testaccount.testnet";
    localStorage.setItem(
      "near_app_wallet_auth_key",
      `{"accountId":"${accountId}","allKeys":["ed25519:EjYAuzTBj3ZHeznV71HuWC5f3Yqrty7AVYWhPKufcqGf"]}`
    );

    const networkId = "testnet";
    const mainKeyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    mainKeyStore.setKey(networkId, accountId, mainKeyPair);

    const { setupMyNearWallet } = require("./my-near-wallet");
    const { wallet } = await mockWallet<BrowserWallet>(setupMyNearWallet(), {});

    ConnectedWalletAccount.prototype.signAndSendTransaction = async function (
      options: SignAndSendTransactionOptions
    ) {
      sessionStorage.setItem(
        "lastAccessedKey",
        (await this.walletConnection._keyStore.getKey(networkId, accountId))
          .getPublicKey()
          .toString()
      );
      return mock<FinalExecutionOutcome>();
    };

    await wallet.signIn({ contractId: "test.testnet" });
    await wallet.signAndSendTransaction({
      receiverId: "test.testnet",
      actions: [],
    });

    expect(sessionStorage.getItem("lastAccessedKey")).toEqual(
      mainKeyPair.getPublicKey().toString()
    );
    const additionalContractId = "test2.testnet";
    await wallet.addContractConnection!(additionalContractId, []);

    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
      window.localStorage,
      `${additionalContractId}:keystore:`
    );

    const account = (await wallet.getAccounts())[0];
    const additionalKeypair = await keyStore.getKey(
      "testnet",
      account.accountId
    );
    expect(additionalKeypair).toBeDefined();

    await wallet.signAndSendTransaction({
      receiverId: "test2.testnet",
      actions: [],
    });
    expect(sessionStorage.getItem("lastAccessedKey")).toEqual(
      additionalKeypair.getPublicKey().toString()
    );
  });
});
