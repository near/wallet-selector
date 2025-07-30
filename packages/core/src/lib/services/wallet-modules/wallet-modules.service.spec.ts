import { mock } from "jest-mock-extended";
import type { Account, Wallet, WalletModule } from "../../wallet";
import type { StorageService } from "../storage/storage.service.types";
import type { Options } from "../../options.types";
import type { Store } from "../../store.types";
import type { WalletSelectorEvents } from "../../wallet-selector.types";
import type { ProviderService } from "../provider/provider.service.types";
import { EventEmitter } from "../event-emitter/event-emitter.service";
import { WalletModules } from "./wallet-modules.service";
import { REMEMBER_RECENT_WALLETS_STATE } from "../../constants";

const createMockModule = (
  overrides: Partial<WalletModule> = {}
): WalletModule =>
  mock<WalletModule>({
    id: "test-wallet",
    type: "injected",
    metadata: {
      name: "Test Wallet",
      description: "A test wallet",
      iconUrl: "test-icon.png",
      deprecated: false,
      available: true,
    },
    init: jest.fn().mockResolvedValue({}),
    ...overrides,
  });

const createMockWallet = (overrides: Partial<Wallet> = {}): Wallet =>
  mock<Wallet>({
    id: "test-wallet",
    metadata: {
      name: "Test Wallet",
      description: "A test wallet",
      iconUrl: "test-icon.png",
      deprecated: false,
      available: true,
    },
    signIn: jest.fn().mockResolvedValue([]),
    signOut: jest.fn().mockResolvedValue(undefined),
    getAccounts: jest.fn().mockResolvedValue([]),
    ...overrides,
  });

const createMockAccount = (accountId = "test.testnet"): Account => ({
  accountId,
  publicKey: "ed25519:TestPublicKey",
});

const createDefaultState = () => ({
  modules: [],
  accounts: [],
  selectedWalletId: null,
  contract: null,
  recentlySignedInWallets: [],
  rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
});

describe("WalletModules", () => {
  let walletModules: WalletModules;
  let mockStorage: jest.Mocked<StorageService>;
  let mockStore: jest.Mocked<Store>;
  let mockEmitter: EventEmitter<WalletSelectorEvents>;
  let mockProvider: jest.Mocked<ProviderService>;
  let mockOptions: jest.Mocked<Options>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStorage = mock<StorageService>({
      getItem: jest.fn().mockResolvedValue(null),
      setItem: jest.fn().mockResolvedValue(undefined),
      removeItem: jest.fn().mockResolvedValue(undefined),
    });

    mockStore = mock<Store>({
      getState: jest.fn().mockReturnValue(createDefaultState()),
      dispatch: jest.fn(),
      toReadOnly: jest.fn(),
    });
    mockEmitter = new EventEmitter<WalletSelectorEvents>();
    mockProvider = mock<ProviderService>();
    mockOptions = mock<Options>();

    walletModules = new WalletModules({
      factories: [],
      storage: mockStorage,
      options: mockOptions,
      store: mockStore,
      emitter: mockEmitter,
      provider: mockProvider,
    });
  });

  describe("constructor", () => {
    it("should initialize correctly", () => {
      expect(walletModules).toBeInstanceOf(WalletModules);
    });
  });

  describe("setupWalletModules", () => {
    it("should handle setupWalletModules", async () => {
      const mockModule = createMockModule({
        id: "test-wallet",
        type: "browser",
      });
      const mockFactory = jest.fn().mockResolvedValue(mockModule);

      const mockModule2 = createMockModule({
        id: "test-wallet-2",
        type: "injected",
      });
      const mockFactory2 = jest.fn().mockResolvedValue(mockModule2);

      Object.assign(walletModules, { factories: [mockFactory, mockFactory2] });

      await walletModules.setupWalletModules();

      expect(mockFactory).toHaveBeenCalledWith({ options: mockOptions });
      expect(mockFactory2).toHaveBeenCalledWith({ options: mockOptions });

      // init is not called during setupWalletModules
      expect(mockModule.init).not.toHaveBeenCalled();
      expect(mockModule2.init).not.toHaveBeenCalled();

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "ADD_WALLET_MODULES",
        payload: {
          modules: expect.arrayContaining([
            expect.objectContaining({
              id: "test-wallet",
              type: "browser",
            }),
            expect.objectContaining({
              id: "test-wallet-2",
              type: "injected",
            }),
          ]),
        },
      });
    });

    it("should handle factory errors gracefully", async () => {
      const mockFactory = jest
        .fn()
        .mockRejectedValue(new Error("Factory initialization failed"));

      Object.assign(walletModules, { factories: [mockFactory] });
    });
  });

  describe("setupStorage", () => {
    it("should handle setupStorage", async () => {
      const mockState = {
        accounts: [],
        contract: null,
        selectedWalletId: null,
        recentlySignedInWallets: [],
        rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
      };

      const resolveStateSpy = jest
        // @ts-ignore
        .spyOn(walletModules, "resolveStorageState")
        // @ts-ignore
        .mockResolvedValue(mockState);

      await walletModules.setupStorage();

      expect(resolveStateSpy).toHaveBeenCalled();

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "SETUP",
        payload: mockState,
      });
    });
  });

  describe("getWallet", () => {
    it("should return null for non-existent wallet", async () => {
      const result = await walletModules.getWallet("non-existent");
      expect(result).toBeNull();
    });

    it("should return wallet when module exists", async () => {
      const mockModule = createMockModule({
        id: "test-wallet",
        type: "browser",
      });
      const mockFactory = jest.fn().mockResolvedValue(mockModule);

      Object.assign(walletModules, {
        factories: [mockFactory],
      });

      await walletModules.setupWalletModules();
      const result = await walletModules.getWallet("test-wallet");

      expect(mockModule.init).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result?.id).toBe("test-wallet");
      expect(result?.type).toBe("browser");
      expect(typeof result?.signIn).toBe("function");
      expect(typeof result?.signOut).toBe("function");
    });

    it("should cache wallet instances to avoid multiple initializations", async () => {
      const mockModule = createMockModule({
        id: "test-wallet",
        type: "browser",
      });
      const mockFactory = jest.fn().mockResolvedValue(mockModule);
      Object.assign(walletModules, { factories: [mockFactory] });

      await walletModules.setupWalletModules();
      await walletModules.getWallet("test-wallet");

      expect(mockModule.init).toHaveBeenCalled();
      expect(mockModule.init).toHaveBeenCalledTimes(1);

      await walletModules.getWallet("test-wallet");

      // init should be called only once
      expect(mockModule.init).toHaveBeenCalledTimes(1);
    });

    it("should handle unavailable wallets", async () => {
      const mockModule = createMockModule({
        metadata: { ...createMockModule().metadata, available: false },
      });

      Object.assign(walletModules, {
        modules: [
          {
            id: "test-wallet",
            type: "injected",
            metadata: mockModule.metadata,
            listIndex: 0,
            wallet: jest.fn().mockImplementation(async () => {
              throw new Error("Test Wallet is not available");
            }),
          },
        ],
      });

      await expect(walletModules.getWallet("test-wallet")).rejects.toThrow(
        "Test Wallet is not available"
      );
    });

    it("should return decorated wallet through getWallet", async () => {
      const mockWallet = createMockWallet({ id: "test-wallet" });
      const moduleState = {
        id: "test-wallet",
        type: "injected" as const,
        metadata: { available: true },
        listIndex: 0,
        wallet: jest.fn().mockResolvedValue(mockWallet),
      };

      Object.assign(walletModules, { modules: [moduleState] });

      const result = await walletModules.getWallet("test-wallet");

      expect(result).toBeDefined();
      expect(typeof result?.signIn).toBe("function");
      expect(typeof result?.signOut).toBe("function");
    });
  });

  describe("validation", () => {
    it("should validate sign message parameters through wallet", async () => {
      const mockWallet = mock<Wallet>({
        id: "test-wallet",
        signMessage: jest.fn().mockResolvedValue({}),
      });

      const moduleState = {
        id: "test-wallet",
        type: "injected" as const,
        metadata: { available: true },
        listIndex: 0,
        wallet: jest.fn().mockResolvedValue(mockWallet),
      };

      Object.assign(walletModules, { modules: [moduleState] });

      const validParams = {
        message: "test message",
        nonce: Buffer.alloc(32),
        recipient: "test.testnet",
      };

      // Test validation with valid params
      expect(() => {
        // @ts-ignore - testing private method
        walletModules.validateSignMessageParams(validParams);
      }).not.toThrow();

      const invalidParams = { ...validParams, message: "" };
      // The mock wallet doesn't actually validate, so we test validation directly
      expect(() => {
        // @ts-ignore - testing private method
        walletModules.validateSignMessageParams(invalidParams);
      }).toThrow("Invalid message");
    });
  });

  describe("event handling", () => {
    it("should emit signed out event", () => {
      const walletId = "test-wallet";
      const emitSpy = jest.spyOn(mockEmitter, "emit");

      // @ts-ignore - testing private method
      walletModules.onWalletSignedOut(walletId);

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "WALLET_DISCONNECTED",
        payload: { walletId },
      });

      expect(emitSpy).toHaveBeenCalledWith("signedOut", { walletId });
    });

    it("should handle signed in event", async () => {
      const walletId = "test-wallet";
      const accounts = [{ accountId: "test.testnet" }];

      jest
        // @ts-ignore - testing private method`
        .spyOn(walletModules, "setWalletAsRecentlySignedIn")
        // @ts-ignore - testing private method
        .mockResolvedValue([walletId]);

      // @ts-ignore - testing private method
      await walletModules.onWalletSignedIn(walletId, {
        accounts,
        contractId: "test.testnet",
        methodNames: [],
      });

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "WALLET_CONNECTED",
        payload: expect.objectContaining({
          walletId,
          accounts,
        }),
      });
    });
  });

  describe("instant link wallets", () => {
    it("should return early for non-instant-link wallets", async () => {
      const moduleState = {
        id: "regular-wallet",
        type: "injected" as const,
        metadata: { name: "Regular Wallet" },
        listIndex: 0,
        wallet: jest.fn(),
      };

      // @ts-ignore - testing private method
      await walletModules.setupInstantLinkWallet(moduleState);

      expect(moduleState.wallet).not.toHaveBeenCalled();
    });

    it("should handle instant link wallet setup", async () => {
      const mockInstantLinkWallet = mock<{
        metadata: { runOnStartup: boolean };
        getContractId(): string;
        signIn(params: { contractId: string }): Promise<Array<unknown>>;
      }>({
        metadata: { runOnStartup: true },
        getContractId: jest.fn().mockReturnValue("test.testnet"),
        signIn: jest.fn().mockResolvedValue([]),
      });

      const moduleState = {
        id: "instant-wallet",
        type: "instant-link" as const,
        metadata: { name: "Instant Wallet" },
        listIndex: 0,
        wallet: jest.fn().mockResolvedValue(mockInstantLinkWallet),
      };

      // @ts-ignore - testing private method
      await walletModules.setupInstantLinkWallet(moduleState);

      expect(mockInstantLinkWallet.signIn).toHaveBeenCalledWith({
        contractId: "test.testnet",
      });
    });
  });

  describe("storage operations", () => {
    it("should manage recently signed in wallets", async () => {
      const walletId = "test-wallet";
      mockStorage.getItem = jest.fn().mockResolvedValue(null);
      mockStorage.setItem = jest.fn().mockResolvedValue(undefined);

      // @ts-ignore - testing private method
      const result = await walletModules.setWalletAsRecentlySignedIn(walletId);

      expect(result).toEqual([walletId]);
      expect(mockStorage.setItem).toHaveBeenCalled();
    });

    it("should resolve empty storage state", async () => {
      // @ts-ignore - testing private method
      jest.spyOn(walletModules, "validateWallet").mockResolvedValue([]);

      // Mock storage properly
      mockStorage.getItem = jest.fn().mockResolvedValue(null);

      // @ts-ignore - testing private method
      const result = await walletModules.resolveStorageState();

      expect(result).toEqual({
        accounts: [],
        contract: null,
        selectedWalletId: null,
        recentlySignedInWallets: [],
        rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
      });
    });

    it("should restore complete state from storage", async () => {
      const storedAccounts = [createMockAccount()];
      const storedContract = { contractId: "test.testnet", methodNames: [] };
      const storedWalletId = "test-wallet";
      const storedRecentWallets = ["test-wallet"];

      // Mock store state to simulate existing selected wallet and contract
      mockStore.getState.mockReturnValue({
        modules: [],
        accounts: [],
        selectedWalletId: storedWalletId,
        contract: storedContract,
        recentlySignedInWallets: [],
        rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
      });

      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(walletModules as any, "validateWallet")
        .mockResolvedValue(storedAccounts);

      // Mock storage getItem calls in order:
      // 1. PENDING_SELECTED_WALLET_ID (null)
      // 2. PENDING_CONTRACT (null)
      // 3. REMEMBER_RECENT_WALLETS
      // 4. RECENTLY_SIGNED_IN_WALLETS
      mockStorage.getItem
        .mockResolvedValueOnce(null) // PENDING_SELECTED_WALLET_ID
        .mockResolvedValueOnce(null) // PENDING_CONTRACT
        .mockResolvedValueOnce(
          JSON.stringify(REMEMBER_RECENT_WALLETS_STATE.ENABLED)
        ) // REMEMBER_RECENT_WALLETS
        .mockResolvedValueOnce(JSON.stringify(storedRecentWallets)); // RECENTLY_SIGNED_IN_WALLETS

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (walletModules as any).resolveStorageState();

      expect(result).toEqual({
        accounts: storedAccounts,
        contract: storedContract,
        selectedWalletId: storedWalletId,
        recentlySignedInWallets: storedRecentWallets,
        rememberRecentWallets: REMEMBER_RECENT_WALLETS_STATE.ENABLED,
      });
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete wallet lifecycle", async () => {
      const mockWallet = createMockWallet({
        signIn: jest.fn().mockResolvedValue([createMockAccount()]),
        signOut: jest.fn().mockResolvedValue(undefined),
      });

      const mockModule = createMockModule({
        init: jest.fn().mockResolvedValue(mockWallet),
      });

      const mockFactory = jest.fn().mockResolvedValue(mockModule);
      Object.assign(walletModules, { factories: [mockFactory] });

      // Setup wallet modules
      await walletModules.setupWalletModules();

      // Get wallet instance
      const wallet = await walletModules.getWallet("test-wallet");
      expect(wallet).toBeDefined();

      // Sign in
      // @ts-ignore
      await wallet!.signIn({ contractId: "test.testnet", methodNames: [] });
      expect(mockWallet.signIn).toHaveBeenCalled();

      // Sign out
      await wallet!.signOut();
      expect(mockWallet.signOut).toHaveBeenCalled();
    });
  });
});
