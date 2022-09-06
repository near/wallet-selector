import { InjectedWallet, ModuleState } from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { renderWhatIsAWallet } from "./WhatIsAWallet";

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

  if (module.id === "near-wallet") {
    const subdomain = networkId === "testnet" ? "testnet." : "";
    url = `https://wallet.${subdomain}near.org`;
  }

  if ((url === "" && module.type === "bridge") || module.type === "hardware") {
    return;
  }

  window.open(url, "_blank");
}

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
            <h3 class="middleTitle">Get a Wallet</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
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

  const filteredModules = modalState.modules.slice(0, 3);

  for (let i = 0; i < filteredModules.length; i++) {
    document.getElementById("wallets")?.insertAdjacentHTML(
      "beforeend",
      `
    <div class="single-wallet-get">
      <div class="icon">
      <img
          src="${filteredModules[i].metadata.iconUrl}"
          alt="${filteredModules[i].metadata.name}"></div>
      <div class="content">
        <div class="title">${filteredModules[i].metadata.name}</div>
        <div class="description">${
          filteredModules[i].metadata.description
            ? filteredModules[i].metadata.description
            : ""
        }</div>
      </div>
      <div class="button-get">
        <button class="get-wallet" id="${filteredModules[i].id}">Get</button>
      </div>
    </div>
`
    );
  }

  Array.from(document.querySelectorAll(".get-wallet")).forEach((button) => {
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
  });

  document.getElementById("back-button")?.addEventListener("click", () => {
    renderWhatIsAWallet();
  });
}
