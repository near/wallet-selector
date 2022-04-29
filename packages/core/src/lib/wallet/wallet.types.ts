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

export interface WalletOptions {
  options: Options;
  provider: ProviderService;
  emitter: EventEmitterService<WalletEvents>;
  logger: LoggerService;
  storage: StorageService;
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

// Type to handle definition of wallet behaviour
type BaseWalletBehaviourFactory<
  Wallet extends BaseWallet<string, BaseWalletMetadata, unknown>
> = (
  options: WalletOptions
) => Promise<Omit<Wallet, "id" | "type" | "metadata">>;

// Type to handle definition of wallet module.
type BaseWalletModuleFactory<
  Wallet extends BaseWallet<string, BaseWalletMetadata, unknown>
> = () => Promise<{
  id: Wallet["id"];
  type: Wallet["type"];
  metadata: Wallet["metadata"];
  init: BaseWalletBehaviourFactory<Wallet>;
} | null>;

type BaseWalletModule<
  Wallet extends BaseWallet<string, BaseWalletMetadata, unknown>
> = {
  id: Wallet["id"];
  type: Wallet["type"];
  metadata: Wallet["metadata"];
  init: () => Promise<Wallet>;
};

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

export type BrowserWalletModule = BaseWalletModule<BrowserWallet>;
export type BrowserWalletModuleFactory = BaseWalletModuleFactory<BrowserWallet>;
export type BrowserWalletBehaviourFactory =
  BaseWalletBehaviourFactory<BrowserWallet>;

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

export type InjectedWalletModule = BaseWalletModule<InjectedWallet>;
export type InjectedWalletModuleFactory =
  BaseWalletModuleFactory<InjectedWallet>;
export type InjectedWalletBehaviourFactory =
  BaseWalletBehaviourFactory<InjectedWallet>;

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

export type HardwareWalletModule = BaseWalletModule<HardwareWallet>;
export type HardwareWalletModuleFactory =
  BaseWalletModuleFactory<HardwareWallet>;
export type HardwareWalletBehaviourFactory =
  BaseWalletBehaviourFactory<HardwareWallet>;

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

export type BridgeWalletModule = BaseWalletModule<BridgeWallet>;
export type BridgetWalletModuleFactory = BaseWalletModuleFactory<BridgeWallet>;
export type BridgeWalletBehaviourFactory =
  BaseWalletBehaviourFactory<BridgeWallet>;

// ----- Misc ----- //

export type WalletMetadata =
  | BrowserWalletMetadata
  | InjectedWalletMetadata
  | HardwareWalletMetadata
  | BridgeWalletMetadata;

export type WalletModule =
  | BrowserWalletModule
  | InjectedWalletModule
  | HardwareWalletModule
  | BridgeWalletModule;

export type WalletModuleFactory =
  | BrowserWalletModuleFactory
  | InjectedWalletModuleFactory
  | HardwareWalletModuleFactory
  | BridgetWalletModuleFactory;

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

// export const setupMathWallet = (): InjectedWalletModuleFactory => {
//   return async () => {
//     if (isMobile()) {
//       return null;
//     }
//
//     return {
//       id: "math-wallet",
//       type: "injected",
//       metadata: {
//         name: "Math Wallet",
//         description: null,
//         iconUrl,
//         downloadUrl:
//           "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",
//       },
//       init: (): any => {},
//     };
//   };
// };
