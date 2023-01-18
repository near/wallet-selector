import { isMobile } from "is-mobile";
import type {
  WalletModuleFactory,
  BrowserWallet,
  Network,
  InjectedWallet,
} from "@near-wallet-selector/core";
import type { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupFinerSender } from "./finer-sender";
import icon from "./icon";

export type FinerWalletParams = MyNearWalletParams;

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://near-wallet-mainnet.finerwallet.io";
    case "testnet":
      return "https://near-wallet-testnet.finerwallet.io";
    default:
      throw new Error("Invalid wallet url");
  }
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

    const extWallet = await setupFinerSender({
      iconUrl,
      deprecated,
    })(options);

    if (extWallet) {
      return {
        ...extWallet,
        id: "finer-wallet",
        metadata: {
          ...extWallet.metadata,
          iconUrl,
          deprecated,
        },
      };
    }

    return null;
  };
}
