import type {
  AccountImportData,
  ModuleState,
} from "@near-wallet-selector/core";

export type Theme = "dark" | "light" | "auto";

type ExportSelectorOnCompleteParams = {
  accounts: Array<string>;
  walletName: string;
};

export interface ExportSelectorOptions {
  theme?: Theme;
  description?: string;
  accounts: Array<AccountImportData>;
  onComplete?: (completeProps: ExportSelectorOnCompleteParams) => void;
}

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
}

type AlertMessageModalRouteParams = {
  module: ModuleState;
};

export type DerivationPathModalRouteParams = {
  walletId: string;
};

type WalletNotInstalledModalRouteParams = {
  module: ModuleState;
};

type ExportAccountsParams = {
  module: ModuleState;
};

type AlertMessageModalRoute = {
  name: "AlertMessage";
  params?: AlertMessageModalRouteParams;
};

type WalletNotInstalledModalRoute = {
  name: "WalletNotInstalled";
  params?: WalletNotInstalledModalRouteParams;
};

type WalletHome = {
  name: "WalletHome";
};

export type ExportAccounts = {
  name: "ExportAccounts";
  params?: ExportAccountsParams;
};

export type ModalRoute =
  | AlertMessageModalRoute
  | WalletNotInstalledModalRoute
  | WalletHome
  | ExportAccounts;
