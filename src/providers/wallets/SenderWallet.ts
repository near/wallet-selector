import BaseWallet from "./BaseWallet";

export default class SenderWallet extends BaseWallet {
  constructor() {
    super(
      "Sender Wallet",
      "Sender Wallet",
      "https://lh3.googleusercontent.com/G1LUgHqvRoGNt9xCk5rPqD8zStAWX42xpSO4vOHiUveoivhGvqmBpzTmoe6k7UpkmtvmLi2VjzEdL1X_TYvS3e5y2vs=w128-h128-e365-rj-sc0x00ffffff"
    );
  }

  connect() {
    alert("Sender Wallet is not supported yet.");
  }
}
