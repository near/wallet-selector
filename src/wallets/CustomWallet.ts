import BaseWallet from "./BaseWallet";

// TODO: Needs to have CustomWallet for every wallet type, also when developer is adding new wallet a type is needed
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

  async walletSelected() {
    this.connect();
  }

  async init() {
    this.connect();
  }

  async connect() {
    this.onConnectFunction();
  }

  async disconnect() {
    this.onDisconnectFunction();
  }

  async getWallet(): Promise<any> {
      return null
  }
  async getContract(): Promise<any> {
      return true   
  }
  // @ts-ignore
  async setContract(viewMethods: any, changeMethods: any): Promise<boolean> {
      return true
  }

  async isConnected(): Promise<boolean> {
    return this.isConnectedFunction();
  }

  async signIn() {}
}
