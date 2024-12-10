import { serialize } from "borsh";

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

export const ledgerPayloadSchema = new Map([
  [
    LedgerPayload,
    {
      kind: "struct",
      fields: [
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

export const serializeLedgerNEP413Payload = (
  ledgerPayload: LedgerPayload
): Buffer => {
  const payload = new LedgerPayload({ ...ledgerPayload });
  return Buffer.from(serialize(ledgerPayloadSchema, payload));
};
