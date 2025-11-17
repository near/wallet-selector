import { setupWalletSelector } from "./wallet-selector";
import { getNetworkPreset } from "./options";
import { JsonRpcProvider, FailoverRpcProvider } from "@near-js/providers";
import type { Network } from "./options.types";
import type { Store, WalletSelectorState } from "./store.types";
import type { WalletModuleFactory, Wallet } from "./wallet";
import { BehaviorSubject } from "rxjs";
import { mock } from "jest-mock-extended";

// Mock implementations for required modules
const _state: Record<string, string> = {};

global.localStorage = {
  getItem: jest.fn((key) => _state[key] || null),
  setItem: jest.fn((key, value) => {
    _state[key] = value;
  }),
  removeItem: jest.fn((key) => {
    delete _state[key];
  }),
  clear: jest.fn(() => {
    for (const key in _state) {
      delete _state[key];
    }
  }),
  get length() {
    return Object.keys(_state).length;
  },
  key: jest.fn((index) => Object.keys(_state)[index] || null),
};

let mockStore: Store;
let mockState$: BehaviorSubject<WalletSelectorState>;

jest.mock("./options", () => {
  return {
    ...jest.requireActual("./options"),
    getNetworkPreset: jest.fn().mockReturnValue({
      networkId: "testnet",
      nodeUrl: "http://node.example.com",
      helperUrl: "http://helper.example.com",
      explorerUrl: "http://explorer.example.com",
      indexerUrl: "http://indexer.example.com",
    }),
  };
});

jest.mock("./store", () => {
  return {
    ...jest.requireActual("./store"),
    createStore: jest.fn().mockImplementation(async () => {
      return mockStore;
    }),
  };
});

jest.mock("@near-js/providers", () => {
  const originalModule = jest.requireActual("@near-js/providers");
  return {
    ...originalModule,
    FailoverRpcProvider: jest.fn(),
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockWalletModulesInstance: any;

jest.mock("./services", () => {
  const actual = jest.requireActual("./services");
  return {
    ...actual,
    WalletModules: jest.fn().mockImplementation(() => {
      mockWalletModulesInstance = {
        setupWalletModules: jest.fn().mockResolvedValue(undefined),
        setupStorage: jest.fn().mockResolvedValue(undefined),
        getWallet: jest.fn(),
      };
      return mockWalletModulesInstance;
    }),
  };
});

describe("setupWalletSelector", () => {
  let params: {
    network: Network;
    fallbackRpcUrls: Array<string>;
    modules: Array<WalletModuleFactory>;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset singleton instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (setupWalletSelector as any).walletSelectorInstance = null;

    // Create fresh mock store for each test
    mockState$ = new BehaviorSubject<WalletSelectorState>({
      modules: [],
      accounts: [],
      contract: null,
      selectedWalletId: null,
      recentlySignedInWallets: [],
      rememberRecentWallets: "",
    });

    mockStore = {
      observable: mockState$,
      getState: jest.fn(() => mockState$.getValue()),
      dispatch: jest.fn((action) => {
        // Simple reducer for testing
        const currentState = mockState$.getValue();
        if (action.type === "SET_ACTIVE_ACCOUNT") {
          const newState = {
            ...currentState,
            accounts: currentState.accounts.map((acc) => ({
              ...acc,
              active: acc.accountId === action.payload.accountId,
            })),
          };
          mockState$.next(newState);
        } else if (action.type === "SET_REMEMBER_RECENT_WALLETS") {
          const newState = {
            ...currentState,
            rememberRecentWallets:
              currentState.rememberRecentWallets === "enabled"
                ? "disabled"
                : "enabled",
          };
          mockState$.next(newState);
        }
      }),
      toReadOnly: jest.fn(() => ({
        getState: () => mockState$.getValue(),
        observable: mockState$.asObservable(),
      })),
    } as unknown as Store;

    params = {
      network: {
        networkId: "testnet",
        nodeUrl: "http://node.example.com",
        helperUrl: "http://helper.example.com",
        explorerUrl: "http://explorer.example.com",
        indexerUrl: "http://indexer.example.com",
      },
      fallbackRpcUrls: ["http://rpc1.example.com", "http://rpc2.example.com"],
      modules: [],
    };
  });

  it("should instantiate FailoverRpcProvider correctly with single URL", async () => {
    const mockedRpcProvider = { setup: jest.fn() };
    const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
      typeof FailoverRpcProvider
    >;

    mockedFailoverRpcProvider.mockImplementationOnce(
      () => mockedRpcProvider as unknown as FailoverRpcProvider
    );

    const mockFallbackRpcUrl = "http://rpc1.example.com";

    await setupWalletSelector({
      ...params,
      fallbackRpcUrls: [mockFallbackRpcUrl],
    });

    const mockExpectedProviders = [
      new JsonRpcProvider({ url: mockFallbackRpcUrl }),
    ];

    expect(mockedFailoverRpcProvider).toHaveBeenCalledTimes(1);
    expect(mockedFailoverRpcProvider).toHaveBeenCalledWith(
      mockExpectedProviders
    );
  });

  it("should instantiate FailoverRpcProvider correctly with multiple URLs", async () => {
    const mockedRpcProvider = { setup: jest.fn() };
    const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
      typeof FailoverRpcProvider
    >;

    mockedFailoverRpcProvider.mockImplementationOnce(
      () => mockedRpcProvider as unknown as FailoverRpcProvider
    );

    const mockFallbackRpcUrls = [
      "https://rpc1.example.com",
      "https://rpc2.example.com",
    ];

    await setupWalletSelector({
      ...params,
      fallbackRpcUrls: mockFallbackRpcUrls,
    });

    const mockExpectedProviders = mockFallbackRpcUrls.map(
      (url) => new JsonRpcProvider({ url })
    );

    expect(mockedFailoverRpcProvider).toHaveBeenCalledTimes(1);
    expect(mockedFailoverRpcProvider).toHaveBeenCalledWith(
      mockExpectedProviders
    );
  });

  it("should instantiate FailoverRpcProvider correctly with default value when fallbackRpcUrls are empty", async () => {
    const mockedRpcProvider = { setup: jest.fn() };
    const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
      typeof FailoverRpcProvider
    >;

    mockedFailoverRpcProvider.mockImplementationOnce(
      () => mockedRpcProvider as unknown as FailoverRpcProvider
    );

    const networkPreset = getNetworkPreset("testnet", []);

    await setupWalletSelector({
      ...params,
      fallbackRpcUrls: [],
    });

    const mockExpectedProvider = [
      new JsonRpcProvider({ url: networkPreset.nodeUrl }),
    ];

    expect(mockedFailoverRpcProvider).toHaveBeenCalledTimes(1);
    expect(mockedFailoverRpcProvider).toHaveBeenCalledWith(
      mockExpectedProvider
    );
  });

  it("should handle error during FailoverRpcProvider instantiation", async () => {
    const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
      typeof FailoverRpcProvider
    >;
    mockedFailoverRpcProvider.mockImplementationOnce(() => {
      throw new Error("Failed to instantiate FailoverRpcProvider");
    });

    await expect(setupWalletSelector(params)).rejects.toThrow(
      "Failed to instantiate FailoverRpcProvider"
    );

    expect(mockedFailoverRpcProvider).toHaveBeenCalledTimes(1);
  });

  describe("WalletSelector methods", () => {
    let walletSelector: Awaited<ReturnType<typeof setupWalletSelector>>;

    beforeEach(async () => {
      const mockedRpcProvider = { setup: jest.fn() };
      const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
        typeof FailoverRpcProvider
      >;
      mockedFailoverRpcProvider.mockImplementation(
        () => mockedRpcProvider as unknown as FailoverRpcProvider
      );

      walletSelector = await setupWalletSelector({
        ...params,
        allowMultipleSelectors: true,
      });
    });

    describe("wallet()", () => {
      it("should get wallet by selected wallet id", async () => {
        const mockWallet = mock<Wallet>();
        mockState$.next({
          ...mockState$.getValue(),
          selectedWalletId: "test-wallet",
        });

        mockWalletModulesInstance.getWallet.mockResolvedValue(mockWallet);

        const wallet = await walletSelector.wallet();

        expect(wallet).toBe(mockWallet);
        expect(mockWalletModulesInstance.getWallet).toHaveBeenCalledWith(
          "test-wallet"
        );
      });

      it("should get wallet by specific id", async () => {
        const mockWallet = mock<Wallet>();
        mockWalletModulesInstance.getWallet.mockResolvedValue(mockWallet);

        const wallet = await walletSelector.wallet("specific-wallet");

        expect(wallet).toBe(mockWallet);
        expect(mockWalletModulesInstance.getWallet).toHaveBeenCalledWith(
          "specific-wallet"
        );
      });

      it("should throw error when wallet id is invalid", async () => {
        mockWalletModulesInstance.getWallet.mockResolvedValue(null);

        await expect(walletSelector.wallet("invalid-id")).rejects.toThrow(
          "Invalid wallet id"
        );
      });

      it("should throw error when no wallet is selected", async () => {
        mockState$.next({
          ...mockState$.getValue(),
          selectedWalletId: null,
        });
        mockWalletModulesInstance.getWallet.mockResolvedValue(null);

        await expect(walletSelector.wallet()).rejects.toThrow(
          "No wallet selected"
        );
      });
    });

    describe("isSignedIn()", () => {
      it("should return true when accounts exist", () => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: true,
            },
          ],
        });

        expect(walletSelector.isSignedIn()).toBe(true);
      });

      it("should return false when no accounts exist", () => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [],
        });

        expect(walletSelector.isSignedIn()).toBe(false);
      });
    });

    describe("setActiveAccount()", () => {
      it("should set active account", () => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: true,
            },
            {
              accountId: "account2.testnet",
              publicKey: "key2",
              active: false,
            },
          ],
        });

        walletSelector.setActiveAccount("account2.testnet");

        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: "SET_ACTIVE_ACCOUNT",
          payload: { accountId: "account2.testnet" },
        });
      });

      it("should throw error when account id is invalid", () => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: true,
            },
          ],
        });

        expect(() => {
          walletSelector.setActiveAccount("invalid-account");
        }).toThrow("Invalid account id");
      });
    });

    describe("setRememberRecentWallets()", () => {
      it("should dispatch SET_REMEMBER_RECENT_WALLETS action", () => {
        mockState$.next({
          ...mockState$.getValue(),
          rememberRecentWallets: "enabled",
        });

        walletSelector.setRememberRecentWallets();

        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: "SET_REMEMBER_RECENT_WALLETS",
          payload: { rememberRecentWallets: "enabled" },
        });
      });
    });

    describe("on() and off()", () => {
      it("should register event handler", () => {
        const callback = jest.fn();
        const subscription = walletSelector.on("signedIn", callback);

        expect(subscription).toBeDefined();
        expect(typeof subscription.remove).toBe("function");
      });

      it("should unregister event handler", () => {
        const callback = jest.fn();
        walletSelector.on("signedIn", callback);
        walletSelector.off("signedIn", callback);

        // Should not throw
        expect(() => walletSelector.off("signedIn", callback)).not.toThrow();
      });
    });

    describe("subscribeOnAccountChange()", () => {
      it("should call callback when account changes", (done) => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [],
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const callback = jest.fn((_) => {
          if (callback.mock.calls.length === 2) {
            expect(callback).toHaveBeenCalledTimes(2);
            expect(callback.mock.calls[0][0]).toBe("");
            expect(callback.mock.calls[1][0]).toBe("account1.testnet");
            done();
          }
        });

        walletSelector.subscribeOnAccountChange(callback);

        // Trigger account change
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: true,
            },
          ],
        });
      });

      it("should call callback with empty string when no active account", (done) => {
        mockState$.next({
          ...mockState$.getValue(),
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: false,
            },
          ],
        });

        const callback = jest.fn((accountId) => {
          expect(accountId).toBe("");
          done();
        });

        walletSelector.subscribeOnAccountChange(callback);
      });
    });

    describe("store", () => {
      it("should provide read-only store", () => {
        expect(walletSelector.store).toBeDefined();
        expect(walletSelector.store.getState).toBeDefined();
        expect(walletSelector.store.observable).toBeDefined();
      });

      it("should allow reading state from store", () => {
        const testState: WalletSelectorState = {
          modules: [],
          accounts: [
            {
              accountId: "account1.testnet",
              publicKey: "key1",
              active: true,
            },
          ],
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        };

        mockState$.next(testState);

        const state = walletSelector.store.getState();
        expect(state).toEqual(testState);
      });
    });
  });

  describe("allowMultipleSelectors", () => {
    it("should create new instance when allowMultipleSelectors is true", async () => {
      const mockedRpcProvider = { setup: jest.fn() };
      const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
        typeof FailoverRpcProvider
      >;
      mockedFailoverRpcProvider.mockImplementation(
        () => mockedRpcProvider as unknown as FailoverRpcProvider
      );

      const selector1 = await setupWalletSelector({
        ...params,
        allowMultipleSelectors: true,
      });

      const selector2 = await setupWalletSelector({
        ...params,
        allowMultipleSelectors: true,
      });

      expect(selector1).not.toBe(selector2);
    });

    it("should reuse singleton instance when allowMultipleSelectors is false", async () => {
      const mockedRpcProvider = { setup: jest.fn() };
      const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
        typeof FailoverRpcProvider
      >;
      mockedFailoverRpcProvider.mockImplementation(
        () => mockedRpcProvider as unknown as FailoverRpcProvider
      );

      // Reset singleton
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (setupWalletSelector as any).walletSelectorInstance = null;

      const selector1 = await setupWalletSelector({
        ...params,
        allowMultipleSelectors: false,
      });

      const selector2 = await setupWalletSelector({
        ...params,
        allowMultipleSelectors: false,
      });

      expect(selector1).toBe(selector2);
    });
  });

  describe("debug option", () => {
    it("should set Logger.debug when debug is true", async () => {
      const { Logger } = await import("./services");
      const mockedRpcProvider = { setup: jest.fn() };
      const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
        typeof FailoverRpcProvider
      >;
      mockedFailoverRpcProvider.mockImplementation(
        () => mockedRpcProvider as unknown as FailoverRpcProvider
      );

      Logger.debug = false;

      await setupWalletSelector({
        ...params,
        debug: true,
      });

      expect(Logger.debug).toBe(true);
    });

    it("should set Logger.debug when debug is false", async () => {
      const { Logger } = await import("./services");
      const mockedRpcProvider = { setup: jest.fn() };
      const mockedFailoverRpcProvider = FailoverRpcProvider as jest.MockedClass<
        typeof FailoverRpcProvider
      >;
      mockedFailoverRpcProvider.mockImplementation(
        () => mockedRpcProvider as unknown as FailoverRpcProvider
      );

      Logger.debug = true;

      await setupWalletSelector({
        ...params,
        debug: false,
      });

      expect(Logger.debug).toBe(false);
    });
  });
});
