import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  InjectedWallet,
  Transaction,
  Optional,
  Account,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import type { InjectedBitgetWallet } from "./injected-bitget-wallet";
import icon from "./icon";

declare global {
  interface Window {
    bitkeep: {
      near: InjectedBitgetWallet | undefined;
    };
  }
}

export interface BitgetWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}

interface BitgetWalletState {
  wallet: InjectedBitgetWallet;
}

const isInstalled = () => {
  return waitFor(() => !!window.bitkeep.near).catch(() => false);
};

const setupBitgetWalletState = (): BitgetWalletState => {
  const wallet = window.bitkeep.near!;
  return {
    wallet,
  };
};

const BitgetWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  store,
  provider,
  emitter,
  logger,
}) => {
  const _state = setupBitgetWalletState();

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
    const accountId = _state.wallet.getAccountId() || "";
    if (!accountId) {
      return [];
    }

    const publicKey = await _state.wallet.getPublicKey();

    return [
      {
        accountId,
        publicKey: publicKey ? publicKey.toString() : undefined,
      },
    ];
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    return transactions.map((transaction) => {
      return {
        receiverId: transaction.receiverId,
        actions: transaction.actions,
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

      // debugger;
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
      logger.log("Bitget-wallet:verifyOwner", { message });

      const networkId = options.network.networkId;
      const accountId = await _state.wallet.getAccountId();
      const pubKey = await _state.wallet.getPublicKey();

      const block = await provider.block({ finality: "final" });

      const data = {
        accountId,
        message,
        blockId: block.header.hash,
        publicKey: pubKey,
        keyType: "0",
      };
      const encoded = JSON.stringify(data);

      const signed = await _state.wallet.verifyOwner(
        encoded,
        accountId,
        networkId
      );
      return {
        ...data,
        signature: signed.signature,
        keyType: signed.keyType,
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
          actions: actions,
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

export function setupBitgetWallet({
  iconUrl = icon,
  deprecated = false,
}: BitgetWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();
    // Add extra wait to ensure Bitget Wallet's sign in status is read from the
    // browser extension background env.
    // Check for isSignedIn() in only if extension is installed.
    if (installed) {
      await waitFor(() => !!window.bitkeep?.near?.isSignedIn()).catch(
        () => false
      );
    }

    return {
      id: "bitget-wallet",
      type: "injected",
      metadata: {
        name: "Bitget Wallet",
        description: "Browser extension wallet built on NEAR.",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
        deprecated,
        available: installed,
      },
      init: BitgetWallet,
    };
  };
}
