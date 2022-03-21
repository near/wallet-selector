import { WalletConnection, connect, keyStores } from "near-api-js";

import getConfig from "../../config";
import { transformActions } from "../actions";
import { LOCAL_STORAGE_SELECTED_WALLET_ID } from "../../constants";
import { nearWalletIcon } from "../icons";
import { WalletModule, BrowserWallet } from "../Wallet";

function setupNearWallet(): WalletModule<BrowserWallet> {
  return function NearWallet({
    options,
    emitter,
    logger,
    storage,
    updateState,
  }) {
    let keyStore: keyStores.KeyStore;
    let wallet: WalletConnection;

    return {
      id: "near-wallet",
      type: "browser",
      name: "NEAR Wallet",
      description: null,
      iconUrl: nearWalletIcon,

      isAvailable() {
        return true;
      },

      async init() {
        const localStorageKeyStore =
          new keyStores.BrowserLocalStorageKeyStore();
        const near = await connect({
          keyStore: localStorageKeyStore,
          ...getConfig(options.networkId),
          headers: {},
        });

        wallet = new WalletConnection(near, "near_app");
        keyStore = localStorageKeyStore;

        // Cleanup up any pending keys (cancelled logins).
        if (!wallet.isSignedIn()) {
          await localStorageKeyStore.clear();
        }
      },

      // We don't emit "signIn" or update state as we can't guarantee the user will
      // actually sign in. Best we can do is temporarily set it as selected and
      // validate on initialise.
      async signIn() {
        if (!wallet) {
          await this.init();
        }

        await wallet.requestSignIn({
          contractId: options.contract.contractId,
          methodNames: options.contract.methodNames,
        });

        storage.setItem(LOCAL_STORAGE_SELECTED_WALLET_ID, this.id);
      },

      async signOut() {
        if (!wallet) {
          return;
        }

        wallet.signOut();
        await keyStore.clear();

        updateState((prevState) => ({
          ...prevState,
          selectedWalletId: null,
        }));
        emitter.emit("signOut");
      },

      async isSignedIn() {
        if (!wallet) {
          return false;
        }

        return wallet.isSignedIn();
      },

      async getAccounts() {
        const accountId: string | null = wallet.getAccountId();

        if (!accountId) {
          return [];
        }

        return [{
          accountId
        }];
      },

      async signAndSendTransaction({ signerId, receiverId, actions }) {
        logger.log("NearWallet:signAndSendTransaction", {
          signerId,
          receiverId,
          actions,
        });

        const account = wallet.account();

        // near-api-js marks this method as protected.
        return account['signAndSendTransaction']({
          receiverId,
          actions: transformActions(actions),
        });
      },
    };
  };
}

export default setupNearWallet;
