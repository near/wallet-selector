import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";

export default class SenderWallet extends InjectedWallet implements ISenderWallet {
  constructor() {
    super("senderwallet", "Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png", "wallet");
  }

  walletSelected(): void {
    this.connect();
  }

  async connect() {
    const senderWallet = window["wallet"];

    senderWallet.init({ contractId: "" }).then(() => {
      senderWallet
        .requestSignIn({
          contractId: "",
        })
        .then((response: any) => {
          if (response.accessKey) {
            localStorage.setItem("token", response.accessKey.secretKey);
            this.setWalletAsSignedIn();
            if (this.callbackFunctions["connect"]) this.callbackFunctions["connect"](this);
          }
        });
    });
  }

  async init() {
    const res = await super.init();
    if (res) this.connect();
  }

  isConnected(): boolean {
    return localStorage.getItem("token") !== null;
  }

  disconnect() {
    const senderWallet = window["wallet"];

    return senderWallet.signOut();
  }
}
