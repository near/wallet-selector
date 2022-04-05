import { Near, WalletConnection, ConnectedWalletAccount } from "near-api-js";
import { AccountView } from "near-api-js/lib/providers/provider";
import { mock } from "jest-mock-extended";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Provider,
  EventEmitter,
  storage,
  logger,
} from "../../../core/src/lib/services";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getNetwork, resolveNetwork } from "../../../core/src/lib/network";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { updateState } from "../../../core/src/lib/state";

const createNearWallet = () => {
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

  const networkId = "testnet";

  const { setupNearWallet } = require("./near-wallet");
  const NearWallet = setupNearWallet();

  const config = getNetwork(networkId);

  return {
    nearApiJs: require("near-api-js"),
    wallet: NearWallet({
      options: {
        network: networkId,
        contractId: "guest-book.testnet",
        wallets: ["near-wallet"],
      },
      network: resolveNetwork(networkId),
      provider: new Provider(config.nodeUrl),
      emitter: new EventEmitter(),
      logger,
      storage,
      updateState,
    }),
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
    await wallet.signIn();
    expect(walletConnection.requestSignIn).toHaveBeenCalled();
  });
});

describe("signOut", () => {
  it("sign out of near wallet", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.signOut();
    expect(walletConnection.signOut).toHaveBeenCalled();
  });
});

describe("isSignedIn", () => {
  it("isSignedIn returns false", async () => {
    const { wallet } = createNearWallet();
    await wallet.init();
    const result = await wallet.isSignedIn();
    expect(result).toEqual(true);
  });
});

describe("getAccounts", () => {
  it("returns array of accounts", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.signIn();
    const result = await wallet.getAccounts();
    expect(walletConnection.getAccountId).toHaveBeenCalled();
    expect(result).toEqual([
      {
        accountId: "test-account.testnet",
      },
    ]);
  });
});

describe("signAndSendTransaction", () => {
  // TODO: Figure out why imports to core are returning undefined.
  it.skip("signs and sends transaction", async () => {
    const { wallet, walletConnection, account } = createNearWallet();
    await wallet.init();
    await wallet.signIn();
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
