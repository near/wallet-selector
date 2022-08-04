import { MyNearWalletParams } from "@near-wallet-selector/my-near-wallet";
import { LedgerParams } from "@near-wallet-selector/ledger";
import { SenderParams } from "@near-wallet-selector/sender";
import { WalletConnectParams } from "@near-wallet-selector/wallet-connect";
import { NearWalletParams } from "@near-wallet-selector/near-wallet";
import { WalletModuleFactory } from "@near-wallet-selector/core";

export type RecommendedWalletId =
  | "my-near-wallet"
  | "ledger"
  | "sender"
  | "wallet-connect";

export interface RecommendedWalletsParams {
  wallets: {
    "my-near-wallet"?: MyNearWalletParams;
    ledger?: LedgerParams;
    sender?: SenderParams;
    "wallet-connect": WalletConnectParams;
  };
  whitelist?: Array<RecommendedWalletId>;
}

export interface RecommendedWalletsModule {
  id: RecommendedWalletId;
  module: WalletModuleFactory;
}
