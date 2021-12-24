import BaseWallet from "../BaseWallet";

export default class SenderWallet extends BaseWallet {
  constructor() {
    super(
      "senderwallet",
      "Sender Wallet",
      "Sender Wallet",
      "https://senderwallet.io/logo.png"
    );
  }

  walletSelected(): void {
    this.connect();
  }

  async connect() {
    const senderWallet = window["wallet"];

    senderWallet.onAccountChanged((newAccountId: string) => {
      console.log("newAccountId: ", newAccountId);
      location.reload();
    });

    senderWallet.init({ contractId: "" }).then(() => {
      senderWallet
        .requestSignIn({
          contractId: "",
        })
        .then((response: any) => {
          if (response.accessKey) {
            localStorage.setItem("token", response.accessKey.secretKey);
            this.setWalletAsSignedIn();
            if (this.callbackFunctions["connect"])
              this.callbackFunctions["connect"](this);
          }
        });
    });
  }

  init() {
    this.connect();
  }

  isConnected(): boolean {
    return localStorage.getItem("token") !== null;
  }

  disconnect() {
    const senderWallet = window["wallet"];

    localStorage.removeItem("token");
    return senderWallet.signOut();
  }
}
