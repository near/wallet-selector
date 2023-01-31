import React from "react";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ExportSelectorOptions } from "./index.types";

import { ExportSelector } from "./components/ExportSelector";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let importModalInstance: WalletSelectorModal | null = null;

export const setupExportSelectorModal = (
  selector: WalletSelector,
  options: ExportSelectorOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  if (!document.getElementById(MODAL_ELEMENT_ID)) {
    document.body.appendChild(el);
  }

  const container = document.getElementById(MODAL_ELEMENT_ID);
  const root = createRoot(container!);

  const render = (visible: boolean) => {
    root.render(
      <ExportSelector
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
      />
    );
  };

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

export { decryptAccountData } from "./helpers";
