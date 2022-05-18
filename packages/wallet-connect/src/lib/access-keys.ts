import { providers, keyStores, KeyPair } from "near-api-js";
import { Action, Network, Transaction } from "@near-wallet-selector/core";
import { AccessKeyView } from "near-api-js/lib/providers/provider";

const validateActions = (actions: Array<Action>, accessKey: AccessKeyView) => {
  return actions.every((action) => {
    if (accessKey.permission === "FullAccess") {
      return true;
    }

    if (action.type !== "FunctionCall") {
      return false;
    }

    const { method_names } = accessKey.permission.FunctionCall;
    const { methodName } = action.params;

    if (method_names.length && !method_names.includes(methodName)) {
      return false;
    }

    return parseFloat(action.params.deposit) <= 0;
  });
};

export const getTransactionsWithKeyPairs = async (
  transactions: Array<Transaction>,
  keyStore: keyStores.KeyStore,
  network: Network
) => {
  const result: Array<{
    transaction: Transaction;
    keyPair: KeyPair | null;
  }> = [];

  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

  for (let i = 0; i < transactions.length; i += 1) {
    const transaction = transactions[i];
    const { signerId, receiverId, actions } = transaction;
    const keyPair = await keyStore.getKey(network.networkId, signerId);

    if (!keyPair) {
      result.push({ transaction, keyPair: null });
      continue;
    }

    const accessKey = await provider.query<AccessKeyView>({
      request_type: "view_access_key",
      finality: "final",
      account_id: signerId,
      public_key: keyPair.getPublicKey().toString(),
    });

    if (accessKey.permission === "FullAccess") {
      result.push({ transaction, keyPair });
      continue;
    }

    if (receiverId !== accessKey.permission.FunctionCall.receiver_id) {
      result.push({ transaction, keyPair: null });
      continue;
    }

    if (!validateActions(actions, accessKey)) {
      result.push({ transaction, keyPair: null });
      continue;
    }

    result.push({ transaction, keyPair });
  }

  return result;
};
