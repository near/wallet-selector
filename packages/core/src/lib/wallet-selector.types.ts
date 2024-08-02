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
  /**
   * Resolved network configuration.
   */
  network: NetworkId | Network;
  /**
   * List of wallet module factory functions
   */
  modules: Array<WalletModuleFactory>;
  /**
   * Custom storage service
   */
  storage?: StorageService;
  /**
   * Whether internal logging is enabled.
   */
  debug?: boolean;
  /**
   * Whether wallet order optimization is enabled.
   */
  optimizeWalletOrder?: boolean;
  /**
   * Wether to allow multiple wallet selector instances to be created.
   */
  allowMultipleSelectors?: boolean;
  /**
   * Weather wallet order randomization is enabled.
   */
  randomizeWalletOrder?: boolean;
  /**
   * ISO 639-1 two-letter language code.
   */
  languageCode?: SupportedLanguage;
  /**
   * The URL where DelegateActions are sent by meta transaction enabled wallet modules.
   */
  relayerUrl?: string;
  /**
   * Whether multiple RPC URLs are included, used for the FailoverRpcProvider.
   */
  fallbackRpcUrls?: Array<string>;
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
  wallet<Variation extends Wallet = Wallet>(
    id?: string
  ): Promise<Variation & SignMessageMethod>;

  /**
   * Determines whether we're signed in to one or more accounts.
   */
  isSignedIn(): boolean;

  /**
   * Programmatically change active account which will be used to sign and send transactions.
   */
  setActiveAccount(accountId: string): void;

  /**
   * Programmatically changes the rememberRecentWallets behavior, it can deactivate and activate rememberRecentWallets.
   */
  setRememberRecentWallets(): void;

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
