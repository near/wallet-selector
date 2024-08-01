import type { HereInitializeOptions } from "@here-wallet/core";
import type {
  WalletBehaviourFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";

export type SelectorInit = WalletBehaviourFactory<
  InjectedWallet,
  { walletOptions?: HereInitializeOptions }
>;
