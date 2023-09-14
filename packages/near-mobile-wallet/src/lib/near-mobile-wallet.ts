import type {
  InjectedWallet,
  WalletModuleFactory,
} from "@near-wallet-selector/core";
import { initNearMobileWallet } from "./init.wallet";
import icon from "./icon";

export function setupNearMobileWallet(): WalletModuleFactory<InjectedWallet> {
  return async () => {
    return {
      id: "near-mobile-wallet",
      type: "injected",
      metadata: {
        iconUrl: icon, // TODO: add icon
        name: "Near Mobile Wallet",
        description: "Mobile wallet for NEAR Protocol",
        useUrlAccountImport: false,
        downloadUrl: "https://nearmobile.app/",
        deprecated: false,
        available: true,
      },
      init: (config) => initNearMobileWallet({ ...config }),
    };
  };
}
