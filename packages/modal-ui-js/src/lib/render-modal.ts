import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { renderConnectHardwareWallet } from "./components/ConnectHardwareWallet";
import { renderWalletConnecting } from "./components/WalletConnecting";
import { renderWalletConnectionFailed } from "./components/WalletConnectionFailed";
import { renderWalletNotInstalled } from "./components/WalletNotInstalled";
import { modalState } from "./modal";

export async function connectToWallet(module: ModuleState<Wallet>) {
  if (!modalState) {
    return;
  }

  document.querySelectorAll(".selected-wallet").forEach((element) => {
    element.classList.remove("selected-wallet");
  });

  document
    .getElementById("module-" + module.id)
    ?.classList.add("selected-wallet");

  try {
    if (module.type === "injected" && !module.metadata.available) {
      return renderWalletNotInstalled(module);
    }

    if (module.metadata.deprecated) {
      return renderWalletConnectionFailed(module);
    }

    const wallet = await module.wallet();
    await renderWalletConnecting(module);

    if (wallet.type === "hardware") {
      return renderConnectHardwareWallet();
    }

    await wallet.signIn({
      contractId: modalState.options.contractId,
      methodNames: modalState.options.methodNames,
    });

    await renderWalletConnecting();
  } catch (err) {
    await renderWalletConnectionFailed(module);
  }
}

export function renderModal() {
  if (!modalState) {
    return;
  }

  modalState.container.innerHTML = `
    <div class="nws-modal-wrapper">
      <div class="modal-overlay"></div>
      <div class="modal">
        <div class="modal-left">
          <div class="modal-header">
            <h2>Connect Your Wallet</h2>
          </div>
          <div class="modal-body">
            <div class="wallet-options-wrapper">
              <h4 class="description">Popular</h4>
              <ul class="options-list"></ul>
            </div>
            <div class="info">
              <div class="info-description hide-explanation">
                <p>Wallets are used to send, receive and store digital assets. There are different types of wallets. They can
                  be an extension added to your browser, a hardware device plugged into your computer, web-based or an app on
                  your mobile device.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-right"></div>
      </div>
    </div>
  `;

  for (let i = 0; i < modalState.modules.length; i++) {
    const module = modalState.modules[i];
    const { name, description, iconUrl } = module.metadata;
    document.querySelector(".options-list")?.insertAdjacentHTML(
      "beforeend",
      `
        <div class="single-wallet sidebar" id="module-${module.id}">
          <div class="icon"><img src="${iconUrl}" alt="${name}"></div>
          <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
          </div>
        </div>
      `
    );

    document
      .getElementById("module-" + module.id)
      ?.addEventListener("click", () => {
        connectToWallet(module);
      });
  }

  document.addEventListener("click", (e) => {
    if (!modalState) {
      return;
    }

    const target = e.target as HTMLElement;

    if (target && target.className === "close-button") {
      modalState.container.children[0].classList.remove("open");
    }
  });
}
