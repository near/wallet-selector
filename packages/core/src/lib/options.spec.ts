import { getNetworkPreset, resolveNetwork } from "./options";
import type { NetworkId, Network } from "./options.types";

describe("getNetworkPreset", () => {
  it("returns the correct config for 'mainnet' without fallbackRpcUrls", () => {
    const networkId: NetworkId = "mainnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://nearblocks.io",
      indexerUrl: "https://api.kitwallet.app",
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
      indexerUrl: "https://api.kitwallet.app",
    });
  });

  it("returns the correct config for 'testnet' without fallbackRpcUrls", () => {
    const networkId: NetworkId = "testnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
      indexerUrl: "https://testnet-api.kitwallet.app",
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
      indexerUrl: "https://testnet-api.kitwallet.app",
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
