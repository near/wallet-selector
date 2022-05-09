import { transactions as nearTransactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import { isMobile, createTransaction } from "@near-wallet-selector/utils";
import {
  WalletModuleFactory,
  WalletBehaviourFactory,
  WalletBehaviourOptions,
  AccountState,
  HardwareWallet,
  Transaction,
  Optional,
} from "@near-wallet-selector/core";

import { isLedgerSupported, LedgerClient, Subscription } from "./ledger-client";

interface AuthData {
  accountId: string;
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
  authData: AuthData | null;
  subscriptions: Array<Subscription>;
}

export interface LedgerParams {
  iconUrl?: string;
}

export const LOCAL_STORAGE_AUTH_DATA = `ledger:authData`;

const setupLedgerState = (
  storage: WalletBehaviourOptions<HardwareWallet>["storage"]
): LedgerState => {
  return {
    client: new LedgerClient(),
    subscriptions: [],
    authData: storage.getItem<AuthData>(LOCAL_STORAGE_AUTH_DATA),
  };
};

const Ledger: WalletBehaviourFactory<HardwareWallet> = async ({
  options,
  metadata,
  provider,
  logger,
  storage,
}) => {
  const _state = setupLedgerState(storage);

  const getAccounts = (
    authData: AuthData | null = _state.authData
  ): Array<AccountState> => {
    const accountId = authData?.accountId;

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const cleanup = () => {
    _state.subscriptions.forEach((subscription) => subscription.remove());

    _state.subscriptions = [];
    _state.authData = null;

    storage.removeItem(LOCAL_STORAGE_AUTH_DATA);
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
      throw new Error("Failed to find account linked to public key");
    }

    return accountIds[0];
  };

  const signTransactions = async (
    transactions: Array<Optional<Transaction, "signerId">>
  ) => {
    if (!_state.authData) {
      throw new Error(`${metadata.name} not connected`);
    }

    const { accountId, derivationPath, publicKey } = _state.authData;

    const [block, accessKey] = await Promise.all([
      provider.block({ finality: "final" }),
      provider.viewAccessKey({ accountId, publicKey }),
    ]);

    const signedTransactions: Array<nearTransactions.SignedTransaction> = [];

    for (let i = 0; i < transactions.length; i++) {
      const transaction = createTransaction({
        accountId,
        publicKey,
        receiverId: transactions[i].receiverId,
        nonce: accessKey.nonce + i + 1,
        actions: transactions[i].actions,
        hash: block.header.hash,
      });

      const serializedTx = utils.serialize.serialize(
        nearTransactions.SCHEMA,
        transaction
      );

      const signature = await _state.client.sign({
        data: serializedTx,
        derivationPath,
      });

      const signedTx = new nearTransactions.SignedTransaction({
        transaction,
        signature: new nearTransactions.Signature({
          keyType: transaction.publicKey.keyType,
          data: signature,
        }),
      });

      signedTransactions.push(signedTx);
    }

    return signedTransactions;
  };

  return {
    async connect({ derivationPath }) {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      if (!derivationPath) {
        throw new Error("Invalid derivation path");
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const publicKey = await _state.client.getPublicKey({ derivationPath });
      const accountId = await getAccountIdFromPublicKey({ publicKey });

      return validateAccessKey({ accountId, publicKey })
        .then((accessKey) => {
          if (!accessKey) {
            throw new Error(
              `Public key is not registered with the account '${accountId}'.`
            );
          }

          const authData: AuthData = {
            accountId,
            derivationPath,
            publicKey,
          };

          storage.setItem(LOCAL_STORAGE_AUTH_DATA, authData);
          _state.authData = authData;

          return getAccounts();
        })
        .catch(async (err) => {
          await disconnect();

          throw err;
        });
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

      if (!_state.authData) {
        throw new Error("Wallet not connected");
      }

      // Note: Connection must be triggered by user interaction.
      await connectLedgerDevice();

      const [signedTx] = await signTransactions([
        {
          receiverId,
          actions,
        },
      ]);

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("Ledger:signAndSendTransactions", { transactions });

      if (!_state.authData) {
        throw new Error("Wallet not connected");
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
