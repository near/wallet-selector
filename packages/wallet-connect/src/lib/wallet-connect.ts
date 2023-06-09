import type { KeyPair, providers } from "near-api-js";
import * as nearAPI from "near-api-js";
import type { AccessKeyViewRaw } from "near-api-js/lib/providers/provider";
import type { SignClientTypes, SessionTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  BridgeWallet,
  Transaction,
  WalletEvents,
  EventEmitterService,
  VerifiedOwner,
  Account,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";
import { createAction } from "@near-wallet-selector/wallet-utils";

import icon from "./icon";

import UniversalProvider from "@walletconnect/universal-provider";

export interface WalletConnectParams {
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
  deprecated?: boolean;
}

interface WalletConnectExtraOptions {
  chainId?: string;
  projectId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl: string;
}

interface LimitedAccessKeyPair {
  accountId: string;
  keyPair: KeyPair;
}

interface LimitedAccessAccount {
  accountId: string;
  publicKey: string;
}

interface WalletConnectAccount {
  accountId: string;
  publicKey: string;
}

interface WalletConnectState {
  client: UniversalProvider;
  session?: SessionTypes.Struct;
  keystore: nearAPI.keyStores.KeyStore;
}

const WC_METHODS = [
  "near_signIn",
  "near_signOut",
  "near_getAccounts",
  "near_signTransaction",
  "near_signTransactions",
  "near_verifyOwner",
];

const WC_EVENTS = ["chainChanged", "accountsChanged"];

const setupWalletConnectState = async (
  id: string,
  params: WalletConnectExtraOptions,
  emitter: EventEmitterService<WalletEvents>
): Promise<WalletConnectState> => {
  // eslint-disable-next-line no-console
  console.log(emitter);
  //  Initialize the provider
  const client = await UniversalProvider.init({
    logger: "info",
    relayUrl: params.relayUrl,
    projectId: params.projectId,
    metadata: params.metadata,
  });
  // const client = new WalletConnectClient(emitter);
  const keystore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    `near-wallet-selector:${id}:keystore:`
  );

  // await client.init({
  //   projectId: params.projectId,
  //   metadata: params.metadata,
  //   relayUrl: params.relayUrl,
  // });

  // eslint-disable-next-line no-console
  console.log("asdasdasd", client.session, client.sessionProperties);

  return {
    client,
    session: client.session,
    keystore,
  };
};

const WalletConnect: WalletBehaviourFactory<
  BridgeWallet,
  { params: WalletConnectExtraOptions }
> = async ({ id, options, store, params, provider, emitter, logger }) => {
  const _state = await setupWalletConnectState(id, params, emitter);

  const getChainId = () => {
    if (params.chainId) {
      return params.chainId;
    }

    const { networkId } = options.network;

    if (["mainnet", "testnet"].includes(networkId)) {
      return `near:${networkId}`;
    }

    throw new Error("Invalid chain id");
  };

  const getAccounts = async (): Promise<Array<Account>> => {
    const accounts = _state.session?.namespaces["near"].accounts || [];
    const newAccounts = [];

    for (let i = 0; i < accounts.length; i++) {
      const signer = new nearAPI.InMemorySigner(_state.keystore);
      const publicKey = await signer.getPublicKey(
        accounts[i].split(":")[2],
        options.network.networkId
      );
      newAccounts.push({
        accountId: accounts[i].split(":")[2],
        publicKey: publicKey ? publicKey.toString() : "",
      });
    }

    return newAccounts;
  };

  const validateAccessKey = (
    transaction: Transaction,
    accessKey: AccessKeyViewRaw
  ) => {
    if (accessKey.permission === "FullAccess") {
      return accessKey;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { receiver_id, method_names } = accessKey.permission.FunctionCall;

    if (transaction.receiverId !== receiver_id) {
      return null;
    }

    return transaction.actions.every((action) => {
      if (action.type !== "FunctionCall") {
        return false;
      }

      const { methodName, deposit } = action.params;

      if (method_names.length && method_names.includes(methodName)) {
        return false;
      }

      return parseFloat(deposit) <= 0;
    });
  };

  const signTransactions = async (transactions: Array<Transaction>) => {
    const signer = new nearAPI.InMemorySigner(_state.keystore);
    const signedTransactions: Array<nearAPI.transactions.SignedTransaction> =
      [];

    const block = await provider.block({ finality: "final" });

    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const publicKey = await signer.getPublicKey(
        transaction.signerId,
        options.network.networkId
      );

      if (!publicKey) {
        throw new Error("No public key found");
      }

      const accessKey = await provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: publicKey.toString(),
      });

      if (!validateAccessKey(transaction, accessKey)) {
        throw new Error("Invalid access key");
      }

      const tx = nearAPI.transactions.createTransaction(
        transactions[i].signerId,
        nearAPI.utils.PublicKey.from(publicKey.toString()),
        transactions[i].receiverId,
        accessKey.nonce + i + 1,
        transaction.actions.map((action) => createAction(action)),
        nearAPI.utils.serialize.base_decode(block.header.hash)
      );

      const [, signedTx] = await nearAPI.transactions.signTransaction(
        tx,
        signer,
        transactions[i].signerId,
        options.network.networkId
      );

      signedTransactions.push(signedTx);
    }

    return signedTransactions;
  };

  const requestAccounts = async () => {
    return _state.client.request<Array<WalletConnectAccount>>(
      {
        method: "near_getAccounts",
        params: {},
      },
      getChainId()
    );
  };

  const requestVerifyOwner = async (accountId: string, message: string) => {
    return _state.client.request<VerifiedOwner>(
      {
        method: "near_verifyOwner",
        params: { accountId, message },
      },
      getChainId()
    );
  };

  const requestSignTransaction = async (transaction: Transaction) => {
    const accounts = await requestAccounts();
    const account = accounts.find((x) => x.accountId === transaction.signerId);

    if (!account) {
      throw new Error("Invalid signer id");
    }

    const [block, accessKey] = await Promise.all([
      provider.block({ finality: "final" }),
      provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: account.publicKey,
      }),
    ]);

    const tx = nearAPI.transactions.createTransaction(
      transaction.signerId,
      nearAPI.utils.PublicKey.from(account.publicKey),
      transaction.receiverId,
      accessKey.nonce + 1,
      transaction.actions.map((action) => createAction(action)),
      nearAPI.utils.serialize.base_decode(block.header.hash)
    );

    const result = await _state.client.request<Uint8Array>(
      {
        method: "near_signTransaction",
        params: { transaction: tx.encode() },
      },
      getChainId()
    );

    return nearAPI.transactions.SignedTransaction.decode(Buffer.from(result));
  };

  const requestSignTransactions = async (transactions: Array<Transaction>) => {
    if (!transactions.length) {
      return [];
    }

    const txs: Array<nearAPI.transactions.Transaction> = [];

    const [block, accounts] = await Promise.all([
      provider.block({ finality: "final" }),
      requestAccounts(),
    ]);

    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const account = accounts.find(
        (x) => x.accountId === transaction.signerId
      );

      if (!account) {
        throw new Error("Invalid signer id");
      }

      const accessKey = await provider.query<AccessKeyViewRaw>({
        request_type: "view_access_key",
        finality: "final",
        account_id: transaction.signerId,
        public_key: account.publicKey,
      });

      txs.push(
        nearAPI.transactions.createTransaction(
          transaction.signerId,
          nearAPI.utils.PublicKey.from(account.publicKey),
          transaction.receiverId,
          accessKey.nonce + i + 1,
          transaction.actions.map((action) => createAction(action)),
          nearAPI.utils.serialize.base_decode(block.header.hash)
        )
      );
    }

    const results = await _state.client.request<[]>(
      {
        method: "near_signTransactions",
        params: { transactions: txs.map((x) => x.encode()) },
      },
      getChainId()
    );

    return results.map((result) => {
      return nearAPI.transactions.SignedTransaction.decode(Buffer.from(result));
    });
  };

  const createLimitedAccessKeyPairs = async (): Promise<
    Array<LimitedAccessKeyPair>
  > => {
    const accounts = await getAccounts();

    return accounts.map(({ accountId }) => ({
      accountId,
      keyPair: nearAPI.utils.KeyPair.fromRandom("ed25519"),
    }));
  };

  const requestSignIn = async (
    permission: nearAPI.transactions.FunctionCallPermission
  ) => {
    const keyPairs = await createLimitedAccessKeyPairs();
    const limitedAccessAccounts: Array<LimitedAccessAccount> = keyPairs.map(
      ({ accountId, keyPair }) => ({
        accountId,
        publicKey: keyPair.getPublicKey().toString(),
      })
    );

    await _state.client.request(
      {
        method: "near_signIn",
        params: {
          permission: permission,
          accounts: limitedAccessAccounts,
        },
      },
      getChainId()
    );

    for (let i = 0; i < keyPairs.length; i += 1) {
      const { accountId, keyPair } = keyPairs[i];

      await _state.keystore.setKey(
        options.network.networkId,
        accountId,
        keyPair
      );
    }
  };

  const requestSignOut = async () => {
    const accounts = await getAccounts();
    const limitedAccessAccounts: Array<LimitedAccessAccount> = [];

    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];
      const keyPair = await _state.keystore.getKey(
        options.network.networkId,
        account.accountId
      );

      if (!keyPair) {
        continue;
      }

      limitedAccessAccounts.push({
        accountId: account.accountId,
        publicKey: keyPair.getPublicKey().toString(),
      });
    }

    if (!limitedAccessAccounts.length) {
      return;
    }

    await _state.client.request(
      {
        method: "near_signOut",
        params: {
          accounts: limitedAccessAccounts,
        },
      },
      getChainId()
    );
  };

  const signOut = async () => {
    if (_state.session) {
      await requestSignOut();

      _state.client.disconnect();
    }
  };

  const setupEvents = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _state.client.on("session_update", async (event: any) => {
      logger.log("Session Update", event);

      if (event.topic === _state.session?.topic) {
        if (_state.client.session) {
          _state.session = {
            ..._state.client.session,
            namespaces: event.params.namespaces,
          };
        }

        emitter.emit("accountsChanged", { accounts: await getAccounts() });
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _state.client.on("session_delete", async (event: any) => {
      logger.log("Session Deleted", event);

      if (event.topic === _state.session?.topic) {
        emitter.emit("signedOut", null);
      }
    });

    _state.client.on("display_uri", async (uri: string) => {
      logger.log("Session Display Uri", uri);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _state.client.on("session_ping", async (event: any) => {
      logger.log("Session Ping", event);
    });
  };

  if (_state.session) {
    await setupEvents();
  }

  return {
    async signIn({ contractId, methodNames = [], qrCodeModal = true }) {
      const existingAccounts = await getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      // eslint-disable-next-line no-console
      console.log("11111111111");

      try {
        if (!qrCodeModal) {
          await _state.client.connect({
            namespaces: {
              near: {
                chains: [getChainId()],
                methods: WC_METHODS,
                events: WC_EVENTS,
                rpcMap: {
                  testnet: `${
                    params.relayUrl
                  }?chainId=${getChainId()}&projectId=${params.projectId}`,
                },
              },
            },
          });
          // await _state.client.enable();
          // eslint-disable-next-line no-console
          console.log("22222", _state.session);
        } else {
          // eslint-disable-next-line no-console
          console.log("3333");
          // emitter.emit("uriChanged", { uri });
        }

        await requestSignIn({ receiverId: contractId, methodNames });

        await setupEvents();

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

    async verifyOwner({ message }) {
      logger.log("WalletConnect:verifyOwner", { message });

      const { contract } = store.getState();

      if (!_state.session || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      return requestVerifyOwner(account.accountId, message);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();

      if (!_state.session || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const resolvedTransaction: Transaction = {
        signerId: signerId || account.accountId,
        receiverId: receiverId || contract.contractId,
        actions,
      };

      try {
        const [signedTx] = await signTransactions([resolvedTransaction]);
        return provider.sendTransaction(signedTx);
      } catch (err) {
        logger.log("Falling back to WalletConnect to sign transaction", err);

        const signedTx = await requestSignTransaction(resolvedTransaction);
        return provider.sendTransaction(signedTx);
      }
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const { contract } = store.getState();

      if (!_state.session || !contract) {
        throw new Error("Wallet not signed in");
      }

      const account = getActiveAccount(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      const resolvedTransactions = transactions.map((x) => ({
        signerId: x.signerId || account.accountId,
        receiverId: x.receiverId,
        actions: x.actions,
      }));

      try {
        const signedTxs = await signTransactions(resolvedTransactions);
        const results: Array<providers.FinalExecutionOutcome> = [];

        for (let i = 0; i < signedTxs.length; i += 1) {
          results.push(await provider.sendTransaction(signedTxs[i]));
        }

        return results;
      } catch (err) {
        const signedTxs = await requestSignTransactions(resolvedTransactions);
        const results: Array<providers.FinalExecutionOutcome> = [];

        for (let i = 0; i < signedTxs.length; i += 1) {
          results.push(await provider.sendTransaction(signedTxs[i]));
        }

        return results;
      }
    },
  };
};

export function setupWalletConnect({
  projectId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = icon,
  deprecated = false,
}: WalletConnectParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "wallet-connect",
      type: "bridge",
      metadata: {
        name: "WalletConnect",
        description: "Bridge wallet for NEAR.",
        iconUrl,
        deprecated,
        available: true,
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
