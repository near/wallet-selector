import { utils, keyStores, KeyPair, InMemorySigner } from "near-api-js";
import { SignedTransaction } from "near-api-js/lib/transaction";
import type { AppMetadata, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
  Transaction,
  Account,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";

import WalletConnectClient from "./wallet-connect-client";
import { getTransactionsWithKeyPairs } from "./access-keys";

export interface WalletConnectParams {
  projectId: string;
  metadata: AppMetadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
}

type WalletConnectExtraOptions = Pick<WalletConnectParams, "chainId"> &
  Required<Pick<WalletConnectParams, "projectId" | "metadata" | "relayUrl">>;

interface WalletConnectState {
  client: WalletConnectClient;
  keystore: keyStores.BrowserLocalStorageKeyStore;
  session: SessionTypes.Settled | null;
  subscriptions: Array<Subscription>;
}

const setupWalletConnectState = async (
  id: string,
  params: WalletConnectExtraOptions
): Promise<WalletConnectState> => {
  const client = new WalletConnectClient();
  const keystore = new keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    `near-wallet-selector:${id}:keystore:`
  );
  let session: SessionTypes.Settled | null = null;

  await client.init(params);

  if (client.session.topics.length) {
    session = await client.session.get(client.session.topics[0]);
  }

  return {
    client,
    keystore,
    session,
    subscriptions: [],
  };
};

const WalletConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: WalletConnectExtraOptions }
> = async ({ id, options, store, params, provider, emitter, logger }) => {
  const _state = await setupWalletConnectState(id, params);

  const signer = new InMemorySigner(_state.keystore);

  const getChainId = () => {
    if (params.chainId) {
      return params.chainId;
    }

    const { networkId } = options.network;

    if (["mainnet", "testnet", "betanet"].includes(networkId)) {
      return `near:${networkId}`;
    }

    throw new Error("Invalid chain id");
  };

  const getAccounts = (accountIds?: Array<string>) => {
    const ids = accountIds || _state.session?.state.accounts || [];

    return ids.map((x) => ({ accountId: x.split(":")[2] }));
  };

  const cleanup = async () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    await _state.keystore.clear();

    _state.subscriptions = [];
    _state.session = null;
  };

  const signAndSendTransaction = async (transaction: Transaction) => {
    const signedTx = await _state.client
      .request<Buffer>({
        timeout: 30 * 1000,
        topic: _state.session!.topic,
        chainId: getChainId(),
        request: {
          method: "near_signTransaction",
          params: transaction,
        },
      })
      .then((result) => SignedTransaction.decode(new Buffer(result)));

    return provider.sendTransaction(signedTx);
  };

  const signAndSendTransactions = async (transactions: Array<Transaction>) => {
    if (!transactions.length) {
      return [];
    }

    const signedTxs = await _state.client
      .request<Array<Buffer>>({
        timeout: 30 * 1000,
        topic: _state.session!.topic,
        chainId: getChainId(),
        request: {
          method: "near_signTransactions",
          params: { transactions },
        },
      })
      .then((results) => {
        return results.map((x) => SignedTransaction.decode(new Buffer(x)));
      });

    return Promise.all(
      signedTxs.map((signedTx) => provider.sendTransaction(signedTx))
    );
  };

  const signOut = async () => {
    if (_state.session) {
      const accounts = getAccounts();

      await _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session!.topic,
        chainId: getChainId(),
        request: {
          method: "near_signOut",
          params: {
            accounts: await Promise.all(
              accounts.map(async (account) => {
                const keyPair = await _state.keystore.getKey(
                  options.network.networkId,
                  account.accountId
                );

                return {
                  accountId: account.accountId,
                  publicKey: keyPair ? keyPair.getPublicKey().toString() : null,
                };
              })
            ).then((results) => results.filter((x) => x.publicKey)),
          },
        },
      });

      await _state.client.disconnect({
        topic: _state.session.topic,
        reason: {
          code: 5900,
          message: "User disconnected",
        },
      });
    }

    await cleanup();
  };

  const createAccountKeyPairs = (accounts: Array<Account>) => {
    return accounts.map((account) => ({
      accountId: account.accountId,
      keyPair: utils.KeyPair.fromRandom("ed25519"),
    }));
  };

  const isFunctionCallTransaction = (transaction: Transaction) => {
    const accounts = getAccounts();
    const { contract } = store.getState();

    if (!accounts.some((x) => x.accountId === transaction.signerId)) {
      return false;
    }

    if (transaction.receiverId !== contract!.contractId) {
      return false;
    }

    return transaction.actions.every((action) => {
      if (action.type !== "FunctionCall") {
        return false;
      }

      const { methodName, deposit } = action.params;

      if (
        contract!.methodNames.length &&
        !contract!.methodNames.includes(methodName)
      ) {
        return false;
      }

      return parseFloat(deposit) <= 0;
    });
  };

  const setupEvents = () => {
    _state.subscriptions.push(
      _state.client.on("pairing_created", (pairing) => {
        logger.log("Pairing Created", pairing);
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_updated", (updatedSession) => {
        logger.log("Session Updated", updatedSession);

        if (updatedSession.topic === _state.session?.topic) {
          (async () => {
            const updatedAccounts = getAccounts(updatedSession.state.accounts);
            const accounts = getAccounts();

            // Determine accounts that have been removed.
            for (let i = 0; i < accounts.length; i += 1) {
              const account = accounts[i];
              const valid = updatedAccounts.some(
                (x) => x.accountId === account.accountId
              );

              if (valid) {
                continue;
              }

              logger.log("Removing key pair for", account.accountId);

              await _state.keystore.removeKey(
                options.network.networkId,
                account.accountId
              );
            }

            // TODO: Determine accounts that have been added.
            // Maybe we should defer adding keys here because we might not have a pairing connection established.
            // The idea here is we would handle if we can't find the keyPair for a given account id before signing a transaction.

            _state.session = updatedSession;
            emitter.emit("accountsChanged", { accounts: getAccounts() });
          })();
        }
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_deleted", async (deletedSession) => {
        logger.log("Session Deleted", deletedSession);

        if (deletedSession.topic === _state.session?.topic) {
          await cleanup();
          emitter.emit("signedOut", null);
        }
      })
    );
  };

  if (_state.session) {
    setupEvents();
  }

  return {
    async signIn({ contractId, methodNames }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      try {
        _state.session = await _state.client.connect({
          metadata: params.metadata,
          timeout: 30 * 1000,
          permissions: {
            blockchain: {
              chains: [getChainId()],
            },
            jsonrpc: {
              methods: [
                "near_signTransaction",
                "near_signTransactions",
                "near_signIn",
                "near_signOut",
              ],
            },
          },
        });

        const accounts = getAccounts();
        const accountKeyPairs = createAccountKeyPairs(accounts);

        await _state.client.request({
          timeout: 30 * 1000,
          topic: _state.session!.topic,
          chainId: getChainId(),
          request: {
            method: "near_signIn",
            params: {
              contractId,
              methodNames,
              accounts: accountKeyPairs.map(({ accountId, keyPair }) => ({
                accountId,
                publicKey: keyPair.getPublicKey().toString(),
              })),
            },
          },
        });

        for (let i = 0; i < accountKeyPairs.length; i += 1) {
          const { accountId, keyPair } = accountKeyPairs[i];

          await _state.keystore.setKey(
            options.network.networkId,
            accountId,
            keyPair
          );
        }

        setupEvents();

        return getAccounts();
      } catch (err) {
        await signOut();

        throw err;
      }
    },

    signOut,

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const accounts = getAccounts();
      const { contract } = store.getState();

      if (!_state.session || !accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const [{ transaction, keyPair }] = await getTransactionsWithKeyPairs(
        [
          {
            signerId: signerId || accounts[0].accountId,
            receiverId: receiverId || contract.contractId,
            actions,
          },
        ],
        _state.keystore,
        options.network
      );

      if (!keyPair) {
        // TODO: Make AddKey request (if it's only a FunctionCall list of Actions).
        return signAndSendTransaction(transaction);
      }

      const [signedTx] = await signTransactions(
        [transaction],
        signer,
        options.network
      );

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const accounts = getAccounts();
      const { contract } = store.getState();

      if (!_state.session || !accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const pendingAddKeyTransactions: Array<Transaction> = [];
      const pendingKeyPairs: Record<string, KeyPair> = {};
      const txs = transactions.map((x) => ({
        signerId: x.signerId || accounts[0].accountId,
        receiverId: x.receiverId,
        actions: x.actions,
      }));

      for (let i = 0; i < txs.length; i += 1) {
        const transaction = txs[i];

        if (!isFunctionCallTransaction(transaction)) {
          return signAndSendTransactions(txs);
        }

        const keyPair = await _state.keystore.getKey(
          options.network.networkId,
          transaction.signerId
        );

        if (!keyPair) {
          const newKeyPair = utils.KeyPair.fromRandom("ed25519");

          pendingKeyPairs[transaction.signerId] = newKeyPair;

          pendingAddKeyTransactions.push({
            signerId: transaction.signerId,
            receiverId: transaction.signerId,
            actions: [
              {
                type: "AddKey",
                params: {
                  publicKey: newKeyPair.getPublicKey().toString(),
                  accessKey: {
                    permission: {
                      receiverId: contract.contractId,
                      methodNames: contract.methodNames,
                    },
                  },
                },
              },
            ],
          });
        }
      }

      if (pendingAddKeyTransactions.length) {
        await signAndSendTransactions(pendingAddKeyTransactions);
      }

      for (const accountId in pendingKeyPairs) {
        const keyPair = pendingKeyPairs[accountId];

        await _state.keystore.setKey(
          options.network.networkId,
          accountId,
          keyPair
        );
      }

      const signedTxs = await signTransactions(txs, signer, options.network);

      return Promise.all(
        signedTxs.map((signedTx) => provider.sendTransaction(signedTx))
      );
    },
  };
};

export function setupWalletConnect({
  projectId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = "./assets/wallet-connect-icon.png",
}: WalletConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "wallet-connect",
      type: "bridge",
      metadata: {
        name: "WalletConnect",
        description: null,
        iconUrl,
        deprecated: false,
      },
      init: (options) => {
        return WalletConnect({
          ...options,
          params: {
            projectId,
            metadata,
            relayUrl,
            chainId,
          },
        });
      },
    };
  };
}
