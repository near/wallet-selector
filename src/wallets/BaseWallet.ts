import IWallet, { CallParams, ViewParams } from "../interfaces/IWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import { updateState } from "../state/State";
import { Emitter } from "../utils/EventsHandler";

export default abstract class BaseWallet implements IWallet {
  protected id = "wallet";
  protected name = "Wallet";
  protected description = "A near wallet";
  protected icon = "https://cryptologos.cc/logos/near-protocol-near-logo.png";
  protected emitter: Emitter

  protected showWallet = true;

  constructor(emitter: Emitter, id: string, name: string, description: string, icon: string) {
    this.emitter = emitter
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
    updateState((prevState) => ({
      ...prevState,
      isSignedIn: true,
      signedInWalletId: this.id,
    }));
  }

  abstract walletSelected(): Promise<void>;
  abstract init(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract isConnected(): Promise<boolean>;
  abstract signIn(): Promise<void>;
  abstract getAccount(): Promise<any>;
  abstract view(params: ViewParams): Promise<any>;
  abstract call(params: CallParams): Promise<any>;
}
