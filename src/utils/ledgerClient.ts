import Transport from "@ledgerhq/hw-transport";
import { PublicKey } from "near-api-js/lib/utils";
import { base_encode } from "near-api-js/lib/utils/serialize";

// Further reading regarding send params:
// - https://en.wikipedia.org/wiki/Smart_card_application_protocol_data_unit
// - https://cardwerk.com/smart-card-standard-iso7816-4-section-6-basic-interindustry-commands/

function bip32PathToBytes(path: string) {
  const parts = path.split("/");
  return Buffer.concat(
    parts
      .map((part) =>
        part.endsWith(`'`)
          ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000
          : Math.abs(parseInt(part))
      )
      .map((i32) =>
        Buffer.from([
          (i32 >> 24) & 0xff,
          (i32 >> 16) & 0xff,
          (i32 >> 8) & 0xff,
          i32 & 0xff,
        ])
      )
  );
}

const networkId = "W".charCodeAt(0);

const createLedgerClient = (transport: Transport) => {
  return {
    transport,
    async getVersion() {
      const response = await this.transport.send(0x80, 6, 0, 0);
      const [major, minor, patch] = Array.from(response);
      return `${major}.${minor}.${patch}`;
    },
    async getPublicKey(path: string) {
      const response = await this.transport.send(
        0x80,
        4,
        0,
        networkId,
        bip32PathToBytes(path)
      );

      return PublicKey.from(base_encode(response.subarray(0, -2)));
    },
    async sign(data: string, path: string) {
      // NOTE: getVersion call allows to reset state to avoid starting from partially filled buffer
      const version = await this.getVersion();
      console.info("Ledger app version:", version);
      // TODO: Assert compatible versions

      const dataBuffer = Buffer.from(data);
      // 128 - 5 service bytes
      const CHUNK_SIZE = 123;
      const allData = Buffer.concat([bip32PathToBytes(path), dataBuffer]);

      for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
        const chunk = Buffer.from(
          allData.subarray(offset, offset + CHUNK_SIZE)
        );
        const isLastChunk = offset + CHUNK_SIZE >= allData.length;
        const response = await this.transport.send(
          0x80,
          2,
          isLastChunk ? 0x80 : 0,
          networkId,
          chunk
        );

        if (isLastChunk) {
          return Buffer.from(response.subarray(0, -2));
        }
      }

      return;
    },
  };
};

export default createLedgerClient;
