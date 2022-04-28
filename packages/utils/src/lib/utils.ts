import isMobile from "is-mobile";
import { BN } from "bn.js";
import { utils, transactions } from "near-api-js";
import {
  Action,
  AddKeyPermission,
} from "../../../../packages/core/src/lib/wallet/actions.types";

interface CreateTransactionParams {
  accountId: string;
  publicKey: string;
  receiverId: string;
  nonce: number;
  actions: Array<Action>;
  hash: string;
}

const parseNearAmount = utils.format.parseNearAmount;
const parseBigNumber = (value: string) => new BN(value);

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

const createAction = (actions: Array<Action>) => {
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

const createTransaction = ({
  accountId,
  publicKey,
  receiverId,
  nonce,
  actions,
  hash,
}: CreateTransactionParams) => {
  const tx = transactions.createTransaction(
    accountId,
    utils.PublicKey.from(publicKey),
    receiverId,
    nonce,
    createAction(actions),
    utils.serialize.base_decode(hash)
  );

  return tx;
};

export {
  isMobile,
  parseNearAmount,
  parseBigNumber,
  createAction,
  createTransaction,
};
