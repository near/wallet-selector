/* eslint-disable @nx/enforce-module-boundaries, @typescript-eslint/no-explicit-any*/
import { mock } from "jest-mock-extended";
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "@near-wallet-selector/core";
import type { ProviderService } from "../../../core/src/lib/services";
import { setupWebAuthnWallet } from "./index";
import * as webauthnUtils from "./webauthn-utils";
import {
  SignInModal,
  TransactionModal,
  MessageSigningModal,
} from "./components";

const accountId = "test-account.testnet";
const publicKey = "ed25519:GF7tLvSzcxX4EtrMFtGvGTb2yUj2DhL8hWzc97BwUkyC";

// Mock the webauthn-utils module
jest.mock("./webauthn-utils", () => ({
  isPassKeyAvailable: jest.fn().mockResolvedValue(true),
  createKey: jest.fn(),
  getKeys: jest.fn(),
}));

// Mock the components
jest.mock("./components", () => ({
  SignInModal: jest.fn(),
  TransactionModal: jest.fn(),
  MessageSigningModal: jest.fn(),
  DelegateActionModal: jest.fn(),
}));

const mockKeyPair = {
  getPublicKey: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue(publicKey),
  }),
  sign: jest.fn(),
};

const createWebAuthnWallet = async (deps: MockWalletDependencies = {}) => {
  const { wallet, storage } = await mockWallet<InjectedWallet>(
    setupWebAuthnWallet({
      relayerUrl: "https://test-relayer.example.com",
    }),
    deps
  );

  return {
    wallet,
    storage,
  };
};

beforeEach(() => {
  jest.clearAllMocks();

  // Setup default mock implementations
  (webauthnUtils.isPassKeyAvailable as jest.Mock).mockResolvedValue(true);
  (webauthnUtils.createKey as jest.Mock).mockResolvedValue(mockKeyPair);
  (webauthnUtils.getKeys as jest.Mock).mockResolvedValue([mockKeyPair]);

  // Mock SignInModal
  (SignInModal as jest.Mock).mockImplementation(({ onSubmit }) => ({
    show: jest.fn(() => {
      // Simulate user submitting account ID
      setTimeout(() => onSubmit(accountId, false), 0);
    }),
    close: jest.fn(),
  }));

  // Mock TransactionModal
  (TransactionModal as jest.Mock).mockImplementation(({ onApprove }) => ({
    show: jest.fn(() => {
      // Simulate user approving transaction
      setTimeout(() => onApprove(), 0);
    }),
    close: jest.fn(),
  }));

  // Mock MessageSigningModal
  (MessageSigningModal as jest.Mock).mockImplementation(({ onApprove }) => ({
    show: jest.fn(() => {
      // Simulate user approving message signing
      setTimeout(() => onApprove(), 0);
    }),
    close: jest.fn(),
  }));
});

afterEach(() => {
  jest.resetModules();
});

describe("WebAuthn Wallet - Core Functionality", () => {
  describe("signIn", () => {
    it("should successfully sign in with new account", async () => {
      const { wallet } = await createWebAuthnWallet();

      // Mock fetch for relayer
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      }) as jest.Mock;

      const accounts = await wallet.signIn({ contractId: "test.testnet" });

      expect(accounts).toHaveLength(1);
      expect(accounts[0].accountId).toBe(accountId);
    });

    it("should successfully sign in with existing account", async () => {
      const mockProvider = mock<ProviderService>();
      mockProvider.query.mockResolvedValue({
        keys: [{ public_key: publicKey }],
      } as any);

      const { wallet } = await createWebAuthnWallet({
        provider: mockProvider,
      });

      const accounts = await wallet.signIn({ contractId: "test.testnet" });

      expect(accounts).toHaveLength(1);
      expect(accounts[0].accountId).toBe(accountId);
    });
  });

  describe("signOut", () => {
    it("should successfully sign out", async () => {
      const mockProvider = mock<ProviderService>();
      mockProvider.query.mockResolvedValue({
        keys: [{ public_key: publicKey }],
      } as any);

      const { wallet } = await createWebAuthnWallet({
        provider: mockProvider,
      });

      // Sign in first
      await wallet.signIn({ contractId: "test.testnet" });

      // Then sign out
      await wallet.signOut();

      // Verify account is cleared
      const accounts = await wallet.getAccounts();
      expect(accounts).toHaveLength(0);
    });
  });

  describe("getAccounts", () => {
    it("should return empty array when not signed in", async () => {
      const { wallet } = await createWebAuthnWallet();

      const accounts = await wallet.getAccounts();

      expect(accounts).toEqual([]);
    });

    it("should return account array when signed in", async () => {
      const mockProvider = mock<ProviderService>();
      mockProvider.query.mockResolvedValue({
        keys: [{ public_key: publicKey }],
      } as any);

      const { wallet } = await createWebAuthnWallet({
        provider: mockProvider,
      });

      await wallet.signIn({ contractId: "test.testnet" });
      const accounts = await wallet.getAccounts();

      expect(accounts).toHaveLength(1);
      expect(accounts[0].accountId).toBe(accountId);
    });
  });

  describe("signAndSendTransaction", () => {
    it("should throw error when not signed in", async () => {
      const { wallet } = await createWebAuthnWallet();

      await expect(
        wallet.signAndSendTransaction({
          signerId: accountId,
          receiverId: "test.testnet",
          actions: [],
        })
      ).rejects.toThrow("No account signed in");
    });
  });

  describe("signAndSendTransactions", () => {
    it("should throw error when not signed in", async () => {
      const { wallet } = await createWebAuthnWallet();

      await expect(
        wallet.signAndSendTransactions({
          transactions: [
            {
              signerId: accountId,
              receiverId: "test.testnet",
              actions: [],
            },
          ],
        })
      ).rejects.toThrow("No account signed in");
    });
  });

  describe("signMessage", () => {
    it("should throw error when not signed in", async () => {
      const { wallet } = await createWebAuthnWallet();

      // Create a proper 32-byte nonce buffer
      const nonce = Buffer.alloc(32);

      await expect(
        wallet.signMessage!({
          message: "test message",
          nonce: nonce,
          recipient: "test.app",
        })
      ).rejects.toThrow("No account signed in");
    });
  });

  describe("getPublicKey", () => {
    it("should throw error when not signed in", async () => {
      const { wallet } = await createWebAuthnWallet();

      await expect(wallet.getPublicKey()).rejects.toThrow(
        "No account signed in"
      );
    });

    it("should return public key when signed in", async () => {
      const mockProvider = mock<ProviderService>();
      mockProvider.query.mockResolvedValue({
        keys: [{ public_key: publicKey }],
      } as any);

      const { wallet } = await createWebAuthnWallet({
        provider: mockProvider,
      });

      await wallet.signIn({ contractId: "test.testnet" });
      const pk = await wallet.getPublicKey();

      expect(pk.toString()).toBe(publicKey);
    });
  });

  describe("WebAuthn support check", () => {
    it("should throw error when WebAuthn is not supported", async () => {
      (webauthnUtils.isPassKeyAvailable as jest.Mock).mockResolvedValue(false);

      await expect(createWebAuthnWallet()).rejects.toThrow(
        "WebAuthn is not supported in this browser"
      );
    });
  });
});
