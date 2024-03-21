import type {
  EventEmitterService,
  ModuleState,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import { renderModal } from "./render-modal";
import type {
  WalletSelectorModal,
  ModalOptions,
  ModalRoute,
  ModalEvents,
} from "./modal.types";
import { renderWhatIsAWallet } from "./components/WhatIsAWallet";
import { renderWalletAccount } from "./components/WalletAccount";
import { allowOnlyLanguage, EventEmitter } from "@near-wallet-selector/core";

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
  emitter: EventEmitterService<ModalEvents>;
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

  modalState = {
    container: document.getElementById(MODAL_ELEMENT_ID)!,
    selector,
    options,
    route: {
      name: "WalletOptions",
    },
    modules: [],
    derivationPath: DEFAULT_DERIVATION_PATH,
    emitter,
  };

  modalState.selector.store.observable.subscribe((state) => {
    if (!modalState) {
      return;
    }

    if (selector.options.optimizeWalletOrder) {
      state.modules.sort((current, next) => {
        if (current.metadata.deprecated === next.metadata.deprecated) {
          return 0;
        }

        return current.metadata.deprecated ? 1 : -1;
      });

      state.modules.sort((current, next) => {
        if (next.metadata.available === current.metadata.available) {
          return 0;
        }

        return next.metadata.available ? 1 : -1;
      });
    }

    modalState.modules = state.modules;
  });

  const close = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (!modalState) {
        return;
      }
      modalState.container.children[0].classList.remove("open");
      modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
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
        allowOnlyLanguage(modalState.selector.options.languageCode);
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
      on: (eventName, callback) => {
        return modalState!.emitter.on(eventName, callback);
      },
      off: (eventName, callback) => {
        modalState!.emitter.off(eventName, callback);
      },
    };
  }

  return modalInstance;
};
