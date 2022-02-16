import {
  WalletConnection,
  transactions,
  connect,
  keyStores,
} from "near-api-js";
import BN from "bn.js";

import getConfig from "../../config";
import { Options } from "../../core/NearWalletSelector";
import { Emitter } from "../../utils/EventsHandler";
import { logger } from "../../services/logging.service";
import { setSelectedWalletId } from "../helpers";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../../constants";
import { nearWalletIcon } from "../icons";
import {
  AccountInfo,
  BrowserWallet,
  BrowserWalletType,
  FunctionCallAction,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";

class NearWallet implements BrowserWallet {
  private wallet: WalletConnection;

  private options: Options;
  private emitter: Emitter;

  id = "near-wallet";
  type: BrowserWalletType = "browser";
  name = "NEAR Wallet";
  description = null;
  iconUrl = nearWalletIcon;

  constructor({ options, emitter }: WalletOptions) {
    this.options = options;
    this.emitter = emitter;
  }

  isAvailable = () => {
    return true;
  };

  init = async () => {
    const near = await connect({
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      ...getConfig(this.options.networkId),
      headers: {},
    });

    this.wallet = new WalletConnection(near, "near_app");
  };

  // We don't emit "signIn" or update state as we can't guarantee the user will
  // actually sign in. Best we can do is temporarily set it as selected and
  // validate on initialise.
  signIn = async () => {
    if (!this.wallet) {
      await this.init();
    }

    await this.wallet.requestSignIn(this.options.contract.accountId);

    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_WALLET_ID,
      JSON.stringify(this.id)
    );
  };

  signOut = async () => {
    if (!this.wallet) {
      return;
    }

    this.wallet.signOut();

    setSelectedWalletId(null);
    this.emitter.emit("signOut");
  };

  isSignedIn = async () => {
    if (!this.wallet) {
      return false;
    }

    return this.wallet.isSignedIn();
  };

  getAccount = async (): Promise<AccountInfo | null> => {
    const signedIn = await this.isSignedIn();

    if (!signedIn) {
      return null;
    }

    const accountId = this.wallet.getAccountId();
    const state = await this.wallet.account().state();

    return {
      accountId,
      balance: state.amount,
    };
  };

  private transformActions = (actions: Array<FunctionCallAction>) => {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  };

  signAndSendTransaction = async ({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) => {
    logger.log("NearWallet:signAndSendTransaction", { receiverId, actions });

    const account = this.wallet.account();

    // @ts-ignore
    // near-api-js marks this method as protected.
    return account.signAndSendTransaction({
      receiverId,
      actions: this.transformActions(actions),
    });
  };
}

export default NearWallet;
