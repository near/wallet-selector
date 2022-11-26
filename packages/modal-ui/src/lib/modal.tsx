import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ModalOptions } from "./modal.types";
import { Modal } from "./components/Modal";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let rootInstance: Root | null = null;

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  if (!rootInstance) {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);

    const container = document.getElementById(MODAL_ELEMENT_ID);
    rootInstance = createRoot(container!);
  }

  const render = (visible = false) => {
    rootInstance!.render(
      <Modal
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
      />
    );
  };

  render();

  return {
    show: () => {
      render(true);
    },
    hide: () => {
      render(false);
    },
  };
};
