import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ModalOptions } from "./modal.types";
import { Modal } from "./components/Modal";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;
let root: Root | null = null;

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  if (root) {
    root.unmount();
  } else {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);
  }

  const container = document.getElementById(MODAL_ELEMENT_ID);
  root = createRoot(container!);

  const render = (visible = false) => {
    root!.render(
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
