import Client, {
  RELAYER_DEFAULT_PROTOCOL,
  SESSION_EMPTY_PERMISSIONS,
  SESSION_SIGNAL_METHOD_PAIRING,
} from "@walletconnect/client";
import {
  AppMetadata,
  PairingTypes,
  SessionTypes,
  ClientTypes,
  ClientOptions,
} from "@walletconnect/types";

export type ConnectParams = ClientTypes.ConnectParams & {
  metadata: AppMetadata;
  timeout?: number;
};

interface WalletConnectEvents {
  pairing_proposal: (proposal: PairingTypes.Proposal) => void;

  pairing_created: (proposal: PairingTypes.Settled) => void;
  pairing_updated: (proposal: PairingTypes.Settled) => void;
  pairing_deleted: (proposal: PairingTypes.Settled) => void;

  session_created: (session: SessionTypes.Settled) => void;
  session_updated: (session: SessionTypes.Settled) => void;
  session_deleted: (session: SessionTypes.Settled) => void;
}

class WalletConnectClient {
  private client: Client;

  async init(opts: ClientOptions) {
    this.client = await Client.init(opts);
  }

  get session() {
    return this.client.session;
  }

  isSignedIn() {
    return Boolean(this.client.session.topics.length);
  }

  on<Event extends keyof WalletConnectEvents>(
    event: Event,
    callback: WalletConnectEvents[Event]
  ) {
    this.client.on(event, callback);

    return {
      remove: () => this.client.off(event, callback),
    };
  }

  async connect(params: ConnectParams) {
    const relay = params.relay || { protocol: RELAYER_DEFAULT_PROTOCOL };
    const timeout = params.timeout || 30 * 1000;

    try {
      const pairing = await this.client.pairing.create({ relay, timeout });

      return this.client.session.create({
        signal: {
          method: SESSION_SIGNAL_METHOD_PAIRING,
          params: { topic: pairing.topic },
        },
        relay,
        timeout,
        metadata: params.metadata,
        permissions: {
          ...SESSION_EMPTY_PERMISSIONS,
          ...params.permissions,
        },
      });
    } catch (err) {
      // WalletConnect sadly throws strings.
      if (typeof err === "string") {
        throw new Error(err);
      }

      throw err;
    }
  }

  async request<Response>(
    params: ClientTypes.RequestParams
  ): Promise<Response> {
    return this.client.request(params);
  }

  async disconnect(params: ClientTypes.DisconnectParams) {
    return this.client.disconnect(params);
  }
}

export default WalletConnectClient;
