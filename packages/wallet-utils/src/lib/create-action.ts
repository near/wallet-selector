import * as nearAPI from "near-api-js";
import type { AddKeyPermission, Action } from "@near-wallet-selector/core";
const { transactions, utils } = nearAPI;

const getAccessKey = (permission: AddKeyPermission) => {
  if (permission === "FullAccess") {
    return transactions.fullAccessKey();
  }

  const { receiverId, methodNames = [] } = permission;
  const allowance = permission.allowance
    ? BigInt(permission.allowance)
    : undefined;

  return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};

export const createAction = (action: Action) => {
  switch (action.type) {
    case "CreateAccount":
      return transactions.createAccount();
    case "DeployContract": {
      const { code } = action.params;

      return transactions.deployContract(code);
    }
    case "FunctionCall": {
      const { methodName, args, gas, deposit } = action.params;

      return transactions.functionCall(
        methodName,
        args,
        BigInt(gas),
        BigInt(deposit)
      );
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

      return transactions.addKey(
        utils.PublicKey.from(publicKey),
        // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
        getAccessKey(accessKey.permission)
      );
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
