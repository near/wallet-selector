import type { SignMessageParams } from "../../wallet";
import type { Schema } from "borsh";
import { serialize } from "borsh";

export class Payload {
  tag: number;
  message: string;
  nonce: Buffer;
  recipient: string;
  callbackUrl?: string;

  constructor(data: SignMessageParams) {
    // The tag's value is a hardcoded value as per
    // defined in the NEP [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
    this.tag = 2147484061;
    this.message = data.message;
    this.nonce = data.nonce;
    this.recipient = data.recipient;
    if (data.callbackUrl) {
      this.callbackUrl = data.callbackUrl;
    }
  }
}

export const payloadSchema: Schema = {
  struct: {
    tag: "u32",
    message: "string",
    nonce: { array: { type: "u8", len: 32 } },
    recipient: "string",
    callbackUrl: { option: "string" },
  },
};

export const serializeNep413 = (
  signMessageParams: SignMessageParams
): Buffer => {
  const payload = new Payload({ ...signMessageParams });
  return Buffer.from(serialize(payloadSchema, payload));
};
