import BaseWallet from "./BaseWallet";

export default class SenderWallet extends BaseWallet {
  constructor() {
    super(
      "Sender Wallet",
      "Sender Wallet",
      "https://lh3.googleusercontent.com/G1LUgHqvRoGNt9xCk5rPqD8zStAWX42xpSO4vOHiUveoivhGvqmBpzTmoe6k7UpkmtvmLi2VjzEdL1X_TYvS3e5y2vs=w128-h128-e365-rj-sc0x00ffffff"
    );
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
            console.log("response: ", response);
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
