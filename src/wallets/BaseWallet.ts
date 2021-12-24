import IWallet from "../interfaces/IWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";

export default abstract class BaseWallet implements IWallet {
  protected id = "wallet";
  protected name = "Wallet";
  protected description = "A near wallet";
  protected icon = "https://cryptologos.cc/logos/near-protocol-near-logo.png";

  protected callbackFunctions: {
    [event: string]: (self: IWallet) => void;
  } = {};

  constructor(id: string, name: string, description: string, icon: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getIcon(): string {
    return this.icon;
  }

  setWalletAsSignedIn() {
    localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, this.id);
  }

  abstract walletSelected(): void;
  abstract init(): void;
  abstract connect(): void;
  abstract disconnect(): void;
  abstract isConnected(): boolean;

  on(event: string, callback: (self: IWallet) => void) {
    this.callbackFunctions[event] = callback;
  }
}
