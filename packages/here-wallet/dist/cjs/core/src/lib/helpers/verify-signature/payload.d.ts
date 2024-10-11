import { Schema } from "borsh";
import type { SignMessageParams } from "../../wallet";
export interface Payload {
    message: string;
    nonce: Buffer;
    recipient: string;
    tag?: number;
    callbackUrl?: string;
}
export declare const createPayload: (data: SignMessageParams) => Payload;
export declare const payloadSchema: Schema;
export declare const serializeNep413: (signMessageParams: SignMessageParams) => Buffer;
//# sourceMappingURL=payload.d.ts.map