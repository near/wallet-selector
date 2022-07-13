import { MeteorWallet as MeteorWalletSdk } from "@meteorwallet/sdk";
import { keyStores } from "near-api-js";

export interface MeteorWalletParams_Injected {
  iconUrl?: string;
}

export interface MeteorWalletState {
  wallet: MeteorWalletSdk;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
}
