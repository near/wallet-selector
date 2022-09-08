import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
  Optional,
  Transaction,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedCoin98 } from "./injected-coin98-wallet";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { defaultCoin98Logo } from "./icons";

declare global {
  interface Window {
    coin98: InjectedCoin98;
  }
}

export interface Coin98WalletParams {
  iconUrl?: string;
}

interface Coin98WalletState {
  wallet: InjectedCoin98;
}

const isInstalled = () => {
  return waitFor(() => !!window.coin98).catch(() => false);
};

const setupCoin98WalletState = (): Coin98WalletState => {
  const wallet = window.coin98!;

  return {
    wallet,
  };
};

const Coin98Wallet: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  options,
  store,
  provider,
  logger,
}) => {
  const _state = setupCoin98WalletState();


  const getAccounts = (): Array<Account> => {
    const accountId = _state.wallet.near.account;

    if (!accountId) {
      return [];
    }

    return [{ accountId: _state.wallet.near.account }];
  };


  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const { contract } = store.getState();

    if (!contract) {
      throw new Error("Wallet not signed in");
    }

    const account = getActiveAccount(store.getState());

    if (!account) {
      throw new Error("No active account");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || account.accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };

  return {
    async signIn({ contractId }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.near.connect({ prefix: "near_selector", contractId });
      return getAccounts();
    },

    async signOut() {
      // Ignore if unsuccessful (returns false).
      await _state.wallet.near.disconnect();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const accountId = account.accountId;
      const pubKey = await _state.wallet.near.signer.getPublicKey(accountId);
      const block = await provider.block({ finality: "final" });

      const data = {
        accountId,
        message,
        blockId: block.header.hash,
        publicKey: Buffer.from(pubKey.data).toString("base64"),
        keyType: pubKey.keyType,
      };
      const encoded = JSON.stringify(data);

      throw new Error(`Method not supported by ${metadata.name}`);

      const signed = await _state.wallet.near.signer.signMessage(
        new Uint8Array(Buffer.from(encoded)),
        accountId,
        options.network.networkId
      );

      return {
        ...data,
        signature: Buffer.from(signed.signature).toString("base64"),
        keyType: signed.publicKey.keyType,
      };
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });
      const signedTransactions = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        _state.wallet.near.signer,
        options.network
      );

      return provider.sendTransaction(signedTransactions[0]);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const signedTransactions = await signTransactions(
        transformTransactions(transactions),
        _state.wallet.near.signer,
        options.network
      );

      logger.log(
        "signAndSendTransactions:signedTransactions",
        signedTransactions
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTransactions.length; i++) {
        results.push(await provider.sendTransaction(signedTransactions[i]));
      }

      return results;
    },
  };
};

export const setupCoin98Wallet = ({
  iconUrl = defaultCoin98Logo
}: Coin98WalletParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile) {
      return null;
    }

    return {
      id: "coin98-wallet",
      type: "injected",
      metadata: {
        name: "Coin98 Wallet",
        description: "Using a Decentralized Wallet With Experiences of a Centralized One",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
        deprecated: false,
        available: installed,
      },
      init: Coin98Wallet,
    };
  };
};
