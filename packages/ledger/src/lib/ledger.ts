import { isMobile } from "is-mobile";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import type {
  WalletModuleFactory,
  WalletBehaviourFactory,
  JsonStorageService,
  Account,
  HardwareWallet,
  Transaction,
  Optional,
} from "@near-wallet-selector/core";
import { getActiveAccount } from "@near-wallet-selector/core";

import { isLedgerSupported, LedgerClient } from "./ledger-client";
import type { Subscription } from "./ledger-client";
import { Signer, utils } from "near-api-js";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import icon from "./icon";

interface LedgerAccount extends Account {
  derivationPath: string;
  publicKey: string;
}

interface ValidateAccessKeyParams {
  accountId: string;
  publicKey: string;
}

interface LedgerState {
  client: LedgerClient;
  accounts: Array<LedgerAccount>;
  subscriptions: Array<Subscription>;
}

export interface LedgerParams {
  iconUrl?: string;
  deprecated?: boolean;
}

export const STORAGE_ACCOUNTS = "accounts";

const setupLedgerState = async (
  storage: JsonStorageService
): Promise<LedgerState> => {
  const accounts = await storage.getItem<Array<LedgerAccount>>(
    STORAGE_ACCOUNTS
  );

  return {
    client: new LedgerClient(),
    subscriptions: [],
    accounts: accounts || [],
  };
};

const Ledger: WalletBehaviourFactory<HardwareWallet> = async ({
  options,
  store,
  provider,
  logger,
  storage,
  metadata,
}) => {
  const _state = await setupLedgerState(storage);

  const signer: Signer = {
    createKey: () => {
      throw new Error("Not implemented");
    },
    getPublicKey: async (accountId) => {
      const account = _state.accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find public key for account");
      }

      return utils.PublicKey.from(account.publicKey);
    },
    signMessage: async (message, accountId) => {
      const account = _state.accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find account for signing");
      }

      const signature = await _state.client.sign({
        data: message,
        derivationPath: account.derivationPath,
      });

      return {
        signature,
        publicKey: utils.PublicKey.from(account.publicKey),
      };
    },
  };

  const getAccounts = (): Array<Account> => {
    return _state.accounts.map((x) => ({
      accountId: x.accountId,
    }));
  };

  const cleanup = () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    _state.subscriptions = [];
    _state.accounts = [];

    storage.removeItem(STORAGE_ACCOUNTS);
  };

  const signOut = async () => {
    if (_state.client.isConnected()) {
      await _state.client.disconnect().catch((err) => {
        logger.log("Failed to disconnect device");
        logger.error(err);
      });
    }

    cleanup();
  };

  const connectLedgerDevice = async () => {
    if (_state.client.isConnected()) {
      return;
    }

    await _state.client.connect();
  };

  const validateAccessKey = ({
    accountId,
    publicKey,
  }: ValidateAccessKeyParams) => {
    logger.log("validateAccessKey", { accountId, publicKey });

    return provider.viewAccessKey({ accountId, publicKey }).then(
      (accessKey) => {
        logger.log("validateAccessKey:accessKey", { accessKey });

        if (accessKey.permission !== "FullAccess") {
          throw new Error("Public key requires 'FullAccess' permission");
        }

        return accessKey;
      },
      (err) => {
        if (err.type === "AccessKeyDoesNotExist") {
          return null;
        }

        throw err;
      }
    );
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const { contract } = store.getState();

    if (!contract) {
      throw new Error("Wallet not signed in");
    }

    const account = getActiveAccount(store.getState());

    if (!account) {
      throw new Error("No active account");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || account.accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };

  return {
    async signIn({ accounts }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      const ledgerAccounts: Array<LedgerAccount> = [];

      for (let i = 0; i < accounts.length; i++) {
        const { derivationPath, accountId, publicKey } = accounts[i];

        const accessKey = await validateAccessKey({ accountId, publicKey });

        if (!accessKey) {
          throw new Error(
            `Public key is not registered with the account '${accountId}'.`
          );
        }

        ledgerAccounts.push({
          accountId,
          derivationPath,
          publicKey,
        });
      }

      await storage.setItem(STORAGE_ACCOUNTS, ledgerAccounts);
      _state.accounts = ledgerAccounts;

      return getAccounts();
    },

    signOut,

    async getAccounts() {
      return getAccounts();
    },

    async verifyOwner({ message }) {
      logger.log("Ledger:verifyOwner", { message });

      throw new Error(`Method not supported by ${metadata.name}`);
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      if (!_state.accounts.length) {
        throw new Error("Wallet not signed in");
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const signedTransactions = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        signer,
        options.network
      );

      return provider.sendTransaction(signedTransactions[0]);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      if (!_state.accounts.length) {
        throw new Error("Wallet not signed in");
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const signedTransactions = await signTransactions(
        transformTransactions(transactions),
        signer,
        options.network
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTransactions.length; i++) {
        results.push(await provider.sendTransaction(signedTransactions[i]));
      }

      return results;
    },
    async getPublicKey(derivationPath: string) {
      await connectLedgerDevice();

      return await _state.client.getPublicKey({ derivationPath });
    },
  };
};

export function setupLedger({
  iconUrl = icon,
  deprecated = false,
}: LedgerParams = {}): WalletModuleFactory<HardwareWallet> {
  return async () => {
    const mobile = isMobile();
    const supported = isLedgerSupported();

    if (mobile) {
      return null;
    }

    return {
      id: "ledger",
      type: "hardware",
      metadata: {
        name: "Ledger",
        description:
          "Protect crypto assets with the most popular hardware wallet.",
        iconUrl,
        deprecated,
        available: supported,
      },
      init: Ledger,
    };
  };
}
