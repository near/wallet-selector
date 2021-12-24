import BaseWallet from "../BaseWallet";
import { keyStores, connect, WalletConnection } from "near-api-js";

export default class NearWallet extends BaseWallet {
  private wallet: WalletConnection;

  constructor() {
    super(
      "nearwallet",
      "Near Wallet",
      "Near Wallet",
      "https://cryptologos.cc/logos/near-protocol-near-logo.png"
    );
  }

  walletSelected(): void {
    this.connect().then(() => {
      this.signIn();
    });
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

    if (this.callbackFunctions["connect"])
      this.callbackFunctions["connect"](this);
  }

  init() {
    this.connect();
  }

  signIn() {
    this.wallet
      .requestSignIn(
        "amirsaran.testnet" // contract requesting access
      )
      .then(() => {
        this.setWalletAsSignedIn();
      });
  }

  disconnect(): void {
    if (!this.wallet) return;
    this.wallet.signOut();
  }

  isConnected(): boolean {
    console.log(this.wallet);
    if (!this.wallet) return false;
    return this.wallet.isSignedIn();
  }
}
