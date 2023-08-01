import type {
  Account,
  Wallet,
  WalletModuleFactory,
} from "./wallet/wallet.types";
import type { ReadOnlyStore } from "./store.types";
import type { Network, NetworkId, Options } from "./options.types";
import type { Subscription, StorageService } from "./services";
import type { SupportedLanguage } from "./translate/translate";
import type { SignMessageMethod } from "./wallet/wallet.types";

export interface WalletSelectorParams {
  network: NetworkId | Network;
  modules: Array<WalletModuleFactory>;
  storage?: StorageService;
  debug?: boolean;
  optimizeWalletOrder?: boolean;
  allowMultipleSelectors?: boolean;
  randomizeWalletOrder?: boolean;
  languageCode?: SupportedLanguage;
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

  wallet<Variation extends Wallet = Wallet>(
    id?: string
  ): Promise<Variation & SignMessageMethod>;

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
