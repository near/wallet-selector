/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, renderHook, waitFor, act } from "@testing-library/react";
import {
  WalletSelectorProvider,
  WalletSelectorContext,
} from "./WalletSelectorProvider";
import type {
  WalletSelectorParams,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { FailoverRpcProvider } from "@near-js/providers";
import { actionCreators } from "@near-js/transactions";
import { useContext } from "react";

// Mock all external dependencies
jest.mock("@near-wallet-selector/core");
jest.mock("@near-wallet-selector/modal-ui");
jest.mock("@near-js/providers");
jest.mock("@near-js/transactions");

const mockSetupWalletSelector = setupWalletSelector as jest.MockedFunction<
  typeof setupWalletSelector
>;
const mockSetupModal = setupModal as jest.MockedFunction<typeof setupModal>;
const mockActionCreators = actionCreators as jest.Mocked<typeof actionCreators>;

describe("WalletSelectorProvider", () => {
  let mockWalletSelector: jest.Mocked<WalletSelector>;
  let mockWallet: jest.Mocked<Wallet>;
  let mockModal: { show: jest.Mock };
  let mockProvider: jest.Mocked<FailoverRpcProvider>;
  let subscriptionCallback: ((accountId: string | null) => void) | null = null;

  const mockConfig: WalletSelectorParams = {
    network: "testnet",
    modules: [],
  };

  // Helper function to create wrapper with config
  const createWrapper = (config: WalletSelectorParams = mockConfig) => {
    return ({ children }: { children: React.ReactNode }) => (
      <WalletSelectorProvider config={config}>
        {children}
      </WalletSelectorProvider>
    );
  };

  // Helper function to setup connected wallet
  // Note: Requires the full renderHook result to track reactive updates
  const setupConnectedWallet = async (hookResult: { current: any }) => {
    await waitFor(() => expect(subscriptionCallback).toBeTruthy());
    await act(async () => {
      subscriptionCallback?.("test.testnet");
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await waitFor(() => expect(hookResult.current?.wallet).toBeTruthy());
  };

  beforeEach(() => {
    jest.clearAllMocks();
    subscriptionCallback = null;

    // Mock wallet
    mockWallet = {
      id: "test-wallet",
      type: "browser",
      metadata: {
        name: "Test Wallet",
        description: "Test wallet",
        iconUrl: "icon.png",
        downloadUrl: "download.com",
        available: true,
        deprecated: false,
      },
      signOut: jest.fn().mockResolvedValue(undefined),
      signAndSendTransaction: jest.fn().mockResolvedValue({
        transaction: { hash: "hash123" },
      }),
      signAndSendTransactions: jest.fn().mockResolvedValue([]),
      signTransaction: jest
        .fn()
        .mockResolvedValue([new Uint8Array(), { signerId: "test.testnet" }]),
      getPublicKey: jest.fn().mockResolvedValue({
        keyType: 0,
        data: new Uint8Array(),
      }),
      signNep413Message: jest.fn().mockResolvedValue({
        accountId: "test.testnet",
        publicKey: { keyType: 0, data: new Uint8Array() },
        signature: new Uint8Array(),
      }),
      signMessage: jest.fn().mockResolvedValue({
        accountId: "test.testnet",
        publicKey: "ed25519:test",
        signature: "sig123",
      }),
      createSignedTransaction: jest.fn().mockResolvedValue({
        signerId: "test.testnet",
      }),
    } as unknown as jest.Mocked<Wallet>;

    // Mock wallet selector
    mockWalletSelector = {
      isSignedIn: jest.fn().mockReturnValue(false),
      wallet: jest.fn().mockResolvedValue(mockWallet),
      getAccounts: jest.fn().mockResolvedValue([]),
      setActiveAccount: jest.fn().mockResolvedValue(undefined),
      subscribeOnAccountChange: jest.fn((callback) => {
        subscriptionCallback = callback;
        return { remove: jest.fn() };
      }),
      options: {
        network: mockConfig.network,
        modules: [],
      },
      store: {
        getState: jest.fn().mockReturnValue({
          selectedWalletId: null,
          accounts: [],
        }),
        dispatch: jest.fn(),
        observable: {
          subscribe: jest.fn(),
        },
      },
    } as unknown as jest.Mocked<WalletSelector>;

    mockSetupWalletSelector.mockResolvedValue(mockWalletSelector);

    // Mock modal
    mockModal = { show: jest.fn() };
    mockSetupModal.mockReturnValue(mockModal as any);

    // Mock provider
    mockProvider = {
      query: jest.fn(),
    } as unknown as jest.Mocked<FailoverRpcProvider>;

    (
      FailoverRpcProvider as jest.MockedClass<typeof FailoverRpcProvider>
    ).mockImplementation(() => mockProvider);

    // Mock action creators
    mockActionCreators.functionCall = jest.fn().mockReturnValue({
      type: "FunctionCall",
    });
  });

  describe("Provider initialization", () => {
    it("should render children", () => {
      const { getByText } = render(
        <WalletSelectorProvider config={mockConfig}>
          <div>Test Child</div>
        </WalletSelectorProvider>
      );

      expect(getByText("Test Child")).toBeInTheDocument();
    });

    it("should initialize wallet selector with config", async () => {
      render(
        <WalletSelectorProvider config={mockConfig}>
          <div>Test</div>
        </WalletSelectorProvider>
      );

      await waitFor(() => {
        expect(mockSetupWalletSelector).toHaveBeenCalledWith(mockConfig);
      });
    });

    it("should subscribe to account changes", async () => {
      render(
        <WalletSelectorProvider config={mockConfig}>
          <div>Test</div>
        </WalletSelectorProvider>
      );

      await waitFor(() => {
        expect(mockWalletSelector.subscribeOnAccountChange).toHaveBeenCalled();
      });
    });

    it("should handle different network configurations", () => {
      const configs = [
        { network: "mainnet" as const, modules: [] },
        {
          network: "testnet" as const,
          modules: [],
          fallbackRpcUrls: ["https://custom-rpc.com"],
        },
      ];

      configs.forEach((config) => {
        render(
          <WalletSelectorProvider config={config}>
            <div>Test</div>
          </WalletSelectorProvider>
        );
      });

      expect(FailoverRpcProvider).toHaveBeenCalled();
    });
  });

  describe("Context value", () => {
    it("should provide initial context values", async () => {
      const TestComponent = () => {
        const context = useContext(WalletSelectorContext);
        return (
          <div>
            <span data-testid="wallet-selector">
              {context?.walletSelector ? "present" : "absent"}
            </span>
            <span data-testid="signed-account-id">
              {context?.signedAccountId || "null"}
            </span>
            <span data-testid="wallet">
              {context?.wallet ? "present" : "null"}
            </span>
          </div>
        );
      };

      const { getByTestId } = render(
        <WalletSelectorProvider config={mockConfig}>
          <TestComponent />
        </WalletSelectorProvider>
      );

      await waitFor(() => {
        expect(getByTestId("wallet-selector").textContent).toBe("present");
        expect(getByTestId("signed-account-id").textContent).toBe("null");
        expect(getByTestId("wallet").textContent).toBe("null");
      });
    });

    it("should update context when account changes", async () => {
      const TestComponent = () => {
        const context = useContext(WalletSelectorContext);
        return (
          <div>
            <span data-testid="signed-account-id">
              {context?.signedAccountId || "null"}
            </span>
          </div>
        );
      };

      const { getByTestId } = render(
        <WalletSelectorProvider config={mockConfig}>
          <TestComponent />
        </WalletSelectorProvider>
      );

      await waitFor(() => expect(subscriptionCallback).toBeTruthy());

      await act(async () => {
        subscriptionCallback?.("test.testnet");
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await waitFor(() => {
        expect(getByTestId("signed-account-id").textContent).toBe(
          "test.testnet"
        );
      });
    });
  });

  describe("signIn method", () => {
    it("should show modal when signIn is called", async () => {
      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.signIn).toBeDefined());

      await act(async () => {
        await walletContext?.signIn();
      });

      expect(mockSetupModal).toHaveBeenCalledWith(mockWalletSelector, {
        contractId: undefined,
        methodNames: [],
      });
      expect(mockModal.show).toHaveBeenCalled();
    });

    it("should pass contractId and methodNames to modal", async () => {
      const testCases = [
        {
          config: { ...mockConfig, createAccessKeyFor: "contract.testnet" },
          expected: { contractId: "contract.testnet", methodNames: [] },
        },
        {
          config: {
            ...mockConfig,
            createAccessKeyFor: {
              contractId: "contract.testnet",
              methodNames: ["method1", "method2"],
            },
          },
          expected: {
            contractId: "contract.testnet",
            methodNames: ["method1", "method2"],
          },
        },
      ];

      for (const { config, expected } of testCases) {
        const walletContext = renderHook(
          () => useContext(WalletSelectorContext),
          {
            wrapper: createWrapper(config),
          }
        ).result.current;

        await waitFor(() => expect(walletContext?.signIn).toBeDefined());
        await act(async () => {
          await walletContext?.signIn();
        });

        expect(mockSetupModal).toHaveBeenCalledWith(
          mockWalletSelector,
          expected
        );
      }
    });
  });

  describe("Methods requiring wallet connection", () => {
    const testWalletRequired = async (
      methodName: string,
      callMethod: (context: any) => Promise<any>,
      expectedError = "No wallet connected"
    ) => {
      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext).toBeDefined());
      await expect(callMethod(walletContext)).rejects.toThrow(expectedError);
    };

    it("should throw error when wallet is not connected", async () => {
      await testWalletRequired("signOut", (ctx) => ctx?.signOut());
      await testWalletRequired("callFunction", (ctx) =>
        ctx?.callFunction({ contractId: "test", method: "method" })
      );
      await testWalletRequired("signAndSendTransactions", (ctx) =>
        ctx?.signAndSendTransactions({ transactions: [] })
      );
      await testWalletRequired("signTransaction", (ctx) =>
        ctx?.signTransaction({})
      );
      await testWalletRequired("getPublicKey", (ctx) => ctx?.getPublicKey());
      await testWalletRequired("signNep413Message", (ctx) =>
        ctx?.signNep413Message("msg", "acc", "rec", new Uint8Array())
      );
      await testWalletRequired("createSignedTransaction", (ctx) =>
        ctx?.createSignedTransaction("receiver", [])
      );
    });

    it("should throw error for signMessage without wallet", async () => {
      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.signMessage).toBeDefined());

      expect(() => {
        walletContext?.signMessage({
          message: "test",
          recipient: "recipient.testnet",
          nonce: Buffer.from("nonce"),
        });
      }).toThrow("No wallet connected");
    });
  });

  describe("Wallet methods", () => {
    it("should call wallet.signOut when connected", async () => {
      const { result } = renderHook(() => useContext(WalletSelectorContext), {
        wrapper: createWrapper(),
      });

      await setupConnectedWallet(result);

      await act(async () => {
        await result.current?.signOut();
      });

      expect(mockWallet.signOut).toHaveBeenCalled();
    });

    it("should call wallet methods with correct parameters", async () => {
      const { result } = renderHook(() => useContext(WalletSelectorContext), {
        wrapper: createWrapper(),
      });

      await setupConnectedWallet(result);

      // Test callFunction
      await act(async () => {
        await result.current?.callFunction({
          contractId: "contract.testnet",
          method: "set_value",
          args: { value: 42 },
          gas: "100000000000000",
          deposit: "1000000000000000000000000",
        });
      });

      expect(mockActionCreators.functionCall).toHaveBeenCalledWith(
        "set_value",
        { value: 42 },
        BigInt("100000000000000"),
        BigInt("1000000000000000000000000")
      );

      // Test signAndSendTransactions
      const transactions = [
        {
          signerId: "test.testnet",
          receiverId: "contract.testnet",
          actions: [],
        },
      ];

      await act(async () => {
        await result.current?.signAndSendTransactions({ transactions });
      });

      expect(mockWallet.signAndSendTransactions).toHaveBeenCalledWith({
        transactions,
      });

      // Test signMessage
      const messageParams = {
        message: "test message",
        recipient: "recipient.testnet",
        nonce: Buffer.from("nonce123"),
      };

      result.current?.signMessage(messageParams);
      expect(mockWallet.signMessage).toHaveBeenCalledWith(messageParams);

      // Test signTransaction
      const transaction = { signerId: "test.testnet" } as any;
      await act(async () => {
        await result.current?.signTransaction(transaction);
      });
      expect(mockWallet.signTransaction).toHaveBeenCalledWith(transaction);

      // Test getPublicKey
      await act(async () => {
        await result.current?.getPublicKey();
      });
      expect(mockWallet.getPublicKey).toHaveBeenCalled();

      // Test signNep413Message
      const nonce = new Uint8Array([1, 2, 3]);
      await act(async () => {
        await result.current?.signNep413Message(
          "test message",
          "test.testnet",
          "recipient.testnet",
          nonce,
          "https://callback.com"
        );
      });
      expect(mockWallet.signNep413Message).toHaveBeenCalledWith(
        "test message",
        "test.testnet",
        "recipient.testnet",
        nonce,
        "https://callback.com"
      );
    });

    it("should use default gas and deposit values", async () => {
      const { result } = renderHook(() => useContext(WalletSelectorContext), {
        wrapper: createWrapper(),
      });

      await setupConnectedWallet(result);

      await act(async () => {
        await result.current?.callFunction({
          contractId: "contract.testnet",
          method: "set_value",
        });
      });

      expect(mockActionCreators.functionCall).toHaveBeenCalledWith(
        "set_value",
        {},
        BigInt("30000000000000"),
        BigInt("0")
      );
    });
  });

  describe("RPC methods", () => {
    it("should call viewFunction and return parsed result", async () => {
      const mockResult = { value: 123 };
      mockProvider.query.mockResolvedValue({
        result: Buffer.from(JSON.stringify(mockResult)),
      } as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.viewFunction).toBeDefined());

      const response = await walletContext?.viewFunction({
        contractId: "contract.testnet",
        method: "get_value",
        args: { param: "test" },
      });

      expect(response).toEqual(mockResult);
      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "call_function",
        account_id: "contract.testnet",
        method_name: "get_value",
        args_base64: Buffer.from(JSON.stringify({ param: "test" })).toString(
          "base64"
        ),
        finality: "optimistic",
      });
    });

    it("should use empty object as default args for viewFunction", async () => {
      mockProvider.query.mockResolvedValue({
        result: Buffer.from(JSON.stringify({})),
      } as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.viewFunction).toBeDefined());

      await walletContext?.viewFunction({
        contractId: "contract.testnet",
        method: "get_value",
      });

      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "call_function",
        account_id: "contract.testnet",
        method_name: "get_value",
        args_base64: Buffer.from(JSON.stringify({})).toString("base64"),
        finality: "optimistic",
      });
    });

    it("should return account balance", async () => {
      mockProvider.query.mockResolvedValue({
        amount: "1000000000000000000000000",
      } as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.getBalance).toBeDefined());

      const balance = await walletContext?.getBalance("test.testnet");

      expect(balance).toBe(BigInt("1000000000000000000000000"));
      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "view_account",
        account_id: "test.testnet",
        finality: "final",
      });
    });

    it("should return 0 when amount is not present", async () => {
      mockProvider.query.mockResolvedValue({} as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.getBalance).toBeDefined());

      const balance = await walletContext?.getBalance("test.testnet");

      expect(balance).toBe(BigInt(0));
    });

    it("should return access keys for account", async () => {
      const mockKeys = [
        { public_key: "key1", access_key: {} },
        { public_key: "key2", access_key: {} },
      ];
      mockProvider.query.mockResolvedValue({ keys: mockKeys } as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.getAccessKeys).toBeDefined());

      const keys = await walletContext?.getAccessKeys("test.testnet");

      expect(keys).toEqual(mockKeys);
      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "view_access_key_list",
        account_id: "test.testnet",
        finality: "final",
      });
    });

    it("should return account information", async () => {
      const mockAccount = {
        amount: "1000000000000000000000000",
        locked: "0",
        code_hash: "hash",
        storage_usage: 1000,
        storage_paid_at: 0,
      };
      mockProvider.query.mockResolvedValue(mockAccount as any);

      const walletContext = renderHook(
        () => useContext(WalletSelectorContext),
        {
          wrapper: createWrapper(),
        }
      ).result.current;

      await waitFor(() => expect(walletContext?.getAccount).toBeDefined());

      const account = await walletContext?.getAccount("test.testnet");

      expect(account).toEqual(mockAccount);
      expect(mockProvider.query).toHaveBeenCalledWith({
        request_type: "view_account",
        account_id: "test.testnet",
        finality: "final",
      });
    });
  });
});
