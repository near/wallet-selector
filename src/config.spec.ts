import getConfig from "./config";

describe("config", () => {
  it("returns the correct config for 'mainnet'", () => {
    const networkId = "mainnet";
    const config = getConfig(networkId);

    expect(config.networkId).toEqual(networkId);
  });

  it("returns the correct config for 'testnet'", () => {
    const networkId = "testnet";
    const config = getConfig(networkId);

    expect(config.networkId).toEqual(networkId);
  });

  it("returns the correct config for 'betanet'", () => {
    const networkId = "betanet";
    const config = getConfig(networkId);

    expect(config.networkId).toEqual(networkId);
  });
});
