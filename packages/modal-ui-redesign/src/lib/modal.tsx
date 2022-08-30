import React from "react";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ModalOptions } from "./modal.types";
import { Modal } from "./components/Modal";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  document.body.appendChild(el);

  const container = document.getElementById(MODAL_ELEMENT_ID);
  const root = createRoot(container!);

  const render = (visible = false) => {
    root.render(
      <Modal
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
      />
    );
  };

  render();

  if (!modalInstance) {
    modalInstance = {
      show: () => {
        render(true);
      },
      hide: () => {
        render(false);
      },
    };
  }

  return modalInstance;
};
