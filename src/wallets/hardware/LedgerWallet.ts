import HardwareWallet from "../types/HardwareWallet";
import LedgerTransportWebHid from "@ledgerhq/hw-transport-webhid";
import { listen } from "@ledgerhq/logs";
import bs58 from "bs58";
import modalHelper from "../../modal/ModalHelper";
import ILedgerWallet from "../../interfaces/ILedgerWallet";
import EventHandler from "../../utils/EventHandler";
import State from "../../state/State";
import { providers, transactions, utils } from "near-api-js";
import BN from "bn.js";

export default class LedgerWallet extends HardwareWallet implements ILedgerWallet {
  private readonly CLA = 0x80;
  private readonly GET_ADDRESS_INS = 0x04;
  private readonly SIGN_INS = 0x02;

  private readonly LEDGER_LOCALSTORAGE_PUBLIC_KEY = "ledgerPublicKey";
  private readonly LEDGER_LOCALSTORAGE_DERIVATION_PATH = "ledgerDerivationPath";

  private debugMode = false;
  private derivationPath = "44'/397'/0'/0'/0'";
  private publicKey: Uint8Array;

  constructor() {
    super(
      "ledgerwallet",
      "Ledger Wallet",
      "Ledger Wallet",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8zN0aZm6Jwc305PUtiZXGvsbbi4uSmp67n5+m+v8Q1OUdFSVb6+vr19fY+QlDt7e56fYbT1NdTVmPHyMyGiJFqbXdbXmlWWWWgoah7foeSlJx1eIJLT1yztbrw8fKmGsZBAAACeklEQVR4nO3d2XKCMBhAYSIUAUEQt9b1/d+yetPaGshMlp+0nnMN0k8lUGZMkoSIiIiIiIiIiIiIXr6mK+cP6Ta5zp0ruyYkostXa/WjTLfZTPnonBbat8m9ard4OlpAyL19vvTPWOuOFBiiVF34/Y6VO/1xgkOUeu89Oqp24CgCELX48Ob4GDyIBESpg6ev13H4EDIQlXqRDH8eYhB18uCoxg4gBVEzZ0c5dJ7LQtTGFTIw7opDzo6XxtEvliREHd0g2uv5JJCsc3EYPhBJiNv5Pn6GyEJqh4tJ93y/Ox3EZeDKTa8tCtnaQ1ZRQdb2EMOYJQxR1peSxvjSshDr/0yukUEqW0gZGeRiC5lHBsmBAAECBAgQIEBukMxU+zcglgEBAgQIECBAgAABAgQIECBAAkOuM2N/A/J/HgcBAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIC8GKRLTWl/MH8x7maZ80/BiYiIiIiIiCiuyjdTO91uuXE37exlW+Nu1hO8BHsclOp2ewv3OAgIECBAgAAB8p8gweags4RYz0HXRQaxvmkMNk+jJcR+Bvk6Loj9jL9pVJDa2pEUUUFW9hDj+CsKsR60bu0jgrQu85SbZi6WhDjMW3wbgA3jliBk4bY+jOF0F4QcnBxJ8x4JpC3dIEk/OlG5HMT9R/ljq3bIQXys2zE2VbkUZO9j9aRm5EZFCLJ2WlfhW3KaGLL347j/aUNnvAjk5HFVrs15MkjrdxKR5TGbBLI4uF4/nuqOmtuVwJBsG2Tdumaz/b3YQkhIvbr4X7Luq2Vf5cVDum36wpT2KUL1sEFe9d5GKiIiIiIiIiIiIqKX6xNYBUsKTAn7+wAAAABJRU5ErkJggg=="
    );

    const ledgerLocalStoragePublicKey = window.localStorage.getItem(this.LEDGER_LOCALSTORAGE_PUBLIC_KEY);

    if (ledgerLocalStoragePublicKey !== null) {
      this.publicKey = this.arrayToBuffer(bs58.decode(ledgerLocalStoragePublicKey).toJSON().data);
    }

    const ledgerLocalStorageDerivationPath = window.localStorage.getItem(this.LEDGER_LOCALSTORAGE_DERIVATION_PATH);

    if (ledgerLocalStorageDerivationPath !== null) {
      this.derivationPath = ledgerLocalStorageDerivationPath;
    }

    listen((log) => {
      if (this.debugMode) {
        console.log(log);
      }
    });
  }

  arrayToBuffer(arr: number[]): Uint8Array {
    const ret = new Uint8Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      ret[i] = arr[i];
    }
    return ret;
  }

  getPublicKey() {
    return this.publicKey;
  }

  setDerivationPath(path: string) {
    this.derivationPath = path;
  }

  setDebugMode(debugMode: boolean) {
    this.debugMode = debugMode;
  }

  bip32PathToBytes(path: string) {
    const parts = path.split("/");
    return Buffer.concat(
      parts
        .map((part) =>
          part.endsWith(`'`) ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000 : Math.abs(parseInt(part))
        )
        .map((i32) => Buffer.from([(i32 >> 24) & 0xff, (i32 >> 16) & 0xff, (i32 >> 8) & 0xff, i32 & 0xff]))
    );
  }

  async walletSelected() {
    modalHelper.openLedgerDerivationPathModal();
    modalHelper.hideSelectWalletOptionModal();
  }

  private async sign(transactionData: Uint8Array) {
    if (!this.transport) return;
    const txData = Buffer.from(transactionData);
    // 128 - 5 service bytes
    const CHUNK_SIZE = 123;
    const allData = Buffer.concat([this.bip32PathToBytes(this.derivationPath), txData]);

    for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
      const chunk = Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE));
      const isLastChunk = offset + CHUNK_SIZE >= allData.length;
      const response = await this.transport.send(this.CLA, this.SIGN_INS, isLastChunk ? 0x80 : 0x0, 0x0, chunk);
      if (isLastChunk) {
        return Buffer.from(response.subarray(0, -2));
      }
    }

    return Buffer.from([]);
  }

  async init() {
    if (this.transport) return;

    this.transport = await LedgerTransportWebHid.create().catch((err) => {
      console.log(err);
    });

    if (!this.transport) {
      throw new Error("Could not connect to Ledger device");
    }

    this.transport.setScrambleKey("NEAR");

    this.transport.on("disconnect", (res: any) => {
      console.log(res);
      EventHandler.callEventHandler("disconnect");
    });

    EventHandler.callEventHandler("init");
  }

  async disconnect() {
    EventHandler.callEventHandler("disconnect");
  }

  async isConnected(): Promise<boolean> {
    return false;
  }

  async signIn() {
    await this.init();
    if (!this.publicKey) {
      const pk = await this.generatePublicKey();
      this.publicKey = pk;
      window.localStorage.setItem(this.LEDGER_LOCALSTORAGE_PUBLIC_KEY, this.encodePublicKey(pk));
    }
    window.localStorage.setItem(this.LEDGER_LOCALSTORAGE_DERIVATION_PATH, this.derivationPath);
    this.setWalletAsSignedIn();
    modalHelper.hideModal();
    EventHandler.callEventHandler("signIn");
  }

  async generatePublicKey() {
    if (!this.transport) return;

    const response = await this.transport.send(
      this.CLA,
      this.GET_ADDRESS_INS,
      0x0,
      0x0,
      this.bip32PathToBytes(this.derivationPath)
    );

    return response.subarray(0, -2);
  }

  async getAccount() {
    return {
      accountId: "amirsaran.testnet",
      balance: "99967523358427624000000000",
    };
  }

  encodePublicKey(publicKey: Uint8Array) {
    return bs58.encode(Buffer.from(publicKey));
  }

  private async createFullAccessKey(accountId: string, publicKey: string) {
    if (!State.nearConnection) return;
    const account = await State.nearConnection.account(accountId);
    const res = await account.addKey(publicKey);
    return res;
  }

  async callContract(method: string, args?: any, gas: string = "10000000000000", deposit: string = "0") {
    if (!State.signedInWalletId) return;

    if (State.options.contract.viewMethods.includes(method)) {
      return await State.walletProviders.nearwallet.callContract(method, args);
    }

    if (!args) args = [];

    const publicKey = this.getPublicKey();

    const bnGas = new BN(gas.toString());
    const bnDeposit = new BN(deposit.toString());

    const publicKeyString = "ed25519:" + this.encodePublicKey(publicKey);

    const provider = new providers.JsonRpcProvider(`https://rpc.${State.options.networkId}.near.org`);

    // Tries to create a full access key for the account, if it fails, it means the account already has a full access key
    await this.createFullAccessKey("amirsaran.testnet", publicKeyString).catch((err) => {
      console.log(err);
    });

    const response: any = await provider
      .query({
        request_type: "view_access_key",
        finality: "optimistic",
        account_id: "amirsaran.testnet",
        public_key: publicKeyString,
      })
      .catch((err) => {
        console.log(err);
      });

    if (!response) return;

    const blockHash = response.block_hash;
    const recentBlockHash = utils.serialize.base_decode(blockHash);
    const nonce = response.nonce + 1;

    const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();

    const pk = keyPair.getPublicKey();
    pk.data = publicKey;
    console.log(pk);

    const actions = [transactions.functionCall(method, args, bnGas, bnDeposit)];

    const transaction = transactions.createTransaction(
      "amirsaran.testnet",
      pk,
      State.options.contract.address,
      nonce,
      actions,
      recentBlockHash
    );

    const serializedTx = utils.serialize.serialize(transactions.SCHEMA, transaction);
    console.log(serializedTx, transaction);

    const signature = await this.sign(serializedTx);

    const signedTransaction = new transactions.SignedTransaction({
      transaction,
      signature: new transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature,
      }),
    });

    const signedSerializedTx = signedTransaction.encode();

    const base64Response: any = await provider.sendJsonRpc("broadcast_tx_commit", [
      Buffer.from(signedSerializedTx).toString("base64"),
    ]);

    console.log(base64Response);

    if (base64Response.status.SuccessValue === "") {
      return true;
    }

    const res = JSON.parse(Buffer.from(base64Response.status.SuccessValue, "base64").toString());

    return res;
  }
}
