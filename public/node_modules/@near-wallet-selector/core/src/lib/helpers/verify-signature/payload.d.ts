/// <reference types="node" />
import type { SignMessageParams } from "../../wallet";
import type { Schema } from "borsh";
export declare class Payload {
    tag: number;
    message: string;
    nonce: Buffer;
    recipient: string;
    callbackUrl?: string;
    constructor(data: SignMessageParams);
}
export declare const payloadSchema: Schema;
export declare const serializeNep413: (signMessageParams: SignMessageParams) => Buffer;
