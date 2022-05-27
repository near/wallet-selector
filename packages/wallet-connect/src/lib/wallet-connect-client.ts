import Client from "@walletconnect/sign-client";
import type { SignClientTypes, EngineTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { SessionTypes } from "@walletconnect/types/dist/cjs/sign-client/session";

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
      remove: () => this.client.off(event, callback),
    };
  }

  once<Event extends SignClientTypes.Event>(
    event: Event,
    callback: (args: SignClientTypes.EventArguments[Event]) => void
  ) {
    this.client.once(event, callback);
  }

  async connect(params: EngineTypes.ConnectParams) {
    // const timeout = params.timeout || 30 * 1000;

    return new Promise<SessionTypes.Struct>((resolve, reject) => {
      this.client.connect(params).then(({ uri, approval }) => {
        if (uri) {
          QRCodeModal.open(uri, () => {
            reject(new Error("User cancelled pairing"));
          });
        }

        approval()
          .then(resolve)
          .catch(reject)
          .finally(() => QRCodeModal.close());
      });
    });

    // return new Promise((resolve, reject) => {
    //   this.client.once("pairing_proposal", (proposal) => {
    //     const { uri } = proposal.signal.params;
    //
    //     QRCodeModal.open(uri, () => {
    //       reject(new Error("User cancelled pairing"));
    //     });
    //   });
    //
    //   (async () => {
    //     try {
    //       this.client.connect();
    //       const pairing = await this.client.pairing.create({
    //         relay,
    //         timeout,
    //       });
    //
    //       const session = this.client.session.create({
    //         signal: {
    //           method: SESSION_SIGNAL_METHOD_PAIRING,
    //           params: { topic: pairing.topic },
    //         },
    //         relay,
    //         timeout,
    //         metadata: params.metadata,
    //         permissions: {
    //           ...SESSION_EMPTY_PERMISSIONS,
    //           ...params.permissions,
    //         },
    //       });
    //
    //       QRCodeModal.close();
    //
    //       return session;
    //     } catch (err) {
    //       QRCodeModal.close();
    //
    //       // WalletConnect sadly throws strings.
    //       if (typeof err === "string") {
    //         throw new Error(err);
    //       }
    //
    //       throw err;
    //     }
    //   })()
    //     .then(resolve)
    //     .catch(reject);
    // });
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
