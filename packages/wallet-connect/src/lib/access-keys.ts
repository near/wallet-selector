import { providers, keyStores, KeyPair } from "near-api-js";
import { Network, Transaction } from "@near-wallet-selector/core";
import { AccessKeyView } from "near-api-js/lib/providers/provider";

export const getTransactionKeyPair = async (
  transaction: Transaction,
  keyStore: keyStores.KeyStore,
  network: Network
): Promise<KeyPair | null> => {
  const keyPair = await keyStore.getKey(
    network.networkId,
    transaction.signerId
  );

  if (!keyPair) {
    return null;
  }

  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
  const publicKey = keyPair.getPublicKey().toString();

  const accessKey = await provider.query<AccessKeyView>({
    request_type: "view_access_key",
    finality: "final",
    account_id: transaction.signerId,
    public_key: publicKey,
  });

  if (accessKey.permission === "FullAccess") {
    return keyPair;
  }

  if (
    transaction.receiverId !== accessKey.permission.FunctionCall.receiver_id
  ) {
    return null;
  }

  const valid = transaction.actions.every((action) => {
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

    if (parseFloat(action.params.deposit) > 0) {
      return false;
    }

    return true;
  });

  return valid ? keyPair : null;
};
