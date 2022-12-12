import React from "react";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type {
  WalletSelectorModal,
  ModalOptions,
  ImportModalOptions,
} from "./modal.types";
import { Modal } from "./components/Modal";
import { ImportModal } from "./components/ImportModal";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;
let importModalInstance: WalletSelectorModal | null = null;

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  if (!document.getElementById(MODAL_ELEMENT_ID)) {
    document.body.appendChild(el);
  }

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

export const setupImportModal = (
  selector: WalletSelector,
  options: ImportModalOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  if (!document.getElementById(MODAL_ELEMENT_ID)) {
    document.body.appendChild(el);
  }

  const container = document.getElementById(MODAL_ELEMENT_ID);
  const root = createRoot(container!);

  const render = (visible = false) => {
    root.render(
      <ImportModal
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
      />
    );
  };

  render();

  if (!importModalInstance) {
    importModalInstance = {
      show: () => {
        render(true);
      },
      hide: () => {
        render(false);
      },
    };
  }

  return importModalInstance;
};
