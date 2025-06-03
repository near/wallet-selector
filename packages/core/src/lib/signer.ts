import type { SignedMessage } from "@near-js/signers";
import { Signer } from "@near-js/signers";
import type {
  SignedDelegate,
  DelegateAction,
} from "@near-js/signers/node_modules/@near-js/transactions";
import type { WalletSelector } from "./wallet-selector.types";
import type { PublicKey } from "near-api-js/lib/utils/key_pair";
import type {
  SignedTransaction,
  Transaction,
} from "near-api-js/lib/transaction";

export class WalletSelectorSigner extends Signer {
  public constructor(protected readonly walletSelector: WalletSelector) {
    super();
  }

  private getAccountId(): string {
    const { accounts } = this.walletSelector.store.getState();

    const account = accounts.at(0);

    // @todo: check if the account is active
    if (!account) {
      throw new Error(`There's no signed in account`);
    }

    return account.accountId;
  }

  public async getPublicKey(): Promise<PublicKey> {
    const wallet = await this.walletSelector.wallet();

    const accountId = this.getAccountId();
    return await wallet.getPublicKey!(accountId);
  }

  public async signNep413Message(
    message: string,
    accountId: string,
    recipient: string,
    nonce: Uint8Array,
    callbackUrl?: string
  ): Promise<SignedMessage> {
    throw new Error(`Not implemented!`);
  }

  public async signTransaction(
    transaction: Transaction
  ): Promise<[Uint8Array, SignedTransaction]> {
    throw new Error(`Not implemented!`);
  }

  public async signDelegateAction(
    delegateAction: DelegateAction
  ): Promise<[Uint8Array, SignedDelegate]> {
    throw new Error(`Not implemented!`);
  }
}
