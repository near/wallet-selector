import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Transport from "@ledgerhq/hw-transport";
import { utils } from "near-api-js";
import { listen, Log } from "@ledgerhq/logs";

// Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h

const CLA = 0x80; // Always the same for Ledger.
const INS_SIGN = 0x02; // Sign
const INS_GET_PUBLIC_KEY = 0x04; // Get Public Key
const INS_GET_APP_VERSION = 0x06; // Get App Version
const P1_LAST = 0x80; // End of Bytes to Sign (finalize)
const P1_MORE = 0x00; // More bytes coming
const P1_IGNORE = 0x00;
const P2_IGNORE = 0x00;

// Converts BIP32-compliant derivation path to a Buffer.
// More info here: https://github.com/LedgerHQ/ledger-live-common/blob/master/docs/derivation.md
function parseDerivationPath(derivationPath: string) {
  const parts = derivationPath.split("/");

  return Buffer.concat(
    parts
      .map((part) => {
        return part.endsWith(`'`)
          ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000
          : Math.abs(parseInt(part));
      })
      .map((i32) => {
        return Buffer.from([
          (i32 >> 24) & 0xff,
          (i32 >> 16) & 0xff,
          (i32 >> 8) & 0xff,
          i32 & 0xff,
        ]);
      })
  );
}

// TODO: Understand what this is exactly. What's so special about 87?
const networkId = "W".charCodeAt(0);

interface GetPublicKeyParams {
  derivationPath: string;
}

interface SignParams {
  data: Uint8Array;
  derivationPath: string;
}

interface EventMap {
  disconnect: Error;
}

export interface Subscription {
  remove: () => void;
}

// TODO: Needs a method to assert whether we're connected.
class LedgerClient {
  private transport: Transport;

  async connect() {
    this.transport = await TransportWebHID.create();
  }

  disconnect() {
    return this.transport.close();
  }

  listen(callback: (data: Log) => void) {
    const unsubscribe = listen(callback);

    return {
      remove: () => unsubscribe(),
    };
  }

  setScrambleKey(key: string) {
    this.transport.setScrambleKey(key);
  }

  on<Event extends keyof EventMap>(
    event: Event,
    callback: (data: EventMap[Event]) => void
  ): Subscription {
    this.transport.on(event, callback);

    return {
      remove: () => this.transport.off(event, callback),
    };
  }

  off(event: keyof EventMap, callback: () => void) {
    this.transport.off(event, callback);
  }

  async getVersion() {
    const res = await this.transport.send(
      CLA,
      INS_GET_APP_VERSION,
      P1_IGNORE,
      P2_IGNORE
    );

    const [major, minor, patch] = Array.from(res);

    return `${major}.${minor}.${patch}`;
  }

  async getPublicKey({ derivationPath }: GetPublicKeyParams) {
    const res = await this.transport.send(
      CLA,
      INS_GET_PUBLIC_KEY,
      P2_IGNORE,
      networkId,
      parseDerivationPath(derivationPath)
    );

    return utils.serialize.base_encode(res.subarray(0, -2));
  }

  async sign({ data, derivationPath }: SignParams) {
    // NOTE: getVersion call resets state to avoid starting from partially filled buffer
    await this.getVersion();

    // 128 - 5 service bytes
    const CHUNK_SIZE = 123;
    const allData = Buffer.concat([
      parseDerivationPath(derivationPath),
      Buffer.from(data),
    ]);

    for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
      const isLastChunk = offset + CHUNK_SIZE >= allData.length;

      const response = await this.transport.send(
        CLA,
        INS_SIGN,
        isLastChunk ? P1_LAST : P1_MORE,
        P2_IGNORE,
        Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE))
      );

      if (isLastChunk) {
        return Buffer.from(response.subarray(0, -2));
      }
    }

    throw new Error("Invalid data or derivation path");
  }
}

export default LedgerClient;
