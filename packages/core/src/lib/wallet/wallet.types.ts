// - WalletModules -> Wallets
// - Shouldn't initialise the wallet until we want to connect or already connected.
// - We need the type alongside the methods to help with type checking.
// - We need getDownloadUrl and isAvailable outside the initialisation of a wallet.
// - selector.wallet can remain sync and handle rejecting signing for unselected wallets.
// - WalletModule

import { providers } from "near-api-js";
import { AccountState } from "../store.types";
import {
  HardwareWalletConnectParams,
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
  WalletEvents,
} from "./wallet";
import { Options } from "../options.types";
import {
  EventEmitterService,
  LoggerService,
  ProviderService,
  StorageService,
} from "../services";

interface BaseWalletMetadata {
  name: string;
  description: string | null;
  iconUrl: string;
}

type BaseWallet<
  Type extends string,
  Metadata extends BaseWalletMetadata,
  Behaviour
> = {
  id: string;
  type: Type;
  metadata: Metadata;
} & Behaviour;

// ----- Browser Wallet ----- //

export type BrowserWalletMetadata = BaseWalletMetadata;

export interface BrowserWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(params: SignAndSendTransactionParams): Promise<void>;
  signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<void>;
}

export type BrowserWallet = BaseWallet<
  "browser",
  BrowserWalletMetadata,
  BrowserWalletBehaviour
>;

// ----- Injected Wallet ----- //

export type InjectedWalletMetadata = BaseWalletMetadata & {
  downloadUrl: string;
};

export interface InjectedWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<providers.FinalExecutionOutcome>;
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<Array<providers.FinalExecutionOutcome>>;
}

export type InjectedWallet = BaseWallet<
  "injected",
  InjectedWalletMetadata,
  InjectedWalletBehaviour
>;

// ----- Hardware Wallet ----- //

export type HardwareWalletMetadata = BaseWalletMetadata;

export interface HardwareWalletBehaviour {
  connect(params: HardwareWalletConnectParams): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<providers.FinalExecutionOutcome>;
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<Array<providers.FinalExecutionOutcome>>;
}

export type HardwareWallet = BaseWallet<
  "hardware",
  HardwareWalletMetadata,
  HardwareWalletBehaviour
>;

// ----- Bridge Wallet ----- //

export type BridgeWalletMetadata = BaseWalletMetadata;

export interface BridgeWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<providers.FinalExecutionOutcome>;
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<Array<providers.FinalExecutionOutcome>>;
}

export type BridgeWallet = BaseWallet<
  "bridge",
  BridgeWalletMetadata,
  BridgeWalletBehaviour
>;

// ----- Misc ----- //

export type WalletMetadata =
  | BrowserWalletMetadata
  | InjectedWalletMetadata
  | HardwareWalletMetadata
  | BridgeWalletMetadata;

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

export type WalletModule<Variation extends Wallet = Wallet> = {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  wallet(): Promise<Variation>;
};

export interface WalletBehaviourOptions<Variation extends Wallet> {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  options: Options;
  provider: ProviderService;
  emitter: EventEmitterService<WalletEvents>;
  logger: LoggerService;
  storage: StorageService;
}

// Note: TypeScript doesn't seem to like reusing this in WalletModuleFactory.
export type WalletBehaviourFactory<
  Variation extends Wallet,
  ExtraOptions extends object = object
> = (
  options: WalletBehaviourOptions<Variation> & ExtraOptions
) => Promise<Omit<Variation, "id" | "type" | "metadata">>;

export type WalletModuleFactory<Variation extends Wallet = Wallet> =
  () => Promise<{
    id: Variation["id"];
    type: Variation["type"];
    metadata: Variation["metadata"];
    init(
      options: WalletBehaviourOptions<Variation>
    ): Promise<Omit<Variation, "id" | "type" | "metadata">>;
  } | null>;
