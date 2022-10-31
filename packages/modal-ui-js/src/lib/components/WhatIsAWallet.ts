import { renderGetAWallet } from "./GetAWallet";
import { modalState } from "../modal";
import { renderSignInToCreateWallet } from "./SignInToCreateWallet";
import { translate } from "@near-wallet-selector/core";

export async function renderWhatIsAWallet() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
          <div class="nws-modal-header">
            <h3 class="middleTitle">${translate(
              "modal.wallet.whatIsAWallet"
            )}</h3>
            <button class="close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div class="wallet-info-wrapper  what-wallet-hide">
          <div class="wallet-what">
            <div class="content-side">
              <h3>${translate("modal.wallet.secureAndManage")}</h3>
              <p>${translate("modal.wallet.safelyStore")}</p>
            </div>
          </div>

          <div class="wallet-what">
            <div class="content-side">
              <h3>${translate("modal.wallet.logInToAny")}</h3>
              <p>${translate("modal.wallet.noNeedToCreate")}</p>
            </div>
          </div>

          <div class="button-spacing"></div>

          <button class="middleButton" id="get-a-wallet-button">
            ${translate("modal.wallet.getAWallet")}
          </button>

          <div class="web3auth-info-action" id="web3auth-info-action">
            <span>${translate("modal.wallet.loginWithSocial")}</span>
            <img
              src="data:image/svg+xml,%3csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1419_5840)'%3e%3cpath d='M7 12.8333C10.2217 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2217 1.16666 7 1.16666C3.77834 1.16666 1.16667 3.77834 1.16667 7C1.16667 10.2217 3.77834 12.8333 7 12.8333Z' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M7 4.66666V9.33333' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M4.66667 7H9.33334' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1419_5840'%3e%3crect width='14' height='14' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
              alt="plus in circle">
          </div>
        </div>

        <div class="web3auth" id="web3auth"></div>

        <div class="what-wallet-mobile">
          <p>
            ${translate("modal.wallet.useAWallet")}
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">
            ${translate("modal.wallet.getAWallet")}
          </button>
          <div class="web3auth-info-action" id="web3auth-info-action">
            <span>Login with Social</span>
            <img
              src="data:image/svg+xml,%3csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1419_5840)'%3e%3cpath d='M7 12.8333C10.2217 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2217 1.16666 7 1.16666C3.77834 1.16666 1.16667 3.77834 1.16667 7C1.16667 10.2217 3.77834 12.8333 7 12.8333Z' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M7 4.66666V9.33333' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M4.66667 7H9.33334' stroke='%23C1C1C1' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1419_5840'%3e%3crect width='14' height='14' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
              alt="plus in circle">
          </div>
        </div>

      </div>
    </div>
  `;

  document
    .getElementById("get-a-wallet-button")
    ?.addEventListener("click", () => {
      renderGetAWallet();
    });

  document
    .getElementById("get-a-wallet-button-mobile")
    ?.addEventListener("click", () => {
      renderGetAWallet();
    });

  document
    .getElementById("web3auth-info-action")
    ?.addEventListener("click", () => {
      renderSignInToCreateWallet();
    });
}
