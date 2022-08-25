import { modalState } from "../modal";

export function renderConnectHardwareWallet() {
  if (!modalState) {
    return;
  }

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
      <div class="derivation-path-wrapper">
        <div class="enter-derivation-path">
          <div>
            <p>Make sure your device is plugged in, then enter a derivation path to connect:</p><input type="text"
              placeholder="Derivation Path" value="44'/397'/0'/0'/1'">
          </div>
          <div class="action-buttons"><button class="left-button">Back</button><button class="right-button">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
