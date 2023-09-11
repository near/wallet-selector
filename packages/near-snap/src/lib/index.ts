import type { WalletModuleFactory } from "@near-wallet-selector/core";
import { initNearSnap } from "./selector";
import icon from "./icon";

export { icon };

export function setupNearSnap({
  deprecated = false,
  iconUrl = icon,
} = {}): WalletModuleFactory {
  return async () => {
    return {
      id: "near-snap",
      type: "injected",
      init: initNearSnap,
      metadata: {
        name: "Near Snap",
        description: "Metamask Snap for NEAR Protocol",
        downloadUrl: "https://near-snap.surge.sh",
        iconUrl,
        deprecated,
        available: true,
      },
    };
  };
}
