import type {
  WalletModuleFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";
import type { WebAuthnWalletOptions } from "./types";
import { WebAuthnWallet } from "./webauthn-wallet";
import icon from "./icon";
export { icon };
export type { WebAuthnWalletOptions };

export function setupWebAuthnWallet({
  relayerUrl,
  deprecated = false,
  iconUrl = icon,
}: WebAuthnWalletOptions): WalletModuleFactory<InjectedWallet> {
  return async () => {
    return {
      id: "webauthn-wallet",
      type: "injected",
      metadata: {
        name: "WebAuthn Wallet",
        description:
          "Sign in with biometric authentication (fingerprint, face, or device PIN)",
        iconUrl,
        deprecated,
        available: true,
        walletUrl: window.location.origin,
        downloadUrl: window.location.origin,
      },
      init: (config) =>
        WebAuthnWallet({
          ...config,
          relayerUrl,
        }),
    };
  };
}


