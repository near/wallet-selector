export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  theme?: Theme;
  description?: string;
}

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
}
