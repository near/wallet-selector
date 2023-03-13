import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InstantLinkWallet,
  NetworkId,
} from "@near-wallet-selector/core";
import icon from "./icon";
import { KeypomWallet } from "./keypom-wallet";

export interface KeypomParams {
  networkId: NetworkId;
  iconUrl?: string;
  deprecated?: boolean;
  desiredUrl?: string;
  contractId: string;
}

interface KeypomInitializeOptions {
  keypomWallet: KeypomWallet;
}

const Keypom: WalletBehaviourFactory<
  InstantLinkWallet,
  KeypomInitializeOptions
> = async ({ logger, keypomWallet }) => {
  // return the wallet interface for wallet-selector
  return {
    get networkId() {
      return keypomWallet.networkId;
    },
    get contractId() {
      return keypomWallet.contractId;
    },

    // async getAccount() {
    // 	return keypomWallet.getAccount();
    // },

    async getAccounts() {
      logger.log("Keypom:account");
      return keypomWallet.getAccounts();
    },

    async switchAccount(id) {
      return await keypomWallet.switchAccount(id);
    },

    getAccountId() {
      logger.log("Keypom:getAccountId");
      return keypomWallet.getAccountId();
    },

    async isSignedIn() {
      logger.log("Keypom:isSignedIn");
      return await keypomWallet.isSignedIn();
    },

    async getAvailableBalance() {
      logger.log("Keypom:isSignedIn");
      return await keypomWallet.getAvailableBalance();
    },

    async verifyOwner() {
      throw Error("KeypomWallet:verifyOwner is deprecated");
    },

    async signIn() {
      logger.log("Keypom:signIn");
      return await keypomWallet.signIn();
    },

    async signOut() {
      logger.log("Keypom:signOut");
      return await keypomWallet.signOut();
    },

    async signAndSendTransaction(params) {
      return await keypomWallet.signAndSendTransaction(params);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("Keypom:signAndSendTransactions", { transactions });
      return await keypomWallet.signAndSendTransactions(transactions);
    },
  };
};

export function setupKeypom({
  iconUrl = icon,
  deprecated = false,
  desiredUrl,
  networkId,
  contractId,
}: KeypomParams): WalletModuleFactory<InstantLinkWallet> {
  return async () => {
    const keypomWallet = new KeypomWallet({
      contractId,
      networkId,
      desiredUrl,
    });

    return {
      id: "keypom",
      type: "instant-link",
      metadata: {
        name: "Keypom Account",
        description: null,
        iconUrl,
        deprecated,
        available: true,
        contractId,
        runOnStartup: true, // check url here
      },
      init: async (config) =>
        Keypom({
          ...config,
          keypomWallet,
        }),
    };
  };
}
