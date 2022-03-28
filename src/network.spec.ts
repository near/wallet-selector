import { getNetwork, NetworkConfiguration, resolveNetwork } from "./network";

describe("getNetwork", () => {
  it("returns the correct config for 'mainnet'", () => {
    const networkId = "mainnet";
    const config = getNetwork(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });

  it("returns the correct config for 'testnet'", () => {
    const networkId = "testnet";
    const config = getNetwork(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });

  it("returns the correct config for 'betanet'", () => {
    const networkId = "betanet";
    const config = getNetwork(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.betanet.near.org",
      helperUrl: "https://helper.betanet.near.org",
      explorerUrl: "https://explorer.betanet.near.org",
      restApiUrl: "https://rest.nearapi.org",
    });
  });

  it("throws for 'customnet'", () => {
    const networkId = "customnet";

    expect(() => getNetwork(networkId)).toThrowError(
      new Error(`Failed to find network configuration for '${networkId}'`)
    );
  });
});

describe("resolveNetwork", () => {
  it("resolves to network configuration matching the preset", () => {
    const networkId = "testnet";

    expect(resolveNetwork(networkId)).toEqual(getNetwork(networkId));
  });

  it("resolves to custom network configuration for 'customnet'", () => {
    const network: NetworkConfiguration = {
      networkId: "localnet",
      nodeUrl: "http://127.0.0.1:52993",
      helperUrl: "http://127.0.0.1:52997",
      explorerUrl: "http://127.0.0.1:53009",
      restApiUrl: "https://rest.nearapi.org",
    };

    expect(resolveNetwork("customnet", network)).toEqual(network);
  });

  it("throws if no custom network configuration is defined for 'customnet'", () => {
    const networkId = "customnet";

    expect(() => resolveNetwork(networkId)).toThrowError(
      new Error(`You must define network configuration for '${networkId}'`)
    );
  });
});
