import { NetworkId } from "@near-wallet-selector/core";
import { getNetwork, NetworkConfiguration, resolveNetwork } from "./network";

describe("getNetwork", () => {
  it("returns the correct config for 'mainnet'", () => {
    const networkId: NetworkId = "mainnet";
    const network = getNetwork(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });

  it("returns the correct config for 'testnet'", () => {
    const networkId: NetworkId = "testnet";
    const network = getNetwork(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });

  it("returns the correct config for 'betanet'", () => {
    const networkId: NetworkId = "betanet";
    const network = getNetwork(networkId);

    expect(network).toEqual({
      networkId,
      nodeUrl: "https://rpc.betanet.near.org",
      helperUrl: "https://helper.betanet.near.org",
      explorerUrl: "https://explorer.betanet.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });
});

describe("resolveNetwork", () => {
  it("resolves network presets", () => {
    const networkId = "testnet";

    expect(resolveNetwork(networkId)).toEqual(getNetwork(networkId));
  });

  it("resolves custom network configuration", () => {
    const network: NetworkConfiguration = {
      networkId: "localnet",
      nodeUrl: "http://127.0.0.1:52993",
      helperUrl: "http://127.0.0.1:52997",
      explorerUrl: "http://127.0.0.1:53009",
      restApiUrl: "https://rest.nearapi.org",
    };

    expect(resolveNetwork(network)).toEqual(network);
  });
});
