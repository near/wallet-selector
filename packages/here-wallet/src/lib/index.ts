import type { HereProvider, HereStrategy } from "@here-wallet/core";
import type { WalletModuleFactory } from "@near-wallet-selector/core";
import type { HereWallet } from "./types";
import { initHereWallet } from "./selector";
import icon from "./icon";

export { icon };

interface Options {
  deprecated?: boolean;
  iconUrl?: string;
  defaultStrategy?: () => HereStrategy;
  defaultProvider?: HereProvider;
}

export function setupHereWallet({
  deprecated = false,
  iconUrl = icon,
  defaultStrategy,
  defaultProvider,
}: Options = {}): WalletModuleFactory<HereWallet> {
  return async () => {
    return {
      id: "here-wallet",
      type: "injected",
      metadata: {
        name: "Here Wallet",
        description: "Mobile wallet for NEAR Protocol",
        downloadUrl: "",
        iconUrl,
        deprecated,
        available: true,
      },
      init: (config) =>
        initHereWallet({
          ...config,
          defaultStrategy,
          defaultProvider,
        }),
    };
  };
}
