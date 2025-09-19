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
  FinalExecutionOutcome,
} from "@near-wallet-selector/core";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type { Signer } from "@near-js/signers";
import type { NearNightly, InjectedNightly } from "./injected-nightly";
import icon from "./icon";
import { PublicKey } from "@near-js/crypto";

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
  return !!window.nightly?.near;
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
    signNep413Message: async (
      message,
      accountId,
      recipient,
      nonce,
      callbackUrl
    ) => {
      const result = await _state.wallet.signMessage({
        message,
        nonce: Buffer.from(nonce),
        recipient,
        callbackUrl,
      });
      return {
        ...result,
        publicKey: PublicKey.fromString(result.publicKey),
        signature: Buffer.from(result.signature, "base64"),
      };
    },
    signTransaction: async (transaction) => {
      const signedTransaction = await _state.wallet.signTransaction(
        transaction
      );
      return [Buffer.from(signedTransaction.signature.data), signedTransaction];
    },
    getPublicKey: async () => {
      return PublicKey.fromString(_state.wallet.account.publicKey.toString());
    },
    signDelegateAction: async () => {
      throw new Error(`Method not supported by ${metadata.name}`);
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

    async createSignedTransaction(receiverId, actions) {
      logger.log("createSignedTransaction", { receiverId, actions });

      const [signedTx] = await signTransactions(
        transformTransactions([{ receiverId, actions }]),
        signer,
        options.network
      );

      return signedTx;
    },

    async signTransaction(transaction) {
      logger.log("signTransaction", { transaction });

      const signedTransaction = await signer.signTransaction(transaction);
      return signedTransaction;
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
