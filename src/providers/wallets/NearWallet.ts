import BaseWallet from "./BaseWallet";

export default class NearWallet extends BaseWallet {
  constructor() {
    super(
      "Near Wallet",
      "Near Wallet",
      "https://cryptologos.cc/logos/near-protocol-near-logo.png"
    );
  }

  connect() {
    alert("Near Wallet is not supported yet.");
  }
}
