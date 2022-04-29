// - WalletModules -> Wallet
// - Shouldn't initialise the wallet until we want to connect or already connected.
// - We need the type alongside the methods to help with type checking.
// - We need getDownloadUrl and isAvailable outside the initialisation of a wallet.
// - selector.wallet can remain sync and handle rejecting signing for unselected wallets.

import { providers } from "near-api-js";
import { AccountState } from "../store.types";
import {
  HardwareWalletConnectParams,
  SignAndSendTransactionParams,
  SignAndSendTransactionsParams,
  WalletEvents,
} from "./wallet";
import isMobile from "is-mobile";
import { Options } from "../options.types";
import {
  EventEmitterService,
  LoggerService,
  ProviderService,
  StorageService,
} from "../services";
import { omit } from "../utils";

interface BaseWalletMetadata<Type extends string> {
  id: string;
  type: Type;
  name: string;
  description: string | null;
  iconUrl: string;
}

export interface WalletOptions<Metadata extends BaseWalletMetadata<string>> {
  options: Options;
  metadata: Metadata;
  provider: ProviderService;
  emitter: EventEmitterService<WalletEvents>;
  logger: LoggerService;
  storage: StorageService;
}

type BaseWalletBehaviourFactory<
  Metadata extends BaseWalletMetadata<string>,
  Behaviour
> = (options: WalletOptions<Metadata>) => Promise<Behaviour>;

type BaseWalletModule<
  Metadata extends BaseWalletMetadata<string>,
  Behaviour
> = () => Promise<
  | (Metadata & {
      init: BaseWalletBehaviourFactory<Metadata, Behaviour>;
    })
  | null
>;

// ----- Browser Wallet ----- //

export type BrowserWalletMetadata = BaseWalletMetadata<"browser">;

export interface BrowserWalletBehaviour {
  connect(): Promise<Array<AccountState>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<AccountState>>;
  signAndSendTransaction(params: SignAndSendTransactionParams): Promise<void>;
  signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<void>;
}

export type BrowserWalletBehaviourFactory = BaseWalletBehaviourFactory<
  BrowserWalletMetadata,
  BrowserWalletBehaviour
>;

export type BrowserWalletModule = BaseWalletModule<
  BrowserWalletMetadata,
  BrowserWalletBehaviour
>;

export type BrowserWallet = BrowserWalletMetadata & BrowserWalletBehaviour;

// ----- Injected Wallet ----- //

export type InjectedWalletMetadata = BaseWalletMetadata<"injected"> & {
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

export type InjectedWalletBehaviourFactory = BaseWalletBehaviourFactory<
  InjectedWalletMetadata,
  InjectedWalletBehaviour
>;

export type InjectedWalletModule = BaseWalletModule<
  InjectedWalletMetadata,
  InjectedWalletBehaviour
>;

export type InjectedWallet = InjectedWalletMetadata & InjectedWalletBehaviour;

// ----- Hardware Wallet ----- //

export type HardwareWalletMetadata = BaseWalletMetadata<"hardware">;

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

export type HardwareWalletBehaviourFactory = BaseWalletBehaviourFactory<
  HardwareWalletMetadata,
  HardwareWalletBehaviour
>;

export type HardwareWalletModule = BaseWalletModule<
  HardwareWalletMetadata,
  HardwareWalletBehaviour
>;

export type HardwareWallet = HardwareWalletMetadata & HardwareWalletBehaviour;

// ----- Bridge Wallet ----- //

export type BridgeWalletMetadata = BaseWalletMetadata<"bridge">;

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

export type BridgeWalletBehaviourFactory = BaseWalletBehaviourFactory<
  BridgeWalletMetadata,
  BridgeWalletBehaviour
>;

export type BridgeWalletModule = BaseWalletModule<
  BridgeWalletMetadata,
  BridgeWalletBehaviour
>;

export type BridgeWallet = BridgeWalletMetadata & BridgeWalletBehaviour;

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

export type Wallet =
  | BrowserWallet
  | InjectedWallet
  | HardwareWallet
  | BridgeWallet;

export type WalletType = Wallet["type"];

// ----- Implementation Tests ----- //

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
  const results: Array<WalletMetadata> = [];

  for (let i = 0; i < modules.length; i += 1) {
    const module = await modules[i]();

    // Filter out wallets that aren't available.
    if (!module) {
      continue;
    }

    results.push(omit(module, ["init"]) as WalletMetadata);
  }

  return results;
};

(async () => {
  const modules: Array<WalletModule> = [];
  const walletModules = await setupWalletModules(modules);
  const walletModule = walletModules[0];

  if (walletModule.type === "injected") {
    console.log(walletModule.downloadUrl);
  }
})();
