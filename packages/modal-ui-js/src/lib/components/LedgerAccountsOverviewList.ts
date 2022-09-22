import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { HardwareWalletAccountState } from "../render-modal";
import { renderLedgerSelectAccount } from "./LedgerSelectAccount";
import { renderWalletConnectionFailed } from "./WalletConnectionFailed";

export async function renderLedgerAccountsOverviewList(
  module: ModuleState<Wallet>,
  accounts: Array<HardwareWalletAccountState>,
  selectedAccounts: Array<HardwareWalletAccountState>
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header-wrapper">
      <button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg>
      </button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">Connecting ${selectedAccounts.length} Account</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="overview-wrapper">
          <p>Overview the list of authorized account(s), complete sign in by clicking the button below.</p>
          <div class="accounts" id="accounts"></div>
          <div class="action-buttons"><button class="middleButton" id="finish-button">Finish</button></div>
        </div>
      </div>
    </div>
  `;

  for (let i = 0; i < selectedAccounts.length; i++) {
    document.getElementById("accounts")?.insertAdjacentHTML(
      "beforeend",
      `
        <div>
          <div class="account">
            <span>${selectedAccounts[i].accountId}</span>
          </div>
        </div>
      `
    );
  }

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderLedgerSelectAccount(module, accounts);
  });

  document
    .getElementById("finish-button")
    ?.addEventListener("click", async () => {
      try {
        if (!modalState) {
          return;
        }

        const wallet = await module.wallet();
        wallet.signIn({
          contractId: modalState.options.contractId,
          methodNames: modalState.options.methodNames,
          accounts: selectedAccounts,
        });

        modalState.container.children[0].classList.remove("open");
      } catch (err) {
        await renderWalletConnectionFailed(module, err as Error);
      }
    });
}
