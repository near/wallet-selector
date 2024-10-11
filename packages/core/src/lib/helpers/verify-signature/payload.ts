import {Schema, serialize} from "borsh";
import type { SignMessageParams } from "../../wallet";

export interface Payload {
  message: string;
  nonce: Buffer;
  recipient: string;
  tag?: number;
  callbackUrl?: string;
}


export const createPayload = (data: SignMessageParams): Payload => {
  return {
    message: data.message,
    nonce: data.nonce,
    recipient: data.recipient,
    // The tag's value is a hardcoded value as per
    // defined in the NEP [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
    tag: 2147484061, // NEP413 tag
    callbackUrl: data.callbackUrl || undefined,
  };
};

export const payloadSchema: Schema = {
  struct: {
    tag: "u32",
    message: "string",
    nonce: {
      array: {
        type: "u8",
        len: 32
      }
    }, // Assuming this is a 32-byte buffer
    recipient: "string",
    callbackUrl: {
      option: "string"
    },
  }
};

// const payloadSchema: Schema = {
//   kind: "struct",
//   fields: [
//     ["tag", "u32"],
//     ["message", "string"],
//     ["nonce", [32]], // Assuming this is a 32-byte buffer
//     ["recipient", "string"],
//     ["callbackUrl", { kind: "option", type: "string" }],
//   ],
// };

export const serializeNep413 = (signMessageParams: SignMessageParams): Buffer => {
  const payload = createPayload(signMessageParams);
  return Buffer.from(serialize(payloadSchema, payload));
};

// export const serializeNep413 = (signMessageParams: SignMessageParams): Buffer => {
//   const payload = createPayload(signMessageParams);
//   return Buffer.from(serialize(payloadSchema, payload));
// };


// import type { SignMessageParams } from "../../wallet";
// import { serialize } from "borsh";
//
// export class Payload {
//   tag: number;
//   message: string;
//   nonce: Buffer;
//   recipient: string;
//   callbackUrl?: string;
//
//   constructor(data: SignMessageParams) {
//     // The tag's value is a hardcoded value as per
//     // defined in the NEP [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
//     this.tag = 2147484061;
//     this.message = data.message;
//     this.nonce = data.nonce;
//     this.recipient = data.recipient;
//     if (data.callbackUrl) {
//       this.callbackUrl = data.callbackUrl;
//     }
//   }
// }
//
// export const payloadSchema = new Map([
//   [
//     Payload,
//     {
//       kind: "struct",
//       fields: [
//         ["tag", "u32"],
//         ["message", "string"],
//         ["nonce", [32]],
//         ["recipient", "string"],
//         [
//           "callbackUrl",
//           {
//             kind: "option",
//             type: "string",
//           },
//         ],
//       ],
//     },
//   ],
// ]);
//
// export const serializeNep413 = (
//   signMessageParams: SignMessageParams
// ): Buffer => {
//   const payload = new Payload({ ...signMessageParams });
//   return Buffer.from(serialize(payloadSchema, payload));
// };
