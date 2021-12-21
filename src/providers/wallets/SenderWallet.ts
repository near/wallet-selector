import BaseWallet from "./BaseWallet";

export default class SenderWallet extends BaseWallet {
  constructor() {
    super("Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png");
  }

  connect() {
    alert("Sender Wallet is not supported yet.");
  }

  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  isConnected(): boolean {
    throw new Error("Method not implemented.");
  }
}
