import { utils, transactions as nearTransactions, Signer } from "near-api-js";
import {
  Transaction,
  Action,
  ProviderService,
  Optional,
  AddKeyPermission,
} from "@near-wallet-selector/core";
import * as BN from "bn.js";

const getAccessKey = (permission: AddKeyPermission) => {
  if (permission === "FullAccess") {
    return nearTransactions.fullAccessKey();
  }

  const { receiverId, methodNames = [] } = permission;
  const allowance = permission.allowance
    ? new BN(permission.allowance)
    : undefined;

  return nearTransactions.functionCallAccessKey(
    receiverId,
    methodNames,
    allowance
  );
};

const createAction = (actions: Array<Action>) => {
  return actions.map((action) => {
    switch (action.type) {
      case "CreateAccount":
        return nearTransactions.createAccount();
      case "DeployContract": {
        const { code } = action.params;

        return nearTransactions.deployContract(code);
      }
      case "FunctionCall": {
        const { methodName, args, gas, deposit } = action.params;

        return nearTransactions.functionCall(
          methodName,
          args,
          new BN(gas),
          new BN(deposit)
        );
      }
      case "Transfer": {
        const { deposit } = action.params;

        return nearTransactions.transfer(new BN(deposit));
      }
      case "Stake": {
        const { stake, publicKey } = action.params;

        return nearTransactions.stake(
          new BN(stake),
          utils.PublicKey.from(publicKey)
        );
      }
      case "AddKey": {
        const { publicKey, accessKey } = action.params;

        return nearTransactions.addKey(
          utils.PublicKey.from(publicKey),
          // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
          getAccessKey(accessKey.permission)
        );
      }
      case "DeleteKey": {
        const { publicKey } = action.params;

        return nearTransactions.deleteKey(utils.PublicKey.from(publicKey));
      }
      case "DeleteAccount": {
        const { beneficiaryId } = action.params;

        return nearTransactions.deleteAccount(beneficiaryId);
      }
      default:
        throw new Error("Invalid action type");
    }
  });
};

const signTransactions = async (
  transactions: Array<Optional<Transaction, "signerId">>,
  signer: Signer,
  provider: ProviderService,
  accountId: string
) => {
  const publicKey = (await signer.getPublicKey()).toString();

  const [block, accessKey] = await Promise.all([
    provider.block({ finality: "final" }),
    provider.viewAccessKey({ accountId, publicKey: publicKey }),
  ]);

  const signedTransactions: Array<nearTransactions.SignedTransaction> = [];

  for (let i = 0; i < transactions.length; i++) {
    const actions = createAction(transactions[i].actions);

    const transaction = nearTransactions.createTransaction(
      accountId,
      utils.PublicKey.from(publicKey),
      transactions[i].receiverId,
      accessKey.nonce + i + 1,
      actions,
      utils.serialize.base_decode(block.header.hash)
    );

    const response = await nearTransactions.signTransaction(
      transaction,
      signer,
      accountId
    );

    signedTransactions.push(response[1]);
  }

  return signedTransactions;
};

export { createAction, signTransactions, Action };
