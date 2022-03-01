import { transactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import ProviderService from "../../services/provider/ProviderService";
import { Emitter } from "../../utils/EventsHandler";
import LedgerClient, { Subscription } from "./LedgerClient";
import { logger } from "../../services/logging.service";
import { transformActions } from "../actions";
import { LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA } from "../../constants";
import { setSelectedWalletId } from "../helpers";
import { ledgerWalletIcon } from "../icons";
import {
  AccountInfo,
  HardwareWallet,
  HardwareWalletType,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";

interface AuthData {
  accountId: string;
  derivationPath: string;
  publicKey: string;
}

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

class LedgerWallet implements HardwareWallet {
  private client: LedgerClient | undefined;
  private subscriptions: Record<string, Subscription> = {};

  private provider: ProviderService;
  private emitter: Emitter;

  private authData: AuthData | null;

  // Temporary values before committing to authData.
  private accountId: string | null;
  private derivationPath: string | null;

  private debugMode = false;

  id = "ledger-wallet";
  type: HardwareWalletType = "hardware";
  name = "Ledger Wallet";
  description = null;
  iconUrl = ledgerWalletIcon;

  constructor({ provider, emitter }: WalletOptions) {
    this.provider = provider;
    this.emitter = emitter;
  }

  isAvailable = () => {
    if (!LedgerClient.isSupported()) {
      return false;
    }

    if (isMobile()) {
      return false;
    }

    return true;
  };

  private getClient = async () => {
    if (this.client) {
      return this.client;
    }

    const client = new LedgerClient();

    await client.connect();
    client.setScrambleKey("NEAR");

    this.subscriptions.disconnect = client.on("disconnect", (err) => {
      logger.error(err);

      this.signOut();
    });

    if (this.debugMode) {
      this.subscriptions.logs = client.listen((data) => {
        logger.log("LedgerWallet:init:logs", data);
      });
    }

    this.client = client;

    return client;
  };

  // TODO: Migrate to storage service (with JSON support).
  private getAuthData = (): AuthData | null => {
    const authData = localStorage.getItem(
      LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA
    );

    return authData ? JSON.parse(authData) : null;
  };

  init = async () => {
    this.authData = this.getAuthData();
  };

  setDerivationPath = (derivationPath: string) => {
    this.derivationPath = derivationPath;
  };

  setAccountId = (accountId: string) => {
    this.accountId = accountId;
  };

  signIn = async () => {
    if (await this.isSignedIn()) {
      return;
    }

    if (!this.accountId) {
      throw new Error("Invalid account id");
    }

    if (!this.derivationPath) {
      throw new Error("Invalid derivation path");
    }

    const { publicKey, accessKey } = await this.validate({
      accountId: this.accountId,
      derivationPath: this.derivationPath,
    });

    if (!accessKey) {
      throw new Error(
        `Public key is not registered with the account '${this.accountId}'.`
      );
    }

    const authData: AuthData = {
      accountId: this.accountId,
      derivationPath: this.derivationPath,
      publicKey,
    };

    localStorage.setItem(
      LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA,
      JSON.stringify(authData)
    );

    this.authData = authData;
    this.accountId = null;
    this.derivationPath = null;

    setSelectedWalletId(this.id);
    this.emitter.emit("signIn");
  };

  signOut = async () => {
    for (const key in this.subscriptions) {
      this.subscriptions[key].remove();
    }

    localStorage.removeItem(LOCAL_STORAGE_LEDGER_WALLET_AUTH_DATA);

    this.accountId = null;
    this.derivationPath = null;

    // Only close if we've already connected.
    if (this.client) {
      await this.client.disconnect();
    }
    setSelectedWalletId(null);
    this.emitter.emit("signOut");
    this.authData = null;
    this.client = undefined;
  };

  isSignedIn = async (): Promise<boolean> => {
    return !!this.authData;
  };

  private validate = async ({ accountId, derivationPath }: ValidateParams) => {
    logger.log("LedgerWallet:validate", { accountId, derivationPath });

    const client = await this.getClient();

    const publicKey = await client.getPublicKey({
      derivationPath: derivationPath,
    });

    logger.log("LedgerWallet:validate:publicKey", { publicKey });

    try {
      const accessKey = await this.provider.viewAccessKey({
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

  getAccount = async (): Promise<AccountInfo | null> => {
    const signedIn = await this.isSignedIn();
    const accountId = this.authData?.accountId;

    if (!signedIn || !accountId) {
      return null;
    }

    const account = await this.provider.viewAccount({ accountId });

    return {
      accountId,
      balance: account.amount,
    };
  };

  signAndSendTransaction = async ({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) => {
    logger.log("LedgerWallet:signAndSendTransaction", { receiverId, actions });

    if (!this.authData) {
      throw new Error("Not signed in");
    }

    const { accountId, derivationPath, publicKey } = this.authData;
    const client = await this.getClient();

    const [block, accessKey] = await Promise.all([
      this.provider.block({ finality: "final" }),
      this.provider.viewAccessKey({ accountId, publicKey }),
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

    const signature = await client.sign({ data: serializedTx, derivationPath });

    const signedTx = new transactions.SignedTransaction({
      transaction,
      signature: new transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature,
      }),
    });

    return this.provider.sendTransaction(signedTx).then((res) => {
      const successValue =
        (typeof res.status !== "string" && res.status.SuccessValue) || "";

      if (successValue === "") {
        return null;
      }

      return JSON.parse(Buffer.from(successValue, "base64").toString());
    });
  };

  // TODO: Not entirely sure how we should implement this. Is it simply a case of sequentially
  //  calling provider.sendTransaction? If so, this seems to completely miss the point of
  //  transactions (from a classic database mental modal)? I would expect this method be to
  //  used to ensure atomicity.
  signAndSendTransactions = async () => {
    throw new Error("Not implemented");
  };
}

export default LedgerWallet;
