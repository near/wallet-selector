import type { Action as NAJAction } from "@near-js/transactions";
import type { AddKeyPermission, Action } from "@near-wallet-selector/core";
import { actionCreators } from "@near-js/transactions";
import { PublicKey } from "@near-js/crypto";

const {
  fullAccessKey,
  functionCallAccessKey,
  createAccount,
  deployContract,
  functionCall,
  transfer,
  stake: stakeAction,
  addKey,
  deleteKey,
  deleteAccount,
} = actionCreators;

const getAccessKey = (permission: AddKeyPermission) => {
  if (permission === "FullAccess") {
    return fullAccessKey();
  }

  const { receiverId, methodNames = [] } = permission;
  const allowance = permission.allowance
    ? BigInt(permission.allowance)
    : undefined;

  return functionCallAccessKey(receiverId, methodNames, allowance);
};

// TODO: Remove this function after all wallets use the NAJ Action by default
export const createAction = (action: Action): NAJAction => {
  switch (action.type) {
    case "CreateAccount":
      return createAccount();
    case "DeployContract": {
      const { code } = action.params;

      return deployContract(code);
    }
    case "FunctionCall": {
      const { methodName, args, gas, deposit } = action.params;

      return functionCall(
        methodName,
        args,
        BigInt(gas),
        BigInt(deposit)
      );
    }
    case "Transfer": {
      const { deposit } = action.params;

      return transfer(BigInt(deposit));
    }
    case "Stake": {
      const { stake, publicKey } = action.params;

      return stakeAction(BigInt(stake), PublicKey.from(publicKey));
    }
    case "AddKey": {
      const { publicKey, accessKey } = action.params;

      return addKey(
        PublicKey.from(publicKey),
        // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
        getAccessKey(accessKey.permission)
      );
    }
    case "DeleteKey": {
      const { publicKey } = action.params;

      return deleteKey(PublicKey.from(publicKey));
    }
    case "DeleteAccount": {
      const { beneficiaryId } = action.params;

      return deleteAccount(beneficiaryId);
    }
    default:
      throw new Error("Invalid action type");
  }
};
