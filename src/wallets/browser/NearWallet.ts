import {
  WalletConnection,
  transactions,
  connect,
  keyStores,
} from "near-api-js";
import BN from "bn.js";

import getConfig from "../../config";
import { Options } from "../../core/NearWalletSelector";
import { logger } from "../../services/logging.service";
import {
  AccountInfo,
  BrowserWallet,
  FunctionCallAction,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";

class NearWallet implements BrowserWallet {
  private options: Options;
  private wallet: WalletConnection;

  id: "near-wallet";
  type: "browser";
  name: "NEAR Wallet";
  description: null;
  iconUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.png";

  constructor({ options }: WalletOptions) {
    this.options = options;
  }

  isAvailable() {
    return true;
  }

  private async init() {
    const near = await connect({
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      ...getConfig(this.options.networkId),
      headers: {},
    });

    this.wallet = new WalletConnection(near, "near_app");
  }

  async connect() {
    if (!this.wallet) {
      await this.init();
    }

    return this.wallet.requestSignIn(this.options.contractId);
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

  private transformActions(actions: Array<FunctionCallAction>) {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  }

  async signAndSendTransaction({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) {
    logger.log("NearWallet:signAndSendTransaction", { receiverId, actions });

    const account = this.wallet.account();

    // @ts-ignore
    // near-api-js marks this method as protected.
    return account.signAndSendTransaction({
      receiverId,
      actions: this.transformActions(actions),
    });
  }
}

export default NearWallet;
