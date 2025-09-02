import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";
import { defineChain } from "@reown/appkit/networks";
import type { CreateConnectorFn } from "@wagmi/core";
import { reconnect } from "@wagmi/core";
import { injected, walletConnect } from "@wagmi/connectors";

// Get a project ID at https://cloud.reown.com
const projectId = "30147604c5f01d0bc4482ab0665b5697";

const near = defineChain({
  id: 398,
  caipNetworkId: "eip155:398",
  chainNamespace: "eip155",
  name: "NEAR Protocol Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: ["https://test.rpc.fastnear.com"] },
    public: { http: ["https://test.rpc.fastnear.com"] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: "https://eth-explorer-testnet.near.org",
    },
  },
  testnet: true,
});

const metadata = {
  name: "NEAR Guest Book",
  description: "A guest book with comments stored on the NEAR blockchain",
  url: "https://near.github.io/wallet-selector",
  icons: ["https://near.github.io/wallet-selector/favicon.ico"],
};

export const connectors: Array<CreateConnectorFn> = [
  walletConnect({
    projectId,
    metadata,
    showQrModal: false, // showQrModal must be false
  }),
  injected({ shimDisconnect: true }),
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [near],
});

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [near],
  defaultNetwork: near,
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
    email: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
    socials: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  },
  metadata,
  coinbasePreference: "eoaOnly", // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  allWallets: "SHOW",
});

reconnect(wagmiAdapter.wagmiConfig);
