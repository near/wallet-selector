import { isMobile } from "@near-wallet-selector/utils";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Action,
  Transaction,
  FunctionCallAction,
  Optional,
  waitFor,
} from "@near-wallet-selector/core";

import { InjectedSender } from "./injected-sender";

declare global {
  interface Window {
    near: InjectedSender | undefined;
  }
}

export interface SenderParams {
  iconUrl?: string;
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
  emitter,
  logger,
}) => {
  const _state = setupSenderState();

  const cleanup = () => {
    for (const key in _state.wallet.callbacks) {
      _state.wallet.remove(key);
    }
  };

  const disconnect = async () => {
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

    // Prevent disconnecting by throwing.
    if (error.message === "User reject") {
      throw error;
    }

    // Continue disconnecting but log out the issue.
    logger.log("Failed to disconnect");
    logger.error(error);
  };

  const setupEvents = () => {
    _state.wallet.on("accountChanged", async (newAccountId) => {
      logger.log("Sender:onAccountChange", newAccountId);
      emitter.emit("disconnected", null);
    });

    _state.wallet.on("rpcChanged", async ({ rpc }) => {
      logger.log("Sender:onNetworkChange", rpc);

      if (options.network.networkId !== rpc.networkId) {
        await disconnect();

        emitter.emit("disconnected", null);
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

  if (_state.wallet.isSignedIn()) {
    setupEvents();
  }

  return {
    async connect() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      const { accessKey, error } = await _state.wallet.requestSignIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });

      if (!accessKey || error) {
        await disconnect();

        throw new Error(
          (typeof error === "string" ? error : error.type) ||
            "Failed to connect"
        );
      }

      setupEvents();

      return getAccounts();
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
      logger.log("Sender:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not connected");
      }

      return _state.wallet
        .signAndSendTransaction({
          receiverId,
          actions: transformActions(actions),
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }

          // Shouldn't happen but avoids inconsistent responses.
          if (!res.response?.length) {
            throw new Error("Invalid response");
          }

          return res.response[0];
        });
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("Sender:signAndSendTransactions", { transactions });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not connected");
      }

      return _state.wallet
        .requestSignTransactions({
          transactions: transformTransactions(transactions),
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
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

export function setupSender({
  iconUrl = "./assets/sender-icon.png",
}: SenderParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (mobile || !installed) {
      return null;
    }

    // Add extra wait to ensure Sender's sign in status is read from the
    // browser extension background env.
    await waitFor(() => !!window.near?.isSignedIn(), { timeout: 300 }).catch(
      () => false
    );

    return {
      id: "sender",
      type: "injected",
      metadata: {
        name: "Sender",
        description: null,
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",
      },
      init: Sender,
    };
  };
}
