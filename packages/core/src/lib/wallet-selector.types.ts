import type {
  Account,
  Wallet,
  WalletModuleFactory,
} from "./wallet/wallet.types";
import type { ReadOnlyStore } from "./store.types";
import type { Network, NetworkId, Options } from "./options.types";
import type { Subscription, StorageService } from "./services";
import type { SupportedLanguage } from "./translate/translate";

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
  /**
   * Resolved variation of the options passed to `setupWalletSelector`.
   */
  options: Options;
  /**
   * Wallet selector storage service
   */
  store: WalletSelectorStore;

  /**
   * Programmatically access wallets and call their methods.
   * It's advised to use `state.modules` if you only need access to `id`, `type` or `metadata` as it avoids initialising.
   * You can find more information on Wallet {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/wallet.md | here}.
   */
  wallet<Variation extends Wallet = Wallet>(id?: string): Promise<Variation>;

  /**
   * Determines whether we're signed in to one or more accounts.
   */
  isSignedIn(): boolean;

  /**
   * Programmatically change active account which will be used to sign and send transactions.
   */
  setActiveAccount(accountId: string): void;

  /**
   * Attach an event handler to important events.
   */
  on<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): Subscription;

  /**
   * Removes the event handler attached to the given `event`.
   */
  off<EventName extends keyof WalletSelectorEvents>(
    eventName: EventName,
    callback: (event: WalletSelectorEvents[EventName]) => void
  ): void;
}
