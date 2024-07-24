import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ExportSelectorOptions } from "./index.types";
import { ExportSelector } from "./components/ExportSelector";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let importModalInstance: WalletSelectorModal | null = null;
let root: Root | null = null;

export const setupExportSelectorModal = (
  selector: WalletSelector,
  options: ExportSelectorOptions
): WalletSelectorModal => {
  if (!root) {
    const body = document.body;
    const container = document.createElement("div");
    container.id = MODAL_ELEMENT_ID;
    body.appendChild(container);

    root = createRoot(container);
  }

  const render = (visible: boolean) => {
    root!.render(
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
