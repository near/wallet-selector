import type { WalletModuleFactory } from "@near-wallet-selector/core";
import { initNearSnap } from "./selector";
import icon from "./icon";

export { icon };

declare global {
  interface Window {
    ethereum: {
      chainId: string;
      // eslint-disable-next-line
      request: any;
    };
  }
}

const isInstalled = async (): Promise<boolean> => {
  try {
    const provider = window.ethereum;
    const clientVersion = await provider?.request({
      method: "web3_clientVersion",
    });

    const isFlaskDetected = (clientVersion as Array<string>)?.includes("flask");
    return Boolean(provider && isFlaskDetected);
  } catch {
    return false;
  }
};

export function setupNearSnap({
  deprecated = false,
  iconUrl = icon,
} = {}): WalletModuleFactory {
  return async () => {
    const installed = await isInstalled();

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
        available: installed,
      },
    };
  };
}
