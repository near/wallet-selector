import {
  utils,
  transactions as nearTransactions,
  Signer,
  providers,
} from "near-api-js";
import { Transaction } from "@near-wallet-selector/core";
import { AccessKeyView } from "near-api-js/lib/providers/provider";
import { createAction } from "./create-action";

export const signTransactions = async (
  transactions: Array<Transaction>,
  signer: Signer,
  accountId: string
) => {
  const publicKey = (await signer.getPublicKey()).toString();

  const provider = new providers.JsonRpcProvider();

  const [block, accessKey] = await Promise.all([
    provider.block({ finality: "final" }),
    provider.query<AccessKeyView>({
      request_type: "view_access_key",
      finality: "final",
      account_id: accountId,
      public_key: publicKey,
    }),
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
