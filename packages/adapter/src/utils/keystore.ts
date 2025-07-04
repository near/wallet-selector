/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyPair } from "@near-js/crypto";
import { KeyStore } from "@near-js/keystores";

const LOCAL_STORAGE_KEY_PREFIX = "near-api-js:keystore:";

export class IframeLocalStorageKeyStore extends KeyStore {
  private localStorage: any;
  private prefix: string;

  constructor(
    localStorage: any = window.selector.localStorage,
    prefix = LOCAL_STORAGE_KEY_PREFIX
  ) {
    super();
    this.localStorage = localStorage;
    this.prefix = prefix;
  }

  async setKey(
    networkId: string,
    accountId: string,
    keyPair: KeyPair
  ): Promise<void> {
    this.localStorage.setItem(
      this.storageKeyForSecretKey(networkId, accountId),
      keyPair.toString()
    );
  }

  async getKey(networkId: string, accountId: string): Promise<any> {
    const value = await this.localStorage.getItem(
      this.storageKeyForSecretKey(networkId, accountId)
    );
    if (!value) {
      return null;
    }
    return KeyPair.fromString(value);
  }

  async removeKey(networkId: string, accountId: string): Promise<void> {
    this.localStorage.removeItem(
      this.storageKeyForSecretKey(networkId, accountId)
    );
  }

  async clear(): Promise<void> {
    for await (const key of this.storageKeys()) {
      if (key.startsWith(this.prefix)) {
        this.localStorage.removeItem(key);
      }
    }
  }

  async getNetworks(): Promise<Array<string>> {
    const result = new Set<string>();
    for await (const key of this.storageKeys()) {
      if (key.startsWith(this.prefix)) {
        const parts = key.substring(this.prefix.length).split(":");
        result.add(parts[1]);
      }
    }
    return Array.from(result.values());
  }

  async getAccounts(networkId: string): Promise<Array<string>> {
    const result = new Array<string>();
    for await (const key of this.storageKeys()) {
      if (key.startsWith(this.prefix)) {
        const parts = key.substring(this.prefix.length).split(":");
        if (parts[1] === networkId) {
          result.push(parts[0]);
        }
      }
    }
    return result;
  }

  private storageKeyForSecretKey(networkId: string, accountId: string): string {
    return `${this.prefix}${accountId}:${networkId}`;
  }

  private async *storageKeys(): AsyncIterableIterator<string> {
    const length = await this.localStorage.length();
    for (let i = 0; i < length; i++) {
      yield this.localStorage.key(i);
    }
  }
}
