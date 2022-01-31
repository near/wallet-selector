import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";
import { WalletConnection, transactions } from "near-api-js";
import { getState } from "../../state/State";
import BN from "bn.js";

export default class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;

  constructor() {
    super("nearwallet", "Near Wallet", "Near Wallet", "https://cryptologos.cc/logos/near-protocol-near-logo.png");

    this.init();
  }

  async walletSelected() {
    await this.signIn();
  }

  async init() {
    const state = getState();
    if (!state.nearConnection) return;
    this.wallet = new WalletConnection(state.nearConnection, "near_app");
    EventHandler.callEventHandler("init");
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
      EventHandler.callEventHandler("signIn");
    });
  }
  async disconnect() {
    if (!this.wallet) return;
    this.wallet.signOut();
    EventHandler.callEventHandler("disconnect");
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

  async callContract(method: string, args: any = {}, gas?: string, deposit?: string): Promise<any> {
    const state = getState();
    const account = this.wallet.account();
    const contractId = state.options.contract.address

    if (state.options.contract.viewMethods.includes(method)) {
      return account.viewFunction(contractId, method, args);
    }

    if (state.options.contract.changeMethods.includes(method)) {
      if (!gas || !deposit) {
        throw new Error("Change methods require deposit and gas");
      }

      // @ts-ignore
      return account.signAndSendTransaction({
        receiverId: contractId,
        actions: [
          transactions.functionCall(method, args, new BN(gas), new BN(deposit))
        ]
      });
    }

    throw new Error("Invalid method name");
  }
}
