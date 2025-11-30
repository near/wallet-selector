import type { providers } from "near-api-js";
import type {
  SignedTransaction,
  Transaction as nearAPITransaction,
} from "near-api-js/lib/transaction";
import type {
  Account,
  Action,
  BaseWalletBehaviour,
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
  SignedMessage,
  SignInParams,
  SignMessageParams,
  VerifiedOwner,
  VerifyOwnerParams,
  Wallet,
  WalletBehaviourOptions,
} from "../../wallet";
import type { SignedMessage as SignerSignedMessage } from "@near-js/signers";
import type { DelegateAction, SignedDelegate } from "@near-js/transactions";
import type { IframeConfig } from "./iframe-manager";
import { MessageBridge } from "./message-bridge";
import { IframeManager } from "./iframe-manager";
import type { PublicKey } from "@near-js/crypto";

type WalletMethod =
  | "signIn"
  | "signOut"
  | "getAccounts"
  | "verifyOwner"
  | "signAndSendTransaction"
  | "signAndSendTransactions"
  | "signTransaction"
  | "signMessage"
  | "createSignedTransaction"
  | "signMessage"
  | "getPublicKey"
  | "signNep413Message"
  | "signDelegateAction";

export class IframeWalletAdapter implements BaseWalletBehaviour {
  private readonly iframeManager: IframeManager;
  private options: WalletBehaviourOptions<Wallet>;
  private messageBridge: MessageBridge | null = null;
  private initialized = false;
  private config: IframeConfig;

  constructor({
    config,
    options,
  }: {
    config: IframeConfig;
    options: WalletBehaviourOptions<Wallet>;
  }) {
    this.iframeManager = new IframeManager(config, options);
    this.config = config;
    this.options = options;
  }

  async signIn(params: SignInParams): Promise<Array<Account>> {
    return this.executeMethod("signIn", params);
  }

  async signOut(): Promise<void> {
    await this.executeMethod("signOut");
    this.iframeManager.destroy();
    this.initialized = false;
  }

  async getAccounts(): Promise<Array<Account>> {
    return this.executeMethod("getAccounts");
  }

  async verifyOwner(params: VerifyOwnerParams): Promise<VerifiedOwner | void> {
    return this.executeMethod("verifyOwner", params);
  }

  async signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<providers.FinalExecutionOutcome> {
    return this.executeMethod("signAndSendTransaction", params);
  }

  async signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<Array<providers.FinalExecutionOutcome>> {
    return this.executeMethod("signAndSendTransactions", params);
  }

  async signTransaction(
    params: nearAPITransaction
  ): Promise<[Uint8Array, SignedTransaction]> {
    return this.executeMethod("signTransaction", params);
  }

  async signMessage(params: SignMessageParams): Promise<SignedMessage | void> {
    return this.executeMethod("signMessage", params);
  }

  async createSignedTransaction(
    receiverId: string,
    actions: Array<Action>
  ): Promise<SignedTransaction | void> {
    return this.executeMethod("createSignedTransaction", {
      receiverId,
      actions,
    });
  }

  async getPublicKey(): Promise<PublicKey> {
    return this.executeMethod("getPublicKey");
  }

  async signNep413Message(
    message: string,
    accountId: string,
    recipient: string,
    nonce: Uint8Array,
    callbackUrl?: string
  ): Promise<SignerSignedMessage> {
    return this.executeMethod("signNep413Message", {
      message,
      accountId,
      recipient,
      nonce,
      callbackUrl,
    });
  }

  async signDelegateAction(
    delegateAction: DelegateAction
  ): Promise<[Uint8Array, SignedDelegate]> {
    return this.executeMethod("signDelegateAction", delegateAction);
  }

  private async ensureIframeReady(): Promise<void> {
    if (!this.iframeManager.isReady()) {
      await this.initialize();
    }
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await this.iframeManager.initialize();
      this.messageBridge = new MessageBridge(this.iframeManager, this.options);
      this.initialized = true;
    } catch (error) {
      throw new Error("IframeWalletAdapter initialization failed");
    }
  }

  private async executeMethod<T>(
    method: WalletMethod,
    params?: unknown
  ): Promise<T> {
    await this.ensureIframeReady();

    return await this.messageBridge!.sendMessage<T>({
      type: "WALLET_METHOD_CALL",
      method,
      params,
      walletId: this.options.id,
    });
  }
}
