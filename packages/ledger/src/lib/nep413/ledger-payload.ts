import { serialize } from "borsh";
import type { Schema } from "borsh";

export class LedgerPayload {
  message: string;
  nonce: Buffer;
  recipient: string;
  callbackUrl?: string;

  constructor(data: LedgerPayload) {
    this.message = data.message;
    this.nonce = data.nonce;
    this.recipient = data.recipient;
    if (data.callbackUrl) {
      this.callbackUrl = data.callbackUrl;
    }
  }
}

export const ledgerPayloadSchema: Schema = {
  struct: {
    message: "string",
    nonce: { array: { type: "u8", len: 32 } },
    recipient: "string",
    callbackUrl: { option: "string" },
  },
};

export const serializeLedgerNEP413Payload = (
  ledgerPayload: LedgerPayload
): Buffer => {
  const payload = new LedgerPayload({ ...ledgerPayload });
  return Buffer.from(serialize(ledgerPayloadSchema, payload));
};
