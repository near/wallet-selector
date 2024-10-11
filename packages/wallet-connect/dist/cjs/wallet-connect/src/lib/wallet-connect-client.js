"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_client_1 = __importDefault(require("@walletconnect/sign-client"));
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
let WalletConnectModal;
Promise.resolve().then(() => __importStar(require("@walletconnect/modal"))).then((module) => {
    WalletConnectModal = module.WalletConnectModal;
});
class WalletConnectClient {
    client;
    emitter;
    modal;
    async init(opts) {
        this.client = await sign_client_1.default.init(opts);
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
exports.default = WalletConnectClient;
