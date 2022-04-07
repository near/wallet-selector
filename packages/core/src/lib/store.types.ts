import { Observable } from "rxjs";

import { Network } from "./network";
import { Wallet } from "./wallet";

export interface AccountState {
  accountId: string;
}

export interface ContractState {
  contractId: string;
  methodNames: Array<string> | null;
}

export type WalletState<WalletVariation extends Wallet = Wallet> =
  WalletVariation & {
    selected: boolean;
  };

export interface WalletSelectorState {
  network: Network;
  // TODO: Remove once Modal is decoupled from core.
  contract: ContractState;

  wallets: Array<WalletState>;
  accounts: Array<AccountState>;

  // Modal related state.
  // TODO: Remove once Modal is decoupled from core.
  showModal: boolean;
  showWalletOptions: boolean;
  showLedgerDerivationPath: boolean;
  showWalletNotInstalled: string | null;
  showSwitchNetwork: boolean;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: { wallets: Array<Wallet>; selectedWalletId: string | null };
    }
  | {
      type: "WALLET_CONNECTED";
      payload: { id: string; pending: boolean; accounts: Array<AccountState> };
    }
  | {
      type: "WALLET_DISCONNECTED";
      payload: { id: string };
    }
  | {
      type: "ACCOUNTS_CHANGED";
      payload: { accounts: Array<AccountState> };
    }
  | {
      type: "UPDATE";
      payload: Partial<WalletSelectorState>;
    };

export interface WalletSelectorStore<State> {
  observable: Observable<State>;
  getState(): State;
  dispatch(action: WalletSelectorAction): void;
}
