import { createStore } from "./store";
import type { StorageService } from "./services";
import type { Store } from "./store.types";
import type { Account } from "./wallet";
import type { ModuleState } from "./store.types";
import type { ContractState } from "./store.types";
import {
  CONTRACT,
  SELECTED_WALLET_ID,
  RECENTLY_SIGNED_IN_WALLETS,
  REMEMBER_RECENT_WALLETS,
  REMEMBER_RECENT_WALLETS_STATE,
} from "./constants";

describe("createStore", () => {
  let mockStorage: jest.Mocked<StorageService>;
  let store: Store;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStorage = {
      getItem: jest.fn().mockResolvedValue(null),
      setItem: jest.fn().mockResolvedValue(undefined),
      removeItem: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe("initialization", () => {
    it("should create store with default initial state", async () => {
      store = await createStore(mockStorage);

      const state = store.getState();

      expect(state).toEqual({
        modules: [],
        accounts: [],
        contract: null,
        selectedWalletId: null,
        recentlySignedInWallets: [],
        rememberRecentWallets: "",
      });
    });

    it("should load initial state from storage", async () => {
      const mockContract: ContractState = {
        contractId: "test-contract.testnet",
        methodNames: ["method1", "method2"],
      };
      const mockSelectedWalletId = "test-wallet";
      const mockRecentlySignedInWallets = ["wallet1", "wallet2"];
      const mockRememberRecentWallets = REMEMBER_RECENT_WALLETS_STATE.ENABLED;

      // JsonStorage expects underlying storage to return JSON strings
      mockStorage.getItem
        .mockResolvedValueOnce(JSON.stringify(mockContract))
        .mockResolvedValueOnce(JSON.stringify(mockSelectedWalletId))
        .mockResolvedValueOnce(JSON.stringify(mockRecentlySignedInWallets))
        .mockResolvedValueOnce(JSON.stringify(mockRememberRecentWallets));

      store = await createStore(mockStorage);

      const state = store.getState();

      expect(state.contract).toEqual(mockContract);
      expect(state.selectedWalletId).toBe(mockSelectedWalletId);
      expect(state.recentlySignedInWallets).toEqual(
        mockRecentlySignedInWallets
      );
      expect(state.rememberRecentWallets).toBe(mockRememberRecentWallets);
    });

    it("should handle null values from storage", async () => {
      mockStorage.getItem.mockResolvedValue(null);

      store = await createStore(mockStorage);

      const state = store.getState();

      expect(state.contract).toBeNull();
      expect(state.selectedWalletId).toBeNull();
      expect(state.recentlySignedInWallets).toEqual([]);
      expect(state.rememberRecentWallets).toBe("");
    });
  });

  describe("SETUP action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should setup store with accounts, contract, and wallet id", () => {
      const accounts: Array<Account> = [
        { accountId: "account1.testnet", publicKey: "key1" },
        { accountId: "account2.testnet", publicKey: "key2" },
      ];
      const contract: ContractState = {
        contractId: "contract.testnet",
        methodNames: ["method1"],
      };

      store.dispatch({
        type: "SETUP",
        payload: {
          accounts,
          contract,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: ["wallet-1"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      const state = store.getState();

      expect(state.accounts).toHaveLength(2);
      expect(state.accounts[0]).toEqual({
        ...accounts[0],
        active: true,
      });
      expect(state.accounts[1]).toEqual({
        ...accounts[1],
        active: false,
      });
      expect(state.contract).toEqual(contract);
      expect(state.selectedWalletId).toBe("wallet-1");
      expect(state.recentlySignedInWallets).toEqual(["wallet-1"]);
      expect(state.rememberRecentWallets).toBe(
        REMEMBER_RECENT_WALLETS_STATE.ENABLED
      );
    });

    it("should set first account as active when setting up", () => {
      const accounts: Array<Account> = [
        { accountId: "account1.testnet" },
        { accountId: "account2.testnet" },
        { accountId: "account3.testnet" },
      ];

      store.dispatch({
        type: "SETUP",
        payload: {
          accounts,
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const state = store.getState();
      expect(state.accounts[0].active).toBe(true);
      expect(state.accounts[1].active).toBe(false);
      expect(state.accounts[2].active).toBe(false);
    });
  });

  describe("ADD_WALLET_MODULE action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should add a single wallet module", () => {
      const module: ModuleState = {
        id: "wallet-1",
        type: "injected",
        metadata: {
          name: "Wallet 1",
          description: "Test wallet",
          iconUrl: "icon1.png",
          deprecated: false,
          available: true,
        },
        listIndex: 0,
        wallet: jest.fn(),
      };

      store.dispatch({
        type: "ADD_WALLET_MODULE",
        payload: { module },
      });

      const state = store.getState();
      expect(state.modules).toHaveLength(1);
      expect(state.modules[0]).toEqual(module);
    });

    it("should sort modules by listIndex", () => {
      const module1: ModuleState = {
        id: "wallet-1",
        type: "injected",
        metadata: {
          name: "Wallet 1",
          description: "Test wallet",
          iconUrl: "icon1.png",
          deprecated: false,
          available: true,
        },
        listIndex: 2,
        wallet: jest.fn(),
      };

      const module2: ModuleState = {
        id: "wallet-2",
        type: "injected",
        metadata: {
          name: "Wallet 2",
          description: "Test wallet",
          iconUrl: "icon2.png",
          deprecated: false,
          available: true,
        },
        listIndex: 1,
        wallet: jest.fn(),
      };

      store.dispatch({
        type: "ADD_WALLET_MODULE",
        payload: { module: module1 },
      });

      store.dispatch({
        type: "ADD_WALLET_MODULE",
        payload: { module: module2 },
      });

      const state = store.getState();
      expect(state.modules).toHaveLength(2);
      expect(state.modules[0].id).toBe("wallet-2");
      expect(state.modules[1].id).toBe("wallet-1");
    });
  });

  describe("ADD_WALLET_MODULES action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should add multiple wallet modules", () => {
      const modules: Array<ModuleState> = [
        {
          id: "wallet-1",
          type: "injected",
          metadata: {
            name: "Wallet 1",
            description: "Test wallet",
            iconUrl: "icon1.png",
            deprecated: false,
            available: true,
          },
          listIndex: 1,
          wallet: jest.fn(),
        },
        {
          id: "wallet-2",
          type: "injected",
          metadata: {
            name: "Wallet 2",
            description: "Test wallet",
            iconUrl: "icon2.png",
            deprecated: false,
            available: true,
          },
          listIndex: 0,
          wallet: jest.fn(),
        },
      ];

      store.dispatch({
        type: "ADD_WALLET_MODULES",
        payload: { modules },
      });

      const state = store.getState();
      expect(state.modules).toHaveLength(2);
      expect(state.modules[0].id).toBe("wallet-2");
      expect(state.modules[1].id).toBe("wallet-1");
    });
  });

  describe("WALLET_CONNECTED action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should connect wallet and set accounts", () => {
      const accounts: Array<Account> = [
        { accountId: "account1.testnet", publicKey: "key1" },
        { accountId: "account2.testnet", publicKey: "key2" },
      ];
      const contract: ContractState = {
        contractId: "contract.testnet",
        methodNames: [],
      };

      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract,
          accounts,
          recentlySignedInWallets: ["wallet-1"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      const state = store.getState();
      expect(state.selectedWalletId).toBe("wallet-1");
      expect(state.contract).toEqual(contract);
      expect(state.accounts).toHaveLength(2);
      expect(state.accounts[0].active).toBe(true);
      expect(state.accounts[1].active).toBe(false);
    });

    it("should not update state when accounts array is empty", () => {
      const initialState = store.getState();

      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const state = store.getState();
      expect(state).toEqual(initialState);
    });

    it("should preserve active account index when connecting", () => {
      // Setup initial state with accounts
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
          ],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Set second account as active
      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId: "account2.testnet" },
      });

      // Connect wallet with new accounts
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [
            { accountId: "account3.testnet" },
            { accountId: "account4.testnet" },
          ],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const state = store.getState();
      // Should use index 1 (second account) as active
      expect(state.accounts[1].active).toBe(true);
      expect(state.accounts[0].active).toBe(false);
    });

    it("should use first account as active when no active account exists", () => {
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
          ],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const state = store.getState();
      expect(state.accounts[0].active).toBe(true);
      expect(state.accounts[1].active).toBe(false);
    });
  });

  describe("WALLET_DISCONNECTED action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should disconnect wallet and clear state when selected wallet matches", () => {
      // Setup connected state
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [{ accountId: "account1.testnet" }],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Disconnect
      store.dispatch({
        type: "WALLET_DISCONNECTED",
        payload: { walletId: "wallet-1" },
      });

      const state = store.getState();
      expect(state.selectedWalletId).toBeNull();
      expect(state.contract).toBeNull();
      expect(state.accounts).toEqual([]);
    });

    it("should not disconnect when wallet id does not match", () => {
      // Setup connected state
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [{ accountId: "account1.testnet" }],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const beforeState = store.getState();

      // Try to disconnect different wallet
      store.dispatch({
        type: "WALLET_DISCONNECTED",
        payload: { walletId: "wallet-2" },
      });

      const state = store.getState();
      expect(state).toEqual(beforeState);
    });
  });

  describe("ACCOUNTS_CHANGED action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should update accounts when wallet matches", () => {
      // Setup initial accounts
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
          ],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Change accounts
      store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: {
          walletId: "wallet-1",
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account3.testnet" },
          ],
        },
      });

      const state = store.getState();
      expect(state.accounts).toHaveLength(2);
      expect(state.accounts[0].accountId).toBe("account1.testnet");
      expect(state.accounts[0].active).toBe(true);
      expect(state.accounts[1].accountId).toBe("account3.testnet");
      expect(state.accounts[1].active).toBe(false);
    });

    it("should not update accounts when wallet does not match", () => {
      // Setup initial accounts
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [{ accountId: "account1.testnet" }],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const beforeState = store.getState();

      // Try to change accounts for different wallet
      store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: {
          walletId: "wallet-2",
          accounts: [{ accountId: "account2.testnet" }],
        },
      });

      const state = store.getState();
      expect(state).toEqual(beforeState);
    });

    it("should set first account as active when active account is removed", () => {
      // Setup initial accounts
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
          ],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Set second account as active
      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId: "account2.testnet" },
      });

      // Remove active account
      store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: {
          walletId: "wallet-1",
          accounts: [{ accountId: "account1.testnet" }],
        },
      });

      const state = store.getState();
      expect(state.accounts).toHaveLength(1);
      expect(state.accounts[0].accountId).toBe("account1.testnet");
      expect(state.accounts[0].active).toBe(true);
    });

    it("should preserve active account when it still exists", () => {
      // Setup initial accounts
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
            { accountId: "account3.testnet" },
          ],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Set second account as active
      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId: "account2.testnet" },
      });

      // Change accounts but keep active account
      store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: {
          walletId: "wallet-1",
          accounts: [
            { accountId: "account2.testnet" },
            { accountId: "account4.testnet" },
          ],
        },
      });

      const state = store.getState();
      expect(state.accounts[0].accountId).toBe("account2.testnet");
      expect(state.accounts[0].active).toBe(true);
      expect(state.accounts[1].accountId).toBe("account4.testnet");
      expect(state.accounts[1].active).toBe(false);
    });
  });

  describe("SET_ACTIVE_ACCOUNT action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should set active account", () => {
      // Setup accounts
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [
            { accountId: "account1.testnet" },
            { accountId: "account2.testnet" },
            { accountId: "account3.testnet" },
          ],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Set second account as active
      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { accountId: "account2.testnet" },
      });

      const state = store.getState();
      expect(state.accounts[0].active).toBe(false);
      expect(state.accounts[1].active).toBe(true);
      expect(state.accounts[2].active).toBe(false);
    });
  });

  describe("SET_REMEMBER_RECENT_WALLETS action", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should toggle remember recent wallets from disabled to enabled", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      const state = store.getState();
      expect(state.rememberRecentWallets).toBe(
        REMEMBER_RECENT_WALLETS_STATE.ENABLED
      );
      expect(state.recentlySignedInWallets).toEqual(["wallet-1"]);
    });

    it("should toggle remember recent wallets from enabled to disabled", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: ["wallet-1", "wallet-2"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      const state = store.getState();
      expect(state.rememberRecentWallets).toBe(
        REMEMBER_RECENT_WALLETS_STATE.DISABLED
      );
      expect(state.recentlySignedInWallets).toEqual([]);
    });

    it("should add selected wallet to recently signed in wallets if not present", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: ["wallet-2"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      const state = store.getState();
      expect(state.recentlySignedInWallets).toContain("wallet-1");
      expect(state.recentlySignedInWallets).toContain("wallet-2");
    });

    it("should not add selected wallet if already in recently signed in wallets", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: ["wallet-1", "wallet-2"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      const state = store.getState();
      expect(state.recentlySignedInWallets).toEqual(["wallet-1", "wallet-2"]);
    });

    it("should handle when no wallet is selected", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.DISABLED,
        },
      });

      const state = store.getState();
      expect(state.recentlySignedInWallets).toEqual([]);
    });
  });

  describe("storage synchronization", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should sync selectedWalletId to storage", async () => {
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [{ accountId: "account1.testnet" }],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 10));

      // JsonStorage stringifies values
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining(SELECTED_WALLET_ID),
        JSON.stringify("wallet-1")
      );
    });

    it("should sync contract to storage", async () => {
      const contract: ContractState = {
        contractId: "contract.testnet",
        methodNames: ["method1"],
      };

      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 10));

      // JsonStorage stringifies values
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining(CONTRACT),
        JSON.stringify(contract)
      );
    });

    it("should sync recentlySignedInWallets to storage", async () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: ["wallet-1", "wallet-2"],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 10));

      // JsonStorage stringifies values
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining(RECENTLY_SIGNED_IN_WALLETS),
        JSON.stringify(["wallet-1", "wallet-2"])
      );
    });

    it("should sync rememberRecentWallets to storage", async () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: [],
          rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        },
      });

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 10));

      // JsonStorage stringifies values
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining(REMEMBER_RECENT_WALLETS),
        JSON.stringify(REMEMBER_RECENT_WALLETS_STATE.ENABLED)
      );
    });

    it("should remove item from storage when value becomes null", async () => {
      // Set a value first
      store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId: "wallet-1",
          contract: {
            contractId: "contract.testnet",
            methodNames: [],
          },
          accounts: [{ accountId: "account1.testnet" }],
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));
      jest.clearAllMocks();

      // Clear the value
      store.dispatch({
        type: "WALLET_DISCONNECTED",
        payload: { walletId: "wallet-1" },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockStorage.removeItem).toHaveBeenCalledWith(
        expect.stringContaining(SELECTED_WALLET_ID)
      );
    });

    it("should not sync when value has not changed", async () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));
      jest.clearAllMocks();

      // Dispatch same value again
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not call setItem for unchanged values
      const setItemCalls = (mockStorage.setItem as jest.Mock).mock.calls.filter(
        (call) => call[0].includes(SELECTED_WALLET_ID)
      );
      expect(setItemCalls.length).toBe(0);
    });
  });

  describe("toReadOnly", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should return read-only store interface", () => {
      const readOnlyStore = store.toReadOnly();

      expect(readOnlyStore).toHaveProperty("getState");
      expect(readOnlyStore).toHaveProperty("observable");
      expect(readOnlyStore).not.toHaveProperty("dispatch");
    });

    it("should allow reading state from read-only store", () => {
      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [{ accountId: "account1.testnet" }],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });

      const readOnlyStore = store.toReadOnly();
      const state = readOnlyStore.getState();

      expect(state.selectedWalletId).toBe("wallet-1");
      expect(state.accounts).toHaveLength(1);
    });

    it("should provide observable for state changes", (done) => {
      const readOnlyStore = store.toReadOnly();
      let callCount = 0;

      readOnlyStore.observable.subscribe((state) => {
        callCount++;
        if (callCount === 1) {
          expect(state.selectedWalletId).toBeNull();
        } else if (callCount === 2) {
          expect(state.selectedWalletId).toBe("wallet-1");
          done();
        }
      });

      store.dispatch({
        type: "SETUP",
        payload: {
          accounts: [],
          contract: null,
          selectedWalletId: "wallet-1",
          recentlySignedInWallets: [],
          rememberRecentWallets: "",
        },
      });
    });
  });

  describe("default case", () => {
    beforeEach(async () => {
      store = await createStore(mockStorage);
    });

    it("should return state unchanged for unknown action type", () => {
      const initialState = store.getState();

      // Dispatch unknown action
      store.dispatch({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: "UNKNOWN_ACTION" as any,
        payload: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const state = store.getState();
      expect(state).toEqual(initialState);
    });
  });
});
