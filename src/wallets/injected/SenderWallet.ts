import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";

export default class SenderWallet extends InjectedWallet implements ISenderWallet {
  private readonly LOCALSTORAGE_SECRET_KEY_ID = "senderwallet-secretkey";

  constructor() {
    super("senderwallet", "Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png", "wallet");
  }

  async walletSelected() {
    await this.connect();
    this.signIn();
  }

  async connect() {
    // window[this.injectedGlobal].init({ contractId: "" });
    EventHandler.callEventHandler("connect");
  }

  async signIn() {
    const response = await window[this.injectedGlobal].requestSignIn({
      contractId: "",
    });
    if (response.accessKey) {
      localStorage.setItem(this.LOCALSTORAGE_SECRET_KEY_ID, response.accessKey.secretKey);
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
    }
  }

  async init() {
    await super.init();
    this.connect();
  }

  async isConnected(): Promise<boolean> {
    return localStorage.getItem(this.LOCALSTORAGE_SECRET_KEY_ID) !== null;
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }
}
