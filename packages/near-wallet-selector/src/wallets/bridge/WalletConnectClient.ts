import Client, {
  RELAYER_DEFAULT_PROTOCOL, SESSION_EMPTY_PERMISSIONS,
  SESSION_SIGNAL_METHOD_PAIRING
} from "@walletconnect/client";
import {
  AppMetadata,
  ClientOptions,
  PairingTypes,
  SessionTypes
} from "@walletconnect/types";
import { ClientTypes } from "@walletconnect/types/dist/cjs/client";

export type ConnectParams = ClientTypes.ConnectParams & {
  metadata: AppMetadata;
  timeout?: number;
}

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

  on<Event extends keyof WalletConnectEvents>(
    event: Event,
    callback: WalletConnectEvents[Event]
  ) {
    this.client.on(event, callback);

    return {
      remove: () => this.client.off(event, callback)
    };
  }

  async connect(params: ConnectParams) {
    const relay = params.relay || { protocol: RELAYER_DEFAULT_PROTOCOL };
    const timeout = params.timeout || 30 * 1000;

    const pairing = await this.client.pairing.create({ relay, timeout });

    return this.client.session.create({
      signal: {
        method: SESSION_SIGNAL_METHOD_PAIRING,
        params: { topic: pairing.topic }
      },
      relay,
      timeout,
      metadata: params.metadata,
      permissions: {
        ...SESSION_EMPTY_PERMISSIONS,
        ...params.permissions,
      },
    })
  }
}

export default WalletConnectClient;
