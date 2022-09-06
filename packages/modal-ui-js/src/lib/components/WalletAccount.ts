import { ModuleState, Wallet } from "@near-wallet-selector/core";

export async function renderWalletAccount(
  module: ModuleState<Wallet> | null = null
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header">
        <div><span class="connected-flag">Connected</span></div>
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
          <div class="icon"><img src="${module?.metadata.iconUrl}" alt="${module?.metadata.name}"></div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="wallet-connected-success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#51BD7C"></rect><path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Connection Successful</span></div>
        </div>
      </div>
    </div>
  `;
}
