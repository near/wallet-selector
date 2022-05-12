import { createStore } from "@stencil/store";
import { ModuleState, WalletSelector } from "@near-wallet-selector/core";
import { DEFAULT_DERIVATION_PATH } from "./constants";

type StoreState = {
  selector: WalletSelector;
  routeName:
    | "WalletOptions"
    | "AlertMessage"
    | "WalletNetworkChanged"
    | "LedgerDerivationPath";
  //ledger-derivation-path-component
  ledgerIsLoading: boolean;
  ledgerError: string;
  ledgerDerivationPaths: Array<string>;
  //wallet-options-component
  walletOptionsConnecting: boolean;
  walletInfoVisible: boolean;
  walletOptionsModules: Array<ModuleState>;
};

const store: StoreState = {
  selector: null,
  routeName: "WalletOptions",
  ledgerIsLoading: false,
  ledgerError: "",
  ledgerDerivationPaths: [DEFAULT_DERIVATION_PATH],
  walletOptionsConnecting: false,
  walletInfoVisible: false,
  walletOptionsModules: [],
};

// @ts-ignore
const { state, on, onChange, get, set, use } = createStore(store);

export default state;
