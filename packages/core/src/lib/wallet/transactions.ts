import { Action } from "./transactions.types";
import { AddKeyPermission } from "./transactions.types";
import { transactions, utils } from "near-api-js";
import { parseBigNumber } from "@near-wallet-selector/utils";

const getAccessKey = (permission: AddKeyPermission) => {
  if (permission === "FullAccess") {
    return transactions.fullAccessKey();
  }

  const { receiverId, methodNames = [] } = permission;
  const allowance = permission.allowance
    ? parseBigNumber(permission.allowance)
    : undefined;

  return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};

export const transformActions = (actions: Array<Action>) => {
  return actions.map((action) => {
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
          parseBigNumber(gas),
          parseBigNumber(deposit)
        );
      }
      case "Transfer": {
        const { deposit } = action.params;

        return transactions.transfer(parseBigNumber(deposit));
      }
      case "Stake": {
        const { stake, publicKey } = action.params;

        return transactions.stake(
          parseBigNumber(stake),
          utils.PublicKey.from(publicKey)
        );
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
  });
};
