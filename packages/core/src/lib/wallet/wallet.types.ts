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
  WalletOptions,
} from "./wallet";
import isMobile from "is-mobile";

interface BaseWalletMetadata<Type extends string> {
  id: string;
  type: Type;
  name: string;
  description: string | null;
  iconUrl: string;
}

// ----- Browser Wallet ----- //

type BrowserWalletMetadata = BaseWalletMetadata<"browser">;

export interface BrowserWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(params: SignAndSendTransactionParams): Promise<void>;
  signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<void>;
}

export type BrowserWallet = BrowserWalletMetadata & BrowserWalletBehaviour;

export type BrowserWalletModule<
  Variation extends
    | BrowserWallet
    | BrowserWalletBehaviour = BrowserWalletBehaviour,
  Init = Variation extends BrowserWallet
    ? () => Promise<BrowserWallet>
    : (options: WalletOptions) => Promise<BrowserWalletBehaviour>
> = () => Promise<
  | (BrowserWalletMetadata & {
      init: Init;
    })
  | null
>;

// ----- Injected Wallet ----- //

type InjectedWalletMetadata = BaseWalletMetadata<"injected"> & {
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

export type InjectedWallet = InjectedWalletMetadata & InjectedWalletBehaviour;

export type InjectedWalletModule<
  Variation extends
    | InjectedWallet
    | InjectedWalletBehaviour = InjectedWalletBehaviour,
  Init = Variation extends InjectedWallet
    ? () => Promise<InjectedWallet>
    : (options: WalletOptions) => Promise<InjectedWalletBehaviour>
> = () => Promise<
  | (InjectedWalletMetadata & {
      init: Init;
    })
  | null
>;

// ----- Hardware Wallet ----- //

type HardwareWalletMetadata = BaseWalletMetadata<"hardware">;

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

export type HardwareWalletModule<
  Variation extends
    | HardwareWallet
    | HardwareWalletBehaviour = HardwareWalletBehaviour,
  Init = Variation extends HardwareWallet
    ? () => Promise<HardwareWallet>
    : (options: WalletOptions) => Promise<HardwareWalletBehaviour>
> = () => Promise<
  | (HardwareWalletMetadata & {
      init: Init;
    })
  | null
>;

// ----- Bridge Wallet ----- //

type BridgeWalletMetadata = BaseWalletMetadata<"bridge">;

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

export type BridgeWalletModule<
  Variation extends
    | BridgeWallet
    | BridgeWalletBehaviour = BridgeWalletBehaviour,
  Init = Variation extends BridgeWallet
    ? () => Promise<BridgeWallet>
    : (options: WalletOptions) => Promise<BridgeWalletBehaviour>
> = () => Promise<
  | (BridgeWalletMetadata & {
      init: Init;
    })
  | null
>;

type WalletModule =
  | BrowserWalletModule
  | InjectedWalletModule
  | HardwareWalletModule
  | BridgeWalletModule;

type Wallet = BrowserWallet | InjectedWallet | HardwareWallet | BridgeWallet;

type WalletModuleState =
  | BrowserWalletModule<BrowserWallet>
  | InjectedWalletModule<InjectedWallet>
  | HardwareWalletModule<HardwareWallet>
  | BridgeWalletModule<BridgeWallet>;

const MathWallet = async (): Promise<InjectedWalletBehaviour> => {
  return {
    connect: async () => [],
    disconnect: async () => {},
    getAccounts: async () => [],
    signAndSendTransaction: async (): any => {},
    signAndSendTransactions: async (): any => {},
  };
};

interface MathWalletParams {
  iconUrl: string;
}

const setupMathWallet = (params: MathWalletParams): InjectedWalletModule => {
  return async () => {
    if (isMobile()) {
      return null;
    }

    return {
      id: "math-wallet",
      type: "injected",
      name: "Math Wallet",
      description: null,
      iconUrl: "",
      downloadUrl: "https://example.com",

      init: MathWallet,
    };
  };
};

const setupWalletModules = async (modules: Array<WalletModule>) => {
  const results: Array<WalletModuleState> = [];

  for (let i = 0; i < modules.length; i += 1) {
    const module = await modules[i]();

    if (!module) {
      continue;
    }
  }

  return results;
};
