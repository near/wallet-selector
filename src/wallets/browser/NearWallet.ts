import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import { WalletConnection, Contract } from "near-api-js";
import { getState } from "../../state/State";
import { Emitter } from "../../interfaces/EventsHandler";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;
  private contract: Contract;

  constructor(emitter: Emitter) {
    super(emitter, "nearwallet", "Near Wallet", "Near Wallet", "https://cryptologos.cc/logos/near-protocol-near-logo.png");

    this.init();
  }

  async walletSelected() {
    await this.signIn();
  }

  async init() {
    const state = getState();
    if (!state.nearConnection) return;
    this.wallet = new WalletConnection(state.nearConnection, "near_app");
    console.log("emit")
    this.emitter.emit("init");
    if (this.wallet.isSignedIn()) {
      this.setWalletAsSignedIn();
    }
  }

  async signIn() {
    const state = getState();
    this.wallet.requestSignIn(state.options.contract.address).then(() => {
      if (!this.wallet.isSignedIn()) {
        return;
      }
      this.setWalletAsSignedIn();
      this.emitter.emit("signIn");
    });
  }
  async disconnect() {
    if (!this.wallet) return;
    this.wallet.signOut();
    this.emitter.emit("disconnect");
  }

  async isConnected(): Promise<boolean> {
    if (!this.wallet) return false;
    return this.wallet.isSignedIn();
  }

  async getAccount(): Promise<any> {
    if (!this.isConnected()) return null;
    return {
      accountId: this.wallet.getAccountId(),
      balance: (await this.wallet.account().state()).amount,
    };
  }

  async callContract(method: string, args?: any, gas?: string, deposit?: string): Promise<any> {
    const state = getState();

    if (!this.contract) {
      this.contract = new Contract(this.wallet.account(), state.options.contract.address, {
        viewMethods: state.options.contract.viewMethods,
        changeMethods: state.options.contract.changeMethods,
      });
    }

    if (!args) args = {};

    if (state.options.contract.viewMethods.includes(method)) {
      return this.contract[method](args);
    }

    if (state.options.contract.changeMethods.includes(method)) {
      return this.contract[method](args, gas, deposit);
    }

    return null;
  }
}
