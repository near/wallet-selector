import { WalletConnection, connect, keyStores } from "near-api-js";
import {
  WalletModule,
  BrowserWallet,
  transformActions,
} from "@near-wallet-selector/core";

export interface NearWalletParams {
  walletUrl?: string;
  iconPath?: string;
}

export function setupNearWallet({
  walletUrl,
  iconPath,
}: NearWalletParams = {}): WalletModule<BrowserWallet> {
  return function NearWallet({
    options,
    network,
    emitter,
    logger,
    storage,
    updateState,
  }) {
    let keyStore: keyStores.KeyStore;
    let wallet: WalletConnection;

    const getAccounts = () => {
      const accountId: string | null = wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{ accountId }];
    };

    const getWalletUrl = () => {
      if (walletUrl) {
        return walletUrl;
      }

      switch (network.networkId) {
        case "mainnet":
          return "https://wallet.near.org";
        case "testnet":
          return "https://wallet.testnet.near.org";
        case "betanet":
          return "https://wallet.betanet.near.org";
        default:
          // TODO: Throw once wallets are separate packages.
          return "https://wallet.testnet.near.org";
      }
    };

    return {
      id: "near-wallet",
      type: "browser",
      name: "NEAR Wallet",
      description: null,
      iconUrl: iconPath || "/assets/near-wallet-icon.png",

      isAvailable() {
        return true;
      },

      async init() {
        const localStorageKeyStore =
          new keyStores.BrowserLocalStorageKeyStore();

        const near = await connect({
          keyStore: localStorageKeyStore,
          walletUrl: getWalletUrl(),
          ...network,
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
          contractId: options.contractId,
          methodNames: options.methodNames,
        });

        // TODO: Find better way to do this with exposing 'LOCAL_STORAGE_SELECTED_WALLET_ID' in core.
        storage.setItem("selectedWalletId", this.id);
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

        const accounts = getAccounts();
        emitter.emit("accountsChanged", { accounts });
        emitter.emit("signOut", { accounts });
      },

      async isSignedIn() {
        if (!wallet) {
          return false;
        }

        return wallet.isSignedIn();
      },

      async getAccounts() {
        return getAccounts();
      },

      async signAndSendTransaction({ signerId, receiverId, actions }) {
        logger.log("NearWallet:signAndSendTransaction", {
          signerId,
          receiverId,
          actions,
        });

        const account = wallet.account();

        // near-api-js marks this method as protected.
        return account["signAndSendTransaction"]({
          receiverId,
          actions: transformActions(actions),
        });
      },
    };
  };
}
