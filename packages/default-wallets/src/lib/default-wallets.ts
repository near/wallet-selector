import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import type { WalletModuleFactory } from "@near-wallet-selector/core";

export const setupDefaultWallets = async (): Promise<
  Array<WalletModuleFactory>
> => {
  return [setupMyNearWallet(), setupLedger()];
};
