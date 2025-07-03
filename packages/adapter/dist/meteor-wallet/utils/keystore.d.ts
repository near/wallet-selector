import { KeyPair } from '@near-js/crypto';
import { KeyStore } from '@near-js/keystores';
export declare class IframeLocalStorageKeyStore extends KeyStore {
    private localStorage;
    private prefix;
    constructor(localStorage?: any, prefix?: string);
    setKey(networkId: string, accountId: string, keyPair: KeyPair): Promise<void>;
    getKey(networkId: string, accountId: string): Promise<any>;
    removeKey(networkId: string, accountId: string): Promise<void>;
    clear(): Promise<void>;
    getNetworks(): Promise<Array<string>>;
    getAccounts(networkId: string): Promise<Array<string>>;
    private storageKeyForSecretKey;
    private storageKeys;
}
