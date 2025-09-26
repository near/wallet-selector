import type { MeteorWallet as MeteorWalletSdk } from "@meteorwallet/sdk";
import type { BrowserLocalStorageKeyStore } from "@near-js/keystores-browser";

export interface MeteorWalletParams_Injected {
  iconUrl?: string;
  deprecated?: boolean;
}

export interface MeteorWalletState {
  wallet: MeteorWalletSdk;
  keyStore: BrowserLocalStorageKeyStore;
}
