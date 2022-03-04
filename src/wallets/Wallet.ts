import { Options } from "../interfaces/Options";
import ProviderService from "../services/provider/ProviderService";
import { Emitter } from "../utils/EventsHandler";
import { Action } from "./actions";

export interface HardwareWalletSignInParams {
  accountId: string;
  derivationPath: string;
}

export interface SignAndSendTransactionParams {
  receiverId: string;
  actions: Array<Action>;
}

export interface AccountInfo {
  accountId: string;
  balance: string;
}

interface BaseWallet {
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
  signIn(params: HardwareWalletSignInParams): Promise<void>;
}

export type Wallet = BrowserWallet | InjectedWallet | HardwareWallet;

export type WalletType = Wallet["type"];

export interface WalletOptions {
  options: Options;
  provider: ProviderService;
  emitter: Emitter;
}

export type WalletModule<WalletVariation extends Wallet = Wallet> = (
  options: WalletOptions
) => WalletVariation;
