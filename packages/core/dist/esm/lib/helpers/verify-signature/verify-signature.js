import { serialize } from "borsh";
import { sha256 } from "js-sha256";
import { payloadSchema } from "./payload";
import { publicKeyFrom } from "../../../../../../../near-api-js/packages/crypto";
// import {KeyType, PublicKey, publicKeyFrom} from "@near-js/crypto";
import { JsonRpcProvider } from "@near-js/providers";
export const verifySignature = ({ publicKey, signature, message, nonce, recipient, callbackUrl, }) => {
    // Reconstruct the payload that was **actually signed**
    const payload = { message, nonce, recipient, callbackUrl };
    // Serialize payload based on payloadSchema
    const borshPayload = serialize(payloadSchema, payload);
    // Hash the payload as in the NEP0413 referenced example
    // https://github.com/near/NEPs/blob/master/neps/nep-0413.md#references
    // https://github.com/gagdiez/near-login/blob/main/authenticate/wallet-authenticate.js#L21
    const hashedPayload = Uint8Array.from(sha256.array(borshPayload));
    // Convert real signature to buffer base64
    const realSignature = Buffer.from(signature, "base64");
    const pk = publicKeyFrom(publicKey);
    // Verify the signature
    return pk.verify(hashedPayload, realSignature);
};
const fetchAllUserKeys = async ({ accountId, network, publicKey, }) => {
    const provider = new JsonRpcProvider({ url: network.nodeUrl });
    const key = await provider.query({
        request_type: "view_access_key",
        account_id: accountId,
        finality: "final",
        public_key: publicKey,
    });
    return key;
};
export const verifyFullKeyBelongsToUser = async ({ publicKey, accountId, network, }) => {
    const { permission } = await fetchAllUserKeys({
        accountId,
        network,
        publicKey,
    });
    return permission === "FullAccess";
};
