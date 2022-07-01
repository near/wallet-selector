import {
  BridgeWallet,
  getActiveAccount,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import {
  AppMetadata,
  AppNear,
  Network,
  NightlyConnectModal,
  NearAppInfo,
} from "@nightlylabs/connect";
import { Signer, transactions as nearTransactions, utils } from "near-api-js";
import { PublicKey } from "near-api-js/lib/utils";

const setupNightlyConnectState = async (
  params: NearAppInfo
): Promise<AppNear> => {
  const client = await AppNear.build(params);
  return client;
};

export interface NightlyConnectParams {
  appMetadata: AppMetadata;
  url?: string;
  timeout?: number;
}
const NightlyConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: NightlyConnectParams }
> = async ({ store, params, logger, options, provider, emitter }) => {
  let connectedAccounts: Array<{ accountId: string; publicKey: PublicKey }> =
    [];
  let client: AppNear | undefined;

  const modal = new NightlyConnectModal();

  const getAccounts = () => {
    return connectedAccounts;
  };

  const signOut = async (): Promise<void> => {
    client?.ws.close();
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const account = getActiveAccount(store.getState());
    const { contract } = store.getState();

    if (!account || !contract) {
      throw new Error("Wallet not signed in");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || account.accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };
  const signer: Signer = {
    createKey: () => {
      throw new Error("Not implemented");
    },
    getPublicKey: async (accountId) => {
      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find public key for account");
      }

      return utils.PublicKey.from(account.publicKey);
    },
    signMessage: async (message, accountId) => {
      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find account for signing");
      }

      try {
        const tx = nearTransactions.Transaction.decode(Buffer.from(message));
        const signedTx = await client!.signTransaction(tx);

        return {
          signature: signedTx.signature.data,
          publicKey: tx.publicKey,
        };
      } catch (err) {
        logger.log("Failed to sign message");
        logger.error(err);

        throw Error("Invalid message. Only transactions can be signed");
      }
    },
  };
  return {
    async signIn() {
      return new Promise((resolve, reject) => {
        const existingAccounts = getAccounts();

        if (existingAccounts.length) {
          return resolve(existingAccounts);
        }

        try {
          setupNightlyConnectState({
            ...params,
            onUserConnect: (pk) => {
              connectedAccounts.push(pk);
              modal.onClose = undefined;
              modal.closeModal();
              resolve(getAccounts());
            },
          }).then((appClient) => {
            client = appClient;
            // Add hook onclose
            client.ws.onclose = () => {
              client = undefined;
              connectedAccounts = [];
              emitter.emit("signedOut", null);
            };
            modal.openModal(client.sessionId, Network.Near);
            modal.onClose = () => {
              reject(new Error("User cancelled pairing"));
            };
          });
        } catch (err) {
          signOut();
          reject(err);
        }
      });
    },

    signOut,

    async getAccounts() {
      return getAccounts().map(({ accountId }) => ({ accountId }));
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const accounts = getAccounts();

      if (!client?.sessionId || !accounts.length) {
        throw new Error("Wallet not signed in");
      }

      const [signedTx] = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        signer,
        options.network
      );
      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const accounts = getAccounts();

      if (!client?.sessionId || !accounts.length) {
        throw new Error("Wallet not signed in");
      }

      const signedTxs = await signTransactions(
        transformTransactions(transactions),
        signer,
        options.network
      );
      return Promise.all(
        signedTxs.map((signedTx) => provider.sendTransaction(signedTx))
      );
    },
  };
};

export type SetupNightlyConnectParams = NightlyConnectParams & {
  iconUrl?: string;
};

export function setupNightlyConnect({
  appMetadata,
  timeout,
  url,
  iconUrl = "./assets/nightly-connect.png",
}: SetupNightlyConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "nightly-connect",
      type: "bridge",
      metadata: {
        name: "Nightly Connect",
        description: null,
        iconUrl: iconUrl,
        deprecated: false,
      },
      init: (options) => {
        return NightlyConnect({
          ...options,
          params: {
            appMetadata,
            timeout,
            url,
          },
        });
      },
    };
  };
}
