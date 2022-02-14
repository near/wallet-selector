import { transactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import BN from "bn.js";
import ProviderService from "../../services/provider/ProviderService";
import LedgerClient, { Subscription } from "./LedgerClient";
import { logger } from "../../services/logging.service";
import { Options } from "../../core/NearWalletSelector";
import {
  AccountInfo,
  FunctionCallAction,
  HardwareWallet,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";
import getConfig from "../../config";

const LOCAL_STORAGE_ACCOUNT_ID = "ledgerAccountId";
const LOCAL_STORAGE_DERIVATION_PATH = "ledgerDerivationPath";
const LOCAL_STORAGE_PUBLIC_KEY = "ledgerPublicKey";
export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

class LedgerWallet implements HardwareWallet {
  private client: LedgerClient;
  private subscriptions: Record<string, Subscription> = {};
  private provider: ProviderService;
  private options: Options;

  private accountId: string | null;
  private derivationPath: string | null;
  private publicKey: string | null;

  private debugMode = false;

  id: "ledger-wallet";
  type: "hardware";
  name: "Ledger Wallet";
  description: null;
  iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8zN0aZm6Jwc305PUtiZXGvsbbi4uSmp67n5+m+v8Q1OUdFSVb6+vr19fY+QlDt7e56fYbT1NdTVmPHyMyGiJFqbXdbXmlWWWWgoah7foeSlJx1eIJLT1yztbrw8fKmGsZBAAACeklEQVR4nO3d2XKCMBhAYSIUAUEQt9b1/d+yetPaGshMlp+0nnMN0k8lUGZMkoSIiIiIiIiIiIiIXr6mK+cP6Ta5zp0ruyYkostXa/WjTLfZTPnonBbat8m9ard4OlpAyL19vvTPWOuOFBiiVF34/Y6VO/1xgkOUeu89Oqp24CgCELX48Ob4GDyIBESpg6ev13H4EDIQlXqRDH8eYhB18uCoxg4gBVEzZ0c5dJ7LQtTGFTIw7opDzo6XxtEvliREHd0g2uv5JJCsc3EYPhBJiNv5Pn6GyEJqh4tJ93y/Ox3EZeDKTa8tCtnaQ1ZRQdb2EMOYJQxR1peSxvjSshDr/0yukUEqW0gZGeRiC5lHBsmBAAECBAgQIEBukMxU+zcglgEBAgQIECBAgAABAgQIECBAAkOuM2N/A/J/HgcBAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIC8GKRLTWl/MH8x7maZ80/BiYiIiIiIiCiuyjdTO91uuXE37exlW+Nu1hO8BHsclOp2ewv3OAgIECBAgAAB8p8gweags4RYz0HXRQaxvmkMNk+jJcR+Bvk6Loj9jL9pVJDa2pEUUUFW9hDj+CsKsR60bu0jgrQu85SbZi6WhDjMW3wbgA3jliBk4bY+jOF0F4QcnBxJ8x4JpC3dIEk/OlG5HMT9R/ljq3bIQXys2zE2VbkUZO9j9aRm5EZFCLJ2WlfhW3KaGLL347j/aUNnvAjk5HFVrs15MkjrdxKR5TGbBLI4uF4/nuqOmtuVwJBsG2Tdumaz/b3YQkhIvbr4X7Luq2Vf5cVDum36wpT2KUL1sEFe9d5GKiIiIiIiIiIiIqKX6xNYBUsKTAn7+wAAAABJRU5ErkJggg==";

  constructor({ options, provider }: WalletOptions) {
    this.options = options;
    this.provider = provider;
  }

  isAvailable() {
    if (!LedgerClient.isSupported()) {
      return false;
    }

    if (isMobile()) {
      return false;
    }

    return true;
  }

  private async getClient() {
    if (this.client) {
      return this.client;
    }

    const client = new LedgerClient();

    await client.connect();
    client.setScrambleKey("NEAR");

    // TODO: Need to update state via WalletController.
    this.subscriptions.disconnect = client.on("disconnect", (err) => {
      logger.error(err);

      this.disconnect();
    });

    if (this.debugMode) {
      this.subscriptions.logs = client.listen((data) => {
        logger.log("LedgerWallet:init:logs", data);
      });
    }

    this.client = client;

    return client;
  }

  // private async init() {
  //   const accountId = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_ID);
  //   const publicKey = localStorage.getItem(LOCAL_STORAGE_PUBLIC_KEY);
  //   const derivationPath = localStorage.getItem(LOCAL_STORAGE_DERIVATION_PATH);
  //
  //   if (!this.accountId) {
  //     this.accountId = accountId;
  //   }
  //
  //   if (!this.publicKey) {
  //     this.publicKey = publicKey;
  //   }
  //
  //   if (!this.derivationPath) {
  //     this.derivationPath = derivationPath || DEFAULT_DERIVATION_PATH;
  //   }
  // }

  setDerivationPath(derivationPath: string) {
    this.derivationPath = derivationPath;
  }

  setAccountId(accountId: string) {
    this.accountId = accountId;
  }

  async connect() {
    if (!this.accountId) {
      throw new Error("No account id found");
    }

    if (!this.derivationPath) {
      throw new Error("No derivation path found");
    }

    // TODO: Need to store the access key permission in storage.
    const { publicKey, accessKey } = await this.validate({
      accountId: this.accountId,
      derivationPath: this.derivationPath,
    });

    if (!accessKey) {
      const ok = confirm(
        `Your public key is not registered with the account '${this.accountId}'. Would you like to add it?`
      );

      if (ok) {
        const config = getConfig(this.options.networkId);
        const newUrl = new URL(`${config.walletUrl}/login/`);
        newUrl.searchParams.set("success_url", window.location.href);
        newUrl.searchParams.set("failure_url", window.location.href);
        newUrl.searchParams.set("contract_id", this.options.contract.accountId);
        newUrl.searchParams.set("public_key", publicKey);

        window.location.assign(newUrl.toString());
        return;
      }

      throw new Error(
        `Public key is not registered with the account '${this.accountId}'.`
      );
    }

    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_ID, this.accountId);
    localStorage.setItem(LOCAL_STORAGE_DERIVATION_PATH, this.derivationPath);
    localStorage.setItem(LOCAL_STORAGE_PUBLIC_KEY, publicKey);
  }

  private isSignedIn() {
    return !!this.accountId;
  }

  // TODO: Need to update state via WalletController.
  async disconnect() {
    for (const key in this.subscriptions) {
      this.subscriptions[key].remove();
    }

    // Only close if we've already connected.
    if (this.client) {
      await this.client.disconnect();
    }
  }

  async isConnected(): Promise<boolean> {
    return this.isSignedIn();
  }

  private async validate({ accountId, derivationPath }: ValidateParams) {
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
  }

  async getAccount(): Promise<AccountInfo | null> {
    const connected = await this.isConnected();
    const accountId = this.accountId;

    if (!connected || !accountId) {
      return null;
    }

    const account = await this.provider.viewAccount({ accountId });

    return {
      accountId,
      balance: account.amount,
    };
  }

  private transformActions(actions: Array<FunctionCallAction>) {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  }

  async signAndSendTransaction({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) {
    logger.log("LedgerWallet:signAndSendTransaction", { receiverId, actions });

    if (!this.accountId) {
      throw new Error("No account id found");
    }

    if (!this.derivationPath) {
      throw new Error("No derivation path found");
    }

    if (!this.publicKey) {
      throw new Error("No public key found");
    }

    const client = await this.getClient();

    const [block, accessKey] = await Promise.all([
      this.provider.block({ finality: "final" }),
      this.provider.viewAccessKey({
        accountId: this.accountId,
        publicKey: this.publicKey,
      }),
    ]);

    logger.log("LedgerWallet:signAndSendTransaction:block", block);
    logger.log("LedgerWallet:signAndSendTransaction:accessKey", accessKey);

    const transaction = transactions.createTransaction(
      this.accountId,
      utils.PublicKey.from(this.publicKey),
      receiverId,
      accessKey.nonce + 1,
      this.transformActions(actions),
      utils.serialize.base_decode(block.header.hash)
    );

    const serializedTx = utils.serialize.serialize(
      transactions.SCHEMA,
      transaction
    );

    const signature = await client.sign({
      data: serializedTx,
      derivationPath: this.derivationPath,
    });

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
  }
}

export default LedgerWallet;
