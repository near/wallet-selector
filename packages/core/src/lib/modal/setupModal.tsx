import React from "react";
import ReactDOM from "react-dom";

import { WalletSelector } from "../WalletSelector.types";
import { ModalOptions } from "./setupModal.types";
import { Modal } from "./Modal";
import { WalletSelectorState, WalletSelectorStore } from "../store.types";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

export const setupModal = (
  selector: WalletSelector,
  store: WalletSelectorStore<WalletSelectorState>,
  options: ModalOptions = {}
) => {
  const el = document.createElement("div");

  el.id = MODAL_ELEMENT_ID;
  document.body.appendChild(el);

  ReactDOM.render(
    <Modal selector={selector} store={store} options={options} />,
    document.getElementById(MODAL_ELEMENT_ID)
  );
};
