/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyType, PublicKey } from "@near-js/crypto";
import { JsonRpcProvider } from "@near-js/providers";
import type { Signer } from "@near-js/signers";
import {
  createTransaction,
  encodeTransaction,
  Signature,
  SignedTransaction,
  Action,
  FunctionCall,
} from "@near-js/transactions";
import type { Network, Transaction } from "@near-wallet-selector/core";
import { sha256 } from "js-sha256";
import { baseDecode } from "@near-js/utils";
import { signTransactions, LegacySigner } from "./sign-transactions";

// Mock dependencies
jest.mock("@near-js/providers");
jest.mock("@near-js/transactions");
jest.mock("js-sha256");
jest.mock("@near-js/utils");

describe("LegacySigner", () => {
  it("should be an abstract class with abstract methods", () => {
    // TypeScript abstract classes can't be instantiated directly,
    // but they can be extended and their methods must be implemented
    class TestSigner extends LegacySigner {
      async createKey(): Promise<PublicKey> {
        throw new Error("Not implemented");
      }
      async getPublicKey(): Promise<PublicKey> {
        throw new Error("Not implemented");
      }
      async signMessage(): Promise<Signature> {
        throw new Error("Not implemented");
      }
    }

    const signer = new TestSigner();
    expect(signer).toBeInstanceOf(LegacySigner);
  });
});

describe("signTransactions", () => {
  const mockNetwork: Network = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    indexerUrl: "https://indexer.testnet.near.org",
  };

  // Create a valid ED25519 public key (32 bytes)
  const validEd25519Data = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    validEd25519Data[i] = i;
  }

  const mockPublicKey = {
    keyType: KeyType.ED25519,
    data: validEd25519Data,
    toString: () => "ed25519:2jZg8wvJbJJqvJqvJqvJqvJqvJqvJqvJqvJqvJqvJqv",
  } as unknown as PublicKey;

  const mockTransaction: Transaction = {
    signerId: "test-account.testnet",
    receiverId: "receiver.testnet",
    actions: [],
  };

  const mockBlock = {
    header: {
      hash: "mockBlockHash",
    },
  };

  const mockAccessKey = {
    nonce: 100,
  };

  const mockSignedTx = {
    signature: {
      data: new Uint8Array([1, 2, 3, 4]),
    },
  };

  const mockNearTransaction = {
    signerId: "test-account.testnet",
    publicKey: {
      ed25519Key: true,
    },
    receiverId: "receiver.testnet",
    actions: [],
  };

  let mockProvider: jest.Mocked<JsonRpcProvider>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock JsonRpcProvider
    mockProvider = {
      block: jest.fn().mockResolvedValue(mockBlock),
      query: jest.fn().mockResolvedValue(mockAccessKey),
    } as any;

    (JsonRpcProvider as jest.Mock).mockImplementation(() => mockProvider);

    // Mock createTransaction
    (createTransaction as jest.Mock).mockReturnValue(mockNearTransaction);

    // Mock baseDecode
    (baseDecode as jest.Mock).mockReturnValue(new Uint8Array([5, 6, 7, 8]));

    // Mock encodeTransaction
    (encodeTransaction as jest.Mock).mockReturnValue(
      new Uint8Array([9, 10, 11, 12])
    );

    // Mock sha256
    (sha256 as any).array = jest
      .fn()
      .mockReturnValue(new Uint8Array([13, 14, 15, 16]));

    // Mock SignedTransaction constructor
    (SignedTransaction as any).mockImplementation(function (
      this: any,
      data: any
    ) {
      return data;
    });

    // Mock Signature constructor
    (Signature as any).mockImplementation(function (this: any, data: any) {
      return data;
    });

    // Mock PublicKey.from to return mockPublicKey
    jest
      .spyOn(PublicKey, "from")
      .mockImplementation((value: string | PublicKey) => {
        if (typeof value === "string") {
          // Return appropriate mock based on key type prefix
          if (value.startsWith("secp256k1:")) {
            const validSecp256k1Data = new Uint8Array(64);
            return {
              keyType: KeyType.SECP256K1,
              data: validSecp256k1Data,
              toString: () => value,
            } as unknown as PublicKey;
          }
          // Default to ED25519
          return mockPublicKey;
        }
        return value as PublicKey;
      });
  });

  describe("with modern Signer", () => {
    it("should sign transactions using signer.signTransaction", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      const result = await signTransactions(
        [mockTransaction],
        mockSigner,
        mockNetwork
      );

      expect(mockProvider.block).toHaveBeenCalledWith({ finality: "final" });
      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "view_access_key",
        finality: "final",
        account_id: mockTransaction.signerId,
        public_key: mockPublicKey.toString(),
      });
      expect(mockSigner.getPublicKey).toHaveBeenCalledWith(
        mockTransaction.signerId,
        mockNetwork.networkId
      );
      expect(mockSigner.signTransaction).toHaveBeenCalledWith(
        mockNearTransaction
      );
      expect(createTransaction).toHaveBeenCalledWith(
        mockTransaction.signerId,
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        mockTransaction.receiverId,
        mockAccessKey.nonce + 1,
        mockTransaction.actions,
        expect.any(Uint8Array)
      );
      expect(result).toHaveLength(1);
    });

    it("should sign multiple transactions", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      const transactions = [mockTransaction, mockTransaction, mockTransaction];

      const result = await signTransactions(
        transactions,
        mockSigner,
        mockNetwork
      );

      expect(result).toHaveLength(3);
      expect(mockSigner.signTransaction).toHaveBeenCalledTimes(3);
      expect(createTransaction).toHaveBeenCalledTimes(3);

      // Check that nonces increment correctly
      expect(createTransaction).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        expect.any(String),
        mockAccessKey.nonce + 1,
        expect.any(Array),
        expect.any(Uint8Array)
      );
      expect(createTransaction).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        expect.any(String),
        mockAccessKey.nonce + 2,
        expect.any(Array),
        expect.any(Uint8Array)
      );
      expect(createTransaction).toHaveBeenNthCalledWith(
        3,
        expect.any(String),
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        expect.any(String),
        mockAccessKey.nonce + 3,
        expect.any(Array),
        expect.any(Uint8Array)
      );
    });

    it("should handle SECP256K1 key type", async () => {
      // Create a valid SECP256K1 public key (64 bytes)
      const validSecp256k1Data = new Uint8Array(64);
      for (let i = 0; i < 64; i++) {
        validSecp256k1Data[i] = i;
      }

      const secp256k1PublicKey = {
        keyType: KeyType.SECP256K1,
        data: validSecp256k1Data,
        toString: () =>
          "secp256k1:2jZg8wvJbJJqvJqvJqvJqvJqvJqvJqvJqvJqvJqvJqvsecp256k1keypublickey",
      } as any;

      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(secp256k1PublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      const result = await signTransactions(
        [mockTransaction],
        mockSigner,
        mockNetwork
      );

      expect(result).toHaveLength(1);
      expect(Signature).toHaveBeenCalledWith(
        expect.objectContaining({
          keyType: KeyType.SECP256K1,
        })
      );
    });
  });

  describe("with LegacySigner", () => {
    class MockLegacySigner extends LegacySigner {
      async createKey(): Promise<PublicKey> {
        return mockPublicKey;
      }

      async getPublicKey(): Promise<PublicKey> {
        return mockPublicKey;
      }

      async signMessage(): Promise<Signature> {
        return {
          signature: {
            data: new Uint8Array([21, 22, 23, 24]),
          },
          keyType: KeyType.ED25519,
          data: new Uint8Array([21, 22, 23, 24]),
        } as unknown as Signature;
      }
    }

    it("should sign transactions using legacy signer", async () => {
      const legacySigner = new MockLegacySigner();
      jest.spyOn(legacySigner, "getPublicKey");
      jest.spyOn(legacySigner, "signMessage");

      const result = await signTransactions(
        [mockTransaction],
        legacySigner,
        mockNetwork
      );

      expect(legacySigner.getPublicKey).toHaveBeenCalledWith(
        mockTransaction.signerId,
        mockNetwork.networkId
      );
      expect(legacySigner.signMessage).toHaveBeenCalledWith(
        expect.any(Uint8Array),
        mockTransaction.signerId,
        mockNetwork.networkId
      );
      expect(result).toHaveLength(1);
    });

    it("should encode and hash transaction for legacy signer", async () => {
      const legacySigner = new MockLegacySigner();

      await signTransactions([mockTransaction], legacySigner, mockNetwork);

      expect(encodeTransaction).toHaveBeenCalledWith(mockNearTransaction);
      expect(sha256.array).toHaveBeenCalledWith(expect.any(Uint8Array));
    });

    it("should detect ED25519 key type from transaction public key", async () => {
      const legacySigner = new MockLegacySigner();

      await signTransactions([mockTransaction], legacySigner, mockNetwork);

      // The transaction has ed25519Key: true, so it should use ED25519
      expect(Signature).toHaveBeenCalledWith(
        expect.objectContaining({
          keyType: KeyType.ED25519,
        })
      );
    });

    it("should detect SECP256K1 key type from transaction public key", async () => {
      const secp256k1Transaction = {
        ...mockNearTransaction,
        publicKey: {
          ed25519Key: false,
        },
      };
      (createTransaction as jest.Mock).mockReturnValue(secp256k1Transaction);

      const legacySigner = new MockLegacySigner();

      await signTransactions([mockTransaction], legacySigner, mockNetwork);

      expect(Signature).toHaveBeenCalledWith(
        expect.objectContaining({
          keyType: KeyType.SECP256K1,
        })
      );
    });
  });

  describe("error handling", () => {
    it("should propagate errors from provider.block", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      mockProvider.block.mockRejectedValueOnce(
        new Error("Failed to fetch block")
      );

      await expect(
        signTransactions([mockTransaction], mockSigner, mockNetwork)
      ).rejects.toThrow("Failed to fetch block");
    });

    it("should propagate errors from provider.query", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      mockProvider.query.mockRejectedValueOnce(
        new Error("Failed to query access key")
      );

      await expect(
        signTransactions([mockTransaction], mockSigner, mockNetwork)
      ).rejects.toThrow("Failed to query access key");
    });

    it("should propagate errors from signer.getPublicKey", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest
          .fn()
          .mockRejectedValue(new Error("Failed to get public key")),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      await expect(
        signTransactions([mockTransaction], mockSigner, mockNetwork)
      ).rejects.toThrow("Failed to get public key");
    });

    it("should propagate errors from signer.signTransaction", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockRejectedValue(new Error("Failed to sign transaction")),
      } as any;

      await expect(
        signTransactions([mockTransaction], mockSigner, mockNetwork)
      ).rejects.toThrow("Failed to sign transaction");
    });
  });

  describe("network configuration", () => {
    it("should use the correct network URL for provider", async () => {
      const customNetwork: Network = {
        networkId: "mainnet",
        nodeUrl: "https://custom-rpc.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
        indexerUrl: "https://indexer.mainnet.near.org",
      };

      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      await signTransactions([mockTransaction], mockSigner, customNetwork);

      expect(JsonRpcProvider).toHaveBeenCalledWith({
        url: customNetwork.nodeUrl,
      });
    });

    it("should pass correct networkId to signer", async () => {
      const customNetwork: Network = {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
        indexerUrl: "https://indexer.mainnet.near.org",
      };

      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      await signTransactions([mockTransaction], mockSigner, customNetwork);

      expect(mockSigner.getPublicKey).toHaveBeenCalledWith(
        mockTransaction.signerId,
        customNetwork.networkId
      );
    });
  });

  describe("transaction details", () => {
    it("should create transaction with correct parameters", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      const txWithActions: Transaction = {
        signerId: "sender.testnet",
        receiverId: "receiver.testnet",
        actions: [
          new Action({
            functionCall: new FunctionCall({
              methodName: "test_method",
              args: new Uint8Array(Buffer.from(JSON.stringify({}))),
              gas: BigInt("30000000000000"),
              deposit: BigInt("0"),
            }),
          }),
        ],
      };

      await signTransactions([txWithActions], mockSigner, mockNetwork);

      expect(createTransaction).toHaveBeenCalledWith(
        txWithActions.signerId,
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        txWithActions.receiverId,
        mockAccessKey.nonce + 1,
        txWithActions.actions,
        expect.any(Uint8Array)
      );
    });

    it("should use block hash from provider", async () => {
      const mockSigner: Signer = {
        getPublicKey: jest.fn().mockResolvedValue(mockPublicKey),
        signTransaction: jest
          .fn()
          .mockResolvedValue([new Uint8Array([17, 18, 19, 20]), mockSignedTx]),
      } as any;

      await signTransactions([mockTransaction], mockSigner, mockNetwork);

      expect(baseDecode).toHaveBeenCalledWith(mockBlock.header.hash);
      expect(createTransaction).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          keyType: expect.any(Number),
          data: expect.any(Uint8Array),
        }),
        expect.any(String),
        expect.any(Number),
        expect.any(Array),
        new Uint8Array([5, 6, 7, 8]) // mocked baseDecode result
      );
    });
  });
});
