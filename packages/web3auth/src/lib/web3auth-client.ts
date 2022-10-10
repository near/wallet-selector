import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

class Web3AuthClient {
  web3auth: Web3AuthCore;

  constructor(clientId: string) {
    this.web3auth = new Web3AuthCore({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.OTHER,
      },
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: "testnet",
        uxMode: "popup",
      },
    });
    this.web3auth.configureAdapter(openloginAdapter);
  }

  async connect() {
    return await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "",
    });
  }

  disconnect() {
    return this.web3auth.logout();
  }
}

export default Web3AuthClient;
