import { transactions as nearTransactions } from "near-api-js";
import { isMobile, createTransaction } from "@near-wallet-selector/utils";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  AccountState,
  waitFor,
} from "@near-wallet-selector/core";

import { InjectedMathWallet } from "./injected-math-wallet";
import { signTransactions } from "@near-wallet-selector/wallet-utils";

declare global {
  interface Window {
    nearWalletApi: InjectedMathWallet | undefined;
  }
}

export interface MathWalletParams {
  iconUrl?: string;
}

interface MathWalletState {
  wallet: InjectedMathWallet;
}

const isInstalled = () => {
  return waitFor(() => !!window.nearWalletApi).catch(() => false);
};

const setupMathWalletState = async (
  contractId: string
): Promise<MathWalletState> => {
  const wallet = window.nearWalletApi!;

  // This wallet currently has weird behaviour regarding signer.account.
  // - When you initially sign in, you get a SignedInAccount interface.
  // - When the extension loads after this, you get a PreviouslySignedInAccount interface.
  // This method normalises the behaviour to only return the SignedInAccount interface.
  if (wallet.signer.account && "address" in wallet.signer.account) {
    await wallet.login({ contractId });
  }

  return {
    wallet,
  };
};

const MathWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  provider,
  logger,
}) => {
  const _state = await setupMathWalletState(options.contractId);

  const getSignedInAccount = () => {
    if (
      _state.wallet.signer.account &&
      "accountId" in _state.wallet.signer.account
    ) {
      return _state.wallet.signer.account;
    }

    return null;
  };

  const getAccounts = (): Array<AccountState> => {
    const account = getSignedInAccount();

    if (!account) {
      return [];
    }

    return [{ accountId: account.accountId }];
  };

  return {
    async connect() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.login({ contractId: options.contractId });

      return getAccounts();
    },

    async disconnect() {
      // Ignore if unsuccessful (returns false).
      await _state.wallet.logout();
    },

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      logger.log("MathWallet:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      const account = getSignedInAccount();

      if (!account) {
        throw new Error("Wallet not connected");
      }

      const { accountId, publicKey } = account;
      const [block, accessKey] = await Promise.all([
        provider.block({ finality: "final" }),
        provider.viewAccessKey({ accountId, publicKey }),
      ]);

      logger.log("MathWallet:signAndSendTransaction:block", block);
      logger.log("MathWallet:signAndSendTransaction:accessKey", accessKey);

      const transaction = createTransaction({
        accountId,
        publicKey,
        receiverId: receiverId,
        nonce: accessKey.nonce + 1,
        actions,
        hash: block.header.hash,
      });

      const [hash, signedTx] = await nearTransactions.signTransaction(
        transaction,
        _state.wallet.signer,
        accountId
      );

      logger.log("MathWallet:signAndSendTransaction:hash", hash);

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("MathWallet:signAndSendTransactions", { transactions });

      const account = getSignedInAccount();

      if (!account) {
        throw new Error("Wallet not connected");
      }

      const { accountId, publicKey } = account;
      const [block, accessKey] = await Promise.all([
        provider.block({ finality: "final" }),
        provider.viewAccessKey({ accountId, publicKey }),
      ]);

      logger.log("MathWallet:signAndSendTransactions:block", block);
      logger.log("MathWallet:signAndSendTransactions:accessKey", accessKey);

      const signedTransactions = await signTransactions(
        transactions,
        _state.wallet.signer,
        provider,
        accountId
      );

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

export const setupMathWallet = ({
  iconUrl = "./assets/math-wallet-icon.png",
}: MathWalletParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile || !installed) {
      return null;
    }

    return {
      id: "math-wallet",
      type: "injected",
      metadata: {
        name: "Math Wallet",
        description: null,
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",
      },
      init: MathWallet,
    };
  };
};
