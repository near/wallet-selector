import Client from "@walletconnect/sign-client";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
let WalletConnectModal;
import("@walletconnect/modal").then((module) => {
    WalletConnectModal = module.WalletConnectModal;
});
class WalletConnectClient {
    client;
    emitter;
    modal;
    async init(opts) {
        this.client = await Client.init(opts);
    }
    constructor(emitter) {
        this.emitter = emitter;
    }
    get session() {
        return this.client.session;
    }
    on(event, callback) {
        this.client.on(event, callback);
        return {
            remove: () => this.client.removeListener(event, callback),
        };
    }
    once(event, callback) {
        this.client.once(event, callback);
    }
    async connect(params, qrCodeModal, projectId, chainId) {
        if (!this.modal) {
            this.modal = new WalletConnectModal({
                projectId,
                chains: [chainId],
                explorerExcludedWalletIds: "ALL",
            });
        }
        return new Promise((resolve, reject) => {
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
                    }
                    else {
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
    async request(params) {
        return this.client.request(params);
    }
    async disconnect(params) {
        return this.client.disconnect(params);
    }
}
export default WalletConnectClient;
