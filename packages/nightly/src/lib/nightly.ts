import type {
  InjectedWallet,
  WalletBehaviourFactory,
  WalletModuleFactory,
  WalletSelectorStore,
  Optional,
  Transaction,
  EventEmitterService,
  WalletEvents,
  Account,
} from "@near-wallet-selector/core";
import { waitFor } from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import { isMobile } from "is-mobile";
import type { Signer } from "near-api-js";
import * as nearAPI from "near-api-js";
import type { NearNightly, InjectedNightly } from "./injected-nightly";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import icon from "./icon";

declare global {
  interface Window {
    nightly: InjectedNightly | undefined;
  }
}

interface NightlyState {
  wallet: NearNightly;
}

const setupNightlyState = async (
  store: WalletSelectorStore,
  emitter: EventEmitterService<WalletEvents>
): Promise<NightlyState> => {
  const { selectedWalletId } = store.getState();
  const wallet = window.nightly!.near!;

  // Attempt to reconnect wallet if previously selected.
  if (selectedWalletId === "nightly") {
    await wallet
      .connect((newAcc) => {
        if (!newAcc) {
          emitter.emit("signedOut", null);
        } else {
          emitter.emit("accountsChanged", {
            accounts: [
              {
                accountId: newAcc.accountId,
                publicKey: wallet.account.publicKey.toString(),
              },
            ],
          });
        }
      }, true)
      .catch(() => null);
  }

  return {
    wallet,
  };
};
const isInstalled = () => {
  return waitFor(() => !!window.nightly?.near, { timeout: 5000 }).catch(
    () => false
  );
};
const Nightly: WalletBehaviourFactory<InjectedWallet> = async ({
  metadata,
  options,
  store,
  logger,
  provider,
  emitter,
}) => {
  const _state = await setupNightlyState(store, emitter);

  const getAccounts = (): Array<Account> => {
    const { accountId, publicKey } = _state.wallet.account;
    if (!accountId) {
      return [];
    }

    return [
      {
        accountId,
        publicKey: publicKey.toString(),
      },
    ];
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const accounts = getAccounts();
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

  const signer: Signer = {
    createKey: () => {
      throw new Error("Not implemented");
    },
    getPublicKey: async (accountId) => {
      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find public key for account");
      }
      return nearAPI.utils.PublicKey.from(account.publicKey!);
    },
    signMessage: async (message, accountId) => {
      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find account for signing");
      }

      try {
        const tx = nearAPI.transactions.Transaction.decode(
          Buffer.from(message)
        );
        const signedTx = await _state.wallet.signTransaction(tx);

        return {
          signature: signedTx.signature.data,
          publicKey: tx.publicKey,
        };
      } catch (err) {
        logger.log("Failed to sign message");
        logger.error(err);

        throw Error("Invalid message. Only transactions can be signed");
      }
    },
  };

  return {
    async signIn() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      await _state.wallet.connect((newAcc) => {
        if (!newAcc) {
          emitter.emit("signedOut", null);
        } else {
          emitter.emit("accountsChanged", {
            accounts: [
              {
                accountId: newAcc.accountId,
                publicKey: _state.wallet.account.publicKey.toString(),
              },
            ],
          });
        }
      });

      return getAccounts();
    },

    async signOut() {
      await _state.wallet.disconnect();
    },

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("Nightly:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signMessage({ message, nonce, recipient, state }) {
      logger.log("Nightly:signMessage", {
        message,
        nonce,
        recipient,
        state,
      });

      if (!_state.wallet.isConnected) {
        await _state.wallet.connect();
      }

      const signature = await _state.wallet.signMessage({
        message,
        nonce,
        recipient,
        state,
      });

      return signature;
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();
      const accounts = getAccounts();

      if (!accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }
      const [signedTx] = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        signer,
        options.network
      );

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const signedTxs = await signTransactions(
        transformTransactions(transactions),
        signer,
        options.network
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTxs.length; i++) {
        results.push(await provider.sendTransaction(signedTxs[i]));
      }

      return results;
    },

    async importAccountsInSecureContext(params) {
      _state.wallet.importWalletsNear(params.accounts);
    },
  };
};

export interface NightlyWalletParams {
  iconUrl?: string;
  deprecated?: boolean;
}
export function setupNightly({
  iconUrl = icon,
  deprecated = false,
}: NightlyWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "nightly",
      type: "injected",
      metadata: {
        name: "Nightly",
        description: "Multichain crypto wallet.",
        iconUrl,
        // Will replace we open beta with stable version
        downloadUrl: "https://wallet.nightly.app/download",
        deprecated,
        available: installed,
      },
      init: Nightly,
    };
  };
}
