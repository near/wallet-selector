<<<<<<< HEAD:packages/web3auth/src/lib/web3auth.ts
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
=======
import { Network } from "../options.types";
import { Web3AuthParams } from "../wallet-selector.types";

import Web3AuthClient from "./web3auth-client";
import { InMemorySigner, KeyPair, keyStores, utils } from "near-api-js";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { icon } from "./icon";
import {
  Account,
  WalletBehaviourFactory,
  WalletModuleFactory,
  Web3AuthLoginProvider,
  Web3AuthWallet,
} from "../wallet/wallet.types";

interface Web3AuthExtraOptions {
  clientId: string;
  loginProviders: Array<Web3AuthLoginProvider>;
>>>>>>> 5f41e445d73cb02fb93a3d639f6dccce760b8de4:packages/core/src/lib/web3auth/web3auth.ts
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

<<<<<<< HEAD:packages/web3auth/src/lib/web3auth.ts
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
=======
const Web3Auth: WalletBehaviourFactory<
  Web3AuthWallet,
  { params: Web3AuthExtraOptions }
> = async ({ options, params }) => {
  const _state = await setupWeb3AuthState(params.clientId, options.network);
>>>>>>> 5f41e445d73cb02fb93a3d639f6dccce760b8de4:packages/core/src/lib/web3auth/web3auth.ts

  function getAccounts(): Array<Account> {
    if (!_state.keyPair) {
      return [];
    }

    const publicKey = _state.keyPair.getPublicKey().data;
    const accountId = getAccountIdFromPublicKey(publicKey);

    return [{ accountId }];
  }

  return {
    signIn: async ({ loginProvider }) => {
      _state.provider = await _state.client.connect(loginProvider);

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
    signAndSendTransaction: async () => {
      throw new Error("Method not supported");
    },
    signAndSendTransactions: () => {
      throw new Error("Method not supported");
    },
  };
};

<<<<<<< HEAD:packages/web3auth/src/lib/web3auth.ts
export default Web3Auth;
=======
export function setupWeb3Auth({
  clientId,
  loginProviders,
}: Web3AuthParams): WalletModuleFactory<Web3AuthWallet> {
  return async () => {
    return {
      id: "web3auth",
      type: "web3auth",
      metadata: {
        name: "Web3Auth",
        description: "Connect to dApps with social logins.",
        iconUrl: icon,
        deprecated: false,
        available: true,
      },
      init: (options) => {
        return Web3Auth({
          ...options,
          params: {
            clientId,
            loginProviders,
          },
        });
      },
    };
  };
}
>>>>>>> 5f41e445d73cb02fb93a3d639f6dccce760b8de4:packages/core/src/lib/web3auth/web3auth.ts
