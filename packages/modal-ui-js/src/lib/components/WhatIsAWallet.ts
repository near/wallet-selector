import { renderGetAWallet } from "./GetAWallet";
import { translate } from "@near-wallet-selector/core";

export async function renderWhatIsAWallet() {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
          <div class="nws-modal-header">
            <h3 class="middleTitle">${translate("wallet.What is a Wallet")}</h3>
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
              <h3>${translate("wallet.Secure & Manage")}</h3>
              <p>${translate("wallet.Safely store")}</p>
            </div>
          </div>

          <div class="wallet-what">
            <div class="content-side">
              <h3>${translate("wallet.Log In to Any")}</h3>
              <p>${translate("wallet.No need to create")}</p>
            </div>
          </div>

            <div class="button-spacing"></div>
              <button class="middleButton" id="get-a-wallet-button">
                ${translate("wallet.Get a Wallet")}
              </button>
        </div>

        <div class="what-wallet-mobile">
          <p>
            ${translate("wallet.Use a wallet")}
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">
            ${translate("wallet.Get a Wallet")}
          </button>
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
}
