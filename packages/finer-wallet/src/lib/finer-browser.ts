import type {
  WalletModuleFactory,
  BrowserWallet,
  Network,
} from "@near-wallet-selector/core";
import type { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
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

export function setupFinerBrowser({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: FinerWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async (options) => {
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
  };
}
