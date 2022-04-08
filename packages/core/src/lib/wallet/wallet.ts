import { providers } from "near-api-js";

import { Provider, Logger, PersistentStorage, Emitter } from "../services";
import { Transaction } from "./transactions";
import { Action } from "./actions";
import { Options } from "../options.types";
import { Optional } from "../utils.types";
import { AccountState } from "../store.types";

export interface HardwareWalletConnectParams {
  accountId: string;
  derivationPath: string;
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
  init: { accounts: Array<AccountState> };
  connected: { pending?: boolean; accounts?: Array<AccountState> };
  disconnected: null;
  accountsChanged: { accounts: Array<AccountState> };
  networkChanged: null;
  uninstalled: null;
};

export interface WalletMetadata<Type extends string = string> {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string;
  type: Type;
}

interface BaseWallet<
  Type extends string,
  ExecutionOutcome = providers.FinalExecutionOutcome
> extends WalletMetadata<Type> {
  // Initialise an SDK or load data from a source such as local storage.
  init(): Promise<void>;

  // Determines if the wallet is available for selection.
  isAvailable(): boolean;

  // Requests sign in for the given wallet.
  // Note: Hardware wallets should defer HID connection until user input is required (e.g. public key or signing).
  connect(params?: object): Promise<void>;

  // Removes connection to the wallet and triggers a cleanup of subscriptions etc.
  disconnect(): Promise<void>;

  // Signs a list of actions before sending them via an RPC endpoint.
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<ExecutionOutcome>;

  // Sings a list of transactions before sending them via an RPC endpoint.
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<ExecutionOutcome extends void ? void : Array<ExecutionOutcome>>;
}

export type BrowserWallet = BaseWallet<"browser", void>;

export interface InjectedWallet extends BaseWallet<"injected"> {
  getDownloadUrl(): string;
}

export interface HardwareWallet extends BaseWallet<"hardware"> {
  connect(params: HardwareWalletConnectParams): Promise<void>;
}

export type BridgeWallet = BaseWallet<"bridge">;

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

export interface WalletOptions<WalletVariation extends Wallet = Wallet> {
  options: Options;
  metadata: WalletMetadata<WalletVariation["type"]>;
  provider: Provider;
  emitter: Emitter<WalletEvents>;
  logger: Logger;
  storage: PersistentStorage;
}

export type WalletBehaviour<WalletVariation extends Wallet = Wallet> = Omit<
  WalletVariation,
  keyof WalletMetadata
>;

export type WalletBehaviourFactory<
  WalletVariation extends Wallet,
  ExtraWalletOptions extends object = object
> = (
  options: WalletOptions<WalletVariation> & ExtraWalletOptions
) => WalletBehaviour<WalletVariation>;

export type WalletModule<WalletVariation extends Wallet = Wallet> =
  WalletMetadata & {
    type: WalletVariation["type"];
    wallet: WalletBehaviourFactory<WalletVariation>;
  };
