import { WalletConnection, transactions } from "near-api-js";
import BN from "bn.js";

import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import { Emitter } from "../../utils/EventsHandler";
import { getState } from "../../state/State";
import {
  AccountInfo,
  CallParams,
  FunctionCallAction,
} from "../../interfaces/IWallet";
import ProviderService from "../../services/provider/ProviderService";

class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;

  constructor(emitter: Emitter, provider: ProviderService) {
    super(
      emitter,
      provider,
      "nearwallet",
      "Near Wallet",
      "Near Wallet",
      "https://cryptologos.cc/logos/near-protocol-near-logo.png"
    );

    this.init();
  }

  async walletSelected() {
    await this.signIn();
  }

  async init() {
    const state = getState();

    if (!state.nearConnection) {
      return;
    }

    this.wallet = new WalletConnection(state.nearConnection, "near_app");

    if (this.wallet.isSignedIn()) {
      this.setWalletAsSignedIn();
    }
  }

  async signIn() {
    const state = getState();

    this.wallet.requestSignIn(state.options.accountId).then(() => {
      if (!this.wallet.isSignedIn()) {
        return;
      }

      this.setWalletAsSignedIn();
      this.emitter.emit("signIn");
    });
  }
  async disconnect() {
    if (!this.wallet) {
      return;
    }

    this.wallet.signOut();
    this.emitter.emit("disconnect");
  }

  async isConnected() {
    if (!this.wallet) {
      return false;
    }

    return this.wallet.isSignedIn();
  }

  async getAccount(): Promise<AccountInfo | null> {
    const connected = await this.isConnected();

    if (!connected) {
      return null;
    }

    const accountId = this.wallet.getAccountId();
    const state = await this.wallet.account().state();

    return {
      accountId,
      balance: state.amount,
    };
  }

  transformActions(actions: Array<FunctionCallAction>) {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  }

  async call({ receiverId, actions }: CallParams) {
    const account = this.wallet.account();

    console.log("NearWallet:call", { receiverId, actions });

    // @ts-ignore
    // near-api-js marks this method as protected.
    return account.signAndSendTransaction({
      receiverId,
      actions: this.transformActions(actions),
    });
  }
}

export default NearWallet;
