/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Wallet, WalletBehaviourOptions } from "../../wallet";
import type { IframeManager } from "./iframe-manager";

export interface PendingMessage {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
}

export interface IframeMessage extends MessageEvent {
  type:
    | "RESPONSE"
    | "WALLET_RESPONSE"
    | "STORAGE"
    | "EMITTER"
    | "STORE"
    | "PROVIDER";
  id: string;
  timestamp: number;
  data: any;
  params?: any;
}

export class MessageBridge {
  private iframe: HTMLIFrameElement;
  private pendingMessages = new Map<string, PendingMessage>();

  constructor(
    private iframeManager: IframeManager,
    private options: WalletBehaviourOptions<Wallet>
  ) {
    this.iframe = this.iframeManager.getIframe();
    this.setupMessageListener();
  }

  async sendMessage<T>(message: object): Promise<T> {
    const messageId = this.generateMessageId();
    const fullMessage = {
      ...message,
      id: messageId,
      timestamp: Date.now(),
    };

    return new Promise<T>((resolve, reject) => {
      this.pendingMessages.set(messageId, { resolve, reject });
      try {
        this.iframe.contentWindow!.postMessage(fullMessage, "*");
      } catch (error) {
        this.pendingMessages.delete(messageId);
        reject(new Error("Failed to send message to iframe: " + error));
      }
    });
  }

  private setupMessageListener(): void {
    window.addEventListener("message", (event) => {
      if (event.source !== this.iframe?.contentWindow) {
        return;
      }

      const message: IframeMessage = event.data;
      this.options.logger.log(
        `MessageBridge: Received message of type`,
        message
      );

      if (
        message.type === "WALLET_RESPONSE" &&
        this.pendingMessages.has(message.id)
      ) {
        this.handleWalletResponse(message);
        return;
      }

      if (message.type === "STORAGE") {
        this.handleStorageRequest(message);
        return;
      }

      if (message.type === "EMITTER") {
        this.handleEmitterRequest(message);
        return;
      }

      if (message.type === "STORE") {
        this.handleStoreRequest(message);
        return;
      }

      if (message.type === "PROVIDER") {
        this.handleProviderRequest(message);
        return;
      }
    });
  }

  private handleWalletResponse(message: any): void {
    const pending = this.pendingMessages.get(message.id);
    if (!pending) {
      return;
    }
    this.pendingMessages.delete(message.id);
    if (message.error) {
      pending.reject(new Error(message.error));
    } else {
      pending.resolve(message.result);
    }
  }

  private async handleStorageRequest(message: any): Promise<void> {
    try {
      const { method, params } = message;
      let result: unknown = null;

      switch (method) {
        case "getItem":
          result = await this.options.storage.getItem(params.key);
          break;
        case "setItem":
          await this.options.storage.setItem(params.key, params.value);
          break;
        case "removeItem":
          await this.options.storage.removeItem(params.key);
          break;
        default:
          throw new Error(`Unknown storage method: ${method}`);
      }
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "STORAGE_RESPONSE",
          status: "success",
          result,
        },
        "*"
      );
    } catch (error) {
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "STORAGE_RESPONSE",
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        },
        "*"
      );
    }
  }

  private async handleProviderRequest(message: any): Promise<void> {
    try {
      const { method, params } = message;
      let result: unknown = null;

      switch (method) {
        case "query":
          result = await this.options.provider.query(params);
          break;
        case "viewAccessKey":
          result = await this.options.provider.viewAccessKey(params);
          break;
        case "block":
          result = await this.options.provider.block(params);
          break;
        case "sendTransaction":
          result = await this.options.provider.sendTransaction(params);
          break;
        default:
          throw new Error(`Unknown provider method: ${method}`);
      }
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "PROVIDER_RESPONSE",
          status: "success",
          result,
        },
        "*"
      );
    } catch (error) {
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "PROVIDER_RESPONSE",
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        },
        "*"
      );
    }
  }

  private handleStoreRequest(message: any): void {
    const result = this.options.store.getState();
    this.iframe.contentWindow!.postMessage(
      {
        id: message.id,
        type: "STORE_RESPONSE",
        status: "success",
        result: JSON.parse(JSON.stringify(result)),
      },
      "*"
    );
  }

  private async handleEmitterRequest(message: any): Promise<void> {
    try {
      const { method, params } = message;
      let result: unknown = null;

      switch (method) {
        case "emit":
          this.options.emitter.emit(params.event, params.data);
          result = true;
          break;
        case "on":
          this.options.emitter.on(params.event, params.callback);
          result = true;
          break;
        case "off":
          this.options.emitter.off(params.event, params.callback);
          result = true;
          break;
        default:
          throw new Error(`Unknown emitter method: ${method}`);
      }
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "EMITTER_RESPONSE",
          status: "success",
          result,
        },
        "*"
      );
    } catch (error) {
      this.iframe.contentWindow!.postMessage(
        {
          id: message.id,
          type: "EMITTER_RESPONSE",
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        },
        "*"
      );
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
