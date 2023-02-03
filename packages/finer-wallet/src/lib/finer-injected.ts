// based on @near-wallet-selector/sender

import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Action,
  Transaction,
  FunctionCallAction,
  Optional,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedFiner } from "./injected-wallet";
import icon from "./icon";

declare global {
  interface Window {
    finer: {
      near: InjectedFiner | undefined;
    };
  }
}

export interface FinerParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface FinerState {
  wallet: InjectedFiner;
}

const isInstalled = () => {
  return waitFor(() => !!window.finer?.near?.isFiner).catch(() => false);
};

const setupFinerState = (): FinerState => {
  const wallet = window.finer?.near!;

  return {
    wallet,
  };
};

const FinerExtension: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  provider,
  emitter,
  logger,
}) => {
  const _state = setupFinerState();

  const signOut = async () => {
    if (!_state.wallet.isSignedIn()) {
      return;
    }

    const res = await _state.wallet.signOut();

    if (res === true) {
      return;
    }

    const error = new Error(
      typeof res.error === "string" ? res.error : res.error.type
    );

    // Prevent signing out by throwing.
    if (error.message === "User reject") {
      throw error;
    }

    // Continue signing out but log the issue.
    logger.log("Failed to sign out");
    logger.error(error);
  };

  const setupEvents = () => {
    _state.wallet.on("accountChanged", async (newAccountId) => {
      logger.log("onAccountChange", newAccountId);
      emitter.emit("signedOut", null);
    });

    _state.wallet.on("rpcChanged", async (rpc) => {
      logger.log("onNetworkChange", rpc);

      if (options.network.networkId !== rpc.networkId) {
        await signOut();

        emitter.emit("signedOut", null);
        emitter.emit("networkChanged", { networkId: rpc.networkId });
      }
    });
  };

  const getAccounts = () => {
    const accountId = _state.wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const isValidActions = (
    actions: Array<Action>
  ): actions is Array<FunctionCallAction> => {
    return actions.every((x) => x.type === "FunctionCall");
  };

  const transformActions = (actions: Array<Action>) => {
    const validActions = isValidActions(actions);

    if (!validActions) {
      throw new Error(
        `Only 'FunctionCall' actions types are supported by ${metadata.name}`
      );
    }

    return actions.map((x) => x.params);
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    return transactions.map((transaction) => {
      return {
        receiverId: transaction.receiverId,
        actions: transformActions(transaction.actions),
      };
    });
  };

  if (_state.wallet && _state.wallet.isSignedIn()) {
    setupEvents();
  }

  return {
    async signIn({ contractId, methodNames }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      const { accessKey, error } = await _state.wallet.requestSignIn({
        contractId,
        methodNames,
      });

      if (!accessKey || error) {
        await signOut();

        throw new Error(
          (typeof error === "string" ? error : error.type) ||
            "Failed to sign in"
        );
      }

      setupEvents();

      return getAccounts();
    },

    signOut,

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("Finer:verifyOwner", { message });

      const account = _state.wallet.account();

      if (!account) {
        const data = await _state.wallet.signMessage(message);
        if (data.error) {
          throw new Error(data.error);
        }

        return data.response;
      }

      // Note: When the wallet is locked, Wallet returns an empty Signer interface.
      // Even after unlocking the wallet, the user will need to refresh to gain
      // access to these methods.
      if (!account.connection.signer.signMessage) {
        throw new Error("Wallet is locked");
      }

      const networkId = options.network.networkId;
      const accountId = account.accountId;
      const pubKey = await account.connection.signer.getPublicKey(
        accountId,
        networkId
      );
      const block = await provider.block({ finality: "final" });

      const data = {
        accountId,
        message,
        blockId: block.header.hash,
        publicKey: Buffer.from(pubKey.data).toString("base64"),
        keyType: pubKey.keyType,
      };
      const encoded = JSON.stringify(data);

      const signed = await account.connection.signer.signMessage(
        new Uint8Array(Buffer.from(encoded)),
        accountId,
        networkId
      );

      return {
        ...data,
        signature: Buffer.from(signed.signature).toString("base64"),
        keyType: signed.publicKey.keyType,
      };
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet
        .signAndSendTransaction({
          receiverId: receiverId || contract.contractId,
          actions: transformActions(actions),
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          } else if (res.response && "error" in res.response) {
            throw new Error(res.response.error.message);
          }

          // Shouldn't happen but avoids inconsistent responses.
          if (!res.response?.length) {
            throw new Error("Invalid response");
          }

          return res.response[0];
        });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      return _state.wallet
        .requestSignTransactions({
          transactions: transformTransactions(transactions),
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          } else if (res.response && "error" in res.response) {
            throw new Error(res.response.error.message);
          }

          // Shouldn't happen but avoids inconsistent responses.
          if (!res.response?.length) {
            throw new Error("Invalid response");
          }

          return res.response;
        });
    },
  };
};

export function setupFinerInjected({
  iconUrl = icon,
  deprecated = false,
}: FinerParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile) {
      return null;
    }

    await waitFor(() => !!window.finer?.near?.isSignedIn(), {
      timeout: 300,
    }).catch(() => false);

    return {
      id: "finer-wallet",
      type: "injected",
      metadata: {
        name: "FiNER Wallet",
        description: "Browser extension wallet built on NEAR.",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/finer-wallet/mbboloafhcopdfokibemggdnhcocggpl",
        deprecated,
        available: installed,
      },
      init: FinerExtension,
    };
  };
}
