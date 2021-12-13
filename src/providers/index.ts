import IWallet from "./interfaces/IWallet";
import CustomWallet from "./wallets/CustomWallet";
import LedgerWallet from "./wallets/LedgerWallet";
import NarWallet from "./wallets/NarWallet";
import NearWallet from "./wallets/NearWallet";
import SenderWallet from "./wallets/SenderWallet";

class Providers {
  private wallets = {
    nearwallet: new NearWallet(),
    senderwallet: new SenderWallet(),
    ledgerwallet: new LedgerWallet(),
    narwallet: new NarWallet(),
  };

  public addCustomProvider(name: string, options: any) {
    const customWallet = new CustomWallet(
      options.name,
      options.description,
      options.icon,
      options.onConnectFunction
    );
    this.wallets[name] = customWallet;
  }

  public getProvider(name: string): IWallet {
    return this.wallets[name];
  }
}

export default new Providers();
