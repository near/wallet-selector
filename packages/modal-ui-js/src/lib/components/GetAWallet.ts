import type { InjectedWallet, ModuleState } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { renderWhatIsAWallet } from "./WhatIsAWallet";
import { translate } from "@near-wallet-selector/core";

function goToWallet(module: ModuleState) {
  if (!modalState) {
    return;
  }

  const { networkId } = modalState.selector.options.network;
  let url = "";

  if (module.type === "injected") {
    url = (module as ModuleState<InjectedWallet>).metadata.downloadUrl;
  }

  // TODO: improve links to wallets other than injected type.
  if (module.id === "my-near-wallet") {
    const subdomain = networkId === "testnet" ? "testnet" : "app";
    url = `https://${subdomain}.mynearwallet.com`;
  }

  if (module.id === "opto-wallet") {
    const subdomain = networkId === "testnet" ? "app.testnet" : "app";
    url = `https://${subdomain}.optowallet.com`;
  }

  if (module.id === "near-wallet") {
    const subdomain = networkId === "testnet" ? "testnet." : "";
    url = `https://wallet.${subdomain}near.org`;
  }

  if (module.id === "here-wallet") {
    url = "https://herewallet.app/";
  }

  if ((url === "" && module.type === "bridge") || module.type === "hardware") {
    return;
  }

  window.open(url, "_blank");
}

const getTypeNameAndIcon = (
  walletId: string,
  type: string
): { typeFullName: string; qrIcon: boolean } => {
  switch (type) {
    case "injected":
      if (walletId === "nearfi") {
        return {
          typeFullName: "Wallet Extension",
          qrIcon: true,
        };
      }

      if (walletId === "here-wallet") {
        return {
          typeFullName: "Mobile Wallet",
          qrIcon: true,
        };
      }

      return {
        typeFullName: "Wallet Extension",
        qrIcon: false,
      };
    case "browser":
      if (walletId === "here-wallet") {
        return {
          typeFullName: "Web Wallet",
          qrIcon: true,
        };
      }

      return {
        typeFullName: "Web Wallet",
        qrIcon: false,
      };
    default:
      return {
        typeFullName: "Web Wallet",
        qrIcon: false,
      };
  }
};

export async function renderGetAWallet() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
        <button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
        </button>
          <div class="nws-modal-header">
            <h3 class="middleTitle -open">${translate(
              "modal.wallet.getAWallet"
            )}</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
                height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg></button>
          </div>
        </div>
        <div class="get-wallet-wrapper" id="wallets">

        </div>
      </div>
    </div>
  `;

  const filterByType = (item: { type: string }) => {
    return item.type !== "bridge" && item.type !== "hardware";
  };

  const filteredModules = modalState.modules.filter(filterByType);

  for (let i = 0; i < filteredModules.length; i++) {
    const { type, id } = filteredModules[i];
    const { typeFullName, qrIcon } = getTypeNameAndIcon(id, type);

    document.getElementById("wallets")?.insertAdjacentHTML(
      "beforeend",
      `
    <div tabindex="0" class="single-wallet-get ${filteredModules[i].id}" id="${
        filteredModules[i].id
      }">
      <div class="small-icon">
      ${
        qrIcon
          ? `
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.22224 1.33334H1.44446V6.66668H7.22224V1.33334Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.8889 1.33334H10.1111V6.66668H15.8889V1.33334Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.22224 9.33334H1.44446V14.6667H7.22224V9.33334Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.1111 13.1429V14.6667H15.8889M10.1111 9.33334V10.8572H12.5873V9.33334H15.8889V12.381"
            stroke="#4C5155"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="3.61108"
            y="3.33334"
            width="1.44444"
            height="1.33333"
            fill="#4C5155"
          />
          <rect
            x="3.61108"
            y="11.3333"
            width="1.44444"
            height="1.33333"
            fill="#4C5155"
          />
          <rect
            x="12.2778"
            y="3.33334"
            width="1.44445"
            height="1.33333"
            fill="#4C5155"
          />
        </svg>`
          : `
        <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.66667V12.6667C13 13.0203 12.8478 13.3594 12.577 13.6095C12.3061 13.8595 11.9387 14 11.5556 14H3.61113C3.22804 14 2.86064 13.8595 2.58975 13.6095C2.31887 13.3594 2.16669 13.0203 2.16669 12.6667V5.33333C2.16669 4.97971 2.31887 4.64057 2.58975 4.39052C2.86064 4.14048 3.22804 4 3.61113 4H7.94447"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.8333 2H15.1666V6"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.22223 9.33333L15.1667 2"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>`
      }

      </div>
      <div class="icon">
      <img
          src="${filteredModules[i].metadata.iconUrl}"
          alt="${filteredModules[i].metadata.name}"></div>
      <div class="content">
        <div class="title">${filteredModules[i].metadata.name}</div>
        <div class="type">${typeFullName}</div>
      </div>
    </div>
`
    );
  }

  Array.from(document.querySelectorAll(".single-wallet-get")).forEach(
    (button) => {
      button.addEventListener("click", () => {
        if (!modalState) {
          return;
        }

        const module = modalState.modules.find((m) => m.id === button.id);

        if (!module) {
          return;
        }
        goToWallet(module);
      });
    }
  );

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderWhatIsAWallet();
  });
}
