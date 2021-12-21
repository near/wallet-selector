import IWallet from "../interfaces/IWallet";
import CustomWallet from "./CustomWallet";
import LedgerWallet from "./LedgerWallet";
import NarWallet from "./NarWallet";
import NearWallet from "./NearWallet";
import SenderWallet from "./SenderWallet";
import Options from "../types/Options";

class Wallets {
  private wallets = {
    nearwallet: new NearWallet(),
    senderwallet: new SenderWallet(),
    ledgerwallet: new LedgerWallet(),
    narwallet: new NarWallet(),
  };

  public addCustomWallet(name: string, options: Options) {
    const customWallet = new CustomWallet(
      options.name,
      options.description,
      options.icon,
      options.onConnectFunction,
      options.onDisconnectFunction,
      options.isConnectedFunction
    );
    this.wallets[name] = customWallet;
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

const wallets = new Wallets();

export { wallets };
