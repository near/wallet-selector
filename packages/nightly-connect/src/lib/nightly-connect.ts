import { Signer, transactions as nearTransactions, utils } from "near-api-js";
import {
  AppMetadata,
  AppNear,
  NETWORK,
  NightlyConnectModal,
} from "@nightlylabs/connect";
import {
  BridgeWallet,
  getActiveAccount,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";

export interface NightlyConnectParams {
  appMetadata: AppMetadata;
  url?: string;
  timeout?: number;
}

interface NightlyConnectAccount {
  accountId: string;
  publicKey: utils.PublicKey;
}

interface NightlyConnectState {
  client: AppNear | null;
  modal: NightlyConnectModal;
  accounts: Array<NightlyConnectAccount>;
}

const setupNightlyConnectState = (): NightlyConnectState => {
  return {
    client: null,
    modal: new NightlyConnectModal(),
    accounts: [],
  };
};

const NightlyConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: NightlyConnectParams }
> = async ({ metadata, store, params, logger, options, provider, emitter }) => {
  const _state = setupNightlyConnectState();

  const getAccounts = () => {
    return _state.accounts;
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
        const signedTx = await _state.client!.signTransaction(tx);

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

  const signOut = async () => {
    _state.client?.ws.close();
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

  return {
    async signIn() {
      return new Promise((resolve, reject) => {
        const existingAccounts = getAccounts();

        if (existingAccounts.length) {
          return resolve(existingAccounts);
        }

        try {
          AppNear.build({
            ...params,
            onUserConnect: (account) => {
              _state.accounts.push(account);
              _state.modal.onClose = undefined;
              _state.modal.closeModal();
              resolve(getAccounts());
            },
          }).then((client) => {
            client.ws.onclose = () => {
              _state.client = null;
              _state.accounts = [];
              emitter.emit("signedOut", null);
            };
            _state.client = client;
            _state.modal.openModal(client.sessionId, NETWORK.NEAR);
            _state.modal.onClose = () => {
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

    async verifyOwner({ message }) {
      logger.log("NightlyConnect:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const accounts = getAccounts();

      if (!_state.client?.sessionId || !accounts.length) {
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

      if (!_state.client?.sessionId || !accounts.length) {
        throw new Error("Wallet not signed in");
      }

      const signedTxs = await signTransactions(
        transformTransactions(transactions),
        signer,
        options.network
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTxs.length; i++) {
        results.push(await provider.sendTransaction(signedTxs[i]));
      }

      return results;
    },
  };
};

export type SetupNightlyConnectParams = NightlyConnectParams & {
  iconUrl?: string;
  deprecated?: boolean;
};

export function setupNightlyConnect({
  appMetadata,
  timeout,
  url,
  iconUrl = "./assets/nightly-connect.png",
  deprecated = false,
}: SetupNightlyConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "nightly-connect",
      type: "bridge",
      metadata: {
        name: "Nightly Connect",
        description: null,
        iconUrl: iconUrl,
        deprecated,
        available: true,
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
