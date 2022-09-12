import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";
import { isMobile } from "is-mobile";
import { enable, getSnapAccounts, signTransactions } from "./methods";
import { isMetaMaskAvailable } from "./utils";

const isDev = true;

const NearSnapWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  provider,
  store,
}) => {
  const network = options.network.networkId as "testnet" | "mainnet";

  return {
    async signIn() {
      // Sign in to My Wallet for access to account(s).
      await enable(isDev);

      return await getSnapAccounts(isDev, network);
    },

    async signOut() {
      // Nothing to do here!!
    },

    async getAccounts() {
      return await getSnapAccounts(isDev, network);
    },

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async verifyOwner() {},

    async signAndSendTransaction({ receiverId, actions }) {
      const accountPayload = await getSnapAccounts(isDev, network);
      const { accountId, publicKey } = accountPayload[0];

      const accessKey = await provider.viewAccessKey({ accountId, publicKey });

      const { contract } = store.getState();

      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      const signedTxs = await signTransactions(isDev, network, [
        {
          receiverId: receiverId || contract.contractId,
          actions,
          nonce: ++accessKey.nonce,
          recentBlockHash: accessKey.block_hash,
        },
      ]);

      return await provider.sendTransaction(signedTxs[0]);
    },

    async signAndSendTransactions({ transactions }) {
      const accountPayload = await getSnapAccounts(isDev, network);
      const { accountId, publicKey } = accountPayload[0];
      const accessKey = await provider.viewAccessKey({ accountId, publicKey });
      let nonce = accessKey.nonce;

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
}

export const setupNearSnap = ({
  iconUrl = "./assets/near-snap-icon.png",
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
        deprecated: false,
        downloadUrl: "https://metamask.io/flask/",
        available: await isMetaMaskAvailable(),
      },
      init: NearSnapWallet,
    };
  };
};
