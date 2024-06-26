import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Account,
  Optional,
  Transaction,
  SignMessageParams,
  SignedMessage,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";
import type { InjectedCoin98 } from "./injected-coin98-wallet";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import icon from "./icon";

declare global {
  interface Window {
    coin98: InjectedCoin98;
  }
}

export interface Coin98WalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface Coin98WalletState {
  wallet: InjectedCoin98;
}

const isInstalled = () => {
  return !!window.coin98;
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

  const getAccounts = async (): Promise<Array<Account>> => {
    const accountId = _state.wallet.near.account;

    if (!accountId) {
      return [];
    }

    const publicKey = await _state.wallet.near.signer.getPublicKey(
      accountId,
      options.network.networkId
    );

    return [
      {
        accountId,
        publicKey: publicKey ? publicKey.toString() : undefined,
      },
    ];
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
      const existingAccounts = await getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.near.connect({ prefix: "near_selector", contractId });
      return getAccounts();
    },

    async signMessage({message, nonce, recipient, state}: SignMessageParams): Promise<SignedMessage>{
      if (!_state.wallet) {
        throw new Error("Wallet is not installed");
      }

      logger.log("Coin98:signMessage", {
        message,
        nonce,
        recipient,
        state,
      });

      const signature = await _state.wallet.near.signMessage({
        message,
        nonce,
        recipient,
        state,
      });
    
      return signature;
    },

    async signOut() {
      // Ignore if unsuccessful (returns false).
      await _state.wallet.near.disconnect();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner() {
      throw new Error(`Method not supported by ${metadata.name}`);
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
  iconUrl = icon,
  deprecated = false,
}: Coin98WalletParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = isInstalled();

    return {
      id: "coin98-wallet",
      type: "injected",
      metadata: {
        name: "Coin98 Wallet",
        description:
          "Using a Decentralized Wallet With Experiences of a Centralized One",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
        deprecated,
        available: installed,
      },
      init: Coin98Wallet,
    };
  };
};
