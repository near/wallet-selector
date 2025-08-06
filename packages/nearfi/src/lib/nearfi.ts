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
import type { InjectedNearFi } from "./injected-nearfi";
import icon from "./icon";

declare global {
  interface Window {
    nearFiWallet: InjectedNearFi | undefined;
  }
}

export interface NearFiParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface NearFiState {
  wallet: InjectedNearFi;
}

const isInstalled = () => {
  return !!window.nearFiWallet?.isNearFi;
};

const setupNearFiState = (): NearFiState => {
  const wallet = window.nearFiWallet!;

  return {
    wallet,
  };
};

const NearFi: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  metadata,
  store,
  emitter,
  logger,
}) => {
  const _state = setupNearFiState();

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

  const getAccounts = async (): Promise<Array<Account>> => {
    let accountId = _state.wallet.getAccountId();
    if (!accountId) {
      await _state.wallet.resolveSignInState();
      accountId = _state.wallet.getAccountId();
      if (!accountId) {
        return [];
      }
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
      return await getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("NearFi:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
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

export function setupNearFi({
  iconUrl = icon,
  deprecated = false,
}: NearFiParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const installed = await isInstalled();

    if (!mobile || !installed) {
      return null;
    }

    return {
      id: "nearfi",
      type: "injected",
      metadata: {
        name: "NearFi",
        description: "Your NEAR DeFi experience On The Go",
        iconUrl,
        downloadUrl: "https://nearfi.finance",
        deprecated,
        available: installed,
      },
      init: NearFi,
    };
  };
}
