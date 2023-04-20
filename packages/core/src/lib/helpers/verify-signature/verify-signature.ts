import { utils, providers } from "near-api-js";
import { serialize } from "borsh";
import { sha256 } from "js-sha256";
import type {
  VerifyFullKeyBelongsToUserParams,
  VerifySignatureParams,
  FetchUserKeysParams,
} from "./verify-signature.types";
import { Payload, payloadSchema } from "./payload";
import type { AccessKeyList } from "near-api-js/lib/providers/provider";

export const verifySignature = ({
  publicKey,
  signature,
  message,
  nonce,
  recipient,
  callbackUrl,
}: VerifySignatureParams) => {
  const payload = new Payload({ message, nonce, recipient, callbackUrl });
  const borshPayload = serialize(payloadSchema, payload);
  const sha = sha256(borshPayload);
  const pk = utils.PublicKey.from(publicKey);
  return pk.verify(
    new Uint8Array(Buffer.from(sha)),
    Buffer.from(signature, "base64")
  );
};

const fetchAllUserKeys = async ({
  accountId,
  network,
}: FetchUserKeysParams): Promise<AccessKeyList> => {
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
  const keys = await provider.query({
    request_type: "view_access_key_list",
    account_id: accountId,
    finality: "final",
  });
  return keys as AccessKeyList;
};

export const verifyFullKeyBelongsToUser = async ({
  publicKey,
  accountId,
  network,
}: VerifyFullKeyBelongsToUserParams) => {
  const { keys } = await fetchAllUserKeys({ accountId, network });

  if (!keys) {
    return false;
  }

  for (const k in keys) {
    if (keys[k].public_key === publicKey) {
      return keys[k].access_key.permission === "FullAccess";
    }
  }
  return false;
};
