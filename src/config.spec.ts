import { NetworkId } from "./interfaces/Options";
import getConfig from "./config";

describe("config", () => {
  it("returns the correct config for 'mainnet'", () => {
    const networkId: NetworkId = "mainnet";
    const config = getConfig(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
    });
  });

  it("returns the correct config for 'testnet'", () => {
    const networkId: NetworkId = "testnet";
    const config = getConfig(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
    });
  });

  it("returns the correct config for 'betanet'", () => {
    const networkId: NetworkId = "betanet";
    const config = getConfig(networkId);

    expect(config).toEqual({
      networkId,
      nodeUrl: "https://rpc.betanet.near.org",
      walletUrl: "https://wallet.betanet.near.org",
      helperUrl: "https://helper.betanet.near.org",
    });
  });
});
