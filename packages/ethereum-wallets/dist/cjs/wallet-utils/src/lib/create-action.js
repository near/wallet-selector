"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = void 0;
const nearAPI = __importStar(require("near-api-js"));
const { transactions, utils } = nearAPI;
const getAccessKey = (permission) => {
    if (permission === "FullAccess") {
        return transactions.fullAccessKey();
    }
    const { receiverId, methodNames = [] } = permission;
    const allowance = permission.allowance
        ? BigInt(permission.allowance)
        : undefined;
    return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};
const createAction = (action) => {
    switch (action.type) {
        case "CreateAccount":
            return transactions.createAccount();
        case "DeployContract": {
            const { code } = action.params;
            return transactions.deployContract(code);
        }
        case "FunctionCall": {
            const { methodName, args, gas, deposit } = action.params;
            console.log('alohaws action', action);
            return transactions.functionCall(methodName, args, BigInt(gas), BigInt(deposit));
        }
        case "Transfer": {
            const { deposit } = action.params;
            return transactions.transfer(BigInt(deposit));
        }
        case "Stake": {
            const { stake, publicKey } = action.params;
            return transactions.stake(BigInt(stake), utils.PublicKey.from(publicKey));
        }
        case "AddKey": {
            const { publicKey, accessKey } = action.params;
            return transactions.addKey(utils.PublicKey.from(publicKey), 
            // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
            getAccessKey(accessKey.permission));
        }
        case "DeleteKey": {
            const { publicKey } = action.params;
            return transactions.deleteKey(utils.PublicKey.from(publicKey));
        }
        case "DeleteAccount": {
            const { beneficiaryId } = action.params;
            return transactions.deleteAccount(beneficiaryId);
        }
        default:
            throw new Error("Invalid action type");
    }
};
exports.createAction = createAction;
