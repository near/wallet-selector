import { modalState } from "../modal";
import { rendeAlertMessage } from "./AlertMessage";
import { renderConnectHardwareWallet } from "./ConnectHardwareWallet";
import { renderWalletConnecting } from "./WalletConnecting";
import { renderWalletNotInstalled } from "./WalletNotInstalled";

export function renderWalletOptions() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-body")!.innerHTML = `
    <div class="wallet-options-wrapper">
        <p class="description">
          ${
            modalState.options.description ||
            "Please select a wallet to sign in to this dApp:"
          }
        </p>
        <ul class="options-list">

        </ul>
      </div>
      <div class="info">
        <span id="info-button">
          What is a Wallet?
        </span>
        <div class="info-description">
          <p>
            Wallets are used to send, receive and store digital assets. There
            are different types of wallets. They can be an extension added to
            your browser, a hardware device plugged into your computer,
            web-based or an app on your mobile device.
          </p>
        </div>
      </div>
  `;

  document.getElementById("info-button")?.addEventListener("click", () => {
    const infoDescriptionElement = document.querySelector(".info-description");
    if (!infoDescriptionElement) {
      return;
    }

    if (infoDescriptionElement.classList.contains("show-explanation")) {
      infoDescriptionElement.classList.remove("show-explanation");
    } else {
      infoDescriptionElement.classList.add("show-explanation");
    }
  });

  for (let i = 0; i < modalState.modules.length; i++) {
    const module = modalState.modules[i];
    const { selectedWalletId } = modalState.selector.store.getState();
    const { name, description, iconUrl, deprecated, available } =
      module.metadata;
    const selected = module.id === selectedWalletId;
    document.querySelector(".options-list")?.insertAdjacentHTML(
      "beforeend",
      `
      <li
          id="module-${module.id}"
          class=${
            (selected ? "selected-wallet" : "") +
            (deprecated ? " deprecated-wallet" : "")
          }
        >
          <div title=${description || "''"} class="wallet-content">
            <div class="wallet-img-box">
              <img src=${iconUrl} alt=${name} />
            </div>
            <div>
              <span>${name}</span>
            </div>
            ${
              selected
                ? `<div class="selected-wallet-text">
                    <span>selected</span>
                  </div>`
                : ""
            }
          </div>
        </li>
      `
    );

    document
      .getElementById("module-" + module.id)
      ?.addEventListener("click", async () => {
        if (!modalState) {
          return;
        }

        try {
          if (module.type === "injected" && !available) {
            return renderWalletNotInstalled(module);
          }

          if (deprecated) {
            return rendeAlertMessage(
              new Error(
                `${module.metadata.name} is deprecated. Please select another wallet.`
              )
            );
          }

          const wallet = await module.wallet();
          renderWalletConnecting(wallet);

          if (wallet.type === "hardware") {
            return renderConnectHardwareWallet();
          }

          await wallet.signIn({
            contractId: modalState.options.contractId,
            methodNames: modalState.options.methodNames,
          });

          renderWalletConnecting();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";

          rendeAlertMessage(
            new Error(`Failed to sign in with ${name}: ${message}`)
          );
        }
      });
  }
}
