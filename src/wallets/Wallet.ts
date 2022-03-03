import { Options } from "../interfaces/Options";
import ProviderService from "../services/provider/ProviderService";
import { Emitter } from "../utils/EventsHandler";
import { Action } from "./actions";

export interface WalletOptions {
  options: Options;
  provider: ProviderService;
  emitter: Emitter;
}

export interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<Action>;
}

export interface AccountInfo {
  accountId: string;
  balance: string;
}

export type BrowserWalletType = "browser";
export type InjectedWalletType = "injected";
export type HardwareWalletType = "hardware";
export type WalletType =
  | BrowserWalletType
  | InjectedWalletType
  | HardwareWalletType;

interface BaseWallet {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string;
  type: WalletType;

  // Initialise an SDK or load data from a source such as local storage.
  init(): Promise<void>;

  // Determines if the wallet is available for selection.
  isAvailable(): boolean;

  // Requests sign in for the given wallet.
  // Note: Hardware wallets should defer HID connection until user input is required (e.g. public key or signing).
  signIn(): Promise<void>;

  // Removes connection to the wallet and triggers a cleanup of subscriptions etc.
  signOut(): Promise<void>;

  // Determines if we're signed in with the wallet.
  isSignedIn(): Promise<boolean>;

  // Retrieves account info based on associated accountId.
  getAccount(): Promise<AccountInfo | null>;

  // TODO: Determine standardised response.
  // Signs a list of actions before sending them via an RPC endpoint.
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<unknown>;
}

export interface BrowserWallet extends BaseWallet {
  type: "browser";
}

export interface InjectedWallet extends BaseWallet {
  type: "injected";
}

export interface HardwareWallet extends BaseWallet {
  type: "hardware";
  setAccountId(accountId: string): void;
  setDerivationPath(derivationPath: string): void;
}

export type Wallet = BrowserWallet | InjectedWallet | HardwareWallet;
