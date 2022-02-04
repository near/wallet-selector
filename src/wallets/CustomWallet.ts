import { Emitter } from "../utils/EventsHandler";
import BaseWallet from "./BaseWallet";

// TODO: Needs to have CustomWallet for every wallet type, also when developer is adding new wallet a type is needed
export default class CustomWallet extends BaseWallet {
  private onConnectFunction: () => void;
  private onDisconnectFunction: () => void;
  private isConnectedFunction: () => boolean;

  constructor(
    emitter: Emitter,
    id: string,
    name: string,
    description: string,
    icon: string,
    onConnectFunction: () => void,
    onDisconnectFunction: () => void,
    isConnectedFunction: () => boolean
  ) {
    super(emitter, id, name, description, icon);

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

  async getAccount() {
    throw new Error("Not implemented");
  }

  async call() {
    throw new Error("Not implemented");
  }
}
