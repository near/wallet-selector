import BaseWallet from "../BaseWallet";

export default class NarWallet extends BaseWallet {
  constructor() {
    super(
      "narwallet",
      "Nar Wallet",
      "Nar Wallet",
      "https://narwallets.com/assets/img/logo.png"
    );
  }

  walletSelected(): void {
    this.connect();
  }

  connect() {
    alert("Nar Wallet is not supported yet.");
    this.setWalletAsSignedIn();
  }

  init() {
    this.connect();
  }

  disconnect(): void {
    console.log("disconnect");
  }
  isConnected(): boolean {
    return false;
  }
}
