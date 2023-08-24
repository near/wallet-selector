/* eslint-disable @nx/enforce-module-boundaries */
import { ConnectedWalletAccount } from "near-api-js";
import type { Near, WalletConnection } from "near-api-js";
import type {
  FinalExecutionOutcome,
} from "near-api-js/lib/providers/provider";
import { type AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type {
  BrowserWallet,
} from "../../../core/src/lib/wallet";
import { SignAndSendTransactionOptions } from "near-api-js/lib/account";

const createMyNearWallet = async (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<WalletConnection>();
  const account = mock<ConnectedWalletAccount>({
    connection: {
      signer: {
        getPublicKey: jest.fn().mockReturnValue(""),
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

beforeEach(() => {
  const borsh = require('borsh');

  const originalBaseDecode = borsh.baseDecode;
  borsh.baseDecode = function (value: string) {
    const bufferResult = originalBaseDecode(value);
    return new Uint8Array(bufferResult);
  };
});

afterEach(() => {
  jest.resetModules();
  jest.unmock("near-api-js");
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet, nearApiJs } = await createMyNearWallet();

    await wallet.signIn({ contractId: "test.testnet" });

    expect(nearApiJs.connect).toHaveBeenCalled();
  });
});

describe("multipleAppSignin", () => {
  it("should choose the appropriate function access key for transaction", async () => {
    const nearAPI = require("near-api-js");
    const mainKeyPair = nearAPI.KeyPair.fromRandom("ed25519");
    const accountId = "testaccount.testnet";
    localStorage.setItem(
      "near_app_wallet_auth_key",
      `{"accountId":"${accountId}","allKeys":["ed25519:EjYAuzTBj3ZHeznV71HuWC5f3Yqrty7AVYWhPKufcqGf"]}`
    );

    nearAPI.ConnectedWalletAccount.prototype.signAndSendTransaction = async function (
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

    const networkId = "testnet";
    const mainKeyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    mainKeyStore.setKey(networkId, accountId, mainKeyPair);

    const { setupMyNearWallet } = require("./my-near-wallet");
    const { wallet } = await mockWallet<BrowserWallet>(setupMyNearWallet(), {});

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
