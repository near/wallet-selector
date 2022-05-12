import { transactions as nearTransactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  WalletBehaviourOptions,
  AccountState,
  Account,
  HardwareWallet,
  transformActions,
  Transaction,
  Optional,
} from "@near-wallet-selector/core";

import { isLedgerSupported, LedgerClient, Subscription } from "./ledger-client";

interface LedgerAccount extends Account {
  derivationPath: string;
  publicKey: string;
}

interface ValidateAccessKeyParams {
  accountId: string;
  publicKey: string;
}

interface GetAccountIdFromPublicKeyParams {
  publicKey: string;
}

interface LedgerState {
  client: LedgerClient;
  accounts: Array<LedgerAccount>;
  subscriptions: Array<Subscription>;
}

export interface LedgerParams {
  iconUrl?: string;
}

export const STORAGE_ACCOUNTS = "accounts";

const setupLedgerState = async (
  storage: WalletBehaviourOptions<HardwareWallet>["storage"]
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
  metadata,
  provider,
  logger,
  storage,
}) => {
  const _state = await setupLedgerState(storage);

  const getAccounts = (): Array<AccountState> => {
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

  const disconnect = async () => {
    if (_state.client.isConnected()) {
      await _state.client.disconnect().catch((err) => {
        logger.log("Failed to disconnect");
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
    logger.log("Ledger:validateAccessKey", { accountId, publicKey });

    return provider.viewAccessKey({ accountId, publicKey }).then(
      (accessKey) => {
        logger.log("Ledger:validateAccessKey:accessKey", { accessKey });

        if (accessKey.permission !== "FullAccess") {
          throw new Error("Public key requires 'FullAccess' permission");
        }

        return accessKey;
      },
      (err) => {
        if (err instanceof TypedError && err.type === "AccessKeyDoesNotExist") {
          return null;
        }

        throw err;
      }
    );
  };

  const getAccountIdFromPublicKey = async ({
    publicKey,
  }: GetAccountIdFromPublicKeyParams): Promise<string> => {
    const response = await fetch(
      `${options.network.helperUrl}/publicKey/ed25519:${publicKey}/accounts`
    );

    if (!response.ok) {
      throw new Error("Failed to get account id from public key");
    }

    const accountIds = await response.json();

    if (!Array.isArray(accountIds) || !accountIds.length) {
      throw new Error(
        "Failed to find account linked for public key: " + publicKey
      );
    }

    return accountIds[0];
  };

  const signTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    if (!_state.accounts.length) {
      throw new Error(`${metadata.name} not connected`);
    }

    const signedTransactions: Array<nearTransactions.SignedTransaction> = [];

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      const account = transaction.signerId
        ? _state.accounts.find((x) => x.accountId === transaction.signerId)
        : _state.accounts[0];

      if (!account) {
        throw new Error("Invalid signer id: " + transaction.signerId);
      }

      const { accountId, derivationPath, publicKey } = account;

      const [block, accessKey] = await Promise.all([
        provider.block({ finality: "final" }),
        provider.viewAccessKey({ accountId, publicKey }),
      ]);

      const tx = nearTransactions.createTransaction(
        accountId,
        utils.PublicKey.from(publicKey),
        transaction.receiverId,
        accessKey.nonce + i + 1,
        transformActions(transaction.actions),
        utils.serialize.base_decode(block.header.hash)
      );

      const serializedTx = utils.serialize.serialize(
        nearTransactions.SCHEMA,
        tx
      );

      const signature = await _state.client.sign({
        data: serializedTx,
        derivationPath,
      });

      const signedTx = new nearTransactions.SignedTransaction({
        transaction: tx,
        signature: new nearTransactions.Signature({
          keyType: tx.publicKey.keyType,
          data: signature,
        }),
      });

      signedTransactions.push(signedTx);
    }

    return signedTransactions;
  };

  return {
    async connect({ derivationPaths }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      if (!derivationPaths.length) {
        throw new Error("Invalid derivation paths");
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const accounts: Array<LedgerAccount> = [];

      for (let i = 0; i < derivationPaths.length; i += 1) {
        const derivationPath = derivationPaths[i];
        const publicKey = await _state.client.getPublicKey({ derivationPath });
        const accountId = await getAccountIdFromPublicKey({ publicKey });

        if (accounts.some((x) => x.accountId === accountId)) {
          throw new Error("Duplicate account id: " + accountId);
        }

        const accessKey = await validateAccessKey({ accountId, publicKey });

        if (!accessKey) {
          throw new Error(
            `Public key is not registered with the account '${accountId}'.`
          );
        }

        accounts.push({
          accountId,
          derivationPath,
          publicKey,
        });
      }

      storage.setItem(STORAGE_ACCOUNTS, accounts);
      _state.accounts = accounts;

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
      logger.log("Ledger:signAndSendTransaction", {
        signerId,
        receiverId,
        actions,
      });

      if (!_state.accounts.length) {
        throw new Error(`${metadata.name} not connected`);
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const [signedTx] = await signTransactions([
        {
          signerId,
          receiverId,
          actions,
        },
      ]);

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("Ledger:signAndSendTransactions", { transactions });

      if (!_state.accounts.length) {
        throw new Error(`${metadata.name} not connected`);
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const signedTransactions = await signTransactions(transactions);

      return Promise.all(
        signedTransactions.map((signedTx) => provider.sendTransaction(signedTx))
      );
    },
  };
};

export function setupLedger({
  iconUrl = "./assets/ledger-icon.png",
}: LedgerParams = {}): WalletModuleFactory<HardwareWallet> {
  return async () => {
    const mobile = isMobile();
    const supported = isLedgerSupported();

    if (mobile || !supported) {
      return null;
    }

    return {
      id: "ledger",
      type: "hardware",
      metadata: {
        name: "Ledger",
        description: null,
        iconUrl,
      },
      init: Ledger,
    };
  };
}
