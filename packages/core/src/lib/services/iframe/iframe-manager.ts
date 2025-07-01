import type { Wallet, WalletBehaviourOptions } from "../../wallet";

export interface IframeConfig {
  source: string;
  permissions: Array<string>;
  timeout?: number;
}

export class IframeManager {
  private iframe: HTMLIFrameElement | null = null;
  private readyPromise: Promise<void> | null = null;

  constructor(
    private config: IframeConfig,
    private options: WalletBehaviourOptions<Wallet>
  ) {}

  async initialize(): Promise<void> {
    if (this.iframe) {
      return;
    }

    if (this.readyPromise) {
      return this.readyPromise;
    }

    try {
      this.readyPromise = this.createAndSetupIframe();
      await this.readyPromise;
    } catch (error) {
      this.readyPromise = null;
      throw error;
    }
  }

  private async createAndSetupIframe(): Promise<void> {
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute("id", "wallet-iframe");

    this.iframe.sandbox.add("allow-scripts");
    this.config.permissions.forEach((permission) => {
      this.iframe!.sandbox.add(permission);
    });

    Object.assign(this.iframe.style, {
      display: "none",
      width: "1000",
      height: "1000",
      border: "none",
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <script src="${this.config.source}"></script>
          <script>${this.getIframeCode()}</script>
        </body>
      </html>
  `;

    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
      htmlContent
    )}`;
    this.iframe.src = dataUrl;
    this.iframe.sandbox.add("allow-scripts", "allow-popups");

    document.body.appendChild(this.iframe);

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Iframe initialization timeout"));
      }, this.config.timeout || 5000);

      const handleMessage = (event: MessageEvent) => {
        if (
          event.source === this.iframe!.contentWindow &&
          event.data.type === "IFRAME_READY"
        ) {
          clearTimeout(timeout);
          window.removeEventListener("message", handleMessage);
          resolve();
        }
      };

      window.addEventListener("message", handleMessage);
    });
  }

  private getIframeCode(): string {
    const handlerScript = `
      const MESSAGE_TYPES = {
        STORAGE: "STORAGE",
        STORE: "STORE",
        PROVIDER: "PROVIDER",
        EMITTER: "EMITTER",
        WALLET_METHOD_CALL: "WALLET_METHOD_CALL",
        WALLET_RESPONSE: "WALLET_RESPONSE",
        IFRAME_READY: "IFRAME_READY",
        RESPONSE: "RESPONSE",
      };

      class MessageHandler {
        constructor() {
          this.messageId = 0;
        }

        generateId() {
          return \`\${++this.messageId}_\${Date.now()}\`;
        }

        async sendRequest(type, data = {}) {
          return new Promise((resolve, reject) => {
            const id = this.generateId();

            const handler = (event) => {
              if (event.data.id === id) {
                window.removeEventListener("message", handler);
                event.data.success === false
                  ? reject(new Error(event.data.error))
                  : resolve(event.data.result);
              }
            };

            window.addEventListener("message", handler);
            window.parent.postMessage({ type, id, ...data }, "*");
          });
        }

        sendMessage(message) {
          window.parent.postMessage(message, "*");
        }
      }

      class StorageService extends MessageHandler {
        getItem(key) {
          return this.sendRequest(MESSAGE_TYPES.STORAGE, {
            method: "getItem",
            params: { key },
          });
        }

        setItem(key, value) {
          return this.sendRequest(MESSAGE_TYPES.STORAGE, {
            method: "setItem",
            params: { key, value },
          });
        }

        removeItem(key) {
          return this.sendRequest(MESSAGE_TYPES.STORAGE, {
            method: "removeItem",
            params: { key },
          });
        }
      }

      class StoreService extends MessageHandler {
        getState() {
          return this.sendRequest(MESSAGE_TYPES.STORE, { method: "getState" });
        }
      }

      class EmitterService extends MessageHandler {
        async emit(eventName, data) {
          return this.sendRequest(MESSAGE_TYPES.EMITTER, {
            method: "emit",
            params: { eventName, data },
          });
        }
        async on(eventName, callback) {
          return this.sendRequest(MESSAGE_TYPES.EMITTER, {
            method: "on",
            params: { eventName, callback },
          });
        }
        async off(eventName, callback) {
          return this.sendRequest(MESSAGE_TYPES.EMITTER, {
            method: "off",
            params: { eventName, callback },
          });
        }
      }

      class Logger {
        log() {}
        info() {}
        warn() {}
        error() {}
      }

      class ProviderService extends MessageHandler {
        async query(params) {
          return this.sendRequest(MESSAGE_TYPES.PROVIDER, {
            method: "query",
            params,
          });
        }

        async viewAccessKey(params) {
          return this.sendRequest(MESSAGE_TYPES.PROVIDER, {
            method: "viewAccessKey",
            params,
          });
        }

        async block(reference) {
          return this.sendRequest(MESSAGE_TYPES.PROVIDER, {
            method: "block",
            params: { reference },
          });
        }

        async sendTransaction(signedTransaction) {
          return this.sendRequest(MESSAGE_TYPES.PROVIDER, {
            method: "sendTransaction",
            params: { signedTransaction },
          });
        }
      }

      class WalletIframeHandler extends MessageHandler{
        constructor() {
          super();
          this.wallet = null;
          this.isInitialized = false;

          this.storage = new StorageService();
          this.store = new StoreService();
          this.logger = new Logger();
          this.provider = new ProviderService();

          window.addEventListener("message", this.handleMessage.bind(this));
          this.initialize();
        }

        async initialize() {
          try {
            const walletFactory = await window.setupWallet();
            this.wallet = await walletFactory.init({
              id: "${this.options.id}",
              metadata: ${JSON.stringify(this.options.metadata)},
              options: ${JSON.stringify(this.options.options)},
              store: this.store,
              provider: this.provider,
              emitter: {},
              logger: this.logger,
              storage: this.storage,
            });

            this.isInitialized = true;
            this.sendMessage({
              type: MESSAGE_TYPES.IFRAME_READY,
              walletId: this.wallet.id,
              success: true,
            });
          } catch (error) {
            console.error("Wallet initialization failed:", error);
            this.sendMessage({
              type: MESSAGE_TYPES.RESPONSE,
              success: false,
              error: error.message,
            });
          }
        }

        async handleMessage(event) {
          const { type, method, params, id } = event.data;

          if (type !== MESSAGE_TYPES.WALLET_METHOD_CALL || !id) return;

          try {
            await this.ensureInitialized();

            if (!this.wallet[method]) {
              throw new Error(\`Method not '\${method}' found\`);
            }

            const result = await this.wallet[method](params);
            this.sendMessage({
              id,
              type: MESSAGE_TYPES.WALLET_RESPONSE,
              success: true,
              result,
            });
          } catch (error) {
            this.sendMessage({
              id,
              type: MESSAGE_TYPES.WALLET_RESPONSE,
              success: false,
              error: error.message,
            });
          }
        }

        async ensureInitialized() {
          if (!this.isInitialized) {
            await this.initialize();
          }
          if (!this.wallet) {
            throw new Error("Wallet initialization failed");
          }
        }
      }

      const initHandler = () => {
        if (window.walletHandler) return;
        window.walletHandler = new WalletIframeHandler();
        return window.walletHandler;
      };

      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", initHandler);
      } else {
        initHandler();
      }
    `;

    return handlerScript;
  }

  getIframe(): HTMLIFrameElement {
    if (!this.iframe) {
      throw new Error("Iframe not initialized");
    }
    return this.iframe;
  }

  getConfig(): IframeConfig {
    return this.config;
  }

  isReady(): boolean {
    return this.iframe !== null && this.readyPromise !== null;
  }

  destroy(): void {
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
      this.readyPromise = null;
    }
  }
}
