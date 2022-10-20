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
      },
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: network.networkId as NetworkId,
        uxMode: "popup",
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

  async connect(provider: string | undefined) {
    return await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: provider || "",
    });
  }

  disconnect() {
    return this.web3auth.logout();
  }
}

export default Web3AuthClient;
