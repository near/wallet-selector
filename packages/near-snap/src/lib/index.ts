import { isMobile } from "is-mobile";
import type { WalletModuleFactory } from "@near-wallet-selector/core";
import { initNearSnap, snap } from "./selector";
import icon from "./icon";

export { icon };

export function setupNearSnap({
  deprecated = false,
  iconUrl = icon,
} = {}): WalletModuleFactory {
  return async () => {
    const mobile = isMobile();
    if (mobile) {
      return null;
    }

    return {
      id: "near-snap",
      type: "injected",
      init: initNearSnap,
      metadata: {
        name: "Near Snap",
        description: "Metamask Snap for NEAR Protocol",
        downloadUrl: "https://near-snap.surge.sh",
        available: await snap.provider.isSnapsAvailable(),
        deprecated,
        iconUrl,
      },
    };
  };
}
