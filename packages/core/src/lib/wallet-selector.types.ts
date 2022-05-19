import { Observable } from "rxjs";

import { Wallet, WalletModuleFactory } from "./wallet/wallet.types";
import { WalletSelectorState } from "./store.types";
import { Network, NetworkId, Options } from "./options.types";
import { Subscription, StorageService } from "./services";

export interface WalletSelectorParams {
  network: NetworkId | Network;
  modules: Array<WalletModuleFactory>;
  storage?: StorageService;
  debug?: boolean;
}

export interface WalletSelectorStore {
  getState: () => WalletSelectorState;
  observable: Observable<WalletSelectorState>;
}

export type WalletSelectorEvents = {
  networkChanged: { walletId: string; networkId: string };
};

export interface WalletSelector {
  options: Options;
  connected: boolean;

  store: WalletSelectorStore;

  wallet<Variation extends Wallet = Wallet>(id?: string): Promise<Variation>;

  on<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): Subscription;

  off<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): void;
}
