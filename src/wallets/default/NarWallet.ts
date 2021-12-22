import BaseWallet from "../BaseWallet";

export default class NarWallet extends BaseWallet {
  constructor() {
    super(
      "Nar Wallet",
      "Nar Wallet",
      "https://narwallets.com/assets/img/logo.png"
    );
  }

  connect() {
    alert("Nar Wallet is not supported yet.");
  }

  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  isConnected(): boolean {
    return false;
  }
}
