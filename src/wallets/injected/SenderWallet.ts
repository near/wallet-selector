import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";
import { Contract } from "near-api-js";

export default class SenderWallet extends InjectedWallet implements ISenderWallet {
  private contract: any;

  constructor() {
    super("senderwallet", "Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png", "wallet");
  }

  async walletSelected() {
    await this.connect();
    await this.signIn();
  }

  async connect() {
    window[this.injectedGlobal].onAccountChanged((newAccountId: string) => {
      console.log("newAccountId: ", newAccountId);

      location.reload();
    });
    window[this.injectedGlobal].init({ contractId: "gent.testnet" }).then((res: any) => {
      console.log(res);
    });
    EventHandler.callEventHandler("connect");
  }

  async signIn() {
    const response = await window[this.injectedGlobal].requestSignIn({
      contractId: "",
    });
    console.log(response);
    if (response.accessKey) {
      // localStorage.setItem(this.LOCALSTORAGE_SECRET_KEY_ID, response.accessKey.secretKey);
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
    }
  }
  async init() {
    await super.init();
    this.connect();
  }

  async getWallet(): Promise<any> {
    return true;
  }
  async getContract(): Promise<any> {
    return true;
  }
  // @ts-ignore
  async setContract(viewMethods: any, changeMethods: any): Promise<boolean> {
    return true;
  }

  async isConnected(): Promise<boolean> {
    return window[this.injectedGlobal].isSignedIn();
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }

  async createContract(contractAddress: string, viewMethods: string[], changeMethods: string[]): Promise<void> {
    console.log(window[this.injectedGlobal]);
    this.contract = new Contract(window[this.injectedGlobal].getAccountId(), contractAddress, {
      viewMethods,
      changeMethods,
    });
    console.log(this.contract);
  }

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    console.log(this.contract, method, args, gas, deposit);
    return this.contract[method](args);
  }
}
