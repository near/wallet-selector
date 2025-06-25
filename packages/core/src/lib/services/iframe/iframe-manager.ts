import type { Wallet, WalletBehaviourOptions } from "../../wallet";

export interface IframeConfig {
  source: string;
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

    this.iframe.sandbox.add("allow-scripts", "allow-popups");

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
      async function sendMessageToParent(type, data = {}) {
        return new Promise((resolve) => {
          const id = Date.now().toString();
          const handler = (event) => {
            console.log("Received message from parent:", event.data);
            if (event.data.id === id) {
              window.removeEventListener('message', handler);
              resolve(event.data.result);
            }
          };
          window.addEventListener('message', handler);
          window.parent.postMessage({ type, id, ...data }, '*');
        });
      }

      const storageWrapper = {
        getItem: (key) => sendMessageToParent('STORAGE', { method: "getItem", params: { key } }),
        setItem: (key, value) => sendMessageToParent('STORAGE', { method: "setItem", params: { key, value } }),
        removeItem: (key) => sendMessageToParent('STORAGE', { method: "removeItem", params: { key } }),
      };

      class WalletIframeHandler {
        constructor() {
          this.wallet = null;
          this.isInitialized = false;
          
          window.addEventListener('message', this.handleMessage.bind(this));

          this.initializeWallet();
        }

        async initializeWallet() {
          try {
            const walletFactory = await window.setupWallet();
            this.wallet = await walletFactory.init({
              storage: storageWrapper,
              emitter: {},
              logger: {},
              provider: {},
              store: {},
              options: {}
            });
            this.isInitialized = true;
            this.sendToParent({
              type: 'IFRAME_READY',
              walletId: this.wallet.id
            });
          } catch (error) {
            console.error('Wallet initialization failed:', error);
            this.sendToParent({
              type: 'RESPONSE',
              success: false,
              error: error.message
            });
          }
        }

        async handleMessage(event) {
          const { type, method, params, id } = event.data;
          if (type !== 'WALLET_METHOD_CALL') return;

          try {
            if (!this.isInitialized) {
              await this.initializeWallet();
            }

            if (!this.wallet[method]) {
              throw new Error('Method not found');
            }

            const result = await this.wallet[method](params);
            this.sendToParent({
              id,
              type: 'WALLET_RESPONSE',
              success: true,
              result
            });
          } catch (error) {
            this.sendToParent({
              type: 'WALLET_RESPONSE',
              id,
              success: false, 
              error: error.message
            });
          }
        }

        sendToParent(message) {
          window.parent.postMessage(message, '*');
        }
      }

      const initHandler = () => {
        if (window.walletHandler) return;
        window.walletHandler = new WalletIframeHandler();
      };

      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initHandler);
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
