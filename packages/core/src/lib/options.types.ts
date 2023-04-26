import type { SupportedLanguage } from "./translate/translate";

export type NetworkId = "mainnet" | "testnet";

export interface Network {
  /**
   * Network ID (e.g. `testnet`).
   */
  networkId: string;
  /**
   * URL for RPC requests.
   */
  nodeUrl: string;
  /**
   * URL for creating accounts.
   */
  helperUrl: string;
  /**
   * URL for the NEAR explorer.
   */
  explorerUrl: string;
  /**
   * URL for the NEAR indexer.
   */
  indexerUrl: string;
}

export interface Options {
  /**
   * ISO 639-1 two-letter language code.
   */
  languageCode: SupportedLanguage | undefined;
  /**
   * Resolved network configuration.
   */
  network: Network;
  /**
   * Whether internal logging is enabled.
   */
  debug: boolean;
  /**
   * Whether wallet order optimization is enabled.
   */
  optimizeWalletOrder: boolean;
  /**
   * Weather wallet order randomization is enabled.
   */
  randomizeWalletOrder: boolean;
  /**
   * The URL where DelegateActions are sent by meta transaction enabled wallet modules.
   */
  relayerUrl: string | undefined;
}
