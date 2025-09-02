import { getNetworkPreset, resolveNetwork, resolveOptions } from "./options";
import type { NetworkId, Network } from "./options.types";
import type { WalletSelectorParams } from "./wallet-selector.types";

describe("getNetworkPreset", () => {
  it("returns the correct config for 'mainnet' without fallbackRpcUrls", () => {
    const networkId: NetworkId = "mainnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://free.rpc.fastnear.com",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://nearblocks.io",
      indexerUrl: "https://api.fastnear.com/v0",
    });
  });

  it("returns the correct config for 'mainnet' with fallbackRpcUrls", () => {
    const networkId: NetworkId = "mainnet";
    const fallbackRpcUrls: Array<string> = [
      "https://rpc1.mainnet.near.org",
      "https://rpc2.mainnet.near.org",
      "https://rpc3.mainnet.near.org",
    ];
    const network = getNetworkPreset(networkId, fallbackRpcUrls);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc1.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://nearblocks.io",
      indexerUrl: "https://api.fastnear.com/v0",
    });
  });

  it("returns the correct config for 'testnet' without fallbackRpcUrls", () => {
    const networkId: NetworkId = "testnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://test.rpc.fastnear.com",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
      indexerUrl: "https://test.api.fastnear.com/v0",
    });
  });

  it("returns the correct config for 'testnet' with fallbackRpcUrls", () => {
    const networkId: NetworkId = "testnet";
    const fallbackRpcUrls: Array<string> = [
      "https://rpc1.testnet.near.org",
      "https://rpc2.testnet.near.org",
      "https://rpc3.testnet.near.org",
    ];
    const network = getNetworkPreset(networkId, fallbackRpcUrls);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc1.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
      indexerUrl: "https://test.api.fastnear.com/v0",
    });
  });
});

describe("resolveNetwork", () => {
  it("resolves network presets", () => {
    const networkId = "testnet";

    expect(resolveNetwork(networkId)).toEqual(getNetworkPreset(networkId));
  });

  it("resolves custom network configuration", () => {
    const network: Network = {
      networkId: "localnet",
      nodeUrl: "http://127.0.0.1:52993",
      helperUrl: "http://127.0.0.1:52997",
      explorerUrl: "http://127.0.0.1:53009",
      indexerUrl: "http://127.0.0.1:52997",
    };

    expect(resolveNetwork(network)).toEqual(network);
  });
});

describe("resolveOptions", () => {
  it("should resolve options with createAccessKeyFor when provided", () => {
    const params: WalletSelectorParams = {
      network: "testnet",
      modules: [],
      createAccessKeyFor: {
        contractId: "test-contract.near",
        methodNames: ["view", "call"],
      },
    };

    const result = resolveOptions(params);

    expect(result.options.createAccessKeyFor).toEqual({
      contractId: "test-contract.near",
      methodNames: ["view", "call"],
    });
  });

  it("should resolve options without createAccessKeyFor when not provided", () => {
    const params: WalletSelectorParams = {
      network: "testnet",
      modules: [],
    };

    const result = resolveOptions(params);

    expect(result.options.createAccessKeyFor).toBeUndefined();
  });

  it("should handle createAccessKeyFor with empty methodNames array", () => {
    const params: WalletSelectorParams = {
      network: "testnet",
      modules: [],
      createAccessKeyFor: {
        contractId: "test-contract.near",
        methodNames: [],
      },
    };

    const result = resolveOptions(params);

    expect(result.options.createAccessKeyFor).toEqual({
      contractId: "test-contract.near",
      methodNames: [],
    });
  });

  it("should resolve options with multiple method names", () => {
    const params: WalletSelectorParams = {
      network: "testnet",
      modules: [],
      createAccessKeyFor: {
        contractId: "complex-contract.near",
        methodNames: ["method1", "method2", "method3", "method4"],
      },
    };

    const result = resolveOptions(params);

    expect(result.options.createAccessKeyFor).toEqual({
      contractId: "complex-contract.near",
      methodNames: ["method1", "method2", "method3", "method4"],
    });
  });

  it("should preserve other options when createAccessKeyFor is provided", () => {
    const params: WalletSelectorParams = {
      network: "mainnet",
      modules: [],
      debug: true,
      optimizeWalletOrder: false,
      randomizeWalletOrder: true,
      languageCode: "en",
      relayerUrl: "https://relayer.example.com",
      createAccessKeyFor: {
        contractId: "test-contract.near",
        methodNames: ["view"],
      },
    };

    const result = resolveOptions(params);

    expect(result.options).toEqual({
      languageCode: "en",
      network: expect.objectContaining({
        networkId: "mainnet",
      }),
      debug: true,
      optimizeWalletOrder: false,
      randomizeWalletOrder: true,
      relayerUrl: "https://relayer.example.com",
      createAccessKeyFor: {
        contractId: "test-contract.near",
        methodNames: ["view"],
      },
    });
  });
});
