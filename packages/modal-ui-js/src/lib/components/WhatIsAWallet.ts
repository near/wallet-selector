import { renderGetAWallet } from "./GetAWallet";
import { modalState } from "../modal";

export async function renderWhatIsAWallet() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
          <div class="nws-modal-header">
            <h3 class="middleTitle">What is a Wallet?</h3>
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
              <h3>Secure &amp; Manage Your Digital Assets</h3>
              <p>Safely store and transfer your crypto and NFTs.</p>
            </div>
          </div>

          <div class="wallet-what">
              <div class="content-side">
                  <h3>Log In to Any NEAR App</h3>
                  <p>No need to create new accounts or credentials. Connect your wallet and you are good to go!</p>
              </div>
          </div>

            <div class="button-spacing"></div>
              <button class="middleButton" id="get-a-wallet-button">Get a Wallet</button>
        </div>

        <div class="web3auth" id="web3auth"></div>

        <div class="what-wallet-mobile">
          <p>
            Use a wallet to secure and manage your NEAR assets, and to log in
            to any NEAR app without the need for usernames and passwords.
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">Get a Wallet</button>
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
