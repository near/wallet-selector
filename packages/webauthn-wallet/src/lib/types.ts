import type {
  WalletBehaviourFactory,
  BrowserWallet,
} from "@near-wallet-selector/core";

export interface WebAuthnWalletOptions {
  /**
   * URL of the relayer service that sponsors account creation.
   */
  relayerUrl: string;

  /**
   * Whether the wallet should be marked as deprecated.
   */
  deprecated?: boolean;

  /**
   * Custom icon URL for the wallet.
   */
  iconUrl?: string;
}

export interface RelayerService {
  createAccount(
    publicKey: string,
    accountId: string
  ): Promise<{
    success: boolean;
    accountId: string;
    transactionHash?: string;
  }>;
}

export interface BiometricAccount {
  accountId: string;
  publicKey: string;
}

export type WebAuthnWalletState = {
  account: BiometricAccount | null;
};

export type SelectorInit = WalletBehaviourFactory<
  BrowserWallet,
  { relayerUrl?: string }
>;


