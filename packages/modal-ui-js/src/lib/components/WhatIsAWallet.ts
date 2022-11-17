import { renderGetAWallet } from "./GetAWallet";
import { translate } from "@near-wallet-selector/core";

export async function renderWhatIsAWallet() {
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
            <div class="icon-side">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5 1.83325L30.1666 5.16658M17.4818 17.8514C19.1406 19.5103 20.1666 21.8019 20.1666 24.3333C20.1666 29.3959 16.0626 33.4999 11 33.4999C5.93735 33.4999 1.8333 29.3959 1.8333 24.3333C1.8333 19.2706 5.93735 15.1666 11 15.1666C13.5313 15.1666 15.8229 16.1926 17.4818 17.8514ZM17.4818 17.8514L24.3333 10.9999M24.3333 10.9999L29.3333 15.9999L35.1666 10.1666L30.1666 5.16658M24.3333 10.9999L30.1666 5.16658" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="content-side">
              <h3>${translate("modal.wallet.secureAndManage")}</h3>
              <p>${translate("modal.wallet.safelyStore")}</p>
            </div>
          </div>

          <div class="wallet-what">
            <div class="icon-side">
              <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28.3333" cy="23.8333" r="1.66667" fill="currentColor"/>
                <path d="M35 12.1667H7C5.89543 12.1667 5 11.2712 5 10.1667V7.5C5 6.39543 5.89543 5.5 7 5.5H31.6667" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M35 12.1667V35.5H7C5.89543 35.5 5 34.6046 5 33.5V8.83334" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="content-side">
              <h3>${translate("modal.wallet.logInToAny")}</h3>
              <p>${translate("modal.wallet.noNeedToCreate")}</p>
            </div>
          </div>

            <div class="button-spacing"></div>
              <button class="middleButton" id="get-a-wallet-button">
                ${translate("modal.wallet.getAWallet")}
              </button>
        </div>

        <div class="what-wallet-mobile">
          <p>
            ${translate("modal.wallet.useAWallet")}
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">
            ${translate("modal.wallet.getAWallet")}
          </button>
        </div>

        <div class="lang-selector-wrapper">
          <select class="lang-selector" name="lang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
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
