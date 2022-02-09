import BaseWallet from "./BaseWallet";
import ProviderService from "../services/provider/ProviderService";
import { AccountInfo } from "../interfaces/IWallet";
import { CustomWalletOptions, Options } from "../core/NearWalletSelector";

// TODO: Needs to have CustomWallet for every wallet type, also when developer is adding new wallet a type is needed
export default class CustomWallet extends BaseWallet {
  private customOptions: CustomWalletOptions;

  private onConnectFunction: () => void;
  private onDisconnectFunction: () => void;
  private isConnectedFunction: () => boolean;

  constructor(
    provider: ProviderService,
    options: Options,
    customOptions: CustomWalletOptions
  ) {
    super(provider, options);

    this.customOptions = customOptions;

    this.setOnConnectFunction(customOptions.onConnectFunction);
    this.setOnDisconnectFunction(customOptions.onDisconnectFunction);
    this.setIsConnectedFunction(customOptions.isConnectedFunction);
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
    return this.init();
  }

  async init() {
    this.onConnectFunction();
  }

  getInfo() {
    return this.customOptions.info;
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
