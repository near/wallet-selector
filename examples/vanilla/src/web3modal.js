import { createWeb3Modal } from "@web3modal/wagmi";

import { reconnect, http, createConfig } from "@wagmi/core";
import { injected, walletConnect } from "@wagmi/connectors";

// Get a project ID at https://cloud.walletconnect.com
const projectId = "30147604c5f01d0bc4482ab0665b5697";

const near = {
  id: 398,
  name: "NEAR Protocol Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: ["https://eth-rpc.testnet.near.org"] },
    public: { http: ["https://eth-rpc.testnet.near.org"] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: "https://eth-explorer-testnet.near.org",
    },
  },
  testnet: true,
};

export const wagmiConfig = createConfig({
  chains: [near],
  transports: {
    [near.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: "NEAR Guest Book",
        description: "A guest book with comments stored on the NEAR blockchain",
        url: "https://near.github.io/wallet-selector",
        icons: ["https://near.github.io/wallet-selector/favicon.ico"],
      },
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
  ],
});
reconnect(wagmiConfig);

export const web3Modal = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableOnramp: false,
  allWallets: "SHOW",
});
