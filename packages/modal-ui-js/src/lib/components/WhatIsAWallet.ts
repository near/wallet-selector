import { renderGetAWallet } from "./GetAWallet";

export async function renderWhatIsAWallet() {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="modal-header">
      <h3 class="middleTitle">What is a Wallet?</h3>
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
          <div class="wallet-what">
            <div class="icon-side"><img
                src="data:image/jpeg;base64,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"
                alt="icon"></div>
            <div class="content-side">
              <h3>Secure &amp; Manage Your Digital Assets</h3>
              <p>Safely store and transfer your crypto and NFTs.</p>
            </div>
          </div>
          <div class="wallet-what">
            <div class="icon-side"><img
                src="data:image/jpeg;base64,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"
                alt="icon"></div>
            <div class="content-side">
              <h3>Log In to Any NEAR App</h3>
              <p>No need to create new accounts or credentials. Connect your wallet and you are good to go!</p>
            </div>
          </div><button class="middleButton" id="get-a-wallet-button">Get a Wallet</button>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("get-a-wallet-button")
    ?.addEventListener("click", () => {
      renderGetAWallet();
    });
}
