import isMobile from "is-mobile";
import {
  WalletModule,
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

const Sender: WalletBehaviourFactory<InjectedWallet> = ({
  options,
  emitter,
  logger,
}) => {
  let wallet: InjectedSender;

  const isInstalled = async () => {
    try {
      return await waitFor(() => !!window.near?.isSender);
    } catch (e) {
      logger.log("Sender:isInstalled:error", e);

      return false;
    }
  };

  const disconnect = async () => {
    const res = wallet.signOut();

    if (!res) {
      throw new Error("Failed to sign out");
    }

    emitter.emit("disconnected", null);
  };

  const setupWallet = async (): Promise<InjectedSender> => {
    if (wallet) {
      return wallet;
    }

    const installed = await isInstalled();

    if (!installed) {
      throw new Error("Wallet not installed");
    }

    wallet = window.near!;

    wallet.on("accountChanged", async (newAccountId) => {
      logger.log("Sender:onAccountChange", newAccountId);

      await disconnect();
    });

    wallet.on("rpcChanged", (response) => {
      if (options.network.networkId !== response.rpc.networkId) {
        emitter.emit("networkChanged", null);
      }
    });

    return wallet;
  };

  const getAccounts = () => {
    const accountId = wallet.getAccountId();

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
        "Only 'FunctionCall' actions types are supported by Sender"
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

  return {
    getDownloadUrl() {
      return "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg";
    },

    isAvailable() {
      if (!isInstalled()) {
        return false;
      }

      if (isMobile()) {
        return false;
      }

      return true;
    },

    async init() {
      await setupWallet();

      emitter.emit("init", { accounts: getAccounts() });
    },

    async connect() {
      const installed = await isInstalled();

      if (!installed) {
        return emitter.emit("uninstalled", null);
      }

      if (!wallet) {
        await setupWallet();
      }

      const { accessKey } = await wallet.requestSignIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });

      if (!accessKey) {
        throw new Error("Failed to sign in");
      }

      emitter.emit("connected", { accounts: getAccounts() });
    },

    disconnect,

    getAccounts,

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

      return wallet
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

      return wallet
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
}: SenderParams = {}): WalletModule<InjectedWallet> {
  return {
    id: "sender",
    type: "injected",
    name: "Sender",
    description: null,
    iconUrl,
    wallet: Sender,
  };
}
