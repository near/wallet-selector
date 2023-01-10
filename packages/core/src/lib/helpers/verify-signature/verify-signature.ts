import { sha256 } from "js-sha256";
import { providers, utils } from "near-api-js";
import type { AccessKeyList } from "near-api-js/lib/providers/provider";
import type {
  FetchUserKeysParams,
  KeyBelongsToUserParams,
  VerifySignatureParams,
} from "./verify-signature.types";

export const verifySignature = ({
  publicKey,
  signature,
  message,
  nonce,
  receiver,
}: VerifySignatureParams): boolean => {
  // Reconstruct the payload that was **actually signed**
  const msg =
    `NEP0413:` +
    JSON.stringify({
      message,
      nonce: Array.from(nonce),
      receiver: receiver,
    });
  const reconstructedPayload = Uint8Array.from(sha256.array(msg));

  // Reconstruct the signature from the parameter given in the URL
  const realSignature = Buffer.from(signature, "base64");

  // Use the public Key to verify that the private-counterpart signed the message
  const myPK = utils.PublicKey.from(publicKey);
  return myPK.verify(reconstructedPayload, realSignature);
};

export const fetchAllUserKeys = async ({
  accountId,
  network,
}: FetchUserKeysParams): Promise<AccessKeyList> => {
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

  return (await provider.query({
    request_type: "view_access_key_list",
    account_id: accountId,
    finality: "final",
  })) as AccessKeyList;
};

export const verifyFullKeyBelongsToUser = async ({
  publicKey,
  accountId,
  network,
}: KeyBelongsToUserParams) => {
  // Call the public RPC asking for all the user's keys
  const { keys } = await fetchAllUserKeys({ accountId, network });

  // If there are no keys, then the user could not sign it!
  if (!keys) {
    return false;
  }

  // Check all the keys to see if we find the used_key there
  for (const k in keys) {
    if (keys[k].public_key === publicKey) {
      // Ensure the key is full access, meaning the user had to sign
      // the transaction through the wallet
      return keys[k].access_key.permission === "FullAccess";
    }
  }

  return false; // didn't find it
};
