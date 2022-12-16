import type { VerifySignatureParams } from "../../app/interfaces/sign-message";
import { sha256 } from "js-sha256";
import { utils } from "near-api-js";

export const verifySignature = ({
  publicKey,
  signature,
  message,
  receiver,
  nonce,
}: VerifySignatureParams): boolean => {
  // Reconstruct the payload that was **actually signed**
  const msg =
    `NEP0413:` +
    JSON.stringify({
      message,
      receiver: receiver,
      nonce: Array.from(nonce),
    });
  const reconstructedPayload = Uint8Array.from(sha256.array(msg));

  // Reconstruct the signature from the parameter given in the URL
  const realSignature = Buffer.from(signature, "base64");

  // Use the public Key to verify that the private-counterpart signed the message
  const myPK = utils.PublicKey.from(publicKey);
  return myPK.verify(reconstructedPayload, realSignature);
};
