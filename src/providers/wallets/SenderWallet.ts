import BaseWallet from "./BaseWallet";

export default class SenderWallet extends BaseWallet {
  constructor() {
    super("Sender Wallet", "Sender Wallet", "https://senderwallet.io/logo.png");
  }

  async connect() {
    const senderWallet = (window as any).wallet;

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
          }
        });
    });
  }

  isLoggedIn() {
    return window["wallet"].isSignedIn();
  }

  logout() {
    const senderWallet = (window as any).wallet;

    localStorage.removeItem("token");
    return senderWallet.signOut();
  }
}
