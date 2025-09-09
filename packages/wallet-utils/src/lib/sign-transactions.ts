import type { Signer } from "@near-js/signers";
import { JsonRpcProvider } from "@near-js/providers";
import type { Network, Transaction } from "@near-wallet-selector/core";
import type { AccessKeyViewRaw } from "@near-js/types";
import { KeyType, PublicKey } from "@near-js/crypto";
import {
  createTransaction,
  Signature,
  SignedTransaction,
} from "@near-js/transactions";
import { baseDecode } from "@near-js/utils";

export const signTransactions = async (
  transactions: Array<Transaction>,
  signer: Signer,
  network: Network
) => {
  const provider = new JsonRpcProvider({
    url: network.nodeUrl,
  });

  const signedTransactions: Array<SignedTransaction> = [];

  for (let i = 0; i < transactions.length; i++) {
    const publicKey = await signer.getPublicKey();

    const [block, accessKey] = await Promise.all([
      provider.block({ finality: "final" }),
      provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transactions[i].signerId,
        public_key: publicKey.toString(),
      }),
    ]);

    const transaction = createTransaction(
      transactions[i].signerId,
      PublicKey.from(publicKey.toString()),
      transactions[i].receiverId,
      accessKey.nonce + i + 1,
      transactions[i].actions,
      baseDecode(block.header.hash)
    );

    const [, signedTx] = await signer.signTransaction(transaction);

    const finalSignedTx = new SignedTransaction({
      signature: new Signature({
        data: Buffer.from(signedTx.signature.data),
        keyType:
          publicKey.keyType === KeyType.SECP256K1
            ? KeyType.SECP256K1
            : KeyType.ED25519,
      }),
      transaction: transaction,
    });

    signedTransactions.push(finalSignedTx);
  }

  return signedTransactions;
};
