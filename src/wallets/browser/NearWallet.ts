import { WalletConnection, transactions } from "near-api-js";
import BN from "bn.js";

import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";
import { getState } from "../../state/State";
import { CallParams, SignParams, ViewParams, FunctionCallAction } from "../../interfaces/IWallet";

class NearWallet extends BrowserWallet implements INearWallet {
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

  transformSerializedActions(actions: Array<FunctionCallAction>) {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  }

  sign({ receiverId, actions }: SignParams) {
    const account = this.wallet.account();
    const transformedActions = this.transformSerializedActions(actions);

    console.log("NearWallet:sign", { actions, transformedActions });

    // @ts-ignore
    // near-api-js marks this method as protected.
    return account.signTransaction(receiverId, transformedActions);
  }

  view({ contractId, methodName, args = {} }: ViewParams) {
    const account = this.wallet.account();

    console.log("NearWallet:view", { contractId, methodName, args });

    return account.viewFunction(contractId, methodName, args);
  }

  async call({ receiverId, actions }: CallParams) {
    const state = getState();

    console.log("NearWallet:call", { receiverId, actions });

    const [, signed] = await this.sign({ receiverId, actions });

    // TODO: Move nearConnection out of state.
    return state.nearConnection!.connection.provider.sendTransaction(signed);
  }
}

export default NearWallet;