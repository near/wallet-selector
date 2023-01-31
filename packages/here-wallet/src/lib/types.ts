import type {
  HereInitializeOptions,
  HereWalletProtocol,
} from "@here-wallet/core";

import type {
  WalletBehaviourFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";

export type HereWallet = InjectedWallet &
  Omit<Omit<HereWalletProtocol, "getAccounts">, "signIn">;

export type SelectorInit = WalletBehaviourFactory<
  HereWallet,
  HereInitializeOptions
>;
