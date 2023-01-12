export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  contractId: string;
  methodNames?: Array<string>;
  theme?: Theme;
  description?: string;
  onHide?: (hideReason: "user-triggered' | 'wallet-navigation") => void;
}

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
}
