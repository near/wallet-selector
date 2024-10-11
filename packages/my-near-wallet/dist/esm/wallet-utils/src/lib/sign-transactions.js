import { KeyType, PublicKey } from "@near-js/crypto";
import { createTransaction, signTransaction } from "@near-js/transactions";
import { baseDecode } from "@near-js/utils";
// import * as nearAPI from "near-api-js";
import { JsonRpcProvider } from "@near-js/providers";
import { createAction } from "./create-action";
export const signTransactions = async (transactions, signer, network) => {
    const provider = new JsonRpcProvider({
        url: network.nodeUrl,
    });
    const signedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
        const publicKey = await signer.getPublicKey(transactions[i].signerId, network.networkId);
        const [block, accessKey] = await Promise.all([
            provider.block({ finality: "final" }),
            provider.query({
                request_type: "view_access_key",
                finality: "final",
                account_id: transactions[i].signerId,
                public_key: publicKey.toString(),
            }),
        ]);
        const actions = transactions[i].actions.map((action) => createAction(action));
        const transaction = createTransaction(transactions[i].signerId, new PublicKey({
            keyType: KeyType.ED25519,
            data: publicKey.data
        }), 
        // PublicKey.from(publicKey.toString()),
        transactions[i].receiverId, accessKey.nonce + i + 1, actions, baseDecode(block.header.hash));
        const response = await signTransaction(transaction, signer, transactions[i].signerId, network.networkId);
        signedTransactions.push(response[1]);
    }
    return signedTransactions;
};
