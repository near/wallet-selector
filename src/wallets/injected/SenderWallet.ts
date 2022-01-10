import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";
import { keyStores, connect } from "near-api-js";
import State from "../../state/State";
import getConfig from "../../config";

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
    window[this.injectedGlobal].init({ contractId: State.options.contract.address }).then((res: any) => {
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
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
    }
  }
  async init() {
    await super.init();
    this.connect();
  }

  async isConnected(): Promise<boolean> {
    return window[this.injectedGlobal].isSignedIn();
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    if (!this.contract) {
      const nearConfig = getConfig(process.env.NODE_ENV || "testnet");
      const keyStore = new keyStores.BrowserLocalStorageKeyStore();
      const near = await connect(Object.assign({ deps: { keyStore }, headers: {} }, nearConfig));

      this.contract = await near.loadContract(State.options.contract.address, {
        viewMethods: State.options.contract.viewMethods,
        changeMethods: State.options.contract.changeMethods,
        sender: window[this.injectedGlobal].getAccountId(),
      });
    }
    console.log(this.contract, method, args, gas, deposit);
    return this.contract[method](args);
  }
}
