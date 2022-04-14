import { BehaviorSubject } from "rxjs";

import { Wallet, WalletMetadata } from "./wallet";
import { Options } from "./options.types";

export interface AccountState {
  accountId: string;
}

export type WalletState = WalletMetadata & {
  selected: boolean;
};

export interface WalletSelectorState {
  options: Options;

  wallets: Array<WalletState>;
  accounts: Array<AccountState>;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: {
        wallets: Array<Wallet>;
        selectedWalletId: string | null;
        accounts: Array<AccountState>;
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
