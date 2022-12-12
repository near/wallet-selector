import type { AccountImportData } from "@near-wallet-selector/core";

export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  contractId: string;
  methodNames?: Array<string>;
  theme?: Theme;
  description?: string;
}

export interface ImportModalOptions extends ModalOptions {
  accounts: Array<AccountImportData>;
}

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
}
