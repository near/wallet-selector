import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  Network,
  Account,
  Web3AuthWallet,
  JsonStorageService,
  Optional,
  Transaction,
  ProviderService,
} from "@near-wallet-selector/core";
import { sha256 } from "js-sha256";
import { utils } from "near-api-js";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { icon } from "./icon";

const WEB3AUTH_RELAY_URL = "http://localhost:3006";

interface TorusExtraOptions {
  clientId: string;
}

interface TorusState {
  accounts: Array<Account>;
}

export interface TorusParams {
  clientId: string;
  iconUrl?: string;
  deprecated?: boolean;
}

const resolvePendingSignIn = async (
  storage: JsonStorageService,
  network: Network
) => {
  const url = new URL(window.location.href);

  const verificationBase64 = url.searchParams.get("web3authVerify");
  const signature = url.searchParams.get("signature");

  if (!verificationBase64 || !signature) {
    return;
  }

  const verificationObject = JSON.parse(
    Buffer.from(verificationBase64, "base64").toString()
  );

  const publicKeyString = `ed25519:${utils.serialize.base_encode(
    Buffer.from(verificationObject.publicKey, "base64")
  )}`;

  const createdPublicKey = utils.PublicKey.from(publicKeyString);

  const verifiedSignature = createdPublicKey.verify(
    new Uint8Array(sha256.array(JSON.stringify(verificationObject))),
    Buffer.from(signature, "base64")
  );

  if (verifiedSignature) {
    const accounts: Array<Account> = [
      {
        accountId: verificationObject.accountId,
      },
    ];

    await storage.setItem("web3auth_accounts:" + network.networkId, accounts);
  }

  url.searchParams.delete("web3authVerify");
  url.searchParams.delete("signature");
  url.searchParams.delete("contractId");

  window.location.assign(url.toString());
};

const resolvePendingSignTransaction = async (provider: ProviderService) => {
  const url = new URL(window.location.href);

  const encodedSignedTransaction = url.searchParams.get("signedTransaction");

  if (!encodedSignedTransaction) {
    return;
  }

  const signedTx = SignedTransaction.decode(
    Buffer.from(encodedSignedTransaction, "base64")
  );

  await provider.sendTransaction(signedTx);

  url.searchParams.delete("signedTransaction");

  window.location.assign(url.toString());
};

const setupTorusState = async (
  storage: JsonStorageService,
  network: Network,
  provider: ProviderService
): Promise<TorusState> => {
  await resolvePendingSignIn(storage, network);
  await resolvePendingSignTransaction(provider);

  const accounts = await storage.getItem<Array<Account>>(
    "web3auth_accounts:" + network.networkId
  );

  return {
    accounts: accounts || [],
  };
};

const Torus: WalletBehaviourFactory<
  Web3AuthWallet,
  { params: TorusExtraOptions }
> = async ({ options, params, logger, storage, store, provider }) => {
  const _state = await setupTorusState(storage, options.network, provider);

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const accounts = _state.accounts;
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

  const cleanup = () => {
    storage.removeItem("web3auth_accounts:" + options.network.networkId);
  };

  function getAccounts(): Array<Account> {
    return _state.accounts;
  }

  return {
    signIn: async ({ loginProvider, email }) => {
      const url = new URL(WEB3AUTH_RELAY_URL);
      url.searchParams.set("action", "signIn");
      url.searchParams.set("originUrl", window.location.href);
      url.searchParams.set("clientId", params.clientId);
      url.searchParams.set("loginProvider", loginProvider || "");
      url.searchParams.set("email", email || "");
      window.location.assign(url.toString());

      return getAccounts();
    },
    signOut: async () => {
      cleanup();

      const url = new URL(WEB3AUTH_RELAY_URL);
      url.searchParams.set("action", "signOut");
      url.searchParams.set("originUrl", window.location.href);
      url.searchParams.set("clientId", params.clientId);
      window.location.assign(url.toString());
    },
    getAccounts: async () => {
      return getAccounts();
    },
    verifyOwner: () => {
      throw new Error("Method not supported");
    },
    signAndSendTransaction: async ({ signerId, receiverId, actions }) => {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const [transaction] = transformTransactions([
        {
          signerId,
          receiverId,
          actions,
        },
      ]);

      const url = new URL(WEB3AUTH_RELAY_URL);
      url.searchParams.set("action", "signTransaction");
      url.searchParams.set("originUrl", window.location.href);
      url.searchParams.set("clientId", params.clientId);
      url.searchParams.set(
        "transaction",
        Buffer.from(JSON.stringify(transaction)).toString("base64")
      );
      window.location.assign(url.toString());
    },
    signAndSendTransactions: async ({ transactions }) => {
      logger.log("signAndSendTransactions", { transactions });

      const url = new URL(WEB3AUTH_RELAY_URL);
      url.searchParams.set("action", "signTransaction");
      url.searchParams.set("originUrl", window.location.href);
      url.searchParams.set("clientId", params.clientId);
      url.searchParams.set(
        "transaction",
        Buffer.from(
          JSON.stringify(transformTransactions(transactions))
        ).toString("base64")
      );
      window.location.assign(url.toString());
    },
  };
};

export function setupTorus({
  clientId,
  iconUrl = icon,
  deprecated = false,
}: TorusParams): WalletModuleFactory<Web3AuthWallet> {
  return async () => {
    return {
      id: "torus",
      type: "web3auth",
      metadata: {
        name: "Torus Wallet",
        description: "Connect to dApps with social logins.",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (options) => {
        return Torus({
          ...options,
          params: {
            clientId,
          },
        });
      },
    };
  };
}
