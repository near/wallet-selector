import type { Subscription } from "@near-wallet-selector/core";

export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  contractId: string;
  methodNames?: Array<string>;
  theme?: Theme;
  description?: string;
  onHide?: (hideReason: "user-triggered" | "wallet-navigation") => void;
}

export type ModalHideReason = "user-triggered" | "wallet-navigation";

export type ModalEvents = {
  onHide: { hideReason: ModalHideReason };
};

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
  on<EventName extends keyof ModalEvents>(
    eventName: EventName,
    callback: (event: ModalEvents[EventName]) => void
  ): Subscription;

  off<EventName extends keyof ModalEvents>(
    eventName: EventName,
    callback: (event: ModalEvents[EventName]) => void
  ): void;
}
