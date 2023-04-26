import type { Subscription } from "@near-wallet-selector/core";

export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  contractId: string;
  methodNames?: Array<string>;
  theme?: Theme;
  description?: string;
}

export type ModalHideReason = "user-triggered" | "wallet-navigation";

export type ModalEvents = {
  onHide: { hideReason: ModalHideReason };
};

export interface WalletSelectorModal {
  /**
   * Opens the modal for users to sign in to their preferred wallet. You can also use this method to switch wallets.
   */
  show(): void;
  /**
   * Closes the modal.
   */
  hide(): void;
  /**
   * Attach an event handler to important events.
   */
  on<EventName extends keyof ModalEvents>(
    eventName: EventName,
    callback: (event: ModalEvents[EventName]) => void
  ): Subscription;
  /**
   * Removes the event handler attached to the given `event`.
   */
  off<EventName extends keyof ModalEvents>(
    eventName: EventName,
    callback: (event: ModalEvents[EventName]) => void
  ): void;
}
