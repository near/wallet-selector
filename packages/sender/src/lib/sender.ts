import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Action,
  Transaction,
  FunctionCallAction,
  Optional,
  Account,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedSender } from "./injected-sender";
import icon from "./icon";

declare global {
  interface Window {
    near: InjectedSender | undefined;
  }
}

export interface SenderParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface SenderState {
  wallet: InjectedSender;
}

const isInstalled = () => {
  return waitFor(() => !!window.near?.isSender).catch(() => false);
};

const setupSenderState = (): SenderState => {
  const wallet = window.near!;

  return {
    wallet,
  };
};

const Sender: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  provider,
  emitter,
  logger,
  id,
}) => {
  const _state = setupSenderState();

  const cleanup = () => {
    for (const key in _state.wallet.callbacks) {
      _state.wallet.remove(key);
    }
  };

  const signOut = async () => {
    if (!_state.wallet.isSignedIn()) {
      return;
    }

    cleanup();

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

  const getAccounts = async (): Promise<Array<Account>> => {
    // Add extra wait to ensure Sender's sign in status is read from the
    // browser extension background env.
    // Check for isSignedIn() in only if selectedWalletId is set.
    const { selectedWalletId } = store.getState();
    if (selectedWalletId === id) {
      await waitFor(() => !!_state.wallet?.isSignedIn(), {
        timeout: 1000,
      }).catch();
    }

    const accountId = _state.wallet.getAccountId();

    if (!accountId) {
      return [];
    }

    await waitFor(() => !!_state.wallet.account(), { timeout: 100 });

    const account = _state.wallet.account();

    // When wallet is locked signer is empty an object {}.
    if (!account!.connection.signer.getPublicKey) {
      return [{ accountId, publicKey: undefined }];
    }

    const publicKey = await account!.connection.signer.getPublicKey(
      account!.accountId,
      options.network.networkId
    );

    return [
      {
        accountId,
        publicKey: publicKey ? publicKey.toString() : undefined,
      },
    ];
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
      const existingAccounts = await getAccounts();

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

      return await getAccounts();
    },

    signOut,

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("Sender:verifyOwner", { message });

      const account = _state.wallet.account();

      if (!account) {
        throw new Error("Wallet not signed in");
      }

      // Note: When the wallet is locked, Sender returns an empty Signer interface.
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

    async signMessage(message) {
      return _state.wallet.signMessage(message).then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        if (!res?.response) {
          throw new Error("Invalid response");
        }

        return res.response;
      });
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

    async importAccountsInSecureContext({ accounts }) {
      if (window.near && window.near.isSender) {
        await window.near.batchImport({
          keystore: accounts,
          network: options.network.networkId,
        });
      }
    },
  };
};

export function setupSender({
  iconUrl = icon,
  deprecated = false,
}: SenderParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "sender",
      type: "injected",
      metadata: {
        name: "Sender",
        description: "Browser extension wallet built on NEAR.",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",
        deprecated,
        available: installed,
      },
      init: Sender,
    };
  };
}
