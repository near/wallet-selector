import { FinalExecutionOutcome } from "near-api-js/lib/providers";

import { Options } from "../interfaces/Options";
import ProviderService from "../services/provider/ProviderService";
import { updateState } from "../state/State";
import { Emitter } from "../utils/EventsHandler";
import { Action } from "./actions";
import { Logger } from "../services/logging.service";
import { PersistentStorage } from "../services/persistent-storage.service";
import { NetworkConfiguration } from "../network";

export interface HardwareWalletSignInParams {
  accountId: string;
  derivationPath: string;
}

export interface SignAndSendTransactionParams {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}

export interface AccountInfo {
  accountId: string;
}

export type WalletEvents = {
  signIn: { accounts: Array<AccountInfo> };
  signOut: { accounts: Array<AccountInfo> };
  accountsChanged: { accounts: Array<AccountInfo> };
};

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

  // Retrieves all active accounts.
  getAccounts(): Promise<Array<AccountInfo>>;

  // Signs a list of actions before sending them via an RPC endpoint.
  signAndSendTransaction(
    params: SignAndSendTransactionParams
  ): Promise<FinalExecutionOutcome>;
}

export interface BrowserWallet extends BaseWallet {
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
  provider: ProviderService;
  emitter: Emitter<WalletEvents>;
  logger: Logger;
  storage: PersistentStorage;
  updateState: typeof updateState;
}

export type WalletModule<WalletVariation extends Wallet = Wallet> = (
  options: WalletOptions
) => WalletVariation;
