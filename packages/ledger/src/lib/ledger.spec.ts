/* eslint-disable @nx/enforce-module-boundaries */
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { HardwareWallet, Transaction } from "../../../core/src/lib/wallet";
import type { ProviderService } from "../../../core/src/lib/services";
import type { LedgerClient } from "./ledger-client";

const createLedgerWallet = async () => {
  const publicKey = "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

  const ledgerClient = mock<LedgerClient>({
    getPublicKey: jest.fn().mockResolvedValue(publicKey),
    isConnected: jest.fn(() => false),
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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupLedger } = require("./ledger");

  const provider = mock<ProviderService>();
  const { wallet, storage } = await mockWallet<HardwareWallet>(setupLedger(), {
    provider,
  });

  provider.viewAccessKey.mockResolvedValue({
    nonce: BigInt(0),
    permission: "FullAccess",
    block_height: 0,
    block_hash: "block_hash",
  });

  return {
    nearApiJs: require("near-api-js"),
    wallet,
    storage,
    ledgerClient,
    publicKey,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("connect", () => {
  it("signs in", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, storage, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });

    expect(storage.setItem).toHaveBeenCalledWith(
      "near-wallet-selector:ledger:accounts",
      JSON.stringify([
        {
          accountId,
          derivationPath,
          publicKey,
        },
      ])
    );
  });
});

describe("getAccounts", () => {
  it("returns account objects", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });
    const result = await wallet.getAccounts();
    expect(result).toEqual([{ accountId, publicKey: "ed25519:" + publicKey }]);
  });
  it("returns empty list because not connected", async () => {
    const { wallet } = await createLedgerWallet();
    const result = await wallet.getAccounts();
    expect(result).toEqual([]);
  });
});

describe("signAndSendTransaction", () => {
  it("signs and sends transaction", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, ledgerClient, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });
    await wallet.signAndSendTransaction({
      signerId: "amirsaran.testnet",
      receiverId: "guest-book.testnet",
      actions: [],
    });
    expect(ledgerClient.sign).toHaveBeenCalled();
  });
});

describe("signAndSendTransactions", () => {
  it("signs and sends only one transaction", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, ledgerClient, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });
    const transactions: Array<Transaction> = [
      {
        signerId: "amirsaran.testnet",
        receiverId: "guest-book.testnet",
        actions: [],
      },
    ];
    const result = await wallet.signAndSendTransactions({
      transactions: transactions,
    });
    expect(ledgerClient.sign).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });

  it("signs and sends multiple transactions", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, ledgerClient, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });
    const transactions: Array<Transaction> = [
      {
        signerId: "amirsaran.testnet",
        receiverId: "guest-book.testnet",
        actions: [],
      },
      {
        signerId: "amirsaran.testnet",
        receiverId: "guest-book.testnet",
        actions: [],
      },
    ];
    const result = await wallet.signAndSendTransactions({
      transactions,
    });
    expect(ledgerClient.sign).toHaveBeenCalled();
    expect(result.length).toEqual(transactions.length);
  });
});

describe("getPublicKey", () => {
  it("returns public key", async () => {
    const accountId = "amirsaran.testnet";
    const derivationPath = "44'/397'/0'/0'/1'";
    const { wallet, publicKey } = await createLedgerWallet();
    await wallet.signIn({
      accounts: [{ derivationPath, publicKey, accountId }],
      contractId: "guest-book.testnet",
    });
    const publicKeyResponse = await wallet.getPublicKey(derivationPath);
    expect(publicKeyResponse).toBe(
      "GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC"
    );
  });
});
