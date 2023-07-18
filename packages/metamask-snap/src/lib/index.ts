import type { WalletModuleFactory } from "@near-wallet-selector/core";
import { initMetamaskSnap } from "./selector";
import icon from "./icon";

export { icon };

export function setupMetamaskSnap({
  deprecated = false,
  iconUrl = icon,
}): WalletModuleFactory {
  return async () => {
    return {
      id: "metamask-snap",
      type: "injected",
      init: initMetamaskSnap,
      metadata: {
        name: "Metamask Snap",
        description: "Metamask plugin for NEAR Protocol",
        downloadUrl: "https://near-snap.surge.sh",
        iconUrl,
        deprecated,
        available: true,
      },
    };
  };
}
