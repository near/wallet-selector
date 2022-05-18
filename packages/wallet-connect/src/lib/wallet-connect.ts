import { utils, keyStores, KeyPair, InMemorySigner } from "near-api-js";
import { AppMetadata, SessionTypes } from "@walletconnect/types";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Subscription,
  Transaction,
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
> = async ({ id, options, params, provider, emitter, logger }) => {
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

  const disconnect = async () => {
    if (_state.session) {
      const transactions: Array<Transaction> = [];
      const accounts = getAccounts();

      for (let i = 0; i < accounts.length; i += 1) {
        const account = accounts[i];
        const keyPair = await _state.keystore.getKey(
          options.network.networkId,
          account.accountId
        );

        transactions.push({
          signerId: account.accountId,
          receiverId: account.accountId,
          actions: [
            {
              type: "DeleteKey",
              params: {
                publicKey: keyPair.getPublicKey().toString(),
              },
            },
          ],
        });
      }

      await _state.client.request({
        timeout: 30 * 1000,
        topic: _state.session.topic,
        chainId: getChainId(),
        request: {
          method: "near_signAndSendTransactions",
          params: { transactions },
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

  const requestFunctionCallAccess = async () => {
    const accounts = getAccounts();

    const { keyPairs, transactions } = accounts.reduce<{
      transactions: Array<Transaction>;
      keyPairs: Record<string, KeyPair>;
    }>(
      (result, account) => {
        const keyPair = utils.KeyPair.fromRandom("ed25519");

        result.keyPairs[account.accountId] = keyPair;

        result.transactions.push({
          signerId: account.accountId,
          receiverId: account.accountId,
          actions: [
            {
              type: "AddKey",
              params: {
                publicKey: keyPair.getPublicKey().toString(),
                accessKey: {
                  permission: {
                    receiverId: options.contractId,
                    methodNames: options.methodNames,
                  },
                },
              },
            },
          ],
        });

        return result;
      },
      { keyPairs: {}, transactions: [] }
    );

    await _state.client.request({
      timeout: 30 * 1000,
      topic: _state.session!.topic,
      chainId: getChainId(),
      request: {
        method: "near_signAndSendTransactions",
        params: { transactions },
      },
    });

    for (const accountId in keyPairs) {
      const keyPair = keyPairs[accountId];
      await _state.keystore.setKey(
        options.network.networkId,
        accountId,
        keyPair
      );
    }
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
          emitter.emit("disconnected", null);
        }
      })
    );
  };

  if (_state.session) {
    setupEvents();
  }

  return {
    async connect() {
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
                "near_signAndSendTransaction",
                "near_signAndSendTransactions",
              ],
            },
          },
        });

        await requestFunctionCallAccess();

        setupEvents();

        return getAccounts();
      } catch (err) {
        await disconnect();

        throw err;
      }
    },

    disconnect,

    async getAccounts() {
      return getAccounts();
    },

    async signAndSendTransaction({
      signerId,
      receiverId = options.contractId,
      actions,
    }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      if (!_state.session) {
        throw new Error("Wallet not connected");
      }

      const accounts = getAccounts();
      const [{ transaction, keyPair }] = await getTransactionsWithKeyPairs(
        [
          {
            signerId: signerId || accounts[0].accountId,
            receiverId,
            actions,
          },
        ],
        _state.keystore,
        options.network
      );

      if (!keyPair) {
        // TODO: Make AddKey request (if it's only a FunctionCall list of Actions).
        return _state.client.request({
          timeout: 30 * 1000,
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signAndSendTransaction",
            params: transaction,
          },
        });
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

      if (!_state.session) {
        throw new Error("Wallet not connected");
      }

      const accounts = getAccounts();
      const results = await getTransactionsWithKeyPairs(
        transactions.map((x) => ({
          signerId: x.signerId || accounts[0].accountId,
          receiverId: x.receiverId,
          actions: x.actions,
        })),
        _state.keystore,
        options.network
      );

      if (results.some((x) => !x.keyPair)) {
        return _state.client.request({
          timeout: 30 * 1000,
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signAndSendTransactions",
            params: {
              transactions: results.map((x) => x.transaction),
            },
          },
        });
      }

      const signedTxs = await signTransactions(
        results.map((x) => x.transaction),
        signer,
        options.network
      );

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
