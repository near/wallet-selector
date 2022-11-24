import type { BehaviorSubject, Observable } from "rxjs";

import type { Wallet, Account } from "./wallet";

export interface ContractState {
  contractId: string;
  methodNames: Array<string>;
}

export type ModuleState<Variation extends Wallet = Wallet> = {
  id: Variation["id"];
  type: Variation["type"];
  metadata: Variation["metadata"];
  wallet(): Promise<Variation>;
};

export type AccountState = Account & {
  active: boolean;
};

export interface WalletSelectorState {
  contract: ContractState | null;
  modules: Array<ModuleState>;
  accounts: Array<AccountState>;
  selectedWalletId: string | null;
  recentlySignedInWallets: Array<string>;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: {
        modules: Array<ModuleState>;
        accounts: Array<Account>;
        contract: ContractState | null;
        selectedWalletId: string | null;
        recentlySignedInWallets: Array<string>;
      };
    }
  | {
      type: "WALLET_CONNECTED";
      payload: {
        walletId: string;
        contract: ContractState;
        accounts: Array<Account>;
        recentlySignedInWallets: Array<string>;
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
        accounts: Array<Account>;
      };
    }
  | {
      type: "SET_ACTIVE_ACCOUNT";
      payload: {
        accountId: string;
      };
    };

export interface ReadOnlyStore {
  getState(): WalletSelectorState;
  observable: Observable<WalletSelectorState>;
}

export interface Store {
  observable: BehaviorSubject<WalletSelectorState>;
  getState(): WalletSelectorState;
  dispatch(action: WalletSelectorAction): void;
  toReadOnly(): ReadOnlyStore;
}
