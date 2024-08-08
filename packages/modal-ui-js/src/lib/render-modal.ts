import type {
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
import { renderWalletAccount } from "./components/WalletAccount";
import { renderScanQRCode } from "./components/ScanQRCode";
import { translate } from "@near-wallet-selector/core";
import { WarningIcon } from "./components/icons/WarningIcon";

export type HardwareWalletAccountState = HardwareWalletAccount & {
  selected: boolean;
};
let initialRender = true;

let isChecked = false;

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

export async function connectToWallet(
  module: ModuleState<Wallet>,
  qrCodeModal = false
) {
  if (!modalState) {
    return;
  }

  const { selectedWalletId } = modalState.selector.store.getState();

  if (selectedWalletId === module.id) {
    renderWalletAccount(module);
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

    if (wallet.type === "bridge") {
      const subscription = modalState.selector.on("uriChanged", ({ uri }) => {
        renderScanQRCode(module, {
          uri,
          handleOpenDefaultModal: () => {
            connectToWallet(module, true);
          },
        });
      });

      await wallet.signIn({
        contractId: modalState.options.contractId,
        methodNames: modalState.options.methodNames,
        qrCodeModal,
      });

      subscription.remove();
      modalState.container.children[0].classList.remove("open");
      modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
      return;
    }

    if (wallet.type === "browser") {
      await wallet.signIn({
        contractId: modalState.options.contractId,
        methodNames: modalState.options.methodNames,
        successUrl: wallet.metadata.successUrl,
        failureUrl: wallet.metadata.failureUrl,
      });

      modalState.container.children[0].classList.remove("open");
      modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });

      return;
    }

    await wallet.signIn({
      contractId: modalState.options.contractId,
      methodNames: modalState.options.methodNames,
    });

    modalState.container.children[0].classList.remove("open");
    modalState.emitter.emit("onHide", { hideReason: "wallet-navigation" });
  } catch (err) {
    const { name } = module.metadata;
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Something went wrong";

    await renderWalletConnectionFailed(
      module,
      new Error(`Failed to sign in with ${name}: ${message}`)
    );
  }
}

function renderOptionsList(
  parentClass: string,
  modules: Array<ModuleState<Wallet>>
) {
  if (!modalState) {
    return;
  }

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    if (
      modules[i].type === "instant-link" &&
      modalState.selector.store.getState().selectedWalletId !== module.id
    ) {
      continue;
    }

    const { name, description, iconUrl } = module.metadata;
    document.querySelector(parentClass)?.insertAdjacentHTML(
      "beforeend",
      `
        <div tabindex="0" class="single-wallet ${
          module.id === modalState.selector.store.getState().selectedWalletId
            ? "selected-wallet connected-wallet"
            : ""
        } sidebar ${module.metadata.deprecated ? "deprecated-wallet" : ""} ${
        module.id
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
                ${WarningIcon}
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
        connectToWallet(module, false);
      });
  }
}
const renderWalletOptions = () => {
  if (!modalState) {
    return;
  }

  const moreWallets: Array<ModuleState<Wallet>> = [];
  const recentlySignedInWallets: Array<ModuleState<Wallet>> = [];

  modalState.modules.forEach((module) => {
    if (
      modalState?.selector.store
        .getState()
        .recentlySignedInWallets.includes(module.id)
    ) {
      recentlySignedInWallets.push(module);
    } else {
      moreWallets.push(module);
    }
  });

  const optionsWrapper = document.querySelector(".wallet-options-wrapper");
  if (optionsWrapper) {
    optionsWrapper.innerHTML = "";
  }

  if (
    modalState.selector.options.optimizeWalletOrder &&
    recentlySignedInWallets.length > 0
  ) {
    optionsWrapper?.insertAdjacentHTML(
      "beforeend",
      `
      <div class="options-list-section-recent">
        <div class="options-list-section-header">Recent</div>
        <div class="options-list recent-options-list-content"></div>
      </div>
      `
    );
    optionsWrapper?.insertAdjacentHTML(
      "beforeend",
      `
      <div class="options-list-section-more">
        <div class="options-list-section-header">More</div>
        <div class="options-list more-options-list-content"></div>
      </div>
      `
    );
    renderOptionsList(".recent-options-list-content", recentlySignedInWallets);

    if (modalState.selector.options.randomizeWalletOrder) {
      renderOptionsList(
        ".more-options-list-content",
        moreWallets.sort(() => Math.random() - 0.5)
      );
    } else {
      renderOptionsList(".more-options-list-content", moreWallets);
    }
  } else {
    optionsWrapper?.insertAdjacentHTML(
      "beforeend",
      `<div class="options-list"></div>`
    );
    renderOptionsList(".options-list", modalState.modules);
  }
};

const handleSwitchChange = () => {
  if (!modalState) {
    return;
  }

  isChecked = !isChecked;
  modalState.selector.setRememberRecentWallets();

  renderWalletOptions();
};

export function renderModal() {
  if (!modalState) {
    return;
  }

  const { rememberRecentWallets, selectedWalletId } =
    modalState.selector.store.getState();
  isChecked = rememberRecentWallets === "enabled";

  modalState.container.innerHTML = `
    <div class="nws-modal-wrapper ${
      modalState.options.theme === "dark" ? "dark-theme" : ""
    }">
      <div class="nws-modal-overlay"></div>
      <div class="nws-modal">
        <div class="modal-left">
          <div class="modal-left-title">
            <h2>${translate("modal.wallet.connectYourWallet")}</h2>
            <span class="nws-remember-wallet">
              ${translate("modal.wallet.rememberWallet")}
            </span>
            <label class="nws-switch">
              <input type="checkbox" ${
                isChecked ? "checked" : ""
              } id="rememberWalletSwitch" />
              <span class="nws-slider round" />
            </label>
          </div>
          <div class="nws-modal-body">
            <div class="wallet-options-wrapper"></div>
          </div>
        </div>
        <div class="modal-right"></div>
      </div>
    </div>
  `;

  document
    .getElementById("rememberWalletSwitch")
    ?.addEventListener("change", handleSwitchChange);

  const moreWallets: Array<ModuleState<Wallet>> = [];
  const recentlySignedInWallets: Array<ModuleState<Wallet>> = [];

  modalState.modules.forEach((module) => {
    if (
      modalState?.selector.store
        .getState()
        .recentlySignedInWallets.includes(module.id)
    ) {
      recentlySignedInWallets.push(module);
    } else {
      moreWallets.push(module);
    }
  });

  if (
    modalState.selector.options.optimizeWalletOrder &&
    recentlySignedInWallets.length > 0
  ) {
    document.querySelector(".wallet-options-wrapper")?.insertAdjacentHTML(
      "beforeend",
      `
      <div class="options-list-section-recent">
        <div class="options-list-section-header">Recent</div>
        <div class="options-list recent-options-list-content"></div>
      </div>
      `
    );
    document.querySelector(".wallet-options-wrapper")?.insertAdjacentHTML(
      "beforeend",
      `
      <div class="options-list-section-more">
        <div class="options-list-section-header">More</div>
        <div class="options-list more-options-list-content"></div>
      </div>
      `
    );
    renderOptionsList(".recent-options-list-content", recentlySignedInWallets);

    if (modalState.selector.options.randomizeWalletOrder) {
      renderOptionsList(
        ".more-options-list-content",
        moreWallets.sort(() => Math.random() - 0.5)
      );
    } else {
      renderOptionsList(".more-options-list-content", moreWallets);
    }

    if (!selectedWalletId && recentlySignedInWallets.length > 0) {
      const firstWallet = recentlySignedInWallets[0];
      document
        .querySelector(`#module-${firstWallet.id}`)
        ?.classList.add("selected-wallet");
    }
  } else {
    document
      .querySelector(".wallet-options-wrapper")
      ?.insertAdjacentHTML("beforeend", `<div class="options-list"></div>`);
    renderOptionsList(".options-list", modalState.modules);
  }

  document
    .querySelector(".nws-modal-overlay")
    ?.addEventListener("click", () => {
      if (!modalState) {
        return;
      }
      modalState.container.children[0].classList.remove("open");

      modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
    });

  // TODO: Better handle `click` event listener for close-button.
  if (initialRender) {
    document.addEventListener("click", (e) => {
      if (!modalState) {
        return;
      }

      const target = e.target as HTMLElement;

      if (target && target.className === "close-button") {
        modalState.container.children[0].classList.remove("open");

        modalState.emitter.emit("onHide", { hideReason: "user-triggered" });
      }
    });
    initialRender = false;
  }
}
