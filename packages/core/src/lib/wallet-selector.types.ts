import { Observable } from "rxjs";

import { WalletModule, Wallet } from "./wallet";
import { WalletSelectorState } from "./store.types";
import { Network, NetworkId, Options } from "./options.types";
import { ModalOptions, WalletSelectorModal } from "./modal/modal.types";
import { Subscription } from "./services";

export interface WalletSelectorParams {
  network: NetworkId | Network;
  contractId: string;
  methodNames?: Array<string>;
  wallets: Array<WalletModule>;
  ui?: ModalOptions;
  debug?: boolean;
}

export interface WalletSelectorStore {
  getState: () => WalletSelectorState;
  observable: Observable<WalletSelectorState>;
}

export type WalletSelectorEvents = {
  networkChanged: { walletId: string; networkId: string };
};

// TODO: Remove extending once modal is a separate package.
export interface WalletSelector extends WalletSelectorModal {
  store: WalletSelectorStore;
  options: Options;
  connected: boolean;

  wallet<WalletVariation extends Wallet = Wallet>(
    walletId?: string
  ): WalletVariation;

  on<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): Subscription;

  off<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): void;
}
