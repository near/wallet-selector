import { WalletSelector } from "./wallet-selector.types";
export interface WalletSelectorUIComponent {
  setSelector(selector: WalletSelector): Promise<void>;
}
