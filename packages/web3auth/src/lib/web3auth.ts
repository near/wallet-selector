import type { SignClientTypes } from "@walletconnect/types";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";

import icon from "./icon";
import { Account, Web3AuthWallet } from "@near-wallet-selector/core";
import Web3AuthClient from "./web3auth-client";
import { KeyPair } from "near-api-js";
import { base_encode } from "near-api-js/lib/utils/serialize";
import { SafeEventEmitterProvider } from "@web3auth/base";

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
}

const CLIENT_ID =
  "BBE9-ElJNfwuEElRtEyiJxYssfim4alrWwDdGbThQ8ji5GGFOOVzHn3d4xi0xQKJtGAjVCeBYRELjAe8t2z0SH4";

const setupWeb3AuthState = async (clientId: string): Promise<Web3AuthState> => {
  const client = new Web3AuthClient(clientId);

  return {
    client,
    provider: null,
    keyPair: null,
  };
};

const Web3Auth: WalletBehaviourFactory<
  Web3AuthWallet,
  { params: Web3AuthExtraOptions }
> = async () => {
  const _state = await setupWeb3AuthState(CLIENT_ID);

  function getAccounts(): Array<Account> {
    if (!_state.keyPair) {
      throw new Error("Not logged in");
    }

    const publicKey = _state.keyPair.getPublicKey().toString();
    const accountId = Buffer.from(publicKey).toString("hex");

    return [{ accountId }];
  }

  return {
    signIn: async () => {
      _state.provider = await _state.client.connect();

      if (!_state.provider) {
        throw new Error("No provider found");
      }

      const privateKey = await _state.provider.request<string>({
        method: "private_key",
      });

      if (!privateKey) {
        throw new Error("No private key found");
      }

      _state.keyPair = KeyPair.fromString(base_encode(privateKey));

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
    signAndSendTransaction: () => {
      throw new Error("Method not supported");
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
