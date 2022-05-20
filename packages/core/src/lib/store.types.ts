import { BehaviorSubject, Observable } from "rxjs";

import { Wallet, Account } from "./wallet";

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

export type AccountState = Account;

export interface WalletSelectorState {
  contract: ContractState | null;
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
        contract: ContractState;
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
