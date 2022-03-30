import { mock } from "jest-mock-extended";
import getConfig from "../../config";
import { logger } from "../../services/logging.service";
import ProviderService from "../../services/provider/ProviderService";
import { updateState } from "../../state/State";
import EventHandler from "../../utils/EventsHandler";
import LedgerClient from "./LedgerClient";
import { PersistentStorage } from "../../services/persistent-storage.service";
import { LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA } from "../../constants";

const createLedgerWallet = () => {
  const networkId = "testnet";
  const authData = {
    accountId: "amirsaran.testnet",
    derivationPath: "44'/397'/0'/0'/1'",
    publicKey: "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC",
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createLedgerWallet = require("./LedgerWallet").default;
  const LedgerWallet = createLedgerWallet();

  const storage = mock<PersistentStorage>();
  const ledgerClient = mock<LedgerClient>();

  jest.mock("./LedgerClient", () => {
    return jest.fn().mockImplementation(() => {
      return {
        isSupported: jest.fn(() => true),
        connect: jest.fn(),
        setScrambleKey: jest.fn(),
        on: jest.fn(),
        getPublicKey: jest.fn().mockResolvedValue("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"),
        sign: jest.fn().mockResolvedValue(Buffer.from([86, 38, 222, 143, 115, 251, 107, 14, 115, 59, 92, 98, 66, 174, 173, 124, 209, 189, 191, 180, 89, 25, 125, 254, 97, 240, 178, 98, 65, 70, 238, 108, 105, 122, 165, 249, 193, 70, 118, 194, 126, 218, 117, 100, 250, 124, 202, 161, 173, 12, 232, 146, 105, 194, 138, 35, 207, 53, 84, 218, 45, 220, 10, 4])),
      }
    });
  });

  jest.spyOn(PersistentStorage.prototype, "getItem").mockImplementation(() => authData);

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
    storage,
    ledgerClient,
    authData
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
    const { wallet, storage } = createLedgerWallet();
    await wallet.init();
    expect(storage.getItem).toHaveBeenCalled();
  });
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet, ledgerClient, storage, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({ accountId: authData.accountId, derivationPath: authData.derivationPath });
    expect(storage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA, authData);
    expect(ledgerClient.connect).toHaveBeenCalled();
    expect(ledgerClient.setScrambleKey).toHaveBeenCalled();
    expect(ledgerClient.on).toHaveBeenCalled();
  });
});

describe("isSignedIn", () => {
  it("returns true", async () => {
    const { wallet, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({ accountId: authData.accountId, derivationPath: authData.derivationPath });
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
    const { wallet, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({ accountId: authData.accountId, derivationPath: authData.derivationPath });
    const result = await wallet.getAccounts();
    expect(result).toEqual([{
      accountId: "amirsaran.testnet",
    }]);
  });
});

describe("signAndSendTransaction", () => {
  it("signs and sends transaction", async () => {
    const { wallet, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({ accountId: authData.accountId, derivationPath: authData.derivationPath });
    const result = await wallet.signAndSendTransaction({
      signerId: "amirsaran.testnet",
      receiverId: "guest-book.testnet",
      actions: [],
    });
    expect(result).toEqual(null);
  });
});
