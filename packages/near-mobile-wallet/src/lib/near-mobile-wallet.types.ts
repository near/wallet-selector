import type {
  InjectedWallet,
  WalletBehaviourFactory,
} from "@near-wallet-selector/core";

import type {
  NearMobileWalletProtocol,
  NearMobileWalletConstructorParams,
  DAppMetadata,
} from "@peersyst/near-mobile-signer/dist/src/wallet/NearMobileWallet.types";

export type NearMobileWallet = InjectedWallet &
  Omit<NearMobileWalletProtocol, "getAccounts" | "signIn" | "network">;

export type CustomNearMobileWalletConstructorParams = Omit<
  NearMobileWalletConstructorParams,
  "metadata"
> & { dAppMetadata?: DAppMetadata };

export type NearMobileWalletInit = WalletBehaviourFactory<
  NearMobileWallet,
  CustomNearMobileWalletConstructorParams
>;

export interface SetupNearMobileWallet {
  dAppMetadata?: NearMobileWalletConstructorParams["metadata"];
}
