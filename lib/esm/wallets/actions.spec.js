import { transformActions } from "./actions";
import { transactions, utils } from "near-api-js";
import BN from "bn.js";
describe("actions", function () {
    it("correctly transforms 'CreateAccount' action", function () {
        var actions = transformActions([{ type: "CreateAccount" }]);
        expect(actions).toEqual([transactions.createAccount()]);
    });
    it("correctly transforms 'DeployContract' action", function () {
        var code = Buffer.from("{}");
        var actions = transformActions([
            {
                type: "DeployContract",
                params: {
                    code: code,
                },
            },
        ]);
        expect(actions).toEqual([transactions.deployContract(code)]);
    });
    it("correctly transforms 'FunctionCall' action", function () {
        var args = Buffer.from("{}");
        var gas = "1";
        var deposit = "2";
        var methodName = "methodName";
        var actions = transformActions([
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
            transactions.functionCall(methodName, args, new BN(gas), new BN(deposit)),
        ]);
    });
    it("correctly transforms 'Transfer' action", function () {
        var deposit = "1";
        var actions = transformActions([
            {
                type: "Transfer",
                params: {
                    deposit: deposit,
                },
            },
        ]);
        expect(actions).toEqual([transactions.transfer(new BN(deposit))]);
    });
    it("correctly transforms 'Stake' action", function () {
        var stake = "1";
        var publicKey = "";
        var actions = transformActions([
            {
                type: "Stake",
                params: {
                    stake: stake,
                    publicKey: publicKey,
                },
            },
        ]);
        expect(actions).toEqual([
            transactions.stake(new BN(stake), utils.PublicKey.from(publicKey)),
        ]);
    });
    it("correctly transforms 'AddKey' action with 'FullAccess' permission", function () {
        var publicKey = "";
        var actions = transformActions([
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
            transactions.addKey(utils.PublicKey.from(publicKey), transactions.fullAccessKey()),
        ]);
    });
    it("correctly transforms 'AddKey' action with 'FunctionCall' permission", function () {
        var publicKey = "";
        var receiverId = "test.testnet";
        var allowance = "1";
        var methodNames = ["methodName"];
        var actions = transformActions([
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
            transactions.addKey(utils.PublicKey.from(publicKey), transactions.functionCallAccessKey(receiverId, methodNames, new BN(allowance))),
        ]);
    });
    it("correctly transforms 'DeleteKey' action", function () {
        var publicKey = "";
        var actions = transformActions([
            {
                type: "DeleteKey",
                params: {
                    publicKey: publicKey,
                },
            },
        ]);
        expect(actions).toEqual([
            transactions.deleteKey(utils.PublicKey.from(publicKey)),
        ]);
    });
    it("correctly transforms 'DeleteAccount' action", function () {
        var beneficiaryId = "test.testnet";
        var actions = transformActions([
            {
                type: "DeleteAccount",
                params: {
                    beneficiaryId: beneficiaryId,
                },
            },
        ]);
        expect(actions).toEqual([transactions.deleteAccount(beneficiaryId)]);
    });
});
