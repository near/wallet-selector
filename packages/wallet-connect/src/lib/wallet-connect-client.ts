import Client from "@walletconnect/sign-client";
import type { SignClientTypes, EngineTypes } from "@walletconnect/types";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
let WalletConnectModal: typeof import("@walletconnect/modal").WalletConnectModal;
import("@walletconnect/modal").then((module) => {
  WalletConnectModal = module.WalletConnectModal;
});
import type { SessionTypes } from "@walletconnect/types";
import type {
  EventEmitterService,
  WalletEvents,
} from "@near-wallet-selector/core";

class WalletConnectClient {
  private client: Client;
  private emitter: EventEmitterService<WalletEvents>;
  private modal: typeof WalletConnectModal.prototype;

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

  async connect(
    params: EngineTypes.ConnectParams,
    qrCodeModal: boolean,
    projectId: string,
    chainId: string
  ) {
    if (!this.modal) {
      this.modal = new WalletConnectModal({
        projectId,
        chains: [chainId],
        explorerExcludedWalletIds: "ALL",
      });
    }

    return new Promise<SessionTypes.Struct>((resolve, reject) => {
      this.client
        .connect(params)
        .then(({ uri, approval }) => {
          if (uri) {
            if (qrCodeModal) {
              this.modal.openModal({
                uri,
                standaloneChains: [chainId],
              });
              this.modal.subscribeModal(({ open }) => {
                if (!open) {
                  reject(new Error("User cancelled pairing"));
                }
              });
            } else {
              this.emitter.emit("uriChanged", { uri });
            }
          }

          approval()
            .then(resolve)
            .catch(reject)
            .finally(() => this.modal.closeModal());
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
