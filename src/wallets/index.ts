import IWallet from "../interfaces/IWallet";
import CustomWallet from "./CustomWallet";
import LedgerWallet from "./default/LedgerWallet";
import NarWallet from "./default/NarWallet";
import NearWallet from "./default/NearWallet";
import SenderWallet from "./default/SenderWallet";
import NewCustomWalletOptions from "../types/CustomWalletOptions";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";

class Wallets {
  private wallets: {
    [name: string]: IWallet;
  } = {};

  constructor(
    wallets: string[],
    customWallets: { [name: string]: NewCustomWalletOptions }
  ) {
    this.generateWallets(wallets, customWallets);

    const signedInWalletId = this.getSignedInWalletId();

    if (signedInWalletId !== null) {
      this.wallets[signedInWalletId].init();
    }
  }

  private generateWallets(
    wallets: string[],
    customWallets: { [name: string]: NewCustomWalletOptions }
  ) {
    wallets.forEach((wallet) => {
      switch (wallet) {
        case "nearwallet":
          this.wallets.nearwallet = new NearWallet();
          break;
        case "senderwallet":
          this.wallets.senderwallet = new SenderWallet();
          break;
        case "ledgerwallet":
          this.wallets.ledgerwallet = new LedgerWallet();
          break;
        case "narwallet":
          this.wallets.narwallet = new NarWallet();
          break;
        default:
          break;
      }
    });

    for (const name in customWallets) {
      this.wallets[name] = new CustomWallet(
        name,
        customWallets[name].name,
        customWallets[name].description,
        customWallets[name].icon,
        customWallets[name].onConnectFunction,
        customWallets[name].onDisconnectFunction,
        customWallets[name].isConnectedFunction
      );
    }
  }

  private getSignedInWalletId() {
    return localStorage.getItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);
  }

  public getWallet(name: string): IWallet {
    return this.wallets[name];
  }

  public isSignedIn() {
    // for (const wallet in this.wallets) {
    //   if (this.wallets[wallet].isConnected()) return true;
    // }
    // return false;
    return this.getSignedInWalletId() !== null;
  }

  public signOut() {
    // for (const wallet in this.wallets) {
    //   if (this.wallets[wallet].isConnected()) {
    //     this.wallets[wallet].disconnect();
    //     break;
    //   }
    // }
    const signedInWalletId = this.getSignedInWalletId();
    if (signedInWalletId !== null) {
      this.wallets[signedInWalletId].disconnect();
    }
    localStorage.removeItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY);
  }
}

export default Wallets;
