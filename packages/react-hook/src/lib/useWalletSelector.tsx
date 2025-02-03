import { useContext } from "react";
import { WalletSelectorContext } from "./WalletSelectorProvider";

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);
  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a <WalletSelectorProvider>"
    );
  }
  return context;
}
