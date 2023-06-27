import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";
import { isMobile } from "is-mobile";
import { enable, getSnapAccounts, signTransactions } from "./methods";
import { isMetaMaskAvailable } from "./utils";
import icon from "../lib/icon";

const isDev = false;

const NearSnapWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  provider,
  store,
  metadata,
}) => {
  const network = options.network.networkId as "testnet" | "mainnet";

  return {
    async signIn() {
      await enable(isDev);
      return await getSnapAccounts(isDev, network);
    },

    async signOut() {
      // Nothing to do here!!
    },

    async getAccounts() {
      return await getSnapAccounts(isDev, network);
    },

    async verifyOwner() {
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ receiverId, actions }) {
      const accountPayload = await getSnapAccounts(isDev, network);
      const { accountId, publicKey } = accountPayload[0];

      const accessKey = await provider.viewAccessKey({ accountId, publicKey });

      const { contract } = store.getState();
      let nonce = parseInt(accessKey.nonce.toString());
      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      const signedTxs = await signTransactions(isDev, network, [
        {
          receiverId: receiverId || contract.contractId,
          actions,
          nonce: ++nonce,
          recentBlockHash: accessKey.block_hash,
        },
      ]);

      return await provider.sendTransaction(signedTxs[0]);
    },

    async signAndSendTransactions({ transactions }) {
      const accountPayload = await getSnapAccounts(isDev, network);
      const { accountId, publicKey } = accountPayload[0];
      const accessKey = await provider.viewAccessKey({ accountId, publicKey });
      let nonce = parseInt(accessKey.nonce.toString());

      const signedTxs = await signTransactions(
        isDev,
        network,
        transactions.map(({ receiverId, actions }) => ({
          receiverId,
          actions,
          nonce: ++nonce,
          recentBlockHash: accessKey.block_hash,
        }))
      );

      return Promise.all(signedTxs.map((tx) => provider.sendTransaction(tx)));
    },
  };
};

export interface NearSnapParams {
  iconUrl?: string;
  deprecated?: boolean;
}

export const setupNearSnap = ({
  iconUrl = icon,
  deprecated = false,
}: NearSnapParams = {}): WalletModuleFactory<InjectedWallet> => {
  return async () => {
    if (isMobile()) {
      return null;
    }

    return {
      id: "near-snap",
      type: "injected",
      metadata: {
        name: "NearSnap",
        description: null,
        iconUrl,
        deprecated,
        downloadUrl: "https://metamask.io/flask/",
        available: await isMetaMaskAvailable(),
      },
      init: NearSnapWallet,
    };
  };
};
