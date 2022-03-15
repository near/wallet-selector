import isMobile from "is-mobile";

import { mathWalletIcon } from "../icons";
import { InjectedWallet, WalletModule } from "../Wallet";
import { transformActions } from "../actions";
import { InjectedMathWallet } from "./InjectedMathWallet";
import { transactions, utils } from "near-api-js";

declare global {
  interface Window {
    nearWalletApi: InjectedMathWallet | undefined;
  }
}

function setupMathWallet(): WalletModule<InjectedWallet> {
  return function MathWallet({
    options,
    provider,
    emitter,
    logger,
    updateState,
  }) {
    let wallet: InjectedMathWallet;

    const isInstalled = () => {
      return !!window.nearWalletApi;
    };

    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    return {
      id: "math-wallet",
      type: "injected",
      name: "Math Wallet",
      description: null,
      iconUrl: mathWalletIcon,

      isAvailable() {
        if (!isInstalled()) {
          return false;
        }

        if (isMobile()) {
          return false;
        }

        return true;
      },

      async init() {
        await timeout(200);

        if (!isInstalled()) {
          throw new Error("Wallet not installed");
        }

        wallet = window.nearWalletApi!;

        if (wallet.signer.account) {
          await wallet.login({});
        }
      },

      async signIn() {
        if (!isInstalled()) {
          //TODO update state
        }

        if (!wallet) {
          await this.init();
        }

        const account = await wallet.login({});

        if (!account) {
          throw new Error("Failed to sign in");
        }

        logger.log(options.networkId);

        updateState((prevState) => ({
          ...prevState,
          showModal: false,
          selectedWalletId: this.id,
        }));
        emitter.emit("signIn");
      },

      async isSignedIn() {
        return Boolean(wallet.signer.account);
      },

      async signOut() {
        const res = await wallet.logout();

        if (!res) {
          throw new Error("Failed to sign out");
        }

        updateState((prevState) => ({
          ...prevState,
          selectedWalletId: null,
        }));
        emitter.emit("signOut");
      },

      async getAccount() {
        const signedIn = await this.isSignedIn();

        if (!signedIn) {
          return null;
        }

        const { accountId } = wallet.signer.account;
        const account = await provider.viewAccount({ accountId });

        return {
          accountId,
          balance: account.amount,
        };
      },

      async signAndSendTransaction({ receiverId, actions }) {
        logger.log("MathWallet:signAndSendTransaction", {
          receiverId,
          actions,
        });

        const { accountId, publicKey } = wallet.signer.account;

        const [block, accessKey] = await Promise.all([
          provider.block({ finality: "final" }),
          provider.viewAccessKey({ accountId, publicKey }),
        ]);

        logger.log("MathWallet:signAndSendTransaction:block", block);
        logger.log("MathWallet:signAndSendTransaction:accessKey", accessKey);

        const transaction = transactions.createTransaction(
          accountId,
          utils.PublicKey.from(publicKey),
          receiverId,
          accessKey.nonce + 1,
          transformActions(actions),
          utils.serialize.base_decode(block.header.hash)
        );

        const [hash, signedTx] = await transactions.signTransaction(
          transaction,
          wallet.signer,
          accountId
        );

        logger.log("MathWallet:signAndSendTransaction:hash", hash);

        return provider.sendTransaction(signedTx);
      },
    };
  };
}

export default setupMathWallet;
