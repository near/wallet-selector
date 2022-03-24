import { transactions, utils } from "near-api-js";
import BN from "bn.js";
var getAccessKey = function (permission) {
    if (permission === "FullAccess") {
        return transactions.fullAccessKey();
    }
    var receiverId = permission.receiverId, _a = permission.methodNames, methodNames = _a === void 0 ? [] : _a;
    var allowance = permission.allowance
        ? new BN(permission.allowance)
        : undefined;
    return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};
export var transformActions = function (actions) {
    return actions.map(function (action) {
        switch (action.type) {
            case "CreateAccount":
                return transactions.createAccount();
            case "DeployContract": {
                var code = action.params.code;
                return transactions.deployContract(code);
            }
            case "FunctionCall": {
                var _a = action.params, methodName = _a.methodName, args = _a.args, gas = _a.gas, deposit = _a.deposit;
                return transactions.functionCall(methodName, args, new BN(gas), new BN(deposit));
            }
            case "Transfer": {
                var deposit = action.params.deposit;
                return transactions.transfer(new BN(deposit));
            }
            case "Stake": {
                var _b = action.params, stake = _b.stake, publicKey = _b.publicKey;
                return transactions.stake(new BN(stake), utils.PublicKey.from(publicKey));
            }
            case "AddKey": {
                var _c = action.params, publicKey = _c.publicKey, accessKey = _c.accessKey;
                return transactions.addKey(utils.PublicKey.from(publicKey), 
                // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
                getAccessKey(accessKey.permission));
            }
            case "DeleteKey": {
                var publicKey = action.params.publicKey;
                return transactions.deleteKey(utils.PublicKey.from(publicKey));
            }
            case "DeleteAccount": {
                var beneficiaryId = action.params.beneficiaryId;
                return transactions.deleteAccount(beneficiaryId);
            }
            default:
                throw new Error("Invalid action type");
        }
    });
};
