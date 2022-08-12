import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import type { WalletModuleFactory } from "@near-wallet-selector/core";

export const setupRecommendedWallets = async (): Promise<
  Array<WalletModuleFactory>
> => {
  return [
    setupMyNearWallet(),
    setupLedger(),
    setupWalletConnect({
      projectId: "c8cb6204543639c31aef44ea4837a554",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/near/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
  ];
};
