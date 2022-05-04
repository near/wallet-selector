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

const createLedgerWallet = async (deps: MockWalletDependencies = {}) => {
  const storageState: Record<string, never> = {};
  const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupLedger } = require("./ledger");

  const provider = mock<ProviderService>();
  const storage = mock<StorageService>({
    getItem: jest.fn((key) => storageState[key] || null),
    setItem: jest.fn((key, value) => {
      // @ts-ignore
      storageState[key] = value;
    }),
  });
  const ledgerWallet = await mockWallet<HardwareWallet>(setupLedger(), {
    storage,
    provider,
    ...deps,
  });
  const ledgerClient = mock<LedgerClient>({
    getPublicKey: jest.fn().mockResolvedValue(publicKey),
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
      isLedgerSupported: jest.fn().mockReturnValue(true),
      LedgerClient: jest.fn().mockImplementation(() => ledgerClient),
    };
  });

  provider.viewAccessKey.mockResolvedValue({
    nonce: 0,
    permission: "FullAccess",
    block_height: 0,
    block_hash: "block_hash",
  });

  return {
    nearApiJs: require("near-api-js"),
    wallet: ledgerWallet!,
    storage: deps.storage || storage,
    ledgerClient,
    publicKey,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("connect", () => {
  // TODO: Need to mock fetching for account id.
  it.skip("signs in", async () => {
    const accountId = "accountId";
    const derivationPath = "derivationPath";
    const { wallet, ledgerClient, storage, publicKey } =
      await createLedgerWallet();
    await wallet.connect({ derivationPath });
    expect(storage.setItem).toHaveBeenCalledWith("ledger:authData", {
      accountId,
      derivationPath,
      publicKey,
    });
    expect(ledgerClient.connect).toHaveBeenCalled();
    expect(ledgerClient.setScrambleKey).toHaveBeenCalled();
    expect(ledgerClient.on).toHaveBeenCalled();
  });
});

describe("getAccounts", () => {
  // TODO: Need to mock fetching for account id.
  it.skip("returns account objects", async () => {
    const accountId = "accountId";
    const { wallet } = await createLedgerWallet();
    await wallet.connect({
      derivationPath: "derivationPath",
    });
    const result = await wallet.getAccounts();
    expect(result).toEqual([{ accountId }]);
  });
});

// describe("signAndSendTransaction", () => {
//   it("signs and sends transaction", async () => {
//     const { wallet, authData } = await createLedgerWallet();
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
