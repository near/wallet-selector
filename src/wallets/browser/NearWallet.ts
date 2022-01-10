import BrowserWallet from "../types/BrowserWallet";
import { keyStores, connect, WalletConnection, Contract } from "near-api-js";
import getConfig from "../../config";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";
import State from "../../state/State";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;
  private contract: Contract;

  constructor() {
    super("nearwallet", "Near Wallet", "Near Wallet", "https://cryptologos.cc/logos/near-protocol-near-logo.png");

    this.connect();
  }

  async walletSelected() {
    this.signIn();
  }

  async connect() {
    // get network configuration values from config.js
    // based on the network ID we pass to getConfig()
    const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

    // create a keyStore for signing transactions using the user's key
    // which is located in the browser local storage after user logs in
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    // Initializing connection to the NEAR testnet
    const near = await connect({ keyStore, ...nearConfig, headers: {} });
    this.wallet = new WalletConnection(near, "near_app");

    EventHandler.callEventHandler("connect");
  }

  async init() {
    this.connect();
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

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    if (!this.contract) {
      this.contract = new Contract(this.wallet.account(), State.options.contract.address, {
        viewMethods: State.options.contract.viewMethods,
        changeMethods: State.options.contract.changeMethods,
      });
    }
    console.log(this.contract, method, args, gas, deposit);
    return this.contract[method](args);
  }
}
