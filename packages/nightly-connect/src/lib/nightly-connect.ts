import { AppNear, NightlyConnectModal } from "@nightlylabs/connect";
import { NearAppInfo as NightlyConnectParams } from "@nightlylabs/connect/lib/sdk/src/types/AppInfo";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Optional,
  Transaction,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import { PublicKey } from "near-api-js/lib/utils";
import { Signer, utils, transactions as nearTransactions } from "near-api-js";

const setupNightlyConnectState = async (
  params: NightlyConnectParams
): Promise<AppNear> => {
  const client = await AppNear.build(params);
  return client;
};

const NightlyConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: SetupNightlyConnectParams }
> = async ({ store, params, logger, options, provider }) => {
  const connectedAccounts: Array<{ accountId: string; publicKey: PublicKey }> =
    [];
  let client: AppNear | undefined;
  const modal = new NightlyConnectModal();

  const getAccounts = () => {
    return connectedAccounts;
  };
  const signOut = async (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("Closing connection timed out");
      }, 5000);

      client!.ws.on("close", () => {
        clearTimeout(timer);
        resolve();
      });
      client?.ws.close();
    });

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const accounts = getAccounts();
    const { contract } = store.getState();

    if (!accounts.length || !contract) {
      throw new Error("Wallet not signed in");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || accounts[0].accountId,
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
            icon: params.icon || "./assets/nightly-connect.png",
            onUserConnect: (pk) => {
              connectedAccounts.push(pk);
              modal.closeModal();
              resolve(getAccounts());
            },
          }).then((appClient) => {
            client = appClient;

            modal.openModal(client.sessionId);
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

export interface SetupNightlyConnectParams {
  application: string;
  description: string;
  additionalInfo: string;
  icon?: string;
  url?: string;
  timeout?: number;
}

export function setupNightlyConnect({
  additionalInfo,
  application,
  description,
  icon,
  timeout,
  url,
}: SetupNightlyConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "nightly-connect",
      type: "bridge",
      metadata: {
        name: "NightlyConnect",
        description: description,
        iconUrl: "./assets/nightly-connect.png",
        deprecated: false,
      },
      init: (options) => {
        return NightlyConnect({
          ...options,
          params: {
            additionalInfo,
            application,
            description,
            icon: icon,
            timeout,
            url,
          },
        });
      },
    };
  };
}
