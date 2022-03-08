import { transactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import LedgerClient, { Subscription } from "./LedgerClient";
import { logger } from "../../services/logging.service";
import { transformActions } from "../actions";
import { LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA } from "../../constants";
import { setSelectedWalletId } from "../helpers";
import { ledgerWalletIcon } from "../icons";
import { HardwareWallet, WalletModule } from "../Wallet";

interface AuthData {
  accountId: string;
  derivationPath: string;
  publicKey: string;
}

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

interface LedgerWalletState {
  authData: AuthData | null;
}

function setupLedgerWallet(): WalletModule<HardwareWallet> {
  return function LedgerWallet({ provider, emitter }) {
    let client: LedgerClient | null;
    const subscriptions: Record<string, Subscription> = {};
    const state: LedgerWalletState = { authData: null };

    const debugMode = false;

    const signOut = async () => {
      for (const key in subscriptions) {
        subscriptions[key].remove();
      }

      localStorage.removeItem(LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA);

      // Only close if we've already connected.
      if (client) {
        await client.disconnect();
      }

      setSelectedWalletId(null);
      emitter.emit("signOut");
      state.authData = null;
      client = null;
    };

    const getClient = async () => {
      if (client) {
        return client;
      }

      const ledgerClient = new LedgerClient();

      await ledgerClient.connect();
      ledgerClient.setScrambleKey("NEAR");

      subscriptions.disconnect = ledgerClient.on("disconnect", (err) => {
        logger.error(err);

        signOut();
      });

      if (debugMode) {
        subscriptions.logs = ledgerClient.listen((data) => {
          logger.log("LedgerWallet:init:logs", data);
        });
      }

      client = ledgerClient;

      return ledgerClient;
    };

    // TODO: Migrate to storage service (with JSON support).
    const getAuthData = (): AuthData | null => {
      const authData = localStorage.getItem(
        LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA
      );

      return authData ? JSON.parse(authData) : null;
    };

    const validate = async ({ accountId, derivationPath }: ValidateParams) => {
      logger.log("LedgerWallet:validate", { accountId, derivationPath });

      const ledgerClient = await getClient();

      const publicKey = await ledgerClient.getPublicKey({
        derivationPath: derivationPath,
      });

      logger.log("LedgerWallet:validate:publicKey", { publicKey });

      try {
        const accessKey = await provider.viewAccessKey({
          accountId,
          publicKey,
        });

        logger.log("LedgerWallet:validate:accessKey", { accessKey });

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

    return {
      id: "ledger-wallet",
      type: "hardware",
      name: "Ledger Wallet",
      description: null,
      iconUrl: ledgerWalletIcon,

      isAvailable() {
        if (!LedgerClient.isSupported()) {
          return false;
        }

        if (isMobile()) {
          return false;
        }

        return true;
      },

      async init() {
        state.authData = getAuthData();
      },

      async signIn({ accountId, derivationPath }) {
        if (await this.isSignedIn()) {
          return;
        }

        if (!accountId) {
          throw new Error("Invalid account id");
        }

        if (!derivationPath) {
          throw new Error("Invalid derivation path");
        }

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

        localStorage.setItem(
          LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA,
          JSON.stringify(authData)
        );

        state.authData = authData;

        setSelectedWalletId(this.id);
        emitter.emit("signIn");
      },

      signOut,

      async isSignedIn() {
        return !!state.authData;
      },

      async getAccount() {
        const signedIn = await this.isSignedIn();
        const accountId = state.authData?.accountId;

        if (!signedIn || !accountId) {
          return null;
        }

        const account = await provider.viewAccount({ accountId });

        return {
          accountId,
          balance: account.amount,
        };
      },

      async signAndSendTransaction({ receiverId, actions }) {
        logger.log("LedgerWallet:signAndSendTransaction", {
          receiverId,
          actions,
        });

        if (!state.authData) {
          throw new Error("Not signed in");
        }

        const { accountId, derivationPath, publicKey } = state.authData;
        const ledgerClient = await getClient();

        const [block, accessKey] = await Promise.all([
          provider.block({ finality: "final" }),
          provider.viewAccessKey({ accountId, publicKey }),
        ]);

        logger.log("LedgerWallet:signAndSendTransaction:block", block);
        logger.log("LedgerWallet:signAndSendTransaction:accessKey", accessKey);

        const transaction = transactions.createTransaction(
          accountId,
          utils.PublicKey.from(publicKey),
          receiverId,
          accessKey.nonce + 1,
          transformActions(actions),
          utils.serialize.base_decode(block.header.hash)
        );

        const serializedTx = utils.serialize.serialize(
          transactions.SCHEMA,
          transaction
        );

        const signature = await ledgerClient.sign({
          data: serializedTx,
          derivationPath,
        });

        const signedTx = new transactions.SignedTransaction({
          transaction,
          signature: new transactions.Signature({
            keyType: transaction.publicKey.keyType,
            data: signature,
          }),
        });

        return provider.sendTransaction(signedTx);
      },
    };
  };
}

export default setupLedgerWallet;
