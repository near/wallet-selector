import { WalletConnection, transactions } from "near-api-js";
import BN from "bn.js";

import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import EventHandler from "../../utils/EventHandler";
import { getState } from "../../state/State";
import { CallV1Params, ViewParams } from "../../interfaces/IWallet";
import { SerializableAction } from "../../interfaces/transactions";

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

  transformSerializedActions(actions: Array<SerializableAction>) {
    return actions.map((action) => {
      switch (action.type) {
        case "functionCall":
          return transactions.functionCall(
            action.payload.methodName,
            action.payload.args,
            new BN(action.payload.gas),
            new BN(action.payload.deposit)
          );
        case "transfer":
          return transactions.transfer(
            new BN(action.payload.deposit)
          );
      }
    });
  }

  sign({ receiverId, actions }: CallV1Params) {
    const account = this.wallet.account();
    const transformedActions = this.transformSerializedActions(actions);

    console.log("NearWallet:sign", { actions, transformedActions });

    // @ts-ignore
    return account.signTransaction(receiverId, transformedActions);
  }

  view({ contractId, methodName, args = {} }: ViewParams) {
    const account = this.wallet.account();

    console.log("NearWallet:view", { contractId, methodName, args });

    return account.viewFunction(contractId, methodName, args);
  }

  async callV1({ receiverId, actions }: CallV1Params) {
    console.log("NearWallet:callV1", { receiverId, actions });

    const state = getState();
    const [, signed] = await this.sign({ receiverId, actions });

    // TODO: Move nearConnection out state.
    return state.nearConnection!.connection.provider.sendTransaction(signed);
  }
}

export default NearWallet;