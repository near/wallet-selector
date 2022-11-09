import type {
  Account,
  Wallet,
  WalletModuleFactory,
} from "./wallet/wallet.types";
import type { ReadOnlyStore } from "./store.types";
import type { Network, NetworkId, Options } from "./options.types";
import type { Subscription, StorageService } from "./services";

export interface WalletSelectorParams {
  network: NetworkId | Network;
  modules: Array<WalletModuleFactory>;
  storage?: StorageService;
  debug?: boolean;
}

export type WalletSelectorStore = ReadOnlyStore;

export type WalletSelectorEvents = {
  signedIn: {
    walletId: string;
    contractId: string;
    methodNames: Array<string>;
    accounts: Array<Account>;
  };
  signedOut: {
    walletId: string;
  };
  accountsChanged: { walletId: string; accounts: Array<Account> };
  networkChanged: { walletId: string; networkId: string };
  uriChanged: { walletId: string; uri: string };
};

export interface WalletSelector {
  options: Options;
  store: WalletSelectorStore;

  wallet<Variation extends Wallet = Wallet>(id?: string): Promise<Variation>;

  isSignedIn(): boolean;

  setActiveAccount(accountId: string): void;

  on<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): Subscription;

  off<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): void;
}

export type WalletSelectorNetworks = {
  [networkId: string]: WalletSelector;
};

export type SetupWalletSelectorParams =
  | WalletSelectorParams
  | Array<WalletSelectorParams>;

export type SetupWalletSelectorResponse<T> = T extends WalletSelectorParams
  ? WalletSelector
  : T extends Array<WalletSelectorParams>
  ? WalletSelectorNetworks
  : never;
