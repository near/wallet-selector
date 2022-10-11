import type { SignClientTypes } from "@walletconnect/types";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  Network,
  getActiveAccount,
  Optional,
  Transaction,
} from "@near-wallet-selector/core";

import icon from "./icon";
import { Account, Web3AuthWallet } from "@near-wallet-selector/core";
import Web3AuthClient from "./web3auth-client";
import { InMemorySigner, KeyPair, keyStores, utils } from "near-api-js";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { signTransactions } from "@near-wallet-selector/wallet-utils";

export interface Web3AuthParams {
  clientId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl?: string;
  iconUrl?: string;
  chainId?: string;
  deprecated?: boolean;
}

interface Web3AuthExtraOptions {
  chainId?: string;
  clientId: string;
  metadata: SignClientTypes.Metadata;
  relayUrl: string;
}

interface Web3AuthState {
  client: Web3AuthClient;
  keyPair: KeyPair | null;
  provider: SafeEventEmitterProvider | null;
  signer: InMemorySigner;
  keyStore: keyStores.InMemoryKeyStore;
}

const getAccountIdFromPublicKey = (publicKeyData: Uint8Array) => {
  return Buffer.from(publicKeyData).toString("hex");
};

const getKeyPair = async (
  provider: SafeEventEmitterProvider,
  keyStore: keyStores.InMemoryKeyStore,
  network: Network
) => {
  const privateKey = await provider.request<string>({
    method: "private_key",
  });

  if (!privateKey) {
    throw new Error("No private key found");
  }

  // eslint-disable-next-line no-console
  console.log("privateKey", utils.serialize.base_encode(privateKey));

  const keyPair = utils.key_pair.KeyPairEd25519.fromString(
    utils.serialize.base_encode(privateKey)
  );
  const accountId = getAccountIdFromPublicKey(keyPair.getPublicKey().data);

  keyStore.setKey(network.networkId, accountId, keyPair);

  return keyPair;
};

const setupWeb3AuthState = async (
  clientId: string,
  network: Network
): Promise<Web3AuthState> => {
  const client = new Web3AuthClient(clientId, network);
  await client.init();

  const keyStore = new keyStores.InMemoryKeyStore();
  const signer = new InMemorySigner(keyStore);

  let keyPair = null;
  const provider = client.getProvider();

  if (provider) {
    keyPair = await getKeyPair(provider, keyStore, network);
  }

  return {
    client,
    provider,
    keyPair,
    signer,
    keyStore,
  };
};

const Web3Auth: WalletBehaviourFactory<
  Web3AuthWallet,
  { params: Web3AuthExtraOptions }
> = async ({ logger, options, provider, store, params }) => {
  const _state = await setupWeb3AuthState(params.clientId, options.network);

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const { contract } = store.getState();

    if (!contract) {
      throw new Error("Wallet not signed in");
    }

    const account = getActiveAccount(store.getState());

    if (!account) {
      throw new Error("No active account");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || account.accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };

  function getAccounts(): Array<Account> {
    if (!_state.keyPair) {
      return [];
    }

    const publicKey = _state.keyPair.getPublicKey().data;
    const accountId = getAccountIdFromPublicKey(publicKey);

    return [{ accountId }];
  }

  return {
    signIn: async () => {
      _state.provider = await _state.client.connect();

      if (!_state.provider) {
        throw new Error("No provider found");
      }

      _state.keyPair = await getKeyPair(
        _state.provider,
        _state.keyStore,
        options.network
      );

      return getAccounts();
    },
    signOut: async () => {
      return _state.client.disconnect();
    },
    getAccounts: async () => {
      return getAccounts();
    },
    verifyOwner: () => {
      throw new Error("Method not supported");
    },
    signAndSendTransaction: async ({ signerId, receiverId, actions }) => {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const [signedTx] = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        _state.signer,
        options.network
      );

      logger.log("_state.signer", _state.signer);
      logger.log("signedTx", { signedTx });

      return provider.sendTransaction(signedTx);
    },
    signAndSendTransactions: () => {
      throw new Error("Method not supported");
    },
  };
};

export function setupWeb3Auth({
  clientId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = icon,
  deprecated = false,
}: Web3AuthParams): WalletModuleFactory<Web3AuthWallet> {
  return async () => {
    return {
      id: "web3auth",
      type: "web3auth",
      metadata: {
        name: "Web3Auth",
        description: "Bridge wallet for NEAR.",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (options) => {
        return Web3Auth({
          ...options,
          params: {
            clientId,
            metadata,
            relayUrl,
            chainId,
          },
        });
      },
    };
  };
}
