import { ModuleState, Wallet } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { resolveAccounts } from "../render-modal";
import { renderConnectHardwareWallet } from "./ConnectHardwareWallet";
import { renderLedgerAccountsOverviewList } from "./LedgerAccountsOverviewList";
import { renderLedgerSelectAccount } from "./LedgerSelectAccount";
import { renderNoLedgerAccountsFound } from "./NoLedgerAccountsFound";
import { renderWalletConnecting } from "./WalletConnecting";
import { renderWalletConnectionFailed } from "./WalletConnectionFailed";

export function renderSpecifyDerivationPath(module: ModuleState<Wallet>) {
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
          <h3 class="middleTitle">Specify HD Path</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="specify-path-wrapper">
          <div class="change-path-wrapper">
            <div class="display-path"><span>44'/397'/0'/0'/</span></div>
            <div class="change-path">
              <div class="path-value"><span id="derivation-path-index"></span></div>
              <div class="buttons-wrapper">
                <button id="increase-index-button">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5.4762L5 1.4762L1 5.4762" stroke="#4F7CD1" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>
                </button>
                <button id="decrease-index-button">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.52382L5 5.52382L9 1.52382" stroke="#4F7CD1" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p class="path-description">Enter your preferred HD path, then scan for any active accounts.</p>
          <div class="action-buttons"><button class="middleButton" id="scan-button">Scan</button></div>
        </div>
      </div>
    </div>
  `;

  const derivationPathIndexElement = document.getElementById(
    "derivation-path-index"
  )!;

  derivationPathIndexElement.innerText = modalState.derivationPath.slice(
    -2,
    -1
  );

  document
    .getElementById("increase-index-button")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }

      const nextIndex = parseInt(derivationPathIndexElement!.innerText) + 1;
      modalState.derivationPath =
        modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
      derivationPathIndexElement.innerText = nextIndex.toString();
    });

  document
    .getElementById("decrease-index-button")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }

      const nextIndex = parseInt(derivationPathIndexElement!.innerText) - 1;
      modalState.derivationPath =
        modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
      if (nextIndex >= 0) {
        derivationPathIndexElement.innerText = nextIndex.toString();
      }
    });

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderConnectHardwareWallet(module);
  });

  document
    .getElementById("scan-button")
    ?.addEventListener("click", async () => {
      try {
        const wallet = await module.wallet();
        renderWalletConnecting(module);
        const accounts = await resolveAccounts(wallet);

        if (!accounts || accounts.length < 1) {
          return renderNoLedgerAccountsFound(module);
        }

        if (accounts.length === 1) {
          renderLedgerAccountsOverviewList(module, accounts, accounts);
        }

        renderLedgerSelectAccount(module, accounts);
      } catch (err) {
        await renderWalletConnectionFailed(module, err as Error);
      }
    });
}
