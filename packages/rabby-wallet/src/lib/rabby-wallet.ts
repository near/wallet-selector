import { isMobile } from "is-mobile";
import { SignedTransaction } from "near-api-js/lib/transaction";
import type {
  Action,
  FunctionCallAction,
  InjectedWallet,
  Optional,
  Transaction,
  WalletBehaviourFactory,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";

import icon from "./icon";
import type { InjectedRabby } from "./injected-rabby-wallet";

const downloadUrl =
  "https://chromewebstore.google.com/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch";

declare global {
  interface Window {
    rabby: {
      near: InjectedRabby | undefined;
    };
  }
}

export interface RabbyWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface RabbyState {
  wallet: InjectedRabby;
}

const isInstalled = () => {
  return waitFor(() => !!window.rabby?.near).catch(() => false);
};

const setupRabbyState = (): RabbyState => {
  const wallet = window.rabby?.near!;
  return {
    wallet,
  };
};

const RabbyWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  store,
  emitter,
  logger,
  id,
  provider,
}) => {
  const _state = setupRabbyState();

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
    return SignedTransaction.decode(buf);
  };

  return {
    async signIn({ contractId, methodNames }) {
      try {
        const { accessKey, accountId } = await _state.wallet.requestSignIn({
          contractId,
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

    async signMessage() {
      throw new Error(`Method not supported by ${metadata.name}`);
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
  };
};

export function setupRabbyWallet({
  iconUrl = icon,
  deprecated = false,
}: RabbyWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "rabby-wallet",
      type: "injected",
      metadata: {
        name: "Rabby Wallet",
        description: "Browser extension wallet",
        iconUrl,
        downloadUrl,
        deprecated,
        available: installed,
      },
      init: RabbyWallet,
    };
  };
}
