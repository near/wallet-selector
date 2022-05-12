import { providers } from "near-api-js";

import {
  EventEmitterService,
  LoggerService,
  ProviderService,
  JSONStorageService,
} from "../services";
import { Options } from "../options.types";
import { Transaction, Action } from "./transactions.types";
import { Modify, Optional } from "../utils.types";

interface BaseWalletMetadata {
  name: string;
  description: string | null;
  iconUrl: string;
}

interface BaseWalletBehaviour<ExecutionOutcome> {
  connect(): Promise<Array<Account>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<Account>>;
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<ExecutionOutcome>;
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<ExecutionOutcome extends void ? void : Array<ExecutionOutcome>>;
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

export interface Account {
  accountId: string;
}

export interface SignAndSendTransactionParams {
  signerId?: string;
  receiverId?: string;
  actions: Array<Action>;
}

export interface SignAndSendTransactionsParams {
  transactions: Array<Optional<Transaction, "signerId">>;
}

export type WalletEvents = {
  connected: { accounts: Array<Account> };
  disconnected: null;
  accountsChanged: { accounts: Array<Account> };
  networkChanged: { networkId: string };
};

// ----- Browser Wallet ----- //

export type BrowserWalletMetadata = BaseWalletMetadata;

export type BrowserWalletBehaviour = BaseWalletBehaviour<void>;

export type BrowserWallet = BaseWallet<
  "browser",
  BrowserWalletMetadata,
  BrowserWalletBehaviour
>;

// ----- Injected Wallet ----- //

export type InjectedWalletMetadata = BaseWalletMetadata & {
  downloadUrl: string;
};

export type InjectedWalletBehaviour =
  BaseWalletBehaviour<providers.FinalExecutionOutcome>;

export type InjectedWallet = BaseWallet<
  "injected",
  InjectedWalletMetadata,
  InjectedWalletBehaviour
>;

// ----- Hardware Wallet ----- //

export type HardwareWalletMetadata = BaseWalletMetadata;

export interface HardwareWalletConnectParams {
  derivationPaths: Array<string>;
}

export type HardwareWalletBehaviour = Modify<
  BaseWalletBehaviour<providers.FinalExecutionOutcome>,
  { connect(params: HardwareWalletConnectParams): Promise<Array<Account>> }
>;

export type HardwareWallet = BaseWallet<
  "hardware",
  HardwareWalletMetadata,
  HardwareWalletBehaviour
>;

// ----- Bridge Wallet ----- //

export type BridgeWalletMetadata = BaseWalletMetadata;

export type BridgeWalletBehaviour =
  BaseWalletBehaviour<providers.FinalExecutionOutcome>;

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

export interface WalletBehaviourOptions<Variation extends Wallet> {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  options: Options;
  provider: ProviderService;
  emitter: EventEmitterService<WalletEvents>;
  logger: LoggerService;
  storage: JSONStorageService;
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

export type WalletModuleFactory<Variation extends Wallet = Wallet> =
  () => Promise<WalletModule<Variation> | null>;
