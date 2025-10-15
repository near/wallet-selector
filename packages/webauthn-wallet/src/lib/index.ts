import type {
  WalletModuleFactory,
  BrowserWallet,
} from "@near-wallet-selector/core";
import type { WebAuthnWalletOptions } from "./types";
import { WebAuthnWallet } from "./webauthn-wallet";
import icon from "./icon";
import { isPassKeyAvailable } from "./webauthn-utils";

export { icon };
export type { WebAuthnWalletOptions };

export function setupWebAuthnWallet({
  relayerUrl,
  deprecated = false,
  iconUrl = icon,
}: WebAuthnWalletOptions): WalletModuleFactory<BrowserWallet> {
  return async () => {
    // Check if WebAuthn is available
    const available = await isPassKeyAvailable();

    return {
      id: "webauthn-wallet",
      type: "browser",
      metadata: {
        name: "WebAuthn Wallet",
        description:
          "Sign in with biometric authentication (fingerprint, face, or device PIN)",
        iconUrl,
        deprecated,
        available,
        walletUrl: window.location.origin, // In-page wallet
      },
      init: (config) =>
        WebAuthnWallet({
          ...config,
          relayerUrl,
        }),
    };
  };
}


