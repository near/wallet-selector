"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFullKeyBelongsToUser = exports.verifySignature = void 0;
const borsh_1 = require("borsh");
const js_sha256_1 = require("js-sha256");
const payload_1 = require("./payload");
const crypto_1 = require("../../../../../../../near-api-js/packages/crypto");
// import {KeyType, PublicKey, publicKeyFrom} from "@near-js/crypto";
const providers_1 = require("@near-js/providers");
const verifySignature = ({ publicKey, signature, message, nonce, recipient, callbackUrl, }) => {
    // Reconstruct the payload that was **actually signed**
    const payload = { message, nonce, recipient, callbackUrl };
    // Serialize payload based on payloadSchema
    const borshPayload = (0, borsh_1.serialize)(payload_1.payloadSchema, payload);
    // Hash the payload as in the NEP0413 referenced example
    // https://github.com/near/NEPs/blob/master/neps/nep-0413.md#references
    // https://github.com/gagdiez/near-login/blob/main/authenticate/wallet-authenticate.js#L21
    const hashedPayload = Uint8Array.from(js_sha256_1.sha256.array(borshPayload));
    // Convert real signature to buffer base64
    const realSignature = Buffer.from(signature, "base64");
    const pk = (0, crypto_1.publicKeyFrom)(publicKey);
    // Verify the signature
    return pk.verify(hashedPayload, realSignature);
};
exports.verifySignature = verifySignature;
const fetchAllUserKeys = async ({ accountId, network, publicKey, }) => {
    const provider = new providers_1.JsonRpcProvider({ url: network.nodeUrl });
    const key = await provider.query({
        request_type: "view_access_key",
        account_id: accountId,
        finality: "final",
        public_key: publicKey,
    });
    return key;
};
const verifyFullKeyBelongsToUser = async ({ publicKey, accountId, network, }) => {
    const { permission } = await fetchAllUserKeys({
        accountId,
        network,
        publicKey,
    });
    return permission === "FullAccess";
};
exports.verifyFullKeyBelongsToUser = verifyFullKeyBelongsToUser;
