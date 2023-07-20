import Client from "@walletconnect/sign-client";
import type { SignClientTypes, EngineTypes } from "@walletconnect/types";
import { WalletConnectModal } from "@walletconnect/modal";
import type { SessionTypes } from "@walletconnect/types";
import type {
  EventEmitterService,
  WalletEvents,
} from "@near-wallet-selector/core";

// NEAR supported WalletIds from WalletConnect Explorer.
const OPTO_WALLET =
  "9504a1c1a86cc0702b2d3e47049e1389b373fb2ff22de3208c748d62912433a4";

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

  async connect(
    params: EngineTypes.ConnectParams,
    qrCodeModal: boolean,
    projectId: string,
    chainId: string
  ) {
    const walletConnectModal = new WalletConnectModal({
      projectId,
      chains: [chainId],
      explorerExcludedWalletIds: "ALL",
      explorerRecommendedWalletIds: [OPTO_WALLET],
    });

    return new Promise<SessionTypes.Struct>((resolve, reject) => {
      this.client
        .connect(params)
        .then(({ uri, approval }) => {
          if (uri) {
            if (qrCodeModal) {
              walletConnectModal.openModal({
                uri,
                standaloneChains: [chainId],
              });
              walletConnectModal.subscribeModal(({ open }) => {
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
            .finally(() => walletConnectModal.closeModal());
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
