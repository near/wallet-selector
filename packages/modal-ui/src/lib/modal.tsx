import React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { WalletSelector } from "@near-wallet-selector/core";

import type { WalletSelectorModal, ModalOptions } from "./modal.types";
import { Modal } from "./components/Modal";
import { EventEmitter } from "@near-wallet-selector/core";
import type { ModalEvents } from "./modal.types";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;
let root: Root | null = null;

/**
 * Initiates a modal instance
 * @param {WalletSelector} selector Selector
 * @param {ModalOptions} options Modal options
 * @returns {WalletSelectorModal} Returns a WalletSelectorModal object
 */
export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  if (!root) {
    const body = document.body;
    const container = document.createElement("div");
    container.id = MODAL_ELEMENT_ID;
    body.appendChild(container);

    root = createRoot(container);
  }

  const emitter = new EventEmitter<ModalEvents>();

  selector.store.getState().modules.forEach(async (module) => {
    if ("topLevelInjected" in module.metadata) {
      if (!module.metadata.topLevelInjected) {
        return;
      }

      const wallet = await module.wallet();
      if (wallet.type !== "injected") {
        return;
      }

      await wallet.signIn({
        contractId: options.contractId,
        methodNames: options.methodNames,
      });
    }
  });

  const render = (visible = false) => {
    root!.render(
      <Modal
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
        emitter={emitter}
      />
    );
  };

  if (!modalInstance) {
    modalInstance = {
      show: () => {
        render(true);
      },
      hide: () => {
        render(false);
      },
      on: (eventName, callback) => {
        return emitter.on(eventName, callback);
      },
      off: (eventName, callback) => {
        emitter.off(eventName, callback);
      },
    };
  }

  return modalInstance;
};
