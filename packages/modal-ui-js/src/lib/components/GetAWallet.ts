import { renderWhatIsAWallet } from "./WhatIsAWallet";

export async function renderGetAWallet() {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="modal-header">
      <button class="back-button" id="back-button">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg>
      </button>
      <h3 class="middleTitle">Get a Wallet</h3>
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
    <div class="modal-body">
      <div>
        <div>
          <div class="single-wallet" data-id="my-near-wallet">
            <div class="icon"><img src="./assets/my-near-wallet-icon.png" alt="MyNearWallet"></div>
            <div class="content">
              <div class="title">MyNearWallet</div>
              <div class="description"></div>
            </div>
            <div class="button-get"><button class="get-wallet">Get</button></div>
          </div>
          <div class="single-wallet" data-id="sender">
            <div class="icon"><img src="./assets/sender-icon.png" alt="Sender"></div>
            <div class="content">
              <div class="title">Sender</div>
              <div class="description"></div>
            </div>
            <div class="button-get"><button class="get-wallet">Get</button></div>
          </div>
          <div class="single-wallet" data-id="nightly">
            <div class="icon"><img src="./assets/nightly.png" alt="Nightly"></div>
            <div class="content">
              <div class="title">Nightly</div>
              <div class="description"></div>
            </div>
            <div class="button-get"><button class="get-wallet">Get</button></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderWhatIsAWallet();
  });
}
