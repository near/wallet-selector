"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
describe("config", function () {
    it("returns the correct config for 'mainnet'", function () {
        var networkId = "mainnet";
        var config = (0, config_1.default)(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.mainnet.near.org",
            walletUrl: "https://wallet.near.org",
            helperUrl: "https://helper.mainnet.near.org",
        });
    });
    it("returns the correct config for 'testnet'", function () {
        var networkId = "testnet";
        var config = (0, config_1.default)(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
        });
    });
    it("returns the correct config for 'betanet'", function () {
        var networkId = "betanet";
        var config = (0, config_1.default)(networkId);
        expect(config).toEqual({
            networkId: networkId,
            nodeUrl: "https://rpc.betanet.near.org",
            walletUrl: "https://wallet.betanet.near.org",
            helperUrl: "https://helper.betanet.near.org",
        });
    });
});
