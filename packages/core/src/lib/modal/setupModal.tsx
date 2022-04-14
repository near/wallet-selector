import React from "react";
import ReactDOM from "react-dom";

import { WalletSelector } from "../wallet-selector.types";
import { WalletSelectorModal, ModalOptions } from "./setupModal.types";
import { Root } from "./Root";
import { Store } from "../store.types";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

export const setupModal = (
  // TODO: Remove omit once modal is a separate package.
  selector: Omit<WalletSelector, "show" | "hide">,
  store: Store,
  options?: ModalOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  document.body.appendChild(el);

  const render = (visible = false) => {
    ReactDOM.render(
      <Root
        selector={selector}
        store={store}
        options={options}
        visible={visible}
        hide={() => render(false)}
      />,
      document.getElementById(MODAL_ELEMENT_ID)
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
