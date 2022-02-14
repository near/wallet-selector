import {
  WalletConnection,
  transactions,
  connect,
  keyStores,
} from "near-api-js";
import BN from "bn.js";

import BrowserWallet from "../types/BrowserWallet";
import INearWallet from "../../interfaces/INearWallet";
import {
  AccountInfo,
  CallParams,
  FunctionCallAction,
} from "../../interfaces/IWallet";
import ProviderService from "../../services/provider/ProviderService";
import getConfig from "../../config";
import { Options } from "../../core/NearWalletSelector";
import { logger } from "../../services/logging.service";

class NearWallet extends BrowserWallet implements INearWallet {
  private wallet: WalletConnection;

  constructor(provider: ProviderService, options: Options) {
    super(provider, options);
  }

  async init() {
    const near = await connect({
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      ...getConfig(this.options.networkId),
      headers: {},
    });

    this.wallet = new WalletConnection(near, "near_app");
  }

  getInfo() {
    return {
      id: "nearwallet",
      name: "Near Wallet",
      description: "Near Wallet",
      iconUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.png",
    };
  }

  async signIn() {
    if (!this.wallet) {
      await this.init();
    }

    return this.wallet.requestSignIn(this.options.accountId);
  }

  async disconnect() {
    if (!this.wallet) {
      return;
    }

    this.wallet.signOut();
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

    logger.log("NearWallet:call", { receiverId, actions });

    // @ts-ignore
    // near-api-js marks this method as protected.
    return account.signAndSendTransaction({
      receiverId,
      actions: this.transformActions(actions),
    });
  }
}

export default NearWallet;
