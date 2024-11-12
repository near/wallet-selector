import { setupWalletSelector } from "./wallet-selector";
import { getNetworkPreset } from "./options";
import {
  FailoverRpcProvider,
  JsonRpcProvider,
} from "near-api-js/lib/providers";
import type { Network } from "./options.types";
import type { Store } from "./store.types";
import type { WalletModuleFactory } from "./wallet";

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

jest.mock("./options", () => {
  return {
    ...jest.requireActual("./options"),
    getNetworkPreset: jest.fn().mockResolvedValue({
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
    createStore: jest.fn().mockResolvedValue({
      toReadOnly: jest.fn().mockReturnValue({}),
      getState: jest.fn().mockReturnValue({}),
      dispatch: jest.fn(),
    } as unknown as Store),
  };
});

jest.mock("near-api-js/lib/providers", () => {
  const originalModule = jest.requireActual("near-api-js/lib/providers");
  return {
    ...originalModule,
    FailoverRpcProvider: jest.fn(),
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

    const networkPreset = await getNetworkPreset("testnet", []);

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
});
