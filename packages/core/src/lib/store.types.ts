import { BehaviorSubject } from "rxjs";

import { WalletModule } from "./wallet/wallet.types";

export interface AccountState {
  accountId: string;
}

export interface WalletSelectorState {
  modules: Array<WalletModule>;
  accounts: Array<AccountState>;
  selectedWalletId: string | null;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: {
        modules: Array<WalletModule>;
        accounts: Array<AccountState>;
        selectedWalletId: string | null;
      };
    }
  | {
      type: "WALLET_CONNECTED";
      payload: {
        walletId: string;
        pending: boolean;
        accounts: Array<AccountState>;
      };
    }
  | {
      type: "WALLET_DISCONNECTED";
      payload: {
        walletId: string;
      };
    }
  | {
      type: "ACCOUNTS_CHANGED";
      payload: {
        accounts: Array<AccountState>;
      };
    };

export interface Store {
  observable: BehaviorSubject<WalletSelectorState>;
  getState(): WalletSelectorState;
  dispatch(action: WalletSelectorAction): void;
}
