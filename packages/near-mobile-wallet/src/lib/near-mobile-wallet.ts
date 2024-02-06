import type { WalletModuleFactory } from "@near-wallet-selector/core";
import { initNearMobileWallet } from "./init.wallet";
import icon from "./icon";
import type {
  NearMobileWallet,
  SetupNearMobileWallet,
} from "./near-mobile-wallet.types";

export function setupNearMobileWallet({
  dAppMetadata,
}: SetupNearMobileWallet = {}): WalletModuleFactory<NearMobileWallet> {
  return async () => {
    return {
      id: "near-mobile-wallet",
      type: "injected",
      metadata: {
        iconUrl: icon,
        name: "Near Mobile Wallet",
        description: "Mobile wallet for NEAR Protocol",
        useUrlAccountImport: false,
        downloadUrl: "https://nearmobile.app/",
        deprecated: false,
        available: true,
      },
      init: (config) => initNearMobileWallet({ ...config, dAppMetadata }),
    };
  };
}
