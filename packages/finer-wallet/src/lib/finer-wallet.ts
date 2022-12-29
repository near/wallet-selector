import { isMobile } from "is-mobile";
import { waitFor } from "@near-wallet-selector/core";
import type {
  WalletModuleFactory,
  BrowserWallet,
  Network,
  InjectedWallet,
} from "@near-wallet-selector/core";
import type { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import icon from "./icon";

export type FinerWalletParams = MyNearWalletParams;

interface InjectedFiner {
  near: {
    isSender: boolean;
  };
}

declare global {
  interface Window {
    finer: InjectedFiner | undefined;
  }
}

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://near-wallet-api.finerwallet.io/mainnet";
    case "testnet":
      return "https://near-wallet-api.finerwallet.io/testnet";
    default:
      throw new Error("Invalid wallet url");
  }
};

const isInstalledExtension = () => {
  return waitFor(() => !!window.finer?.near?.isSender).catch(() => false);
};

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
      const webWallet = await setupMyNearWallet({
        walletUrl: resolveWalletUrl(options.options.network, walletUrl),
        iconUrl,
      })(options);

      if (!webWallet) {
        return null;
      }

      return {
        ...webWallet,
        id: "finer-wallet",
        metadata: {
          ...webWallet.metadata,
          name: "FiNER Wallet",
          description: "FiNER Wallet Mobile",
          iconUrl,
          deprecated,
          available: true,
        },
      };
    }

    const installed = await isInstalledExtension();

    if (!mobile && installed) {
      const extWallet = await setupSender({
        iconUrl,
        deprecated,
      })(options);

      if (extWallet) {
        return {
          ...extWallet,
          id: "finer-wallet",
          metadata: {
            ...extWallet.metadata,
            name: "FiNER Wallet",
            description: "FiNER Wallet Extension",
            iconUrl,
            deprecated,
            available: true,
          },
        };
      }
    }

    return null;
  };
}
