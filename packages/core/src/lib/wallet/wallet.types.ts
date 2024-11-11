import type { providers, utils } from "near-api-js";
import type {
  EventEmitterService,
  LoggerService,
  ProviderService,
  JsonStorageService,
} from "../services";
import type { Options } from "../options.types";
import type { ReadOnlyStore } from "../store.types";
import type { Transaction, Action } from "./transactions.types";
import type { Modify, Optional } from "../utils.types";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import type { SignedTransaction, Signature } from "near-api-js/lib/transaction";
import type { PublicKey } from "near-api-js/lib/utils";

interface BaseWalletMetadata {
  /**
   * Wallet name.
   */
  name: string;
  /**
   * Wallet description.
   */
  description: string | null;
  /**
   * Wallet icon url.
   */
  iconUrl: string;
  /**
   * Is wallet deprecated.
   */
  deprecated: boolean;
  /**
   * Will the wallet be shown in modal.
   */
  available: boolean;
}

export interface Account {
  /**
   * NEAR account identifier.
   */
  accountId: string;
  /**
   * Account public key.
   */
  publicKey?: string;
}

export interface SignInParams {
  /**
   * Account ID of the Smart Contract.
   */
  contractId: string;
  /**
   * Specify limited access to particular methods on the Smart Contract.
   */
  methodNames?: Array<string>;
}

export interface VerifyOwnerParams {
  /**
   * The message requested sign. Defaults to `verify owner` string.
   */
  message: string;
  /**
   * Applicable to browser wallets (e.g. MyNearWallet). This is the callback url once the signing is approved. Defaults to `window.location.href`.
   */
  callbackUrl?: string;
  /**
   * Applicable to browser wallets (e.g. MyNearWallet) extra data that will be passed to the callback url once the signing is approved.
   */
  meta?: string;
}

export interface VerifiedOwner {
  accountId: string;
  message: string;
  blockId: string;
  publicKey: string;
  signature: string;
  keyType: utils.key_pair.KeyType;
}

export interface SignMessageParams {
  message: string;
  recipient: string;
  nonce: Buffer;
  callbackUrl?: string;
  state?: string;
}

export interface SignedMessage {
  accountId: string;
  publicKey: string;
  signature: string;
  state?: string;
}

export type SignMessageMethod = {
  signMessage(params: SignMessageParams): Promise<SignedMessage | void>;
};

interface SignAndSendTransactionParams {
  /**
   * Account ID used to sign the transaction. Defaults to the first account.
   */
  signerId?: string;
  /**
   * Account ID to receive the transaction. Defaults to `contractId` defined in `init`.
   */
  receiverId?: string;
  /**
   * NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). You can find more information on `Action` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
   */
  actions: Array<Action>;
}

interface SignAndSendTransactionsParams {
  /**
   * NEAR Transactions(s) to sign and send to the network. You can find more information on `Transaction` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
   */
  transactions: Array<Optional<Transaction, "signerId">>;
}

interface SignTransactionParams {
  /**
   * The NEAR account ID of the transaction receiver.
   */
  receiverId: string;
  /**
   * NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). You can find more information on `Action` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
   */
  actions: Array<Action>;
  /**
   * The human-readable NEAR account name
   */
  accountId?: string;
  /**
   * The targeted network. (ex. default, betanet, etc…)
   */
  networkId?: string;
  callbackUrl?: string;
}

interface SignDelegateActionParams {
  senderId: string;
  receiverId: string;
  actions: Array<Action>;
  callbackUrl?: string;
}

interface DelegateAction {
  /**
   * Account ID for the intended signer of the delegate action
   */
  senderId: string;
  /**
   * The set of actions to be included in the meta transaction
   */
  actions: Array<Action>;
  /**
   * Number of blocks past the current block height for which the SignedDelegate action may be included in a meta transaction
   */
  blockHeightTtl: number;
  /**
   * Account ID for the intended receiver of the meta transaction
   */
  receiverId: string;
  /**
   * Current nonce on the access key used to sign the delegate action
   */
  nonce: bigint;
  /**
   * The maximum block height for which this action can be executed as part of a transaction
   */
  maxBlockHeight: bigint;
  /**
   * Public key for the access key used to sign the delegate action
   */
  publicKey: PublicKey;
}

interface SignedDelegate {
  delegateAction: DelegateAction;
  signature: Signature;
}

interface SignedDelegateWithHash {
  hash: Uint8Array;
  signedDelegateAction: SignedDelegate;
}

interface BaseWalletBehaviour {
  /**
   * Programmatically sign in. Hardware wallets (e.g. Ledger) require `derivationPaths` to validate access key permissions.
   */
  signIn(params: SignInParams): Promise<Array<Account>>;
  /**
   * Sign out from the wallet.
   */
  signOut(): Promise<void>;
  /**
   * Returns one or more accounts when signed in.
   * This method can be useful for wallets that support accounts at once such as WalletConnect.
   * In this case, you can use an `accountId` returned as the `signerId` for `signAndSendTransaction`.
   */
  getAccounts(): Promise<Array<Account>>;
  /**
   * Signs the message and verifies the owner. Message is not sent to blockchain.
   */
  verifyOwner(params: VerifyOwnerParams): Promise<VerifiedOwner | void>;
  /**
   * Signs one or more NEAR Actions before sending to the network.
   * The user must be signed in to call this method as there's at least charges for gas spent.
   */
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<providers.FinalExecutionOutcome>;
  /**
   * Signs one or more transactions before sending to the network.
   * The user must be signed in to call this method as there's at least charges for gas spent.
   */
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<Array<providers.FinalExecutionOutcome>>;
  signMessage?(params: SignMessageParams): Promise<SignedMessage | void>;
  /**
   * Signs one or more NEAR Actions which can be broadcasted to the network.
   * The user must be signed in to call this method.
   */
  signTransaction?(
    params: SignTransactionParams
  ): Promise<[Uint8Array, SignedTransaction] | void>;
  /**
   * Composes and signs a SignedDelegate action to be executed in a transaction
   */
  signDelegateAction?(
    params: SignDelegateActionParams
  ): Promise<SignedDelegateWithHash | void>;
}

type BaseWallet<
  Type extends string,
  Metadata extends BaseWalletMetadata,
  Behaviour
> = {
  /**
   * Unique identifier of the wallet.
   */
  id: string;
  /**
   * Returns the type of wallet. This is particular useful when using functionality that's wallet specific (see hardware wallet example).
   */
  type: Type;
  /**
   * Returns meta information about the wallet such as `name`, `description`, `iconUrl`, `deprecated` and `available` but can include wallet-specific properties such as `downloadUrl` and `useUrlAccountImport` for injected wallets or `contractId`, `runOnStartup` for instant-link wallets and  walletUrl for browser wallets.
   */
  metadata: Metadata;
} & Behaviour;

export type WalletEvents = {
  signedIn: {
    contractId: string;
    methodNames: Array<string>;
    accounts: Array<Account>;
  };
  signedOut: null;
  accountsChanged: { accounts: Array<Account> };
  networkChanged: { networkId: string };
  uriChanged: { uri: string };
};

// ----- Browser Wallet ----- //

export type BrowserWalletMetadata = BaseWalletMetadata & {
  /**
   * Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After successfully signing in where to redirect.
   */
  successUrl?: string;
  /**
   * Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After failing to sign in where to redirect.
   */
  failureUrl?: string;

  /**
   * The URL of the wallet exposed in the metadata of the module.
   */
  walletUrl: string;
};

interface BrowserWalletSignInParams extends SignInParams {
  /**
   * Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After successfully signing in where to redirect.
   */
  successUrl?: string;
  /**
   * Optional for browser wallets (e.g MyNearWallet and HERE Wallet). After failing to sign in where to redirect.
   */
  failureUrl?: string;
}

interface BrowserWalletSignAndSendTransactionParams
  extends SignAndSendTransactionParams {
  /**
   * Applicable to browser wallets (e.g. MyNearWallet). This the callback url once the transaction is approved.
   */
  callbackUrl?: string;
}

interface BrowserWalletSignAndSendTransactionsParams
  extends SignAndSendTransactionsParams {
  /**
   * Applicable to browser wallets (e.g. MyNearWallet). This the callback url once the transaction is approved.
   */
  callbackUrl?: string;
}

export type BrowserWalletBehaviour = Modify<
  BaseWalletBehaviour,
  {
    buildImportAccountsUrl?(): string;
    importAccountsInSecureContext?: never;
    signIn(params: BrowserWalletSignInParams): Promise<Array<Account>>;
    signAndSendTransaction(
      params: BrowserWalletSignAndSendTransactionParams
    ): Promise<FinalExecutionOutcome | void>;
    signAndSendTransactions(
      params: BrowserWalletSignAndSendTransactionsParams
    ): Promise<void>;
  }
>;

export type BrowserWallet = BaseWallet<
  "browser",
  BrowserWalletMetadata,
  BrowserWalletBehaviour
>;

// ----- Injected Wallet ----- //

export type InjectedWalletMetadata = BaseWalletMetadata & {
  downloadUrl: string;
  topLevelInjected?: boolean;
  useUrlAccountImport?: boolean;
};

export interface AccountImportData {
  accountId: string;
  privateKey: string;
}

export interface AccountImportSecureContextParams {
  accounts: Array<AccountImportData>;
}

export type InjectedWalletBehaviour = Modify<
  BaseWalletBehaviour,
  {
    buildImportAccountsUrl?(): string;
    importAccountsInSecureContext?(
      params: AccountImportSecureContextParams
    ): Promise<void>;
  }
>;

export type InjectedWallet = BaseWallet<
  "injected",
  InjectedWalletMetadata,
  InjectedWalletBehaviour
>;

// ----- Instant Link Wallet ----- //

export type InstantLinkWalletMetadata = BaseWalletMetadata & {
  contractId: string;
  runOnStartup: boolean;
};

export type InstantLinkWalletBehaviour = BaseWalletBehaviour & {
  getContractId(): string;
};

export type InstantLinkWallet = BaseWallet<
  "instant-link",
  InstantLinkWalletMetadata,
  InstantLinkWalletBehaviour
>;

// ----- Hardware Wallet ----- //

export type HardwareWalletMetadata = BaseWalletMetadata;

export interface HardwareWalletAccount {
  derivationPath: string;
  publicKey: string;
  accountId: string;
}

export interface HardwareWalletSignInParams extends SignInParams {
  /**
   * Required for hardware wallets (e.g. Ledger). This is a list of `accounts` linked to public keys on your device.
   */
  accounts: Array<HardwareWalletAccount>;
}

export type HardwareWalletBehaviour = Modify<
  BaseWalletBehaviour,
  { signIn(params: HardwareWalletSignInParams): Promise<Array<Account>> }
> & {
  getPublicKey(derivationPath: string): Promise<string>;
};

export type HardwareWallet = BaseWallet<
  "hardware",
  HardwareWalletMetadata,
  HardwareWalletBehaviour
>;

// ----- Bridge Wallet ----- //

interface BridgeWalletSignInParams extends SignInParams {
  /**
   * Optional for bridge wallets (e.g Wallet Connect).
   * This indicates whether to render QR Code in wallet selector modal or use the default vendor modal.
   */
  qrCodeModal?: boolean;
}

export type BridgeWalletMetadata = BaseWalletMetadata;

export type BridgeWalletBehaviour = Modify<
  BaseWalletBehaviour,
  { signIn(params: BridgeWalletSignInParams): Promise<Array<Account>> }
>;

export type BridgeWallet = BaseWallet<
  "bridge",
  BridgeWalletMetadata,
  BridgeWalletBehaviour
>;

// ----- Misc ----- //

export type WalletMetadata =
  | BrowserWalletMetadata
  | InjectedWalletMetadata
  | InstantLinkWalletMetadata
  | HardwareWalletMetadata
  | BridgeWalletMetadata;

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | InstantLinkWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

interface WalletModuleOptions {
  options: Options;
}

export interface WalletBehaviourOptions<Variation extends Wallet> {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  options: Options;
  store: ReadOnlyStore;
  provider: ProviderService;
  emitter: EventEmitterService<WalletEvents>;
  logger: LoggerService;
  storage: JsonStorageService;
}

// Note: TypeScript doesn't seem to like reusing this in WalletModule.
export type WalletBehaviourFactory<
  Variation extends Wallet,
  ExtraOptions extends object = object
> = (
  options: WalletBehaviourOptions<Variation> & ExtraOptions
) => Promise<Omit<Variation, "id" | "type" | "metadata">>;

export type WalletModule<Variation extends Wallet = Wallet> = {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  init(
    options: WalletBehaviourOptions<Variation>
  ): Promise<Omit<Variation, "id" | "type" | "metadata">>;
};

export type WalletModuleFactory<Variation extends Wallet = Wallet> = (
  options: WalletModuleOptions
) => Promise<WalletModule<Variation> | null>;
