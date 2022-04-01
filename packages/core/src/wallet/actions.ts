import { transactions, utils } from "near-api-js";
import { BN } from "bn.js";

export interface CreateAccountAction {
  type: "CreateAccount";
}

export interface DeployContractAction {
  type: "DeployContract";
  params: {
    code: Uint8Array;
  };
}

export interface FunctionCallAction {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

export interface TransferAction {
  type: "Transfer";
  params: {
    deposit: string;
  };
}

export interface StakeAction {
  type: "Stake";
  params: {
    stake: string;
    publicKey: string;
  };
}

export type AddKeyPermission =
  | "FullAccess"
  | {
      receiverId: string;
      allowance?: string;
      methodNames?: Array<string>;
    };

export interface AddKeyAction {
  type: "AddKey";
  params: {
    publicKey: string;
    accessKey: {
      nonce?: number;
      permission: AddKeyPermission;
    };
  };
}

export interface DeleteKeyAction {
  type: "DeleteKey";
  params: {
    publicKey: string;
  };
}

export interface DeleteAccountAction {
  type: "DeleteAccount";
  params: {
    beneficiaryId: string;
  };
}

export type Action =
  | CreateAccountAction
  | DeployContractAction
  | FunctionCallAction
  | TransferAction
  | StakeAction
  | AddKeyAction
  | DeleteKeyAction
  | DeleteAccountAction;

export type ActionType = Action["type"];

const getAccessKey = (permission: AddKeyPermission) => {
  if (permission === "FullAccess") {
    return transactions.fullAccessKey();
  }

  const { receiverId, methodNames = [] } = permission;
  const allowance = permission.allowance
    ? new BN(permission.allowance)
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
          new BN(gas),
          new BN(deposit)
        );
      }
      case "Transfer": {
        const { deposit } = action.params;

        return transactions.transfer(new BN(deposit));
      }
      case "Stake": {
        const { stake, publicKey } = action.params;

        return transactions.stake(
          new BN(stake),
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
