import { transactions as nearTransactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import {
  WalletModule,
  WalletBehaviourFactory,
  HardwareWallet,
  transformActions,
  Transaction,
  Optional,
} from "@near-wallet-selector/core";

import { isLedgerSupported, LedgerClient, Subscription } from "./ledger-client";

interface AuthData {
  accountId: string;
  derivationPath: string;
  publicKey: string;
}

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

interface LedgerState {
  authData: AuthData | null;
}

export interface LedgerParams {
  iconUrl?: string;
}

export const LOCAL_STORAGE_AUTH_DATA = `ledger:authData`;

const Ledger: WalletBehaviourFactory<HardwareWallet> = ({
  options,
  metadata,
  provider,
  emitter,
  logger,
  storage,
}) => {
  let _wallet: LedgerClient | null;
  let _subscriptions: Record<string, Subscription> = {};
  const _state: LedgerState = { authData: null };

  const debugMode = false;

  const getAccounts = () => {
    const accountId = _state.authData?.accountId;

    if (!accountId) {
      return [];
    }

    return [{ accountId }];
  };

  const disconnect = async () => {
    for (const key in _subscriptions) {
      _subscriptions[key].remove();
    }

    storage.removeItem(LOCAL_STORAGE_AUTH_DATA);

    // Only close if we've already connected.
    if (_wallet) {
      await _wallet.disconnect();
    }

    _wallet = null;
    _subscriptions = {};
    _state.authData = null;

    emitter.emit("disconnected", null);
  };

  const loadState = () => {
    _state.authData = storage.getItem<AuthData>(LOCAL_STORAGE_AUTH_DATA);
  };

  const setupWallet = async (): Promise<LedgerClient> => {
    if (_wallet) {
      return _wallet;
    }

    const ledgerClient = new LedgerClient();

    await ledgerClient.connect();
    ledgerClient.setScrambleKey("NEAR");

    _subscriptions["disconnect"] = ledgerClient.on("disconnect", (err) => {
      logger.error(err);

      disconnect();
    });

    if (debugMode) {
      _subscriptions["logs"] = ledgerClient.listen((data) => {
        logger.log("Ledger:init:logs", data);
      });
    }

    _wallet = ledgerClient;

    return ledgerClient;
  };

  const getWallet = (): LedgerClient => {
    if (!_wallet) {
      throw new Error(`${metadata.name} not connected`);
    }

    return _wallet;
  };

  const validate = async ({ accountId, derivationPath }: ValidateParams) => {
    logger.log("Ledger:validate", { accountId, derivationPath });

    const wallet = getWallet();
    const publicKey = await wallet.getPublicKey({
      derivationPath: derivationPath,
    });

    logger.log("Ledger:validate:publicKey", { publicKey });

    try {
      const accessKey = await provider.viewAccessKey({
        accountId,
        publicKey,
      });

      logger.log("Ledger:validate:accessKey", { accessKey });

      if (accessKey.permission !== "FullAccess") {
        throw new Error("Public key requires 'FullAccess' permission");
      }

      return {
        publicKey,
        accessKey,
      };
    } catch (err) {
      if (err instanceof TypedError && err.type === "AccessKeyDoesNotExist") {
        return {
          publicKey,
          accessKey: null,
        };
      }

      throw err;
    }
  };

  const signTransaction = async (
    transaction: nearTransactions.Transaction,
    derivationPath: string
  ) => {
    const wallet = getWallet();
    const serializedTx = utils.serialize.serialize(
      nearTransactions.SCHEMA,
      transaction
    );
    const signature = await wallet.sign({
      data: serializedTx,
      derivationPath,
    });

    return new nearTransactions.SignedTransaction({
      transaction,
      signature: new nearTransactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature,
      }),
    });
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
      const actions = transformActions(transactions[i].actions);

      const transaction = nearTransactions.createTransaction(
        accountId,
        utils.PublicKey.from(publicKey),
        transactions[i].receiverId,
        accessKey.nonce + i + 1,
        actions,
        utils.serialize.base_decode(block.header.hash)
      );

      const signedTx = await signTransaction(transaction, derivationPath);
      signedTransactions.push(signedTx);
    }
    return signedTransactions;
  };

  return {
    isAvailable() {
      return !isMobile() && isLedgerSupported();
    },

    async init() {
      if (_wallet) {
        return;
      }

      // Only load previous state to avoid prompting connection via USB.
      // Connection must be triggered by user interaction.
      loadState();

      emitter.emit("init", { accounts: getAccounts() });
    },

    async connect({ accountId, derivationPath }) {
      if (!accountId) {
        throw new Error("Invalid account id");
      }

      if (!derivationPath) {
        throw new Error("Invalid derivation path");
      }

      await this.init();
      await setupWallet();

      const { publicKey, accessKey } = await validate({
        accountId,
        derivationPath,
      });

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

      emitter.emit("connected", { accounts: getAccounts() });
    },

    disconnect,

    getAccounts,

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
        throw new Error(`${metadata.name} not connected`);
      }

      const { accountId, derivationPath, publicKey } = _state.authData;

      const [block, accessKey] = await Promise.all([
        provider.block({ finality: "final" }),
        provider.viewAccessKey({ accountId, publicKey }),
      ]);

      logger.log("Ledger:signAndSendTransaction:block", block);
      logger.log("Ledger:signAndSendTransaction:accessKey", accessKey);

      const transaction = nearTransactions.createTransaction(
        accountId,
        utils.PublicKey.from(publicKey),
        receiverId,
        accessKey.nonce + 1,
        transformActions(actions),
        utils.serialize.base_decode(block.header.hash)
      );

      const signedTx = await signTransaction(transaction, derivationPath);

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      const signedTransactions = await signTransactions(transactions);

      return Promise.all(
        signedTransactions.map((signedTx) => provider.sendTransaction(signedTx))
      );
    },
  };
};

export function setupLedger({
  iconUrl = "./assets/ledger-icon.png",
}: LedgerParams = {}): WalletModule<HardwareWallet> {
  return {
    id: "ledger",
    type: "hardware",
    name: "Ledger",
    description: null,
    iconUrl,
    wallet: Ledger,
  };
}
