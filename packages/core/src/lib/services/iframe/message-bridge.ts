/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Wallet, WalletBehaviourOptions } from "../../wallet";
import type { IframeConfig } from "./iframe-manager";

export interface PendingMessage {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
}

export interface IframeMessage extends MessageEvent {
  type: "RESPONSE" | "WALLET_RESPONSE" | "STORAGE" | "EMITTER";
  id: string;
  timestamp: number;
  data: any;
  params?: any;
}

export class MessageBridge {
  private iframe: HTMLIFrameElement;
  private pendingMessages = new Map<string, PendingMessage>();
  private options: WalletBehaviourOptions<Wallet>;

  constructor(
    iframe: HTMLIFrameElement,
    options: WalletBehaviourOptions<Wallet>,
    private config: IframeConfig
  ) {
    this.iframe = iframe;
    this.options = options;
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
      const timer = setTimeout(() => {
        if (this.pendingMessages.has(messageId)) {
          this.pendingMessages.delete(messageId);
          reject(new Error("Message timeout exceeded"));
        }
      }, this.config.timeout || 5000);
      this.pendingMessages.set(messageId, { resolve, reject });
      try {
        this.iframe.contentWindow!.postMessage(fullMessage, "*");
      } catch (error) {
        this.pendingMessages.delete(messageId);
        clearTimeout(timer);
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
        // this.handleEmitterRequest(message);
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

  // private async handleEmitterRequest(message: any): Promise<void> {
  //   const emitter = this.options.emitter;
  // }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
