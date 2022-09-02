import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { HardwareWalletAccountState } from "../render-modal";
import { renderLedgerAccountsOverviewList } from "./LedgerAccountsOverviewList";
import { renderSpecifyDerivationPath } from "./SpecifyDerivationPath";

export async function renderLedgerSelectAccount(
  module: ModuleState<Wallet>,
  accounts: Array<HardwareWalletAccountState>
) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">Select Your Accounts</h3><button class="close-button"><svg
              xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="choose-ledger-account-form-wrapper">
          <p>We found ${
            accounts.length
          } accounts on your device. Select the account(s) you wish to connect.</p>
          <div class="button-wrapper"><button id="change-derivation-path-button">HD.../${modalState.derivationPath.slice(
            -2,
            -1
          )}</button></div>
          <form class="form">
            <div>
              <div class="nws-form-control">
                <div id="accounts"></div>
              <div class="action-buttons"><button class="middleButton" id="connect-button">Connect</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  for (let i = 0; i < accounts.length; i++) {
    document.getElementById("accounts")?.insertAdjacentHTML(
      "beforeend",
      `
      <div class="account">
        <input type="checkbox" id="${
          accounts[i].accountId
        }" name="account" value="${accounts[i].accountId}" ${
        i === 0 ? "checked" : ""
      }>
        <label for="${accounts[i].accountId}"> ${accounts[i].accountId}</label>
        <br>
      </div>
      `
    );
  }

  document
    .getElementById("change-derivation-path-button")
    ?.addEventListener("click", () => {
      renderSpecifyDerivationPath(module);
    });

  document.getElementById("connect-button")?.addEventListener("click", (e) => {
    e.preventDefault();

    const accountCheckStatuses = Array.from(
      document.querySelectorAll("input[name='account']")
    ).map((el) => (el as HTMLInputElement).checked);

    const checkedAccounts = accounts.filter(
      (_account, i) => accountCheckStatuses[i]
    );

    if (checkedAccounts.length < 1) {
      return;
    }

    renderLedgerAccountsOverviewList(module, accounts, checkedAccounts);
  });
}
