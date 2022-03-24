import getConfig from "./config";
describe("config", function () {
    it("returns the correct config for 'mainnet'", function () {
        var networkId = "mainnet";
        var config = getConfig(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.mainnet.near.org",
            walletUrl: "https://wallet.near.org",
            helperUrl: "https://helper.mainnet.near.org",
        });
    });
    it("returns the correct config for 'testnet'", function () {
        var networkId = "testnet";
        var config = getConfig(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
        });
    });
    it("returns the correct config for 'betanet'", function () {
        var networkId = "betanet";
        var config = getConfig(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.betanet.near.org",
            walletUrl: "https://wallet.betanet.near.org",
            helperUrl: "https://helper.betanet.near.org",
        });
    });
});
