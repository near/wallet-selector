import BaseWallet from "./BaseWallet";

export default class CustomWallet extends BaseWallet {
  private onConnectFunction: Function;

  constructor(
    name: string,
    description: string,
    icon: string,
    onConnectFunction: Function
  ) {
    super(name, description, icon);

    this.onConnectFunction = onConnectFunction;
  }

  connect() {
    this.onConnectFunction();
  }
}
