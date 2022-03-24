"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformActions = void 0;
var near_api_js_1 = require("near-api-js");
var bn_js_1 = __importDefault(require("bn.js"));
var getAccessKey = function (permission) {
    if (permission === "FullAccess") {
        return near_api_js_1.transactions.fullAccessKey();
    }
    var receiverId = permission.receiverId, _a = permission.methodNames, methodNames = _a === void 0 ? [] : _a;
    var allowance = permission.allowance
        ? new bn_js_1.default(permission.allowance)
        : undefined;
    return near_api_js_1.transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};
var transformActions = function (actions) {
    return actions.map(function (action) {
        switch (action.type) {
            case "CreateAccount":
                return near_api_js_1.transactions.createAccount();
            case "DeployContract": {
                var code = action.params.code;
                return near_api_js_1.transactions.deployContract(code);
            }
            case "FunctionCall": {
                var _a = action.params, methodName = _a.methodName, args = _a.args, gas = _a.gas, deposit = _a.deposit;
                return near_api_js_1.transactions.functionCall(methodName, args, new bn_js_1.default(gas), new bn_js_1.default(deposit));
            }
            case "Transfer": {
                var deposit = action.params.deposit;
                return near_api_js_1.transactions.transfer(new bn_js_1.default(deposit));
            }
            case "Stake": {
                var _b = action.params, stake = _b.stake, publicKey = _b.publicKey;
                return near_api_js_1.transactions.stake(new bn_js_1.default(stake), near_api_js_1.utils.PublicKey.from(publicKey));
            }
            case "AddKey": {
                var _c = action.params, publicKey = _c.publicKey, accessKey = _c.accessKey;
                return near_api_js_1.transactions.addKey(near_api_js_1.utils.PublicKey.from(publicKey), 
                // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
                getAccessKey(accessKey.permission));
            }
            case "DeleteKey": {
                var publicKey = action.params.publicKey;
                return near_api_js_1.transactions.deleteKey(near_api_js_1.utils.PublicKey.from(publicKey));
            }
            case "DeleteAccount": {
                var beneficiaryId = action.params.beneficiaryId;
                return near_api_js_1.transactions.deleteAccount(beneficiaryId);
            }
            default:
                throw new Error("Invalid action type");
        }
    });
};
exports.transformActions = transformActions;
