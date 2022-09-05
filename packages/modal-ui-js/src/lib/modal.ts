import type {
  ModuleState,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import { renderModal } from "./render-modal";
import type {
  WalletSelectorModal,
  ModalOptions,
  ModalRoute,
} from "./modal.types";
import { renderWhatIsAWallet } from "./components/WhatIsAWallet";
import { renderWalletAccount } from "./components/WalletAccount";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
export const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

let modalInstance: WalletSelectorModal | null = null;

type ModalState = {
  container: HTMLElement;
  selector: WalletSelector;
  options: ModalOptions;
  route: ModalRoute;
  modules: Array<ModuleState<Wallet>>;
  derivationPath: string;
};

export let modalState: ModalState | null = null;

export function updateModalState(newModalState: ModalState) {
  modalState = newModalState;
}

if (typeof window !== "undefined") {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  document.body.appendChild(el);
}

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  modalState = {
    container: document.getElementById(MODAL_ELEMENT_ID)!,
    selector,
    options,
    route: {
      name: "WalletOptions",
    },
    modules: [],
    derivationPath: DEFAULT_DERIVATION_PATH,
  };

  modalState.selector.store.observable.subscribe((state) => {
    if (!modalState) {
      return;
    }

    state.modules.sort((current, next) => {
      if (current.metadata.deprecated === next.metadata.deprecated) {
        return 0;
      }

      return current.metadata.deprecated ? 1 : -1;
    });

    modalState.modules = state.modules;
  });

  const close = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (!modalState) {
        return;
      }

      modalState.container.children[0].classList.remove("open");
    }
  };
  window.addEventListener("keydown", close);

  renderModal();

  if (!modalInstance) {
    modalInstance = {
      show: () => {
        if (!modalState) {
          return;
        }
        renderModal();
        const selectedWalletId =
          modalState.selector.store.getState().selectedWalletId;
        if (selectedWalletId) {
          const module = modalState.modules.find(
            (m) => m.id === selectedWalletId
          );
          renderWalletAccount(module);
        } else {
          renderWhatIsAWallet();
        }
        modalState.container.children[0].classList.add("open");
      },
      hide: () => {
        if (!modalState) {
          return;
        }
        modalState.container.children[0].classList.remove("open");
      },
    };
  }

  return modalInstance;
};
