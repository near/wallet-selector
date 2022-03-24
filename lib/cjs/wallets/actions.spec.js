"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var near_api_js_1 = require("near-api-js");
var bn_js_1 = __importDefault(require("bn.js"));
describe("actions", function () {
    it("correctly transforms 'CreateAccount' action", function () {
        var actions = (0, actions_1.transformActions)([{ type: "CreateAccount" }]);
        expect(actions).toEqual([near_api_js_1.transactions.createAccount()]);
    });
    it("correctly transforms 'DeployContract' action", function () {
        var code = Buffer.from("{}");
        var actions = (0, actions_1.transformActions)([
            {
                type: "DeployContract",
                params: {
                    code: code,
                },
            },
        ]);
        expect(actions).toEqual([near_api_js_1.transactions.deployContract(code)]);
    });
    it("correctly transforms 'FunctionCall' action", function () {
        var args = Buffer.from("{}");
        var gas = "1";
        var deposit = "2";
        var methodName = "methodName";
        var actions = (0, actions_1.transformActions)([
            {
                type: "FunctionCall",
                params: {
                    methodName: methodName,
                    args: args,
                    gas: gas,
                    deposit: deposit,
                },
            },
        ]);
        expect(actions).toEqual([
            near_api_js_1.transactions.functionCall(methodName, args, new bn_js_1.default(gas), new bn_js_1.default(deposit)),
        ]);
    });
    it("correctly transforms 'Transfer' action", function () {
        var deposit = "1";
        var actions = (0, actions_1.transformActions)([
            {
                type: "Transfer",
                params: {
                    deposit: deposit,
                },
            },
        ]);
        expect(actions).toEqual([near_api_js_1.transactions.transfer(new bn_js_1.default(deposit))]);
    });
    it("correctly transforms 'Stake' action", function () {
        var stake = "1";
        var publicKey = "";
        var actions = (0, actions_1.transformActions)([
            {
                type: "Stake",
                params: {
                    stake: stake,
                    publicKey: publicKey,
                },
            },
        ]);
        expect(actions).toEqual([
            near_api_js_1.transactions.stake(new bn_js_1.default(stake), near_api_js_1.utils.PublicKey.from(publicKey)),
        ]);
    });
    it("correctly transforms 'AddKey' action with 'FullAccess' permission", function () {
        var publicKey = "";
        var actions = (0, actions_1.transformActions)([
            {
                type: "AddKey",
                params: {
                    publicKey: publicKey,
                    accessKey: {
                        permission: "FullAccess",
                    },
                },
            },
        ]);
        expect(actions).toEqual([
            near_api_js_1.transactions.addKey(near_api_js_1.utils.PublicKey.from(publicKey), near_api_js_1.transactions.fullAccessKey()),
        ]);
    });
    it("correctly transforms 'AddKey' action with 'FunctionCall' permission", function () {
        var publicKey = "";
        var receiverId = "test.testnet";
        var allowance = "1";
        var methodNames = ["methodName"];
        var actions = (0, actions_1.transformActions)([
            {
                type: "AddKey",
                params: {
                    publicKey: publicKey,
                    accessKey: {
                        permission: {
                            receiverId: receiverId,
                            allowance: allowance,
                            methodNames: methodNames,
                        },
                    },
                },
            },
        ]);
        expect(actions).toEqual([
            near_api_js_1.transactions.addKey(near_api_js_1.utils.PublicKey.from(publicKey), near_api_js_1.transactions.functionCallAccessKey(receiverId, methodNames, new bn_js_1.default(allowance))),
        ]);
    });
    it("correctly transforms 'DeleteKey' action", function () {
        var publicKey = "";
        var actions = (0, actions_1.transformActions)([
            {
                type: "DeleteKey",
                params: {
                    publicKey: publicKey,
                },
            },
        ]);
        expect(actions).toEqual([
            near_api_js_1.transactions.deleteKey(near_api_js_1.utils.PublicKey.from(publicKey)),
        ]);
    });
    it("correctly transforms 'DeleteAccount' action", function () {
        var beneficiaryId = "test.testnet";
        var actions = (0, actions_1.transformActions)([
            {
                type: "DeleteAccount",
                params: {
                    beneficiaryId: beneficiaryId,
                },
            },
        ]);
        expect(actions).toEqual([near_api_js_1.transactions.deleteAccount(beneficiaryId)]);
    });
});
