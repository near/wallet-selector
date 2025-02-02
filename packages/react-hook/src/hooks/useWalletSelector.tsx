import { useContext } from "react";
import { WalletSelectorContext } from "../context/WalletSelectorProvider";

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);
  if (!context) {
    throw new Error("useWalletSelector must be used within <WalletSelectorProvider>");
  }
  return context;
}