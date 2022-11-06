import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { connectToWallet } from "../render-modal";
import { translate } from "@near-wallet-selector/core";

export async function renderWalletConnectionFailed(
  module: ModuleState<Wallet>,
  err: Error
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
          </svg>
        </button>
      </div>
      <div class="alert-message connecting-wrapper connecting-wrapper-err">
        <div class="content">
          <div class="icon"><img src="${module.metadata.iconUrl}" alt="${
    module.metadata.name
  }"></div>
          <h3 class="connecting-name">${module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="connection">
              <div class="error-wrapper">
                <div class="error">
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5001 18.3333C15.1025 18.3333 18.8334 14.6023 18.8334 9.99996C18.8334 5.39759 15.1025 1.66663 10.5001 1.66663C5.89771 1.66663 2.16675 5.39759 2.16675 9.99996C2.16675 14.6023 5.89771 18.3333 10.5001 18.3333Z"
                        stroke="#CE5A6F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13 7.5L8 12.5"
                        stroke="#CE5A6F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 7.5L13 12.5"
                        stroke="#CE5A6F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ${translate("modal.wallet.connectionFailed")}
                </div>
                  <p>${err && err.message ? err.message : ""}</p>
                  ${
                    !module?.metadata.deprecated && module?.metadata.available
                      ? `<button id='retry-button'>${translate(
                          "modal.ledger.retry"
                        )}</button>`
                      : ""
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("retry-button")?.addEventListener("click", () => {
    connectToWallet(module, false);
  });
}
