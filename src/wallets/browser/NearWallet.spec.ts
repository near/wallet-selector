import getConfig from "../../config";
import { logger } from "../../services/logging.service";
import { storage } from "../../services/persistent-storage.service";
import ProviderService from "../../services/provider/ProviderService";
import { updateState } from "../../state/State";
import EventHandler from "../../utils/EventsHandler";
import { Near, WalletConnection, ConnectedWalletAccount } from "near-api-js";
import { mock } from "jest-mock-extended";
import { AccountView } from "near-api-js/lib/providers/provider";

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

  const setupNearWallet = require("./NearWallet").default;
  const NearWallet = setupNearWallet();

  const config = getConfig(networkId);

  return {
    nearApiJs: require("near-api-js"),
    wallet: NearWallet({
      options: {
        wallets: ["near-wallet"],
        networkId: networkId,
        contract: {
          contractId: "guest-book.testnet",
        },
      },
      provider: new ProviderService(config.nodeUrl),
      emitter: new EventHandler(),
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

describe("getAccount", () => {
  it("returns account object", async () => {
    const { wallet, walletConnection } = createNearWallet();
    await wallet.init();
    await wallet.signIn();
    const result = await wallet.getAccount();
    expect(walletConnection.getAccountId).toHaveBeenCalled();
    expect(result).toEqual({
      accountId: "test-account.testnet",
      balance: "1000000000000000000000000",
    });
  });
});

describe("signAndSendTransaction", () => {
  it("signs and sends transaction", async () => {
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
