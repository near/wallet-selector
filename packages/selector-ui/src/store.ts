import { createStore } from "@stencil/store";
import { DEFAULT_DERIVATION_PATH } from "./constants";
import { ModuleState } from "@near-wallet-selector/core";

type StoreState = {
  selector: any;
  //ledger-derivation-path-component
  ledgerIsLoading: boolean;
  ledgerError: string;
  ledgerDerivationPath: string;
  //wallet-options-component
  walletOptionsConnecting: boolean;
  walletInfoVisible: boolean;
  walletOptionsModules: Array<ModuleState>;
};

const store: StoreState = {
  selector: null,
  ledgerIsLoading: false,
  ledgerError: "",
  ledgerDerivationPath: DEFAULT_DERIVATION_PATH,
  walletOptionsConnecting: false,
  walletInfoVisible: false,
  walletOptionsModules: [],
};

// @ts-ignore
const { state, on, onChange, get, set, use } = createStore(store);

export default state;
