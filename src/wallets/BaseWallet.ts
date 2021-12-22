import IWallet from "../interfaces/IWallet";

export default abstract class BaseWallet implements IWallet {
  protected name = "Wallet";
  protected description = "A near wallet";
  protected icon = "https://cryptologos.cc/logos/near-protocol-near-logo.png";

  protected callbackFunctions: {
    [event: string]: (self: IWallet) => void;
  } = {};

  constructor(name: string, description: string, icon: string) {
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

  abstract connect(): void;
  abstract disconnect(): void;
  abstract isConnected(): boolean;

  on(event: string, callback: (self: IWallet) => void) {
    this.callbackFunctions[event] = callback;
  }
}
