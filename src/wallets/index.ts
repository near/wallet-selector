import IWallet from "../interfaces/IWallet";
import CustomWallet from "./CustomWallet";
import LedgerWallet from "./default/LedgerWallet";
import NarWallet from "./default/NarWallet";
import NearWallet from "./default/NearWallet";
import SenderWallet from "./default/SenderWallet";
import NewCustomWalletOptions from "../types/CustomWalletOptions";

class Wallets {
  private wallets: {
    [name: string]: IWallet;
  } = {};

  constructor(
    wallets: string[],
    customWallets: { [name: string]: NewCustomWalletOptions }
  ) {
    this.generateWallets(wallets, customWallets);
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
        customWallets[name].name,
        customWallets[name].description,
        customWallets[name].icon,
        customWallets[name].onConnectFunction,
        customWallets[name].onDisconnectFunction,
        customWallets[name].isConnectedFunction
      );
    }
  }

  public getWallet(name: string): IWallet {
    return this.wallets[name];
  }

  public isSignedIn() {
    for (const wallet in this.wallets) {
      if (this.wallets[wallet].isConnected()) return true;
    }
    return false;
  }

  public signOut() {
    for (const wallet in this.wallets) {
      if (this.wallets[wallet].isConnected()) {
        this.wallets[wallet].disconnect();
        break;
      }
    }
  }
}

export default Wallets;
