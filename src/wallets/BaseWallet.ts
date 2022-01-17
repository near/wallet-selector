import IWallet from "../interfaces/IWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import State from "../state/State";

export default abstract class BaseWallet implements IWallet {
  protected id = "wallet";
  protected name = "Wallet";
  protected description = "A near wallet";
  protected icon = "https://cryptologos.cc/logos/near-protocol-near-logo.png";

  protected showWallet = true;

  constructor(id: string, name: string, description: string, icon: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }

  getId(): string {
    return this.id;
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

  getShowWallet(): boolean {
    return this.showWallet;
  }

  setShowWallet(showWallet: boolean) {
    this.showWallet = showWallet;
  }

  async setWalletAsSignedIn() {
    localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, this.id);
    State.isSignedIn = true;
    State.signedInWalletId = this.id;
  }

  abstract walletSelected(): Promise<void>;
  abstract init(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract isConnected(): Promise<boolean>;
  abstract signIn(): Promise<void>;
  abstract getAccount(): Promise<any>;
  abstract callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any>;
}
