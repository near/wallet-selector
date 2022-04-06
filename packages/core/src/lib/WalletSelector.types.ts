import { Observable } from "rxjs";

import { WalletModule, Wallet } from "./wallet";
import { WalletSelectorState } from "./store.types";

import { Network, NetworkId } from "./network";
import { ModalOptions } from "./modal/setupModal.types";

export interface WalletSelectorOptions {
  network: NetworkId | Network;
  contractId: string;
  methodNames?: Array<string>;
  wallets: Array<WalletModule>;
  ui?: ModalOptions;
}

export interface WalletSelector {
  store: {
    getState: () => WalletSelectorState;
    toObservable: () => Observable<WalletSelectorState>;
  };

  show(): void;
  hide(): void;

  wallet<WalletVariation extends Wallet = Wallet>(
    walletId?: string
  ): WalletVariation;
}
