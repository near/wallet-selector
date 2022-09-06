import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { connectToWallet } from "../render-modal";

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
      <div class="alert-message connecting-wrapper">
        <div class="content">
          <div class="icon"><img src="${module.metadata.iconUrl}" alt="${
    module.metadata.name
  }"></div>
          <h3 class="connecting-name">${module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="connection">
              <div class="error-wrapper">
                <div class="error"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http:/*www.w3.org/2000/svg">*/ <rect width="24" height="24" rx="12" fill="#CE5A6F"></rect>
                    <path d="M17.25 6.75L6.75 17.25" stroke="#141414" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path d="M6.75 6.75L17.25 17.25" stroke="#141414" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>Connection Failed</div>
                  <p>${err && err.message ? err.message : ""}</p>${
    !module?.metadata.deprecated && module?.metadata.available
      ? "<button id='retry-button'>Retry</button>"
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
    connectToWallet(module);
  });
}
