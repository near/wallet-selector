import BrowserWallet from "../types/BrowserWallet";
import { keyStores, connect, WalletConnection, Contract } from "near-api-js";
import SmartContract from "../../contracts/SmartContract";
import getConfig from "../../config";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;
  private contract: Contract
  
  constructor() {
    super("nearwallet", "Near Wallet", "Near Wallet", "https://cryptologos.cc/logos/near-protocol-near-logo.png");
  }

  async walletSelected() {
    await this.connect();
    this.signIn();
  }

  async connect() {

  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await connect({ keyStore, ...nearConfig });
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
  async getWallet(): Promise<any> {
      return {
        wallet: this.wallet,
        id: this.id
      }
  }
  async getContract(): Promise<any> {
      return {
        contract: this.contract,
        account: this.wallet.account()
      }      
  }
  async setContract(viewMethods: any, changeMethods: any): Promise<boolean> {

    this.contract = SmartContract.NearContract(
      this.wallet.account(),
      'gent.testnet',
      viewMethods,
      changeMethods
    );


    return true
  }
  async connected() {
    if(!this.wallet) return;
    EventHandler.callEventHandler("connected");
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
}
