import React from "react";
import { WalletSelector } from "../../wallet-selector.types";
import { Store } from "../../store.types";
import { ModalOptions } from "../modal.types";
import { Modal } from "./Modal";

interface RootProps {
  selector: Omit<WalletSelector, "show" | "hide">;
  options?: ModalOptions;
  visible: boolean;
  hide: () => void;
}

export const Root: React.FC<RootProps> = ({
  selector,
  options,
  visible,
  hide,
}) => {
  if (!visible) {
    return null;
  }

  return <Modal selector={selector} options={options} hide={hide} />;
};
