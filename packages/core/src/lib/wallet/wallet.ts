import { providers } from "near-api-js";

import { Provider, Logger, PersistentStorage, Emitter } from "../services";
import { Transaction } from "./transactions";
import { Action } from "./actions";
import { Network } from "../network";
import { WalletSelectorStore, WalletSelectorState } from "../store.types";
import { Optional } from "../Optional";
import { WalletSelectorOptions } from "../WalletSelector.types";

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

export interface AccountInfo {
  accountId: string;
}

export type WalletEvents = {
  connected: { id: string; pending?: boolean; accounts?: Array<AccountInfo> };
  disconnected: { id: string };
  accounts: { accounts: Array<AccountInfo> };
};

interface BaseWallet<ExecutionOutcome = providers.FinalExecutionOutcome> {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string;
  type: string;

  // Initialise an SDK or load data from a source such as local storage.
  init(): Promise<void>;

  // Determines if the wallet is available for selection.
  isAvailable(): boolean;

  // Requests sign in for the given wallet.
  // Note: Hardware wallets should defer HID connection until user input is required (e.g. public key or signing).
  connect(params?: object): Promise<void>;

  // Removes connection to the wallet and triggers a cleanup of subscriptions etc.
  disconnect(): Promise<void>;

  // Determines if we're signed in with the wallet.
  // isSignedIn(): Promise<boolean>;

  // Retrieves all active accounts.
  // getAccounts(): Promise<Array<AccountInfo>>;

  // Signs a list of actions before sending them via an RPC endpoint.
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<ExecutionOutcome>;

  // Sings a list of transactions before sending them via an RPC endpoint.
  signAndSendTransactions(
    params: SignAndSendTransactionsParams
  ): Promise<ExecutionOutcome extends void ? void : Array<ExecutionOutcome>>;
}

export interface BrowserWallet extends BaseWallet<void> {
  type: "browser";
}

export interface InjectedWallet extends BaseWallet {
  type: "injected";
  downloadUrl: string;
}

export interface HardwareWallet extends BaseWallet {
  type: "hardware";
  connect(params: HardwareWalletConnectParams): Promise<void>;
}

export interface BridgeWallet extends BaseWallet {
  type: "bridge";
}

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

export interface WalletOptions {
  options: WalletSelectorOptions;
  network: Network;
  provider: Provider;
  emitter: Emitter<WalletEvents>;
  store: WalletSelectorStore<WalletSelectorState>;
  logger: Logger;
  storage: PersistentStorage;
}

export type WalletModule<WalletVariation extends Wallet = Wallet> = (
  options: WalletOptions
) => WalletVariation;
