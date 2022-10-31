import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Network, NetworkId } from "@near-wallet-selector/core";

class Web3AuthClient {
  web3auth: Web3Auth;

  constructor(clientId: string, network: Network) {
    this.web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.OTHER,
        rpcTarget: network.nodeUrl,
        displayName: "Near Protocol",
        blockExplorer: network.explorerUrl,
        ticker: "NEAR",
        tickerName: "NEAR",
      },
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        clientId,
        network: network.networkId as NetworkId,
        uxMode: "popup",
      },
      loginSettings: {
        curve: "ed25519",
      },
    });

    this.web3auth.configureAdapter(openloginAdapter);
  }

  getProvider() {
    return this.web3auth.provider;
  }

  async init() {
    return await this.web3auth.initModal();
  }

  async connect(provider?: string, email?: string) {
    let extraLoginOptions;

    if (provider === "email_passwordless" && email) {
      extraLoginOptions = {
        login_hint: email,
      };
    }

    return await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: provider || "",
      extraLoginOptions,
    });
  }

  disconnect() {
    return this.web3auth.logout();
  }
}

export default Web3AuthClient;
