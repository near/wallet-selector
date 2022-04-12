import { transactions as nearTransactions, utils } from "near-api-js";
import isMobile from "is-mobile";
import {
  InjectedWallet,
  WalletModule,
  transformActions,
  waitFor,
} from "@near-wallet-selector/core";

import { InjectedMathWallet, SignedInAccount } from "./injected-math-wallet";

declare global {
  interface Window {
    nearWalletApi: InjectedMathWallet | undefined;
  }
}

export interface MathWalletParams {
  iconUrl?: string;
}

export function setupMathWallet({
  iconUrl,
}: MathWalletParams = {}): WalletModule<InjectedWallet> {
  return function MathWallet({
    options,
    provider,
    emitter,
    logger,
    updateState,
  }) {
    let wallet: InjectedMathWallet;

    const getAccounts = () => {
      if (!wallet.signer.account) {
        return [];
      }

      const accountId =
        "accountId" in wallet.signer.account
          ? wallet.signer.account.accountId
          : wallet.signer.account.name;

      return [{ accountId }];
    };

    const isInstalled = async () => {
      try {
        return await waitFor(() => !!window.nearWalletApi, {});
      } catch (e) {
        logger.log("MathWallet:isInstalled:error", e);

        return false;
      }
    };

    // This wallet currently has weird behaviour regarding signer.account.
    // - When you initially sign in, you get a SignedInAccount interface.
    // - When the extension loads after this, you get a PreviouslySignedInAccount interface.
    // This method normalises the behaviour to only return the SignedInAccount interface.
    const getSignerAccount = async (): Promise<SignedInAccount | null> => {
      if (!wallet.signer.account) {
        return null;
      }

      if ("accountId" in wallet.signer.account) {
        return wallet.signer.account;
      }

      return wallet.login({ contractId: options.contractId });
    };

    return {
      id: "math-wallet",
      type: "injected",
      name: "Math Wallet",
      description: null,
      iconUrl: iconUrl || "./assets/math-wallet-icon.png",
      downloadUrl:
        "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",

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
        if (!(await isInstalled())) {
          throw new Error("Wallet not installed");
        }

        wallet = window.nearWalletApi as InjectedMathWallet;
      },

      async signIn() {
        if (!(await isInstalled())) {
          return updateState((prevState) => ({
            ...prevState,
            showWalletOptions: false,
            showWalletNotInstalled: this.id,
          }));
        }

        if (!wallet) {
          await this.init();
        }

        const account = await wallet.login({
          contractId: options.contractId,
        });

        if (!account) {
          throw new Error("Failed to sign in");
        }

        updateState((prevState) => ({
          ...prevState,
          showModal: false,
          selectedWalletId: this.id,
        }));

        const accounts = getAccounts();
        emitter.emit("signIn", { accounts });
        emitter.emit("accountsChanged", { accounts });
      },

      async isSignedIn() {
        const signerAccount = await getSignerAccount();

        return !!signerAccount;
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

        const accounts = getAccounts();
        emitter.emit("accountsChanged", { accounts });
        emitter.emit("signOut", { accounts });
      },

      async getAccounts() {
        return getAccounts();
      },

      async signAndSendTransaction({ signerId, receiverId, actions }) {
        logger.log("MathWallet:signAndSendTransaction", {
          signerId,
          receiverId,
          actions,
        });

        const signerAccount = await getSignerAccount();
        const { accountId, publicKey } = signerAccount as SignedInAccount;

        const [block, accessKey] = await Promise.all([
          provider.block({ finality: "final" }),
          provider.viewAccessKey({ accountId, publicKey }),
        ]);

        logger.log("MathWallet:signAndSendTransaction:block", block);
        logger.log("MathWallet:signAndSendTransaction:accessKey", accessKey);

        const transaction = nearTransactions.createTransaction(
          accountId,
          utils.PublicKey.from(publicKey),
          receiverId,
          accessKey.nonce + 1,
          transformActions(actions),
          utils.serialize.base_decode(block.header.hash)
        );

        const [hash, signedTx] = await nearTransactions.signTransaction(
          transaction,
          wallet.signer,
          accountId
        );

        logger.log("MathWallet:signAndSendTransaction:hash", hash);

        return provider.sendTransaction(signedTx);
      },

      async signAndSendTransactions({ transactions }) {
        logger.log("MathWallet:signAndSendTransactions", { transactions });

        const signerAccount = await getSignerAccount();
        const { accountId, publicKey } = signerAccount as SignedInAccount;

        const [block, accessKey] = await Promise.all([
          provider.block({ finality: "final" }),
          provider.viewAccessKey({ accountId, publicKey }),
        ]);

        logger.log("MathWallet:signAndSendTransactions:block", block);
        logger.log("MathWallet:signAndSendTransactions:accessKey", accessKey);

        const signedTransactions: Array<nearTransactions.SignedTransaction> =
          [];
        let nonce = accessKey.nonce;

        for (let i = 0; i < transactions.length; i++) {
          const transaction = nearTransactions.createTransaction(
            accountId,
            utils.PublicKey.from(publicKey),
            transactions[i].receiverId,
            ++nonce,
            transformActions(transactions[i].actions),
            utils.serialize.base_decode(block.header.hash)
          );

          const [hash, signedTx] = await nearTransactions.signTransaction(
            transaction,
            wallet.signer,
            accountId
          );

          logger.log("MathWallet:signAndSendTransactions:hash", hash);

          signedTransactions.push(signedTx);
        }

        logger.log(
          "MathWallet:signAndSendTransactions:signedTransactions",
          signedTransactions
        );

        return Promise.all(
          signedTransactions.map((tx) => provider.sendTransaction(tx))
        );
      },
    };
  };
}
