import { Emitter } from "../utils/EventsHandler";
import BaseWallet from "./BaseWallet";
import ProviderService from "../services/provider/ProviderService";
import { AccountInfo, WalletInfo } from "../interfaces/IWallet";
import { CustomWalletOptions, Options } from "../core/NearWalletSelector";

// TODO: Needs to have CustomWallet for every wallet type, also when developer is adding new wallet a type is needed
export default class CustomWallet extends BaseWallet {
  private info: WalletInfo;

  private onConnectFunction: () => void;
  private onDisconnectFunction: () => void;
  private isConnectedFunction: () => boolean;

  constructor(
    emitter: Emitter,
    provider: ProviderService,
    options: Options,
    customOptions: CustomWalletOptions
  ) {
    super(emitter, provider, options);

    this.info = customOptions.info;

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
    this.init();
  }

  async init() {
    this.onConnectFunction();
  }

  getInfo() {
    return this.info;
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
