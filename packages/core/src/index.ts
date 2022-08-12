export type {
  WalletSelector,
  WalletSelectorParams,
  WalletSelectorEvents,
  WalletSelectorStore,
} from "./lib/wallet-selector.types";
export { setupWalletSelector } from "./lib/wallet-selector";

export type { Network, NetworkId } from "./lib/options.types";
export type {
  Subscription,
  StorageService,
  JsonStorageService,
} from "./lib/services";
export type { Optional } from "./lib/utils.types";

export type {
  WalletSelectorState,
  ContractState,
  ModuleState,
  AccountState,
} from "./lib/store.types";

export type {
  WalletModuleFactory,
  WalletModule,
  WalletBehaviourFactory,
  WalletBehaviourOptions,
  Wallet,
  WalletType,
  WalletMetadata,
  WalletEvents,
  SignInParams,
  BrowserWalletMetadata,
  BrowserWalletBehaviour,
  BrowserWallet,
  InjectedWalletMetadata,
  InjectedWalletBehaviour,
  InjectedWallet,
  HardwareWalletMetadata,
  HardwareWalletSignInParams,
  HardwareWalletBehaviour,
  HardwareWallet,
  HardwareWalletAccount,
  BridgeWalletMetadata,
  BridgeWalletBehaviour,
  BridgeWallet,
  VerifiedOwner,
  VerifyOwnerParams,
  Account,
  Transaction,
  Action,
  ActionType,
  CreateAccountAction,
  DeployContractAction,
  FunctionCallAction,
  TransferAction,
  StakeAction,
  AddKeyAction,
  DeleteKeyAction,
  DeleteAccountAction,
  AddKeyPermission,
} from "./lib/wallet";

export type { FinalExecutionOutcome } from "near-api-js/lib/providers";

export { waitFor, getActiveAccount } from "./lib/helpers";
