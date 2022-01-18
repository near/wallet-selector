import BrowserWallet from "../types/BrowserWallet";
import { keyStores, connect, WalletConnection, Contract } from "near-api-js";
import getConfig from "../../config";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";
import { getState } from "../../state/State";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;
  private contract: Contract;

  constructor() {
    super(
      "nearwallet",
      "Near Wallet",
      "Near Wallet",
      "https://cryptologos.cc/logos/near-protocol-near-logo.png"
    );

    this.init();
  }

  async walletSelected() {
    this.signIn();
  }

  async init() {
    const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const near = await connect({ keyStore, ...nearConfig, headers: {} });
    this.wallet = new WalletConnection(near, "near_app");

    EventHandler.callEventHandler("init");
  }

  async signIn() {
    this.wallet
      .requestSignIn(
        "gent.testnet" // contract requesting access
      )
      .then(() => {
        this.setWalletAsSignedIn();
        EventHandler.callEventHandler("signIn");
      });
  }
  async disconnect() {
    if (!this.wallet) return;
    this.wallet.signOut();
    EventHandler.callEventHandler("disconnect");
  }

  async isConnected(): Promise<boolean> {
    if (!this.wallet) return false;
    return this.wallet.isSignedIn();
  }

  async callContract(
    method: string,
    args?: any,
    gas?: string,
    deposit?: string
  ): Promise<any> {
    const state = getState();
    if (!this.contract) {
      this.contract = new Contract(
        this.wallet.account(),
        state.options.contract.address,
        {
          viewMethods: state.options.contract.viewMethods,
          changeMethods: state.options.contract.changeMethods,
        }
      );
    }
    console.log(this.contract, method, args, gas, deposit);
    return this.contract[method](args);
  }
}
