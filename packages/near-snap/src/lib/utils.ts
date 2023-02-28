import type { Account } from "@near-wallet-selector/core";
import type { GetAccountPayload } from "./types";

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

async function isMetaMaskFlask(): Promise<boolean> {
  try {
    const walletName = await window.ethereum.request<string>({
      method: "web3_clientVersion",
    });
    return walletName.includes("flask");
  } catch {
    return false;
  }
}

export async function isMetaMaskAvailable(): Promise<boolean> {
  if (!window.ethereum) {
    return false;
  }
  return await Promise.race([
    isMetaMaskFlask(),
    // in case if a wallet dose not has rpc method web3_clientVersion, we cant to timeout
    new Promise<false>((resolve) =>
      setTimeout(() => {
        resolve(false);
      }, 1000)
    ),
  ]);
}
