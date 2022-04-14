import React from "react";
import { WalletSelector } from "../wallet-selector.types";
import { Store } from "../store.types";
import { ModalOptions } from "./setupModal.types";
import { Modal } from "./Modal";

interface RootProps {
  selector: Omit<WalletSelector, "show" | "hide">;
  // TODO: Remove once UI state is localised to this component.
  store: Store;
  options?: ModalOptions;
  visible: boolean;
  hide: () => void;
}

export const Root: React.FC<RootProps> = ({
  selector,
  store,
  options,
  visible,
  hide,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal selector={selector} store={store} options={options} hide={hide} />
  );
};
