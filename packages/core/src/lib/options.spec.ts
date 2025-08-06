import { getNetworkPreset, resolveNetwork } from "./options";
import type { NetworkId, Network } from "./options.types";

describe("getNetworkPreset", () => {
  it("returns the correct config for 'mainnet'", () => {
    const networkId: NetworkId = "mainnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.near.org",
      indexerUrl: "https://api.kitwallet.app",
    });
  });

  it("returns the correct config for 'testnet'", () => {
    const networkId: NetworkId = "testnet";
    const network = getNetworkPreset(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
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
