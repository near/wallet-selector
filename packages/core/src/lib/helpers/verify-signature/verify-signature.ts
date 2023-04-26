import { utils, providers } from "near-api-js";
import { serialize } from "borsh";
import { sha256 } from "js-sha256";
import type {
  VerifyFullKeyBelongsToUserParams,
  VerifySignatureParams,
  ViewAccessKeyParams,
} from "./verify-signature.types";
import { Payload, payloadSchema } from "./payload";
import type { AccessKeyView } from "near-api-js/lib/providers/provider";

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
  publicKey,
}: ViewAccessKeyParams): Promise<AccessKeyView> => {
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
  const key = await provider.query({
    request_type: "view_access_key",
    account_id: accountId,
    finality: "final",
    public_key: publicKey,
  });
  return key as AccessKeyView;
};

export const verifyFullKeyBelongsToUser = async ({
  publicKey,
  accountId,
  network,
}: VerifyFullKeyBelongsToUserParams) => {
  const { permission } = await fetchAllUserKeys({
    accountId,
    network,
    publicKey,
  });

  return permission === "FullAccess";
};
