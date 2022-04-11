/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";

import {
  mockWallet,
  MockWalletDependencies,
} from "../../../core/src/lib/testUtils";
import { HardwareWallet } from "../../../core/src/lib/wallet";
import {
  ProviderService,
  StorageService,
} from "../../../core/src/lib/services";
import { LedgerClient } from "./ledger-client";

const createLedgerWallet = (deps: MockWalletDependencies = {}) => {
  const authData = {
    accountId: "amirsaran.testnet",
    derivationPath: "44'/397'/0'/0'/1'",
    publicKey: "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC",
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupLedger, LOCAL_STORAGE_AUTH_DATA } = require("./ledger");

  const provider = mock<ProviderService>();
  const storage = mock<StorageService>();
  const ledgerWallet = mockWallet<HardwareWallet>(setupLedger(), {
    storage,
    provider,
    ...deps,
  });
  const ledgerClient = mock<LedgerClient>({
    getPublicKey: jest
      .fn()
      .mockResolvedValue("GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"),
    sign: jest
      .fn()
      .mockResolvedValue(
        Buffer.from([
          86, 38, 222, 143, 115, 251, 107, 14, 115, 59, 92, 98, 66, 174, 173,
          124, 209, 189, 191, 180, 89, 25, 125, 254, 97, 240, 178, 98, 65, 70,
          238, 108, 105, 122, 165, 249, 193, 70, 118, 194, 126, 218, 117, 100,
          250, 124, 202, 161, 173, 12, 232, 146, 105, 194, 138, 35, 207, 53, 84,
          218, 45, 220, 10, 4,
        ])
      ),
  });

  jest.mock("./ledger-client", () => {
    const module = jest.requireActual("./ledger-client");

    return {
      ...module,
      isSupported: jest.fn().mockReturnValue(true),
      LedgerClient: jest.fn().mockImplementation(() => ledgerClient),
    };
  });

  storage.getItem.calledWith(LOCAL_STORAGE_AUTH_DATA).mockReturnValue(authData);

  provider.viewAccessKey.mockResolvedValue({
    nonce: 0,
    permission: "FullAccess",
    block_height: 0,
    block_hash: "block_hash",
  });

  return {
    nearApiJs: require("near-api-js"),
    wallet: ledgerWallet,
    storage: deps.storage || storage,
    ledgerClient,
    authData,
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

describe("connect", () => {
  it("signs in", async () => {
    const { wallet, ledgerClient, storage, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.connect({
      accountId: authData.accountId,
      derivationPath: authData.derivationPath,
    });
    expect(storage.setItem).toHaveBeenCalledWith("ledger:authData", authData);
    expect(ledgerClient.connect).toHaveBeenCalled();
    expect(ledgerClient.setScrambleKey).toHaveBeenCalled();
    expect(ledgerClient.on).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  it("returns account objects", async () => {
    const { wallet, authData } = createLedgerWallet();
    await wallet.init();
    await wallet.connect({
      accountId: authData.accountId,
      derivationPath: authData.derivationPath,
    });
    const result = wallet.getAccounts();
    expect(result).toEqual([{ accountId: "amirsaran.testnet" }]);
  });
});

// describe("signAndSendTransaction", () => {
//   it("signs and sends transaction", async () => {
//     const { wallet, authData } = createLedgerWallet();
//     await wallet.init();
//     await wallet.connect({
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
