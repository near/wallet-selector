"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransactions = void 0;
const crypto_1 = require("@near-js/crypto");
const transactions_1 = require("@near-js/transactions");
const utils_1 = require("@near-js/utils");
// import * as nearAPI from "near-api-js";
const providers_1 = require("@near-js/providers");
const create_action_1 = require("./create-action");
const signTransactions = async (transactions, signer, network) => {
    const provider = new providers_1.JsonRpcProvider({
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
        const actions = transactions[i].actions.map((action) => (0, create_action_1.createAction)(action));
        const transaction = (0, transactions_1.createTransaction)(transactions[i].signerId, new crypto_1.PublicKey({
            keyType: crypto_1.KeyType.ED25519,
            data: publicKey.data
        }), 
        // PublicKey.from(publicKey.toString()),
        transactions[i].receiverId, accessKey.nonce + i + 1, actions, (0, utils_1.baseDecode)(block.header.hash));
        const response = await (0, transactions_1.signTransaction)(transaction, signer, transactions[i].signerId, network.networkId);
        signedTransactions.push(response[1]);
    }
    return signedTransactions;
};
exports.signTransactions = signTransactions;
