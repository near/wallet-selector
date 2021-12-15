import IWallet from "../interfaces/IWallet";
import CustomWallet from "./CustomWallet";
import LedgerWallet from "./LedgerWallet";
import NarWallet from "./NarWallet";
import NearWallet from "./NearWallet";
import SenderWallet from "./SenderWallet";

class Wallets {
  private wallets = {
    nearwallet: new NearWallet(),
    senderwallet: new SenderWallet(),
    ledgerwallet: new LedgerWallet(),
    narwallet: new NarWallet(),
  };

  public addCustomWallet(name: string, options: any) {
    const customWallet = new CustomWallet(
      options.name,
      options.description,
      options.icon,
      options.onConnectFunction
    );
    this.wallets[name] = customWallet;
  }

  public getWallet(name: string): IWallet {
    return this.wallets[name];
  }
}

const wallets = new Wallets();

export { wallets };
