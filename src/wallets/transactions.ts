import * as nearApi from "near-api-js";
import { Action, transformActions } from "./actions";

export interface Transaction {
  signerId: string;
  publicKey: string;
  receiverId: string;
  nonce: number;
  actions: Array<Action>;
  blockHash: Uint8Array;
}

export const transformTransactions = (transactions: Array<Transaction>) => {
  const { utils } = nearApi;

  return transactions.map((transaction) => {
    const { signerId, publicKey, receiverId } = transaction;
    const { nonce, actions, blockHash } = transaction;

    return nearApi.transactions.createTransaction(
      signerId,
      utils.PublicKey.from(publicKey),
      receiverId,
      nonce,
      transformActions(actions),
      blockHash
    );
  });
};
