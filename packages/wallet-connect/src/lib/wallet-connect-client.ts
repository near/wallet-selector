import Client from "@walletconnect/sign-client";
import type { SignClientTypes, EngineTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { SessionTypes } from "@walletconnect/types";
import type {
  EventEmitterService,
  WalletEvents,
} from "@near-wallet-selector/core";

class WalletConnectClient {
  private client: Client;
  private emitter: EventEmitterService<WalletEvents>;

  async init(opts: SignClientTypes.Options) {
    this.client = await Client.init(opts);
  }

  constructor(emitter: EventEmitterService<WalletEvents>) {
    this.emitter = emitter;
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

  async connect(params: EngineTypes.ConnectParams, defaultQRModal: boolean) {
    return new Promise<SessionTypes.Struct>((resolve, reject) => {
      this.client
        .connect(params)
        .then(({ uri, approval }) => {
          if (uri) {
            if (defaultQRModal) {
              QRCodeModal.open(uri, () => {
                reject(new Error("User cancelled pairing"));
              });
            } else {
              this.emitter.emit("uriChanged", { uri });
            }
          }

          approval()
            .then(resolve)
            .catch(reject)
            .finally(() => QRCodeModal.close());
        })
        .catch(reject);
    });
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
