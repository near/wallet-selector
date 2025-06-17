import type {
  WalletModuleFactory,
  BridgeWallet,
} from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import icon from "./icon";
import type { SignClientTypes } from "@walletconnect/types";

export interface UnityWalletParams {
  projectId: string;
  metadata: SignClientTypes.Metadata;
  iconUrl?: string;
  deprecated?: boolean;
}

export function setupUnityWallet({
  projectId,
  metadata,
  iconUrl = icon,
  deprecated = false,
}: UnityWalletParams): WalletModuleFactory<BridgeWallet> {
  return async () => {
    return {
      id: "unity-wallet",
      type: "bridge",
      metadata: {
        name: "UnityWallet",
        description: "Mobile wallet for NEAR Protocol",
        downloadUrl: "https://www.unitywallet.com",
        iconUrl,
        deprecated,
        available: true,
      },
      init: async (options) => {
        const wc = await setupWalletConnect({
          projectId,
          metadata,
          relayUrl: "wss://relay.walletconnect.com",
          chainId: "near:mainnet",
          methods: [
            "near_signIn",
            "near_signOut",
            "near_getAccounts",
            "near_signTransaction",
            "near_signTransactions",
            "near_signMessage",
          ],
          events: ["chainChanged", "accountsChanged"],
        })(options);

        return wc!.init(options);
      },
    };
  };
}
