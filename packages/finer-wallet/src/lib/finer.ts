import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  BrowserWallet,
  InjectedWallet,
} from "@near-wallet-selector/core";
import type { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { setupFinerBrowser } from "./finer-browser";
import { setupFinerInjected } from "./finer-injected";
import icon from "./icon";

export type FinerWalletParams = MyNearWalletParams;

export function setupFinerWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: FinerWalletParams = {}): WalletModuleFactory<
  BrowserWallet | InjectedWallet
> {
  return async (options) => {
    const mobile = isMobile();

    if (mobile) {
      return await setupFinerBrowser({
        walletUrl,
        iconUrl,
        deprecated,
      })(options);
    }

    return await setupFinerInjected({
      iconUrl,
      deprecated,
    })(options);
  };
}
