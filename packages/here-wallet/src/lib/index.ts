import type { HereInitializeOptions } from "@here-wallet/core";
import { waitInjectedHereWallet } from "@here-wallet/core";
import type {
  WalletModuleFactory,
  InjectedWallet,
} from "@near-wallet-selector/core";
import { initHereWallet } from "./selector";
import icon from "./icon";

export { icon };

interface Options {
  deprecated?: boolean;
  iconUrl?: string;
  walletOptions?: HereInitializeOptions;
}

export function setupHereWallet({
  deprecated = false,
  iconUrl = icon,
  walletOptions,
}: Options = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const isInjected = await waitInjectedHereWallet;

    return {
      id: "here-wallet",
      type: "injected",
      metadata: {
        name: "Here Wallet",
        description: "Mobile wallet for NEAR Protocol",
        useUrlAccountImport: true,
        downloadUrl: "https://herewallet.app",
        topLevelInjected: isInjected != null,
        iconUrl,
        deprecated,
        available: true,
      },
      init: (config) => initHereWallet({ ...config, walletOptions }),
    };
  };
}
