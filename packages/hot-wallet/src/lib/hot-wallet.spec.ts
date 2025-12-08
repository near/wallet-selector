/* eslint-disable @nx/enforce-module-boundaries */
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "@near-wallet-selector/core";
import { setupHotWallet } from "./index";

// Mock the HOT SDK
jest.mock("@hot-wallet/sdk", () => {
  const mockHOT = {
    isInjected: true,
    request: jest.fn(),
    subscribe: jest.fn(),
  };
  return {
    HOT: mockHOT,
    verifySignature: jest.fn().mockReturnValue(true),
  };
});

import { HOT, verifySignature } from "@hot-wallet/sdk";

const accountId = "test-account.testnet";
const publicKey = "ed25519:GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

const createHotWallet = async (deps: MockWalletDependencies = {}) => {
  const { wallet, storage } = await mockWallet<InjectedWallet>(
    setupHotWallet(),
    deps
  );

  return {
    wallet,
    storage,
  };
};

beforeEach(() => {
  jest.clearAllMocks();
  (HOT as any).isInjected = true;
  (HOT.request as jest.Mock).mockClear();
  (HOT.subscribe as jest.Mock).mockClear();
  (verifySignature as jest.Mock).mockReturnValue(true);
});

afterEach(() => {
  jest.resetModules();
});

describe("Hot Wallet - Core Functionality", () => {
  describe("signIn", () => {
    it("should successfully sign in", async () => {
      (HOT.request as jest.Mock).mockResolvedValue({
        accountId,
        publicKey,
      });

      const { wallet, storage } = await createHotWallet();

      const accounts = await wallet.signIn({ contractId: "test.testnet" });

      expect(HOT.request).toHaveBeenCalledWith("near:signIn", {});
      expect(accounts).toEqual([{ accountId, publicKey }]);
      
      // Verify storage was updated (key is prefixed and value is stringified by storage service)
      expect(storage.setItem).toHaveBeenCalledWith(
        expect.stringContaining("hot:near-account"),
        expect.any(String)
      );
    });
  });

  describe("signOut", () => {
    it("should successfully sign out when HOT is injected", async () => {
      (HOT as any).isInjected = true;
      (HOT.request as jest.Mock).mockResolvedValue(undefined);

      const { wallet, storage } = await createHotWallet();

      await wallet.signOut();

      expect(HOT.request).toHaveBeenCalledWith("near:signOut", {});
      // Verify storage was cleared (value is JSON stringified by storage service)
      expect(storage.setItem).toHaveBeenCalledWith(
        expect.stringContaining("hot:near-account"),
        expect.any(String)
      );
    });

    it("should sign out without calling HOT.request when not injected", async () => {
      (HOT as any).isInjected = false;

      const { wallet, storage } = await createHotWallet();

      await wallet.signOut();

      expect(HOT.request).not.toHaveBeenCalled();
      // Verify storage.setItem was called (the exact key may be prefixed)
      expect(storage.setItem).toHaveBeenCalled();
    });
  });

  describe("getAccounts", () => {
    it("should return account from HOT.request when injected", async () => {
      (HOT as any).isInjected = true;
      (HOT.request as jest.Mock).mockResolvedValue({
        accountId,
        publicKey,
      });

      const { wallet } = await createHotWallet();

      const accounts = await wallet.getAccounts();

      expect(HOT.request).toHaveBeenCalledWith("near:signIn", {});
      expect(accounts).toEqual([{ accountId, publicKey }]);
    });

    it("should return account from HOT.request when injected", async () => {
      (HOT as any).isInjected = true;
      (HOT.request as jest.Mock).mockResolvedValue({
        accountId,
        publicKey,
      });

      const { wallet } = await createHotWallet();

      const accounts = await wallet.getAccounts();

      expect(HOT.request).toHaveBeenCalledWith("near:signIn", {});
      expect(accounts).toEqual([{ accountId, publicKey }]);
    });
  });

  describe("signMessage", () => {
    it("should successfully sign message", async () => {
      const mockSignature = {
        signature: "ed25519:testSignature",
        publicKey,
        accountId,
      };

      (HOT.request as jest.Mock).mockResolvedValue(mockSignature);

      const { wallet } = await createHotWallet();

      const nonce = Buffer.alloc(32);
      const result = await wallet.signMessage!({
        message: "test message",
        nonce: nonce,
        recipient: "test.app",
      });

      expect(HOT.request).toHaveBeenCalledWith("near:signMessage", {
        message: "test message",
        nonce: Array.from(new Uint8Array(nonce)),
        recipient: "test.app",
      });
      expect(verifySignature).toHaveBeenCalled();
      expect(result).toEqual(mockSignature);
    });

    it("should throw error when signature is invalid", async () => {
      const mockSignature = {
        signature: "ed25519:invalidSignature",
        publicKey,
        accountId,
      };

      (HOT.request as jest.Mock).mockResolvedValue(mockSignature);
      (verifySignature as jest.Mock).mockReturnValue(false);

      const { wallet } = await createHotWallet();

      const nonce = Buffer.alloc(32);
      await expect(
        wallet.signMessage!({
          message: "test message",
          nonce: nonce,
          recipient: "test.app",
        })
      ).rejects.toEqual("Signature invalid");
    });
  });

  describe("signAndSendTransaction", () => {
    it("should successfully sign and send transaction", async () => {
      const mockTransaction = {
        transaction: { hash: "testHash" },
      };

      (HOT.request as jest.Mock).mockResolvedValue({
        transactions: [mockTransaction],
      });

      const { wallet } = await createHotWallet();

      const result = await wallet.signAndSendTransaction({
        signerId: accountId,
        receiverId: "test.testnet",
        actions: [],
      });

      expect(HOT.request).toHaveBeenCalledWith(
        "near:signAndSendTransactions",
        expect.objectContaining({
          transactions: expect.arrayContaining([
            expect.objectContaining({
              signerId: accountId,
              receiverId: "test.testnet",
            }),
          ]),
        })
      );
      expect(result).toEqual(mockTransaction);
    });
  });

  describe("signAndSendTransactions", () => {
    it("should successfully sign and send multiple transactions", async () => {
      const mockTransactions = [
        { transaction: { hash: "hash1" } },
        { transaction: { hash: "hash2" } },
      ];

      (HOT.request as jest.Mock).mockResolvedValue({
        transactions: mockTransactions,
      });

      const { wallet } = await createHotWallet();

      const transactions = [
        {
          signerId: accountId,
          receiverId: "test.testnet",
          actions: [],
        },
        {
          signerId: accountId,
          receiverId: "test2.testnet",
          actions: [],
        },
      ];

      const result = await wallet.signAndSendTransactions({ transactions });

      expect(HOT.request).toHaveBeenCalledWith(
        "near:signAndSendTransactions",
        expect.arrayContaining([
          expect.objectContaining({
            signerId: accountId,
            receiverId: "test.testnet",
            actions: expect.any(Array),
          }),
        ])
      );
      expect(result).toEqual(mockTransactions);
    });
  });
});

