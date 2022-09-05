import {
  HardwareWallet,
  HardwareWalletAccount,
  ModuleState,
  Wallet,
} from "@near-wallet-selector/core";
import { renderConnectHardwareWallet } from "./components/ConnectHardwareWallet";
import { renderLedgerAccountsOverviewList } from "./components/LedgerAccountsOverviewList";
import { renderLedgerSelectAccount } from "./components/LedgerSelectAccount";
import { renderNoLedgerAccountsFound } from "./components/NoLedgerAccountsFound";
import { renderWalletConnecting } from "./components/WalletConnecting";
import { renderWalletConnectionFailed } from "./components/WalletConnectionFailed";
import { renderWalletNotInstalled } from "./components/WalletNotInstalled";
import { modalState } from "./modal";

export type HardwareWalletAccountState = HardwareWalletAccount & {
  selected: boolean;
};

const getAccountIds = async (publicKey: string): Promise<Array<string>> => {
  if (!modalState) {
    return [];
  }

  const response = await fetch(
    `${modalState.selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`
  );

  if (!response.ok) {
    throw new Error("Failed to get account id from public key");
  }

  const accountIds = await response.json();

  if (!Array.isArray(accountIds) || !accountIds.length) {
    return [];
  }

  return accountIds;
};

export const resolveAccounts = async (
  wallet: Wallet
): Promise<Array<HardwareWalletAccountState> | null> => {
  if (!modalState) {
    return [];
  }

  const publicKey = await (wallet as HardwareWallet).getPublicKey(
    modalState.derivationPath
  );
  try {
    const accountIds = await getAccountIds(publicKey);

    return accountIds.map((accountId, index) => {
      return {
        derivationPath: modalState!.derivationPath,
        publicKey,
        accountId,
        selected: index === 0,
      };
    });
  } catch (e) {
    return null;
  }
};

export async function connectToWallet(module: ModuleState<Wallet>) {
  if (!modalState) {
    return;
  }

  try {
    if (module.type === "injected" && !module.metadata.available) {
      return renderWalletNotInstalled(module);
    }

    if (module.metadata.deprecated) {
      return renderWalletConnectionFailed(
        module,
        new Error("Wallet is deprecated")
      );
    }

    const wallet = await module.wallet();

    await renderWalletConnecting(module);

    if (wallet.type === "hardware") {
      const accounts = await resolveAccounts(wallet);

      if (!accounts || accounts.length < 1) {
        return renderNoLedgerAccountsFound(module);
      }

      if (accounts.length === 1) {
        return renderLedgerAccountsOverviewList(module, accounts, accounts);
      } else {
        return renderLedgerSelectAccount(module, accounts);
      }
    }

    await wallet.signIn({
      contractId: modalState.options.contractId,
      methodNames: modalState.options.methodNames,
    });

    modalState.container.children[0].classList.remove("open");
  } catch (err) {
    await renderWalletConnectionFailed(module, err as Error);
  }
}

export function renderModal() {
  if (!modalState) {
    return;
  }

  modalState.container.innerHTML = `
    <div class="nws-modal-wrapper ${
      modalState.options.theme === "dark" ? "dark-theme" : ""
    }">
      <div class="nws-modal-overlay"></div>
      <div class="nws-modal">
        <div class="modal-left">
          <div class="nws-modal-header">
            <h2>Connect Your Wallet</h2>
          </div>
          <div class="nws-modal-body">
            <div class="wallet-options-wrapper">
              <ul class="options-list"></ul>
            </div>
          </div>
        </div>
        <div class="modal-right"></div>
      </div>
    </div>
  `;

  for (let i = 0; i < modalState.modules.length; i++) {
    const module = modalState.modules[i];
    const { name, description, iconUrl } = module.metadata;
    document.querySelector(".options-list")?.insertAdjacentHTML(
      "beforeend",
      `
        <div class="single-wallet ${
          module.id === modalState.selector.store.getState().selectedWalletId
            ? "selected-wallet connected-wallet"
            : ""
        } sidebar ${
        module.metadata.deprecated ? "deprecated-wallet" : ""
      }" id="module-${module.id}">
          <div class="icon"><img src="${iconUrl}" alt="${name}"></div>
          <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
          </div>
          ${
            module.metadata.deprecated
              ? `
              <div class="warning-triangle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.95215 16.3536L10.2152 5.85657C10.9531 4.38481 13.0538 4.38519 13.7912 5.85723L19.0494 16.3543C19.7156 17.6841 18.7486 19.25 17.2612 19.25H6.74001C5.25228 19.25 4.28535 17.6835 4.95215 16.3536Z" stroke="#E6B73E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 10V12" stroke="#E6B73E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16Z" stroke="#E6B73E"></path></svg>
              </div>
                `
              : ""
          }
        </div>
      `
    );

    document
      .getElementById("module-" + module.id)
      ?.addEventListener("click", () => {
        document.querySelectorAll(".selected-wallet").forEach((element) => {
          element.classList.remove("selected-wallet");
        });

        document
          .getElementById("module-" + module.id)
          ?.classList.add("selected-wallet");

        if (module.type === "hardware") {
          return renderConnectHardwareWallet(module);
        }
        connectToWallet(module);
      });
  }

  document
    .querySelector(".nws-modal-overlay")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }
      modalState.container.children[0].classList.remove("open");
    });

  document.addEventListener("click", (e) => {
    if (!modalState) {
      return;
    }

    const target = e.target as HTMLElement;

    if (target && target.className === "close-button") {
      modalState.container.children[0].classList.remove("open");
    }
  });
}
