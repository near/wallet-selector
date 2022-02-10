import Transport from "@ledgerhq/hw-transport";
import { PublicKey } from "near-api-js/lib/utils";
import { base_decode, base_encode } from "near-api-js/lib/utils/serialize";
import { transactions, utils } from "near-api-js";
import { Action } from "near-api-js/lib/transaction";

// Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h

const CLA = 0x80; // CLASS?
const INS_SIGN = 0x02; // Sign Instruction
const INS_GET_PUBLIC_KEY = 0x04; // Get Public Key Instruction
const INS_GET_APP_CONFIGURATION = 0x06; // Get App Version
const P1_LAST = 0x80; // Parameter 1 = End of Bytes to Sign (finalize)
const P1_MORE = 0x00; // Parameter 1 = More bytes coming
const P1_IGNORE = 0x00;
const P2_IGNORE = 0x00;

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

interface SignParams {
  accountId: string;
  publicKey: PublicKey;
  receiverId: string;
  nonce: number;
  actions: Array<Action>;
  blockHash: string;
  derivationPath: string;
}

const createLedgerClient = (transport: Transport) => {
  return {
    transport,
    async getVersion() {
      const response = await this.transport.send(
        CLA,
        INS_GET_APP_CONFIGURATION,
        P1_IGNORE,
        P2_IGNORE
      );

      const [major, minor, patch] = Array.from(response);

      return `${major}.${minor}.${patch}`;
    },
    async getPublicKey(derivationPath: string) {
      const response = await this.transport.send(
        CLA,
        INS_GET_PUBLIC_KEY,
        P2_IGNORE,
        networkId,
        bip32PathToBytes(derivationPath)
      );

      return PublicKey.from(base_encode(response.subarray(0, -2)));
    },
    async sign({
      accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash,
      derivationPath,
    }: SignParams) {
      const transaction = transactions.createTransaction(
        accountId,
        publicKey,
        receiverId,
        nonce + 1,
        actions,
        base_decode(blockHash)
      );

      console.log("transaction:", transaction);

      const serializedTx = utils.serialize.serialize(
        transactions.SCHEMA,
        transaction
      );

      // NOTE: getVersion call resets state to avoid starting from partially filled buffer
      const version = await this.getVersion();
      console.info("Ledger app version:", version);
      // TODO: Assert compatible versions

      const dataBuffer = Buffer.from(serializedTx);
      // 128 - 5 service bytes
      const CHUNK_SIZE = 123;
      const allData = Buffer.concat([
        bip32PathToBytes(derivationPath),
        dataBuffer,
      ]);

      for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
        const chunk = Buffer.from(
          allData.subarray(offset, offset + CHUNK_SIZE)
        );
        const isLastChunk = offset + CHUNK_SIZE >= allData.length;
        const response = await this.transport.send(
          CLA,
          INS_SIGN,
          isLastChunk ? P1_LAST : P1_MORE,
          P2_IGNORE,
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
