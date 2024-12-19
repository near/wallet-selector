import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import type Transport from "@ledgerhq/hw-transport";
import * as nearAPI from "near-api-js";

// Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h

export const CLA = 0x80; // Always the same for Ledger.

export enum NEAR_INS {
  GET_VERSION = 0x06,
  GET_PUBLIC_KEY = 0x04,
  GET_WALLET_ID = 0x05,
  SIGN_TRANSACTION = 0x02,
  NEP413_SIGN_MESSAGE = 0x07,
  NEP366_SIGN_DELEGATE_ACTION = 0x08,
}

export const P1_LAST = 0x80; // End of Bytes to Sign (finalize)
export const P1_MORE = 0x00; // More bytes coming
export const P1_IGNORE = 0x00;
export const P2_IGNORE = 0x00;
export const CHUNK_SIZE = 250;

// Converts BIP32-compliant derivation path to a Buffer.
// More info here: https://github.com/LedgerHQ/ledger-live-common/blob/master/docs/derivation.md
export function parseDerivationPath(derivationPath: string) {
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
export const networkId = "W".charCodeAt(0);

interface GetPublicKeyParams {
  derivationPath: string;
}

interface SignParams {
  data: Buffer;
  derivationPath: string;
}

interface InternalSignParams extends SignParams {
  ins:
    | NEAR_INS.NEP366_SIGN_DELEGATE_ACTION
    | NEAR_INS.NEP413_SIGN_MESSAGE
    | NEAR_INS.SIGN_TRANSACTION;
}

interface EventMap {
  disconnect: Error;
}

export interface Subscription {
  remove: () => void;
}

// Not using TransportWebHID.isSupported as it's chosen to use a Promise...
export const isLedgerSupported = () => {
  return !!window.navigator?.hid;
};

export class LedgerClient {
  private transport: Transport | null = null;

  isConnected = () => {
    return Boolean(this.transport);
  };

  connect = async () => {
    this.transport = await TransportWebHID.create();

    const handleDisconnect = () => {
      this.transport?.off("disconnect", handleDisconnect);
      this.transport = null;
    };

    this.transport.on("disconnect", handleDisconnect);
  };

  disconnect = async () => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    await this.transport.close();
    this.transport = null;
  };

  setScrambleKey = (key: string) => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    this.transport.setScrambleKey(key);
  };

  on = <Event extends keyof EventMap>(
    event: Event,
    callback: (data: EventMap[Event]) => void
  ): Subscription => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    this.transport.on(event, callback);

    return {
      remove: () => this.transport?.off(event, callback),
    };
  };

  off = (event: keyof EventMap, callback: () => void) => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    this.transport.off(event, callback);
  };

  getVersion = async () => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    const res = await this.transport.send(
      CLA,
      NEAR_INS.GET_VERSION,
      P1_IGNORE,
      P2_IGNORE
    );

    const [major, minor, patch] = Array.from(res);

    return `${major}.${minor}.${patch}`;
  };

  getPublicKey = async ({ derivationPath }: GetPublicKeyParams) => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    const res = await this.transport.send(
      CLA,
      NEAR_INS.GET_PUBLIC_KEY,
      P2_IGNORE,
      networkId,
      parseDerivationPath(derivationPath)
    );

    return nearAPI.utils.serialize.base_encode(res.subarray(0, -2));
  };

  private internalSign = async ({
    data,
    derivationPath,
    ins,
  }: InternalSignParams) => {
    if (!this.transport) {
      throw new Error("Device not connected");
    }

    // NOTE: getVersion call resets state to avoid starting from partially filled buffer
    await this.getVersion();

    const allData = Buffer.concat([parseDerivationPath(derivationPath), data]);

    for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
      const isLastChunk = offset + CHUNK_SIZE >= allData.length;

      const response = await this.transport.send(
        CLA,
        ins,
        isLastChunk ? P1_LAST : P1_MORE,
        P2_IGNORE,
        Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE))
      );

      if (isLastChunk) {
        return Buffer.from(response.subarray(0, -2));
      }
    }

    throw new Error("Invalid data or derivation path");
  };

  sign = async ({ data, derivationPath }: SignParams) => {
    return this.internalSign({
      data,
      derivationPath,
      ins: NEAR_INS.SIGN_TRANSACTION,
    });
  };

  signMessage = async ({ data, derivationPath }: SignParams) => {
    return this.internalSign({
      data,
      derivationPath,
      ins: NEAR_INS.NEP413_SIGN_MESSAGE,
    });
  };

  signDelegateAction = async ({ data, derivationPath }: SignParams) => {
    return this.internalSign({
      data,
      derivationPath,
      ins: NEAR_INS.NEP366_SIGN_DELEGATE_ACTION,
    });
  };
}
