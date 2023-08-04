import type {
  InjectedWallet,
  WalletBehaviourFactory,
  WalletModuleFactory,
  Transaction,
  Account,
  Optional,
} from "@near-wallet-selector/core";

import { createAction } from "@near-wallet-selector/wallet-utils";

import { isMobile } from "is-mobile";
import type { InjectedRamperWallet } from "./injected-ramper-wallet";
import icon from "./icon";
import {
  init,
  AUTH_PROVIDER,
  WALLET_PROVIDER,
  THEME,
  signIn,
  sendTransaction,
} from "@ramper/near";
import type { Action } from "near-api-js/lib/transaction";

interface RamperWalletState {
  wallet: InjectedRamperWallet;
}

const setupRamperWalletState = (): RamperWalletState => {
  const wallet = window.ramper as InjectedRamperWallet;
  return {
    wallet,
  };
};

const RamperWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  options,
  logger,
}) => {
  await init({
    appName: "Ramper Wallet",
    authProviders: [
      AUTH_PROVIDER.GOOGLE,
      AUTH_PROVIDER.FACEBOOK,
      AUTH_PROVIDER.TWITTER,
      AUTH_PROVIDER.APPLE,
      AUTH_PROVIDER.EMAIL,
    ],
    walletProviders: [WALLET_PROVIDER.NEAR_WALLET],
    network: options.network.networkId,
    theme: THEME.DARK,
  });

  const _state = setupRamperWalletState();

  const getAccounts = async (): Promise<Array<Account>> => {
    const { wallets } = _state.wallet.getUser();
    const { publicKey: accountId } = wallets.near;

    if (!accountId) {
      return [];
    }

    return [
      {
        accountId,
      },
    ];
  };

  const transformTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    const accounts = await getAccounts();
    const { contract } = store.getState();

    if (!accounts.length || !contract) {
      throw new Error("Wallet not signed in");
    }

    return transactions.map((transaction) => {
      const parsedActions = transaction.actions.map((action) =>
        createAction(action)
      );

      return {
        receiverId: transaction.receiverId || contract.contractId,
        actions: parsedActions,
      };
    });
  };

  return {
    async signIn() {
      await signIn(); // signIn first because if getUser break function
      const existingAccounts = await getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }
      return getAccounts();
    },

    async signOut() {
      _state.wallet.signOut();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("Ramper Wallet:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({
      receiverId,
      actions,
    }: Omit<Transaction, "signerId">) {
      logger.log("signAndSendTransaction", { receiverId, actions });

      const { contract } = store.getState();
      const accounts = await getAccounts();

      if (!accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const transactions: Array<{
        receiverId: string;
        actions: Array<Action>;
      }> = await transformTransactions([{ receiverId, actions }]);

      const { result } = await sendTransaction({
        transactionActions: transactions,
      });

      return result[0];
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const transactionsParsed: Array<{
        receiverId: string;
        actions: Array<Action>;
      }> = await transformTransactions(transactions);

      const { result: results } = await sendTransaction({
        transactionActions: transactionsParsed,
      });

      return results;
    },
  };
};

export interface RamperWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

export function setupRamperWallet({
  iconUrl = icon,
  deprecated = false,
}: RamperWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    return {
      id: "ramper-wallet",
      type: "injected",
      metadata: {
        name: "Ramper Wallet",
        description: null,
        iconUrl,
        downloadUrl: "https://docs.ramper.xyz/",
        deprecated,
        available: true,
      },
      init: RamperWallet,
    };
  };
}
