import isMobile from "is-mobile";
import {
  Action,
  Transaction,
  FunctionCallAction,
  InjectedWallet,
  WalletModule,
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

export function setupSender({
  iconUrl = "./assets/sender-icon.png",
}: SenderParams = {}): WalletModule<InjectedWallet> {
  return function Sender({ options, emitter, logger }) {
    let wallet: InjectedSender;

    const getAccounts = () => {
      const accountId = wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{ accountId }];
    };

    const isInstalled = async () => {
      try {
        return await waitFor(() => !!window.near?.isSender);
      } catch (e) {
        logger.log("Sender:isInstalled:error", e);

        return false;
      }
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
      id: "sender",
      type: "injected",
      name: "Sender",
      description: null,
      iconUrl,
      downloadUrl:
        "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",

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
        if (!(await isInstalled())) {
          throw new Error("Wallet not installed");
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        wallet = window.near!;

        wallet.on("accountChanged", async (newAccountId) => {
          logger.log("Sender:onAccountChange", newAccountId);

          await this.disconnect();
        });

        wallet.on("rpcChanged", (response) => {
          if (options.network.networkId !== response.rpc.networkId) {
            emitter.emit("networkChanged", null);
          }
        });

        emitter.emit("init", { accounts: getAccounts() });
      },

      async connect() {
        if (!(await isInstalled())) {
          return emitter.emit("uninstalled", null);
        }

        if (!wallet) {
          await this.init();
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

      async disconnect() {
        const res = wallet.signOut();

        if (!res) {
          throw new Error("Failed to sign out");
        }

        emitter.emit("disconnected", null);
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
}
