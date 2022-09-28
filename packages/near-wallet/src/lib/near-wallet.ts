import {
  WalletModuleFactory,
  BrowserWallet,
  Network,
} from "@near-wallet-selector/core";
import {
  setupMyNearWallet,
  MyNearWalletParams,
} from "@near-wallet-selector/my-near-wallet";
import icon from "./icon";

export type NearWalletParams = MyNearWalletParams;

const resolveWalletUrl = (network: Network, walletUrl?: string) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://wallet.near.org";
    case "testnet":
      return "https://wallet.testnet.near.org";
    default:
      throw new Error("Invalid wallet url");
  }
};

export function setupNearWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: NearWalletParams = {}): WalletModuleFactory<BrowserWallet> {
  return async (options) => {
    const wallet = await setupMyNearWallet({
      walletUrl: resolveWalletUrl(options.options.network, walletUrl),
      iconUrl,
    })(options);

    if (!wallet) {
      return null;
    }

    return {
      ...wallet,
      id: "near-wallet",
      metadata: {
        ...wallet.metadata,
        name: "NEAR Wallet",
        description: "Web wallet for NEAR Protocol",
        iconUrl,
        deprecated,
        available: true,
      },
    };
  };
}
