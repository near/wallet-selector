// - WalletModules -> Wallet
// - Shouldn't initialise the wallet until we want to connect or already connected.
// - We need the type alongside the methods to help with type checking.
// - We need getDownloadUrl and isAvailable outside the initialisation of a wallet.

import { providers } from "near-api-js";
import { AccountState } from "../store.types";
import {
  HardwareWalletConnectParams,
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
} from "./wallet";

// ----- Browser Wallet ----- //

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

// ----- Injected Wallet ----- //

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

// ----- Hardware Wallet ----- //

export interface HardwareWalletMetadata {
  id: string;
  type: "hardware";
  name: string;
  description: string | null;
  iconUrl: string;
}

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

type HardwareWallet = HardwareWalletMetadata & HardwareWalletBehaviour;

export interface HardwareWalletModule<
  Wallet extends HardwareWallet | HardwareWalletBehaviour = HardwareWallet
> {
  id: string;
  type: "hardware";
  name: string;
  description: string | null;
  iconUrl: string;

  isAvailable(): Promise<boolean>;
  init(): Promise<Wallet>;
}

// ----- Bridge Wallet ----- //

export interface BridgeWalletMetadata {
  id: string;
  type: "bridge";
  name: string;
  description: string | null;
  iconUrl: string;
}

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

type BridgeWallet = BridgeWalletMetadata & BridgeWalletBehaviour;

export interface BridgeWalletModule<
  Wallet extends BridgeWallet | BridgeWalletBehaviour = BridgeWallet
> {
  id: string;
  type: "bridge";
  name: string;
  description: string | null;
  iconUrl: string;

  isAvailable(): Promise<boolean>;
  init(): Promise<Wallet>;
}

type WalletModule =
  | BrowserWalletModule
  | InjectedWalletModule
  | HardwareWalletModule
  | BridgeWalletModule;

type Wallet = BrowserWallet | InjectedWallet | HardwareWallet | BridgeWallet;
