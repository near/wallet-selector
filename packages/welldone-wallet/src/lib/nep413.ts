import type { SignMessageParams } from "@near-wallet-selector/core";
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

export const payloadSchemaNep413 = new Map([
  [
    Payload,
    {
      kind: "struct",
      fields: [
        ["tag", "u32"],
        ["message", "string"],
        ["nonce", [32]],
        ["recipient", "string"],
        [
          "callbackUrl",
          {
            kind: "option",
            type: "string",
          },
        ],
      ],
    },
  ],
]);

export const serializeNep413 = (
  signMessageParams: SignMessageParams
): Buffer => {
  const payload = new Payload({ ...signMessageParams });
  return Buffer.from(serialize(payloadSchemaNep413, payload));
};
