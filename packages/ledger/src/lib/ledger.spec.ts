import { mock } from "jest-mock-extended";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getNetwork } from "../../../core/src/lib/network";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { logger } from "../../../core/src/lib/services/logger/logging.service";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Provider } from "../../../core/src/lib/services/provider/provider.service";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { updateState } from "../../../core/src/lib/state";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EventEmitter } from "../../../core/src/lib/services/event-emitter/event-emitter.service";
import { LedgerClient } from "./ledger-client";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PersistentStorage } from "../../../core/src/lib/services/persistent-storage/persistent-storage.service";
// import { LOCAL_STORAGE_AUTH_DATA } from "./ledger";

const createLedgerWallet = () => {
  const networkId = "testnet";
  const authData = {
    accountId: "amirsaran.testnet",
    derivationPath: "44'/397'/0'/0'/1'",
    publicKey: "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC",
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createLedgerWalletFn = require("./ledger").setupLedger;
  const LedgerWallet = createLedgerWalletFn();

  const storage = mock<PersistentStorage>();
  const ledgerClient = mock<LedgerClient>();

  jest.mock("./ledger-client", () => {
    return {
      LedgerClient: jest.fn().mockImplementation(() => {
        return {
          isSupported: jest.fn().mockReturnValue(true),
          connect: jest.fn(),
          setScrambleKey: jest.fn(),
          on: jest.fn(),
          getPublicKey: jest
            .fn()
            .mockResolvedValue("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"),
          sign: jest
            .fn()
            .mockResolvedValue(
              Buffer.from([
                86, 38, 222, 143, 115, 251, 107, 14, 115, 59, 92, 98, 66, 174,
                173, 124, 209, 189, 191, 180, 89, 25, 125, 254, 97, 240, 178,
                98, 65, 70, 238, 108, 105, 122, 165, 249, 193, 70, 118, 194,
                126, 218, 117, 100, 250, 124, 202, 161, 173, 12, 232, 146, 105,
                194, 138, 35, 207, 53, 84, 218, 45, 220, 10, 4,
              ])
            ),
        };
      }),
    };
  });

  jest
    .spyOn(PersistentStorage.prototype, "getItem")
    .mockImplementation(() => authData);

  const network = getNetwork(networkId);

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
      provider: new Provider(network.nodeUrl),
      emitter: new EventEmitter(),
      logger,
      storage,
      updateState,
    }),
    storage,
    ledgerClient,
    authData,
  };
};

afterEach(() => {
  jest.resetModules();
});

// describe("isAvailable", () => {
//   it("returns true", async () => {
//     const { wallet } = createLedgerWallet();
//     expect(wallet.isAvailable()).toEqual(true);
//   });
// });

describe("init", () => {
  it("connects to near and clears storage", async () => {
    const { wallet, storage } = createLedgerWallet();
    await wallet.init();
    expect(storage.getItem).toHaveBeenCalled();
  });
});

// describe("signIn", () => {
//   it("sign into near wallet", async () => {
//     const { wallet, ledgerClient, storage, authData } = createLedgerWallet();
//     await wallet.init();
//     await wallet.signIn({
//       accountId: authData.accountId,
//       derivationPath: authData.derivationPath,
//     });
//     expect(storage.setItem).toHaveBeenCalledWith(
//       LOCAL_STORAGE_AUTH_DATA,
//       authData
//     );
//     expect(ledgerClient.connect).toHaveBeenCalled();
//     expect(ledgerClient.setScrambleKey).toHaveBeenCalled();
//     expect(ledgerClient.on).toHaveBeenCalled();
//   });
// });

describe("isSignedIn", () => {
  it("returns true", async () => {
    const { wallet, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.signIn({
      accountId: authData.accountId,
      derivationPath: authData.derivationPath,
    });
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
    await wallet.signIn({
      accountId: authData.accountId,
      derivationPath: authData.derivationPath,
    });
    const result = await wallet.getAccounts();
    expect(result).toEqual([
      {
        accountId: "amirsaran.testnet",
      },
    ]);
  });
});

// describe("signAndSendTransaction", () => {
//   it("signs and sends transaction", async () => {
//     const { wallet, authData } = createLedgerWallet();
//     await wallet.init();
//     await wallet.signIn({
//       accountId: authData.accountId,
//       derivationPath: authData.derivationPath,
//     });
//     const result = await wallet.signAndSendTransaction({
//       signerId: "amirsaran.testnet",
//       receiverId: "guest-book.testnet",
//       actions: [],
//     });
//     expect(result).toEqual(null);
//   });
// });
