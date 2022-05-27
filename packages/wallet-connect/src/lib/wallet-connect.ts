import { utils, keyStores, InMemorySigner } from "near-api-js";
import { SignedTransaction } from "near-api-js/lib/transaction";
import type { SignClientTypes, SessionTypes } from "@walletconnect/types";
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
import { retry } from "./retry";

export interface WalletConnectParams {
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
}

interface WalletConnectExtraOptions {
  chainId?: string;
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl: string;
}

interface WalletConnectState {
  client: WalletConnectClient;
  keystore: keyStores.BrowserLocalStorageKeyStore;
  session: SessionTypes.Struct | null;
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
  let session: SessionTypes.Struct | null = null;

  await client.init({
    projectId: params.projectId,
    metadata: params.metadata,
    relayUrl: params.relayUrl,
  });

  if (client.session.length) {
    const lastKeyIndex = client.session.keys.length - 1;
    session = client.session.get(client.session.keys[lastKeyIndex]);
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

  const createAccountKeyPairs = (accounts: Array<Account>) => {
    return accounts.map((account) => ({
      accountId: account.accountId,
      keyPair: utils.KeyPair.fromRandom("ed25519"),
    }));
  };

  const getAccounts = (accountIds?: Array<string>) => {
    const ids = accountIds || _state.session?.namespaces["near"].accounts || [];

    return ids.map((x) => ({ accountId: x.split(":")[2] }));
  };

  const cleanup = async () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    await _state.keystore.clear();

    _state.subscriptions = [];
    _state.session = null;
  };

  const requestSignAndSendTransaction = async (transaction: Transaction) => {
    const signedTx = await _state.client
      .request<Buffer>({
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

  const requestSignAndSendTransactions = async (
    transactions: Array<Transaction>
  ) => {
    if (!transactions.length) {
      return [];
    }

    const signedTxs = await _state.client
      .request<Array<Buffer>>({
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

  const requestSignIn = async (
    contractId: string,
    methodNames: Array<string> | undefined,
    accounts: Array<Account>
  ) => {
    const accountKeyPairs = createAccountKeyPairs(accounts);

    await _state.client.request({
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
  };

  const signOut = async () => {
    if (_state.session) {
      const accounts = getAccounts();

      await _state.client.request({
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

  // Determine whether a transaction can be signed with a local key pair.
  const isSignable = (transaction: Transaction) => {
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

  // Find accounts that lack a key pair for signing.
  const getAccountsWithoutKeyPairs = async (
    transactions: Array<Transaction>
  ) => {
    const accounts = getAccounts();
    const result: Array<Account> = [];

    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];

      if (!transactions.some((x) => x.signerId === account.accountId)) {
        continue;
      }

      const keyPair = await _state.keystore.getKey(
        options.network.networkId,
        account.accountId
      );

      if (!keyPair) {
        result.push(account);
      }
    }

    return result;
  };

  const setupEvents = () => {
    _state.subscriptions.push(
      _state.client.on("session_update", (event) => {
        logger.log("Session Update", event);

        if (event.topic === _state.session?.topic) {
          (async () => {
            const updatedAccounts = getAccounts(
              event.params.namespaces["near"].accounts
            );
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

            _state.session = {
              ..._state.client.session.get(event.topic),
              namespaces: event.params.namespaces,
            };
            emitter.emit("accountsChanged", { accounts: getAccounts() });
          })();
        }
      })
    );

    _state.subscriptions.push(
      _state.client.on("session_delete", async (event) => {
        logger.log("Session Deleted", event);

        if (event.topic === _state.session?.topic) {
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
          requiredNamespaces: {
            near: {
              chains: [getChainId()],
              methods: [
                "near_signIn",
                "near_signOut",
                "near_signTransaction",
                "near_signTransactions",
              ],
              events: ["chainChanged", "accountsChanged"],
            },
          },
        });

        const accounts = getAccounts();
        await requestSignIn(contractId, methodNames, accounts);

        setupEvents();

        return accounts;
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

      const tx: Transaction = {
        signerId: signerId || accounts[0].accountId,
        receiverId: receiverId || contract.contractId,
        actions,
      };

      if (!isSignable(tx)) {
        return requestSignAndSendTransaction(tx);
      }

      const accountsWithoutKeyPairs = await getAccountsWithoutKeyPairs([tx]);

      if (accountsWithoutKeyPairs.length) {
        const { contractId, methodNames } = contract;

        await requestSignIn(contractId, methodNames, accountsWithoutKeyPairs);
      }

      return retry(async () => {
        const [signedTx] = await signTransactions(
          [tx],
          signer,
          options.network
        );

        return provider.sendTransaction(signedTx);
      });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const accounts = getAccounts();
      const { contract } = store.getState();

      if (!_state.session || !accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const txs = transactions.map((x) => ({
        signerId: x.signerId || accounts[0].accountId,
        receiverId: x.receiverId,
        actions: x.actions,
      }));

      if (!txs.every((x) => isSignable(x))) {
        return requestSignAndSendTransactions(txs);
      }

      const accountsWithoutKeyPairs = await getAccountsWithoutKeyPairs(txs);

      if (accountsWithoutKeyPairs.length) {
        const { contractId, methodNames } = contract;

        await requestSignIn(contractId, methodNames, accountsWithoutKeyPairs);
      }

      const signedTxs = await retry(() => {
        return signTransactions(txs, signer, options.network);
      });

      return Promise.all(
        signedTxs.map((signedTx) => {
          return retry(() => provider.sendTransaction(signedTx));
        })
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
