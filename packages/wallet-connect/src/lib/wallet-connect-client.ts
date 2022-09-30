import Client from "@walletconnect/sign-client";
import type { SignClientTypes, EngineTypes } from "@walletconnect/types";

class WalletConnectClient {
  private client: Client;

  async init(opts: SignClientTypes.Options) {
    this.client = await Client.init(opts);
  }

  get session() {
    return this.client.session;
  }

  on<Event extends SignClientTypes.Event>(
    event: Event,
    callback: (args: SignClientTypes.EventArguments[Event]) => void
  ) {
    this.client.on(event, callback);

    return {
      remove: () => this.client.removeListener(event, callback),
    };
  }

  once<Event extends SignClientTypes.Event>(
    event: Event,
    callback: (args: SignClientTypes.EventArguments[Event]) => void
  ) {
    this.client.once(event, callback);
  }

  async connect(params: EngineTypes.ConnectParams) {
    return await this.client.connect(params);
  }

  async request<Response>(
    params: EngineTypes.RequestParams
  ): Promise<Response> {
    return this.client.request(params);
  }

  async disconnect(params: EngineTypes.DisconnectParams) {
    return this.client.disconnect(params);
  }
}

export default WalletConnectClient;
