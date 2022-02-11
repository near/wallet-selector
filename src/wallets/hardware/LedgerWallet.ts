import { transactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import BN from "bn.js";
import {
  AccountInfo,
  CallParams,
  FunctionCallAction,
} from "../../interfaces/IWallet";
import HardwareWallet from "../types/HardwareWallet";
import ILedgerWallet from "../../interfaces/ILedgerWallet";
import { Emitter } from "../../utils/EventsHandler";
import { getState, updateState } from "../../state/State";
import ProviderService from "../../services/provider/ProviderService";
import LedgerClient, { Subscription } from "./LedgerClient";
import { logger } from "../../services/logging.service";

const LOCAL_STORAGE_ACCOUNT_ID = "ledgerAccountId";
const LOCAL_STORAGE_DERIVATION_PATH = "ledgerDerivationPath";
const LOCAL_STORAGE_PUBLIC_KEY = "ledgerPublicKey";
export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<transactions.Action>;
}

class LedgerWallet extends HardwareWallet implements ILedgerWallet {
  private client: LedgerClient;
  private subscriptions: Record<string, Subscription> = {};

  private accountId: string | null;
  private derivationPath: string | null;
  private publicKey: string | null;

  private debugMode = false;

  constructor(emitter: Emitter, provider: ProviderService) {
    super(emitter, provider);
  }

  getInfo() {
    return {
      id: "ledgerwallet",
      name: "Ledger Wallet",
      description: "Ledger Wallet",
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8zN0aZm6Jwc305PUtiZXGvsbbi4uSmp67n5+m+v8Q1OUdFSVb6+vr19fY+QlDt7e56fYbT1NdTVmPHyMyGiJFqbXdbXmlWWWWgoah7foeSlJx1eIJLT1yztbrw8fKmGsZBAAACeklEQVR4nO3d2XKCMBhAYSIUAUEQt9b1/d+yetPaGshMlp+0nnMN0k8lUGZMkoSIiIiIiIiIiIiIXr6mK+cP6Ta5zp0ruyYkostXa/WjTLfZTPnonBbat8m9ard4OlpAyL19vvTPWOuOFBiiVF34/Y6VO/1xgkOUeu89Oqp24CgCELX48Ob4GDyIBESpg6ev13H4EDIQlXqRDH8eYhB18uCoxg4gBVEzZ0c5dJ7LQtTGFTIw7opDzo6XxtEvliREHd0g2uv5JJCsc3EYPhBJiNv5Pn6GyEJqh4tJ93y/Ox3EZeDKTa8tCtnaQ1ZRQdb2EMOYJQxR1peSxvjSshDr/0yukUEqW0gZGeRiC5lHBsmBAAECBAgQIEBukMxU+zcglgEBAgQIECBAgAABAgQIECBAAkOuM2N/A/J/HgcBAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIC8GKRLTWl/MH8x7maZ80/BiYiIiIiIiCiuyjdTO91uuXE37exlW+Nu1hO8BHsclOp2ewv3OAgIECBAgAAB8p8gweags4RYz0HXRQaxvmkMNk+jJcR+Bvk6Loj9jL9pVJDa2pEUUUFW9hDj+CsKsR60bu0jgrQu85SbZi6WhDjMW3wbgA3jliBk4bY+jOF0F4QcnBxJ8x4JpC3dIEk/OlG5HMT9R/ljq3bIQXys2zE2VbkUZO9j9aRm5EZFCLJ2WlfhW3KaGLL347j/aUNnvAjk5HFVrs15MkjrdxKR5TGbBLI4uF4/nuqOmtuVwJBsG2Tdumaz/b3YQkhIvbr4X7Luq2Vf5cVDum36wpT2KUL1sEFe9d5GKiIiIiIiIiIiIqKX6xNYBUsKTAn7+wAAAABJRU5ErkJggg==",
    };
  }

  async init() {
    this.client = new LedgerClient();
    await this.client.init();
    this.client.setScrambleKey("NEAR");

    this.subscriptions.disconnect = this.client.on("disconnect", (data) => {
      logger.log(data);

      this.emitter.emit("disconnect");
    });

    if (this.debugMode) {
      this.subscriptions.logs = this.client.listen((data) => {
        logger.log("LedgerWallet:init:logs", data);
      });
    }

    const accountId = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_ID);
    const publicKey = localStorage.getItem(LOCAL_STORAGE_PUBLIC_KEY);
    const derivationPath = localStorage.getItem(LOCAL_STORAGE_DERIVATION_PATH);

    if (!this.accountId) {
      this.accountId = accountId;
    }

    if (!this.publicKey) {
      this.publicKey = publicKey;
    }

    if (!this.derivationPath) {
      this.derivationPath = derivationPath || DEFAULT_DERIVATION_PATH;
    }
  }

  setDerivationPath(derivationPath: string) {
    this.derivationPath = derivationPath;
  }

  setAccountId(accountId: string) {
    this.accountId = accountId;
  }

  async walletSelected() {
    updateState((prevState) => ({
      ...prevState,
      showWalletOptions: false,
      showLedgerDerivationPath: true,
    }));
  }

  isSignedIn() {
    return !!this.accountId;
  }

  async disconnect() {
    for (const key in this.subscriptions) {
      this.subscriptions[key].remove();
    }

    this.emitter.emit("disconnect");
  }

  async isConnected(): Promise<boolean> {
    return this.isSignedIn();
  }

  async validate({ accountId, derivationPath }: ValidateParams) {
    logger.log("LedgerWallet:validate", { accountId, derivationPath });

    const publicKey = await this.client.getPublicKey({
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
      if (err instanceof TypedError) {
        if (err.type === "AccessKeyDoesNotExist") {
          const ok = confirm(
            "This public key is not registered with your NEAR account. Would you like to add it?"
          );

          if (ok) {
            const state = getState();

            // TODO: Need access to config's walletUrl.
            // TODO: Need to use location.href for redirects.
            window.location.href = `https://wallet.${state.options.networkId}.near.org/login/?success_url=http%3A%2F%2Flocalhost%3A1234%2F&failure_url=http%3A%2F%2Flocalhost%3A1234%2F&contract_id=${state.options.accountId}&public_key=${publicKey}`;
          }
        }
      }

      throw err;
    }
  }

  async signIn() {
    if (!this.client) {
      await this.init();
    }

    if (!this.accountId) {
      throw new Error("No account id found");
    }

    if (!this.derivationPath) {
      throw new Error("No derivation path found");
    }

    // TODO: Need to store the access key permission in storage.
    const { publicKey } = await this.validate({
      accountId: this.accountId,
      derivationPath: this.derivationPath,
    });

    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_ID, this.accountId);
    localStorage.setItem(LOCAL_STORAGE_DERIVATION_PATH, this.derivationPath);
    localStorage.setItem(LOCAL_STORAGE_PUBLIC_KEY, publicKey);

    await this.setWalletAsSignedIn();

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
    }));

    this.emitter.emit("signIn");
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

  async signAndSendTransaction({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) {
    if (!this.accountId) {
      throw new Error("No account id found");
    }

    if (!this.derivationPath) {
      throw new Error("No derivation path found");
    }

    if (!this.publicKey) {
      throw new Error("No public key found");
    }

    const [block, accessKey] = await Promise.all([
      this.provider.block({ finality: "final" }),
      this.provider.viewAccessKey({
        accountId: this.accountId,
        publicKey: this.publicKey,
      }),
    ]);

    logger.log("LedgerWallet:call:block", block);
    logger.log("LedgerWallet:call:accessKey", accessKey);

    const transaction = transactions.createTransaction(
      this.accountId,
      utils.PublicKey.from(this.publicKey),
      receiverId,
      accessKey.nonce + 1,
      actions,
      utils.serialize.base_decode(block.header.hash)
    );

    const serializedTx = utils.serialize.serialize(
      transactions.SCHEMA,
      transaction
    );

    const signature = await this.client.sign({
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

  transformActions(actions: Array<FunctionCallAction>) {
    return actions.map((action) => {
      return transactions.functionCall(
        action.methodName,
        action.args,
        new BN(action.gas),
        new BN(action.deposit)
      );
    });
  }

  async call({ receiverId, actions }: CallParams) {
    logger.log("LedgerWallet:call", { receiverId, actions });

    return this.signAndSendTransaction({
      receiverId,
      actions: this.transformActions(actions),
    });
  }
}

export default LedgerWallet;
