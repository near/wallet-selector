import { mock } from "jest-mock-extended";
import getConfig from "../../config";
import { logger } from "../../services/logging.service";
import { storage } from "../../services/persistent-storage.service";
import ProviderService from "../../services/provider/ProviderService";
import { updateState } from "../../state/State";
import EventHandler from "../../utils/EventsHandler";
import { LedgerWalletState } from "./LedgerWallet";
import LedgerClient from "./LedgerClient";
import { PersistentStorage } from "../../services/persistent-storage.service";

const createLedgerWallet = () => {
  const networkId = "testnet";

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createLedgerWallet = require("./LedgerWallet").default;
  const LedgerWallet = createLedgerWallet();

  const state = mock<LedgerWalletState>();
  const ledgerClient = mock<LedgerClient>();

  jest.mock("./LedgerClient", () => {
    return jest.fn().mockImplementation(() => {
      return {
        isSupported: jest.fn(() => true),
        connect: jest.fn(),
        setScrambleKey: jest.fn(),
        on: jest.fn(),
        getPublicKey: jest.fn().mockResolvedValue("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"),
        sign: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
      }
    });
  });

  jest.spyOn(PersistentStorage.prototype, 'getItem').mockImplementation(() =>  {
    return {
      accountId: "amirsaran.testnet",
      derivationPath: "44'/397'/0'/0'/1'",
      publicKey: "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC",
    };
  });

  const config = getConfig(networkId);

  return {
    nearApiJs: require("near-api-js"),
    wallet: LedgerWallet({
      options: {
        wallets: ["ledger-wallet"],
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
    state,
    ledgerClient,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("isAvailable", () => {
  it("returns true", async () => {
    const { wallet } = createLedgerWallet();
    expect(wallet.isAvailable()).toEqual(true);
  });
});

describe("init", () => {
  it("connects to near and clears storage", async () => {
    const { wallet, state } = createLedgerWallet();
    await wallet.init();
    expect(state.authData).toEqual(null);
  });
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet, ledgerClient } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({ accountId: "amirsaran.testnet", derivationPath: "44'/397'/0'/0'/1'" });
    expect(ledgerClient.connect).toHaveBeenCalled();
    expect(ledgerClient.setScrambleKey).toHaveBeenCalled();
    expect(ledgerClient.on).toHaveBeenCalled();
  });
});

describe("isSignedIn", () => {
  it("returns true", async () => {
    const { wallet } = createLedgerWallet();
    await wallet.init();
    const result = await wallet.isSignedIn();
    expect(result).toEqual(true);
  });
  it("returns false", async () => {
    const { wallet } = createLedgerWallet();
    const result = await wallet.isSignedIn();
    expect(result).toEqual(false);
  });
});

describe("getAccount", () => {
  it("returns account object", async () => {
    const { wallet } = createLedgerWallet();
    await wallet.init();
    const result = await wallet.getAccounts();
    expect(result).toEqual([{
      accountId: "amirsaran.testnet",
    }]);
  });
});

describe("signAndSendTransaction", () => {
  it("signs and sends transaction", async () => {
    const { wallet, } = createLedgerWallet();
    await wallet.init();
    const result = await wallet.signAndSendTransaction({
      signerId: "amirsaran.testnet",
      receiverId: "guest-book.testnet",
      actions: [],
    });
    expect(result).toEqual(null);
  });
});
