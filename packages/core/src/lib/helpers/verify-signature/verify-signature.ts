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
  // Reconstruct the payload that was **actually signed**
  const payload = new Payload({ message, nonce, recipient, callbackUrl });

  // Serialize payload based on payloadSchema
  const borshPayload = serialize(payloadSchema, payload);

  // Hash the payload as in the NEP0413 referenced example
  // https://github.com/near/NEPs/blob/master/neps/nep-0413.md#references
  // https://github.com/gagdiez/near-login/blob/main/authenticate/wallet-authenticate.js#L21
  const hashedPayload = Uint8Array.from(sha256.array(borshPayload));

  // Convert real signature to buffer base64
  const realSignature = Buffer.from(signature, "base64");
  const pk = utils.PublicKey.from(publicKey);

  // Verify the signature
  return pk.verify(hashedPayload, realSignature);
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
