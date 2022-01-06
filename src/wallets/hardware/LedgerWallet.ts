import HardwareWallet from "../types/HardwareWallet";
import LedgerTransportWebHid from "@ledgerhq/hw-transport-webhid";
import { listen } from "@ledgerhq/logs";
import bs58 from "bs58";
import modalHelper from "../../modal/ModalHelper";
import ILedgerWallet from "../../interfaces/ILedgerWallet";
import EventHandler from "../../utils/EventHandler";
import SmartContract from "../../contracts/SmartContract";

export default class LedgerWallet extends HardwareWallet implements ILedgerWallet {
  private readonly CLA = 0x80;
  private readonly GET_ADDRESS_INS = 0x04;
  private readonly SIGN_INS = 0x02;

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

    listen((log) => {
      if (this.debugMode) {
        console.log(log);
      }
    });
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

  async sign(transactionData: any) {
    if (!this.transport) return;
    const txData = Buffer.from(transactionData);
    // 128 - 5 service bytes
    const CHUNK_SIZE = 123;
    const allData = Buffer.concat([this.bip32PathToBytes(this.derivationPath), txData]);

    for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
      const chunk = Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE));
      const isLastChunk = offset + CHUNK_SIZE >= allData.length;
      const response = await this.transport.send(this.CLA, this.SIGN_INS, isLastChunk ? 0x80 : 0, 0x0, chunk);
      if (isLastChunk) {
        return Buffer.from(response.subarray(0, -2));
      }
    }

    return Buffer.from([]);
  }

  async connect() {
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

    this.setWalletAsSignedIn();
    const pk = await this.generatePublicKey();
    this.publicKey = pk;
    const res = await SmartContract.LedgerContract("amirsaran.testnet", "gent.testnet", "getMessages", []);
    console.log(res);
    EventHandler.callEventHandler("connect");
  }

  async init() {}

  async disconnect() {
    console.log("disconnect");
  }

  async isConnected(): Promise<boolean> {
    return false;
  }

  async getWallet(): Promise<any>{
    return {
       wallet: true,
       id: this.id
    }
  }

  async getContract(): Promise<any> {
      return true   
  }
  // @ts-ignore
  async setContract(viewMethods: any, changeMethods: any): Promise<boolean> {
      return true
  }

  async signIn() {
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

  encodePublicKey(publicKey: Uint8Array) {
    return bs58.encode(Buffer.from(publicKey));
  }
}
