import type { SignClientTypes } from "@walletconnect/types";
import type {
  Network,
  Optional,
  Transaction,
  Web3AuthBehaviourFactory,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";

import { Account } from "@near-wallet-selector/core";
import Web3AuthClient from "./web3auth-client";
import { InMemorySigner, KeyPair, keyStores, utils } from "near-api-js";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { signTransactions } from "@near-wallet-selector/wallet-utils";

export interface Web3AuthParams {
  clientId: string;
  metadata: SignClientTypes.Metadata;
  iconUrl?: string;
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

const Web3Auth: Web3AuthBehaviourFactory = async ({
  logger,
  options,
  provider,
  store,
}) => {
  if (!options.web3auth) {
    throw new Error("No 'web3auth' option set");
  }

  const _state = await setupWeb3AuthState(
    options.web3auth.clientId,
    options.network
  );

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

export default Web3Auth;
