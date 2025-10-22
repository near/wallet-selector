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
import { CloseIcon } from "./components/icons/CloseIcon";

export type HardwareWalletAccountState = HardwareWalletAccount & {
  selected: boolean;
};
let initialRender = true;

let isChecked = false;

const getAccountIds = async (publicKey: string): Promise<Array<string>> => {
  if (!modalState) {
    return [];
  }

  const url = `${modalState.selector.options.network.indexerUrl}/public_key/ed25519:${publicKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to get account ID from public key");
  }

  const jsonResponse: { account_ids: Array<string>; public_key: string } =
    await response.json();

  const { account_ids: accountIds } = jsonResponse;

  return Array.isArray(accountIds) ? accountIds : [];
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

  let walletList = [];
  if (
    modalState.selector.options.optimizeWalletOrder &&
    recentlySignedInWallets.length > 0
  ) {
    walletList = [...recentlySignedInWallets];

    if (modalState.selector.options.randomizeWalletOrder) {
      walletList = [
        ...walletList,
        ...moreWallets.sort(() => Math.random() - 0.5),
      ];
    } else {
      walletList = [...walletList, ...moreWallets];
    }
  } else {
    walletList = [...modalState.modules];
  }

  optionsWrapper?.insertAdjacentHTML(
    "beforeend",
    `<div class="options-list"></div>`
  );
  renderOptionsList(".options-list", walletList);
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
      <div class="nws-modal-background">
        <div class="nws-modal-title-wrapper">
          <h2 class="nws-modal-title">
          ${translate("modal.wallet.connectYourWallet")}
          </h2>
          <button class="close-button">
            ${CloseIcon}
          </button>
        </div>
        <div class="nws-modal">
          <div class="modal-left">
            <div class="nws-modal-body">
              <div class="wallet-options-wrapper"></div>
            </div>
          </div>
          <div class="modal-right"></div>
        </div>
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

  let walletList: Array<ModuleState<Wallet>> = [];
  if (
    modalState.selector.options.optimizeWalletOrder &&
    recentlySignedInWallets.length > 0
  ) {
    walletList = [...recentlySignedInWallets];

    if (modalState.selector.options.randomizeWalletOrder) {
      walletList = [
        ...walletList,
        ...moreWallets.sort(() => Math.random() - 0.5),
      ];
    } else {
      walletList = [...walletList, ...moreWallets];
    }

    if (!selectedWalletId && recentlySignedInWallets.length > 0) {
      const firstWallet = recentlySignedInWallets[0];
      document
        .querySelector(`#module-${firstWallet.id}`)
        ?.classList.add("selected-wallet");
    }
  } else {
    walletList = [...modalState.modules];
  }
  document
    .querySelector(".wallet-options-wrapper")
    ?.insertAdjacentHTML("beforeend", `<div class="options-list"></div>`);
  renderOptionsList(".options-list", walletList);

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
