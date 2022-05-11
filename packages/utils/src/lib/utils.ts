import isMobile from "is-mobile";
import { utils, transactions as nearTransactions } from "near-api-js";
import { Action } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";

interface CreateTransactionParams {
  accountId: string;
  publicKey: string;
  receiverId: string;
  nonce: number;
  actions: Array<Action>;
  hash: string;
}

const createTransaction = ({
  accountId,
  publicKey,
  receiverId,
  nonce,
  actions,
  hash,
}: CreateTransactionParams) => {
  const tx = nearTransactions.createTransaction(
    accountId,
    utils.PublicKey.from(publicKey),
    receiverId,
    nonce,
    createAction(actions),
    utils.serialize.base_decode(hash)
  );

  return tx;
};

export { isMobile, createTransaction };
