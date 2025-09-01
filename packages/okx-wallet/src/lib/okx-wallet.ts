import { isMobile } from "is-mobile";
import { SignedTransaction } from "near-api-js/lib/transaction.js";
import {
  isCurrentBrowserSupported,
  najActionToInternal,
  waitFor,
} from "@near-wallet-selector/core";

import type {
  Action,
  Optional,
  Transaction,
  InjectedWallet,
  FunctionCallAction,
  WalletModuleFactory,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";

import icon from "./icon";
import type { InjectedOkx } from "./injected-okx-wallet";

let downloadUrl =
  "https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge";

if (isCurrentBrowserSupported(["safari"])) {
  downloadUrl = "https://apps.apple.com/us/app/okx-wallet/id6463797825";
}

if (isCurrentBrowserSupported(["edge-chromium"])) {
  downloadUrl =
    "https://microsoftedge.microsoft.com/addons/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/pbpjkcldjiffchgbbndmhojiacbgflha";
}

declare global {
  interface Window {
    okxwallet: {
      near: InjectedOkx | undefined;
    };
  }
}

export interface OKXWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface OkxState {
  wallet: InjectedOkx;
}

const isInstalled = () => {
  return !!window.okxwallet?.near;
};

const setupOkxState = (): OkxState => {
  const wallet = window.okxwallet?.near!;
  return {
    wallet,
  };
};

const OKXWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  emitter,
  logger,
  id,
  provider,
}) => {
  const _state = setupOkxState();

  const signOut = async () => {
    if (!_state.wallet.isSignedIn()) {
      return;
    }

    await _state.wallet.signOut();
  };

  const setupEvents = () => {
    _state.wallet.on("accountChanged", async (newAccountId) => {
      logger.log("onAccountChange", newAccountId);
      emitter.emit("signedOut", null);
    });
  };

  const isValidActions = (actions: Array<Action>) => {
    return actions.every((x) => x.functionCall);
  };

  const transformActions = (actions: Array<Action>) => {
    const validActions = isValidActions(actions);

    if (!validActions) {
      throw new Error(
        `Only 'FunctionCall' actions types are supported by ${metadata.name}`
      );
    }

    return actions.map((action) => {
      const internalAction = najActionToInternal(action);
      return internalAction.type === "FunctionCall"
        ? internalAction.params
        : ({} as FunctionCallAction["params"]);
    });
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

  const getAccounts = async () => {
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

    return [{ accountId }];
  };

  const getSignedTransaction = (signedTx: string) => {
    const buf = Buffer.from(signedTx, "base64");
    const signedTransaction = SignedTransaction.decode(buf);
    return signedTransaction;
  };

  return {
    async signIn({ contractId, methodNames }) {
      try {
        const { accessKey, accountId } = await _state.wallet.requestSignIn({
          contractId: contractId || "",
          methodNames,
        });
        setupEvents();

        const publicKey = accessKey?.publicKey;

        return [
          {
            accountId,
            publicKey: publicKey ? publicKey.toString() : undefined,
          },
        ];
      } catch (_) {
        await signOut();
        throw new Error("Failed to sign in");
      }
    },

    signOut,

    getAccounts,

    async verifyOwner() {
      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signMessage(message) {
      try {
        const signedMessage = await _state.wallet.signMessage(message);
        return signedMessage;
      } catch (error) {
        throw new Error("sign Error");
      }
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }

      try {
        const signedTx = await _state.wallet.signTransaction({
          receiverId: receiverId || contract.contractId,
          actions: transformActions(actions),
        });
        const signedTransaction = getSignedTransaction(signedTx);
        return provider.sendTransaction(signedTransaction);
      } catch (error) {
        throw new Error("sign Error");
      }
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      if (!_state.wallet.isSignedIn()) {
        throw new Error("Wallet not signed in");
      }

      try {
        const resp = await _state.wallet.requestSignTransactions({
          transactions: transformTransactions(transactions),
        });

        const { txs } = resp;
        const results = [];
        for (let i = 0; i < txs.length; i++) {
          const signedTransaction = getSignedTransaction(txs[i].signedTx);
          results.push(await provider.sendTransaction(signedTransaction));
        }
        return results;
      } catch (error) {
        throw new Error("sign Error");
      }
    },

    async createSignedTransaction(receiverId, actions) {
      logger.log("createSignedTransaction", { receiverId, actions });
      const { contract } = store.getState();

      if (!_state.wallet.isSignedIn() || !contract) {
        throw new Error("Wallet not signed in");
      }

      try {
        const signedTx = await _state.wallet.signTransaction({
          receiverId: receiverId || contract.contractId,
          actions: transformActions(actions),
        });
        const signedTransaction = getSignedTransaction(signedTx);
        return signedTransaction;
      } catch (error) {
        throw new Error("Failed to create signed transaction");
      }
    },

    async signTransaction(transaction) {
      logger.log("signTransaction", { transaction });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async getPublicKey() {
      logger.log("getPublicKey", {});

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signNep413Message(message, accountId, recipient, nonce, callbackUrl) {
      logger.log("signNep413Message", {
        message,
        accountId,
        recipient,
        nonce,
        callbackUrl,
      });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signDelegateAction(delegateAction) {
      logger.log("signDelegateAction", { delegateAction });

      throw new Error(`Method not supported by ${metadata.name}`);
    },
  };
};

export function setupOKXWallet({
  iconUrl = icon,
  deprecated = false,
}: OKXWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "okx-wallet",
      type: "injected",
      metadata: {
        name: "OKX Wallet",
        description: "Browser extension wallet",
        iconUrl,
        downloadUrl,
        deprecated,
        available: installed,
      },
      init: OKXWallet,
    };
  };
}
