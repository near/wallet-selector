import type { VerifyFullKeyBelongsToUserParams, VerifySignatureParams } from "./verify-signature.types";
export declare const verifySignature: ({ publicKey, signature, message, nonce, recipient, callbackUrl, }: VerifySignatureParams) => boolean;
export declare const verifyFullKeyBelongsToUser: ({ publicKey, accountId, network, }: VerifyFullKeyBelongsToUserParams) => Promise<boolean>;
