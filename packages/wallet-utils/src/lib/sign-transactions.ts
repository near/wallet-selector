import type { Signer } from "near-api-js";
import * as nearAPI from "near-api-js";
import type { Network, Transaction } from "@near-wallet-selector/core";
import type { AccessKeyViewRaw } from "near-api-js/lib/providers/provider";
import { createAction } from "./create-action";

export const signTransactions = async (
  transactions: Array<Transaction>,
  signer: Signer,
  network: Network
) => {
  const provider = new nearAPI.providers.JsonRpcProvider({
    url: network.nodeUrl,
  });

  const signedTransactions: Array<nearAPI.transactions.SignedTransaction> = [];

  for (let i = 0; i < transactions.length; i++) {
    const publicKey = await signer.getPublicKey(
      transactions[i].signerId,
      network.networkId
    );

    const [block, accessKey] = await Promise.all([
      provider.block({ finality: "final" }),
      provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transactions[i].signerId,
        public_key: publicKey.toString(),
      }),
    ]);

    const actions = transactions[i].actions.map((action) =>
      createAction(action)
    );

    const transaction = nearAPI.transactions.createTransaction(
      transactions[i].signerId,
      nearAPI.utils.PublicKey.from(publicKey.toString()),
      transactions[i].receiverId,
      accessKey.nonce + i + 1,
      actions,
      nearAPI.utils.serialize.base_decode(block.header.hash)
    );

    const response = await nearAPI.transactions.signTransaction(
      transaction,
      signer,
      transactions[i].signerId,
      network.networkId
    );

    signedTransactions.push(response[1]);
  }

  return signedTransactions;
};
