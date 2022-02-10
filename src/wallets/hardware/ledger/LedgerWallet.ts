import HardwareWallet from "../../types/HardwareWallet";
import ILedgerWallet from "../../../interfaces/ILedgerWallet";
import { getState, updateState } from "../../../state/State";
import { transactions, utils } from "near-api-js";
import BN from "bn.js";
import { Emitter } from "../../../utils/EventsHandler";
import { AccountInfo, CallParams } from "../../../interfaces/IWallet";
import ProviderService from "../../../services/provider/ProviderService";
import { logger } from "../../../services/logging.service";
import LedgerClient, { Subscription } from "./LedgerClient";
import { TypedError } from "near-api-js/lib/utils/errors";

const LOCAL_STORAGE_PUBLIC_KEY = "ledgerPublicKey";
const LOCAL_STORAGE_DERIVATION_PATH = "ledgerDerivationPath";
const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

interface ValidateParams {
  accountId: string;
  derivationPath: string;
}

class LedgerWallet extends HardwareWallet implements ILedgerWallet {
  private client: LedgerClient;
  private subscriptions: Record<string, Subscription> = {};

  private accountId: string;
  private derivationPath: string;
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

    this.publicKey = localStorage.getItem(LOCAL_STORAGE_PUBLIC_KEY);
    this.derivationPath =
      localStorage.getItem(LOCAL_STORAGE_DERIVATION_PATH) ||
      DEFAULT_DERIVATION_PATH;
  }

  getPublicKey() {
    return this.publicKey;
  }

  setDerivationPath(path: string) {
    this.derivationPath = path;
  }

  async setAccountId(accountId: string) {
    this.accountId = accountId;
  }

  setDebugMode(debugMode: boolean) {
    this.debugMode = debugMode;
  }

  async walletSelected() {
    updateState((prevState) => ({
      ...prevState,
      showWalletOptions: false,
      showLedgerDerivationPath: true,
    }));
  }

  async disconnect() {
    for (const key in this.subscriptions) {
      this.subscriptions[key].remove();
    }

    this.emitter.emit("disconnect");
  }

  async isConnected(): Promise<boolean> {
    return true;
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
    await this.init();

    const { publicKey } = await this.validate({
      accountId: this.accountId,
      derivationPath: this.derivationPath,
    });

    localStorage.setItem(LOCAL_STORAGE_PUBLIC_KEY, publicKey);
    localStorage.setItem(LOCAL_STORAGE_DERIVATION_PATH, this.derivationPath);

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

  // TODO: Refactor callContract into this new method.
  async call({ receiverId, actions }: CallParams) {
    logger.log("LedgerWallet:call", { receiverId, actions });

    // To keep the alias simple, lets just support a single action.
    if (actions.length !== 1) {
      throw new Error(
        "Ledger Wallet implementation currently supports just one action"
      );
    }

    const action = actions[0];

    return this.callContract(
      action.methodName,
      action.args,
      action.gas,
      action.deposit
    );
  }

  async callContract(
    method: string,
    args?: object,
    gas = "10000000000000",
    deposit = "0"
  ) {
    const state = getState();
    if (!state.signedInWalletId) return;

    if (!args) args = [];

    const bnGas = new BN(gas.toString());
    const bnDeposit = new BN(deposit.toString());

    const response = await this.provider.block({ finality: "final" });

    if (!response) return;

    const recentBlockHash = utils.serialize.base_decode(response.header.hash);
    const nonce = ++this.nonce;

    const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();

    const pk = keyPair.getPublicKey();
    pk.data = this.publicKey;

    const actions = [transactions.functionCall(method, args, bnGas, bnDeposit)];

    const transaction = transactions.createTransaction(
      this.accountId,
      pk,
      state.options.accountId,
      nonce,
      actions,
      recentBlockHash
    );

    const serializedTx = utils.serialize.serialize(
      transactions.SCHEMA,
      transaction
    );

    const signature = await this.sign(serializedTx);

    const signedTransaction = new transactions.SignedTransaction({
      transaction,
      signature: new transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature,
      }),
    });

    const res = await this.provider.sendTransaction(signedTransaction);

    if (typeof res.status !== "string") {
      const successValue = res.status.SuccessValue || "";

      if (successValue === "") {
        return null;
      }

      return JSON.parse(Buffer.from(successValue, "base64").toString());
    }

    return null;
  }
}

export default LedgerWallet;
