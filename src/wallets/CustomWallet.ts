import BaseWallet from "./BaseWallet";

export default class CustomWallet extends BaseWallet {
  private onConnectFunction: Function;
  private onDisconnectFunction: Function;
  private isConnectedFunction: Function;

  constructor(
    id: string,
    name: string,
    description: string,
    icon: string,
    onConnectFunction: Function,
    onDisconnectFunction: Function,
    isConnectedFunction: Function
  ) {
    super(id, name, description, icon);

    this.setOnConnectFunction(onConnectFunction);
    this.setOnDisconnectFunction(onDisconnectFunction);
    this.setIsConnectedFunction(isConnectedFunction);
  }

  setOnConnectFunction(onConnectFunction: Function) {
    this.onConnectFunction = onConnectFunction;
  }

  setOnDisconnectFunction(onDisconnectFunction: Function) {
    this.onDisconnectFunction = onDisconnectFunction;
  }

  setIsConnectedFunction(isConnectedFunction: Function) {
    this.isConnectedFunction = isConnectedFunction;
  }

  walletSelected(): void {
    this.connect();
  }

  init() {
    this.connect();
  }

  connect() {
    this.onConnectFunction();
  }

  disconnect(): void {
    this.onDisconnectFunction();
  }

  isConnected(): boolean {
    return this.isConnectedFunction();
  }
}
