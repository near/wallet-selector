import { renderGetAWallet } from "./GetAWallet";
import { WalletIcon } from "./icons/WalletIcon";

export async function renderWhatIsAWallet() {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="wallet-info-wrapper">
          <div class="wallet-info-wrapper">
            <div class="info">
              ${WalletIcon}
              <p>
                Wallets let you store digital assets like crypto, and log into
                apps on NEAR.
              </p>
              <p>Please select a wallet on the left, or</p>
              <p class="button" id="get-a-wallet-button">
                Create a new wallet
              </p>
            </div>
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
}
