// - WalletModules -> Wallet
// - Shouldn't initialise the wallet until we want to connect or already connected.
// - We need the type alongside the methods to help with type checking.
// - We need getDownloadUrl and isAvailable outside the initialisation of a wallet.

import { providers } from "near-api-js";
import { AccountState } from "../store.types";
import {
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
} from "./wallet";

export interface BrowserWalletMetadata {
  id: string;
  type: "browser";
  name: string;
  description: string | null;
  iconUrl: string;
}

export interface BrowserWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(params: SignAndSendTransactionParams): Promise<void>;
  signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<void>;
}

export type BrowserWallet = BrowserWalletMetadata & BrowserWalletBehaviour;

export interface BrowserWalletModule<
  Wallet extends BrowserWallet | BrowserWalletBehaviour = BrowserWallet
> {
  id: string;
  type: "browser";
  name: string;
  description: string | null;
  iconUrl: string;

  isAvailable(): Promise<boolean>;
  init(): Promise<Wallet>;
}

export interface InjectedWalletMetadata {
  id: string;
  type: "injected";
  name: string;
  description: string | null;
  iconUrl: string;
}

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

type InjectedWallet = InjectedWalletMetadata & InjectedWalletBehaviour;

export interface InjectedWalletModule<
  Wallet extends InjectedWallet | InjectedWalletBehaviour = InjectedWallet
> {
  id: string;
  type: "injected";
  name: string;
  description: string | null;
  iconUrl: string;

  isAvailable(): Promise<boolean>;
  getDownloadUrl(): string;
  init(): Promise<Wallet>;
}

type WalletModule = BrowserWalletModule | InjectedWalletModule;
type Wallet = BrowserWallet | InjectedWallet;
