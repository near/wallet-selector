import { InjectedWallet, WalletModuleFactory } from '../../../core/src/index.ts';
import { MeteorWallet as MeteorWalletSdkType } from '@meteorwallet/sdk';
import { IframeLocalStorageKeyStore } from '../utils/keystore';
export interface MeteorWalletParams_Injected {
    iconUrl?: string;
    deprecated?: boolean;
}
export interface MeteorWalletState {
    wallet: MeteorWalletSdkType;
    keyStore: IframeLocalStorageKeyStore;
}
export declare function setupMeteorWallet({ iconUrl, deprecated, }?: MeteorWalletParams_Injected): WalletModuleFactory<InjectedWallet>;
