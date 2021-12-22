import BaseWallet from "./BaseWallet";

export default class CustomWallet extends BaseWallet {
  private onConnectFunction: Function;
  private onDisconnectFunction: Function;
  private isConnectedFunction: Function;

  constructor(
    name: string,
    description: string,
    icon: string,
    onConnectFunction: Function,
    onDisconnectFunction: Function,
    isConnectedFunction: Function
  ) {
    super(name, description, icon);

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
