import { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { LedgerParams } from "@near-wallet-selector/ledger";
import { WalletConnectParams } from "@near-wallet-selector/wallet-connect";
import { WalletModuleFactory } from "@near-wallet-selector/core";

export type RecommendedWalletId =
  | "my-near-wallet"
  | "ledger"
  | "wallet-connect";

export interface RecommendedWalletsParams {
  wallets: {
    "my-near-wallet"?: MyNearWalletParams;
    ledger?: LedgerParams;
    "wallet-connect": WalletConnectParams;
  };
  whitelist?: Array<RecommendedWalletId>;
}

export interface RecommendedWalletsModule {
  id: RecommendedWalletId;
  module: WalletModuleFactory;
}
