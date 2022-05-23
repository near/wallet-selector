import { BehaviorSubject } from "rxjs";

import type { Wallet, Account } from "./wallet";

export type ModuleState<Variation extends Wallet = Wallet> = {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  wallet(): Promise<Variation>;
};

export type AccountState = Account;

export interface WalletSelectorState {
  modules: Array<ModuleState>;
  accounts: Array<AccountState>;
  selectedWalletId: string | null;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: {
        modules: Array<ModuleState>;
        accounts: Array<AccountState>;
        selectedWalletId: string | null;
      };
    }
  | {
      type: "WALLET_CONNECTED";
      payload: {
        walletId: string;
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
        walletId: string;
        accounts: Array<AccountState>;
      };
    };

export interface Store {
  observable: BehaviorSubject<WalletSelectorState>;
  getState(): WalletSelectorState;
  dispatch(action: WalletSelectorAction): void;
}
