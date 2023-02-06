import type { Account } from "@near-wallet-selector/core";
import type { GetAccountPayload, GetSnapsResponse } from "./types";

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

async function getWalletSnaps(): Promise<GetSnapsResponse> {
  return await window.ethereum.request({
    method: "wallet_getSnaps",
  });
}

export async function isMetamaskSnapsSupported(): Promise<boolean> {
  try {
    await getWalletSnaps();
    return true;
  } catch (e) {
    return false;
  }
}

export function getSnapOrigin(isDev: boolean): string {
  if (isDev) {
    return "local:http://localhost:8081";
  }
  return "npm:@chainsafe/near-snap";
}

export function mapAccounts(
  accounts: Array<GetAccountPayload>
): Array<Account> {
  return accounts.map(({ accountId }) => ({ accountId }));
}

export async function isMetaMaskAvailable(): Promise<boolean> {
  if (!hasMetaMask()) {
    return false;
  }
  return await isMetamaskSnapsSupported();
}
