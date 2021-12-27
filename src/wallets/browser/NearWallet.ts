import BrowserWallet from "../types/BrowserWallet";
import { keyStores, connect, WalletConnection } from "near-api-js";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;

  constructor() {
    super("nearwallet", "Near Wallet", "Near Wallet", "https://cryptologos.cc/logos/near-protocol-near-logo.png");
  }

  async walletSelected() {
    await this.connect();
    this.signIn();
  }

  async connect() {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const config = {
      networkId: "testnet",
      keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      headers: {},
    };

    const near = await connect(config);

    this.wallet = new WalletConnection(near, "NEAR APP");

    EventHandler.callEventHandler("connect");
  }

  async init() {
    this.connect();
  }

  async signIn() {
    this.wallet
      .requestSignIn(
        "amirsaran.testnet" // contract requesting access
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
}
