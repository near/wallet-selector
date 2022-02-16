import { transactions, utils } from "near-api-js";
import BN from "bn.js";

export interface CreateAccountAction {
  type: "CreateAccount";
}

export interface DeployContractAction {
  type: "DeployContract";
  action: {
    code: Uint8Array;
  };
}

export interface FunctionCallAction {
  type: "FunctionCall";
  action: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

export interface TransferAction {
  type: "Transfer";
  action: {
    deposit: string;
  };
}

export interface StakeAction {
  type: "Stake";
  action: {
    stake: string;
    publicKey: string;
  };
}

export interface AddKeyAction {
  type: "AddKey";
  action: {
    publicKey: string;
    // TODO: Determine the serializable version of `AccessKey`.
    accessKey: unknown;
  };
}

export interface DeleteKeyAction {
  type: "DeleteKey";
  action: {
    publicKey: string;
  };
}

export interface DeleteAccountAction {
  type: "DeleteAccount";
  action: {
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

export const transformActions = (actions: Array<Action>) => {
  return actions.map((x) => {
    switch (x.type) {
      case "CreateAccount":
        return transactions.createAccount();
      case "DeployContract": {
        const { code } = x.action;

        return transactions.deployContract(code);
      }
      case "FunctionCall": {
        const { methodName, args, gas, deposit } = x.action;

        return transactions.functionCall(
          methodName,
          args,
          new BN(gas),
          new BN(deposit)
        );
      }
      case "Transfer": {
        const { deposit } = x.action;

        return transactions.transfer(new BN(deposit));
      }
      case "Stake": {
        const { stake, publicKey } = x.action;

        return transactions.stake(
          new BN(stake),
          utils.PublicKey.from(publicKey)
        );
      }
      // case "AddKey": {
      //   const { publicKey, accessKey } = x.action;
      //
      //   // TODO: Figure out how to convert to an access key.
      //   return transactions.addKey(utils.PublicKey.from(publicKey), accessKey);
      // }
      case "DeleteKey": {
        const { publicKey } = x.action;

        return transactions.deleteKey(utils.PublicKey.from(publicKey));
      }
      case "DeleteAccount": {
        const { beneficiaryId } = x.action;

        return transactions.deleteAccount(beneficiaryId);
      }
      default:
        throw new Error(`Invalid action type '${x.type}'`);
    }
  });
};
