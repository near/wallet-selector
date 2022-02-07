import { Emitter } from "../utils/EventsHandler";
import BaseWallet from "./BaseWallet";
import ProviderService from "../services/provider/ProviderService";
import { AccountInfo } from "../interfaces/IWallet";

// TODO: Needs to have CustomWallet for every wallet type, also when developer is adding new wallet a type is needed
export default class CustomWallet extends BaseWallet {
  private onConnectFunction: () => void;
  private onDisconnectFunction: () => void;
  private isConnectedFunction: () => boolean;

  constructor(
    emitter: Emitter,
    provider: ProviderService,
    id: string,
    name: string,
    description: string,
    icon: string,
    onConnectFunction: () => void,
    onDisconnectFunction: () => void,
    isConnectedFunction: () => boolean
  ) {
    super(emitter, provider, id, name, description, icon);

    this.setOnConnectFunction(onConnectFunction);
    this.setOnDisconnectFunction(onDisconnectFunction);
    this.setIsConnectedFunction(isConnectedFunction);
  }

  setOnConnectFunction(onConnectFunction: () => void) {
    this.onConnectFunction = onConnectFunction;
  }

  setOnDisconnectFunction(onDisconnectFunction: () => void) {
    this.onDisconnectFunction = onDisconnectFunction;
  }

  setIsConnectedFunction(isConnectedFunction: () => boolean) {
    this.isConnectedFunction = isConnectedFunction;
  }

  async walletSelected() {
    this.init();
  }

  async init() {
    this.onConnectFunction();
  }

  async disconnect() {
    this.onDisconnectFunction();
  }

  async isConnected(): Promise<boolean> {
    return this.isConnectedFunction();
  }

  async signIn() {
    throw new Error("Not implemented");
  }

  async getAccount(): Promise<AccountInfo | null> {
    throw new Error("Not implemented");
  }

  async call() {
    throw new Error("Not implemented");
  }
}
