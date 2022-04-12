import { updateState } from "../state";
import { Provider, Logger, PersistentStorage, Emitter } from "../services";
import { Transaction } from "./transactions";
import { Action } from "./actions";
import { Options } from "../Options";
import { NetworkConfiguration } from "../network";
import { providers } from "near-api-js";

export interface HardwareWalletSignInParams {
  accountId: string;
  derivationPath: string;
}

export interface SignAndSendTransactionParams {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}

export interface SignAndSendTransactionsParams {
  transactions: Array<Transaction>;
}

export interface AccountInfo {
  accountId: string;
}

export type WalletEvents = {
  signIn: { accounts: Array<AccountInfo> };
  signOut: { accounts: Array<AccountInfo> };
  accountsChanged: { accounts: Array<AccountInfo> };
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
  signIn(params?: object): Promise<void>;

  // Removes connection to the wallet and triggers a cleanup of subscriptions etc.
  signOut(): Promise<void>;

  // Determines if we're signed in with the wallet.
  isSignedIn(): Promise<boolean>;

  // Retrieves all active accounts.
  getAccounts(): Promise<Array<AccountInfo>>;

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
  signIn(params: HardwareWalletSignInParams): Promise<void>;
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
  options: Options;
  network: NetworkConfiguration;
  provider: Provider;
  emitter: Emitter<WalletEvents>;
  logger: Logger;
  storage: PersistentStorage;
  updateState: typeof updateState;
}

export type WalletModule<WalletVariation extends Wallet = Wallet> = (
  options: WalletOptions
) => WalletVariation;
