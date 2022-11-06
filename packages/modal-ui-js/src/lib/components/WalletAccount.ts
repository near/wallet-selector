import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";

export async function renderWalletAccount(
  module: ModuleState<Wallet> | null = null
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
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon">
            <div class="green-dot"></div>
            <img src="${module?.metadata.iconUrl}" alt="${
    module?.metadata.name
  }">
          </div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="wallet-connected-success">
                    <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8333 9.2333V9.99997C18.8323 11.797 18.2504 13.5455 17.1744 14.9848C16.0984 16.4241 14.586 17.477 12.8628 17.9866C11.1395 18.4961 9.29768 18.4349 7.61202 17.8121C5.92636 17.1894 4.48717 16.0384 3.50909 14.5309C2.53101 13.0233 2.06645 11.24 2.18469 9.4469C2.30293 7.65377 2.99763 5.94691 4.16519 4.58086C5.33275 3.21482 6.91061 2.26279 8.66345 1.86676C10.4163 1.47073 12.2502 1.65192 13.8916 2.3833"
              stroke="#4FD98F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.8333 3.33337L10.5 11.675L8 9.17504"
              stroke="#4FD98F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
            <span>
              ${translate("modal.wallet.connectionSuccessful")}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}
