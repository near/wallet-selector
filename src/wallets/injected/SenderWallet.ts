import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";
import modalHelper from "../../modal/ModalHelper";
import SmartContract from "../../contracts/SmartContract";
import { keyStores, KeyPair, Contract, Account, connect } from "near-api-js";
import getConfig from "../../config";

const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

export default class SenderWallet
  extends InjectedWallet
  implements ISenderWallet
{
  private readonly LOCALSTORAGE_SECRET_KEY_ID = "senderwallet-secretkey";
  private contract: Contract;
  private account: Account;

  constructor() {
    super(
      "senderwallet",
      "Sender Wallet",
      "Sender Wallet",
      "https://senderwallet.io/logo.png",
      "wallet"
    );
  }

  async walletSelected() {
    if (!window[this.injectedGlobal]) {
      modalHelper.hideSelectWalletOptionModal();
      modalHelper.openSenderWalletNotInstalledMessage();
      return;
    }
    await this.connect();
    this.signIn();
  }
  async connect() {
    window[this.injectedGlobal].init({ contractId: "gent.testnet" });
    EventHandler.callEventHandler("connect");
  }
  async signIn() {
    const response = await window[this.injectedGlobal].requestSignIn({
      contractId: "gent.testnet",
    });
    if (response.accessKey) {
      localStorage.setItem(
        this.LOCALSTORAGE_SECRET_KEY_ID,
        response.accessKey.secretKey
      );
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
    }
    location.reload();
  }
  async init() {
    await super.init();
    this.connect();
  }
  async getWallet(): Promise<any> {
    return {
      wallet: window[this.injectedGlobal],
      id: this.id,
    };
  }
  async getContract(): Promise<any> {
    return {
      contract: this.contract,
      account: this.account,
    };
  }
  // @ts-ignore
  async setContract(viewMethods: any, changeMethods: any): Promise<boolean> {
    let accountId = "gent.testnet";
    const keyStore = new keyStores.InMemoryKeyStore();
    // @ts-ignore
    let keyPair = KeyPair.fromString(
      localStorage.getItem(this.LOCALSTORAGE_SECRET_KEY_ID)
    );
    await keyStore.setKey("testnet", accountId, keyPair);
    const near = await connect(
      Object.assign({ deps: { keyStore } }, nearConfig)
    );
    this.account = await near.account(accountId);

    this.contract = SmartContract.NearContract(
      this.account,
      "gent.testnet",
      viewMethods,
      changeMethods
    );
  }

  async isConnected(): Promise<boolean> {
    return localStorage.getItem(this.LOCALSTORAGE_SECRET_KEY_ID) !== null;
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }
}
