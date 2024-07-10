import type { Transaction } from "@near-wallet-selector/core";
import { formatUnits } from "viem";
import { DEFAULT_ACCESS_KEY_ALLOWANCE, RLP_EXECUTE } from "./utils";

export function createModal({
  onCancel,
  txs,
  relayerPublicKey,
  explorerUrl,
}: {
  onCancel: () => void;
  txs: Array<Transaction>;
  relayerPublicKey: string;
  explorerUrl: string;
}) {
  const modalStyles = `
    .ethereum-wallet-modal *,
    .ethereum-wallet-modal *::before,
    .ethereum-wallet-modal *::after {
      box-sizing: border-box;
    }
    .ethereum-wallet-modal button {
      cursor: pointer;
      top: auto;
    }
    .ethereum-wallet-modal button:hover {
      top: auto;
    }
    .ethereum-wallet-modal button:focus-visible {
      top: auto;
    }

    .ethereum-wallet-modal {
      display: none;
      position: relative;
      z-index: 9999;
    }
    .ethereum-wallet-modal-backdrop {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .ethereum-wallet-modal-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100vw;
      overflow-y: auto;
    }
    .ethereum-wallet-modal-container {
      display: flex;
      min-height: 100%;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      text-align: center;
    }
    .ethereum-wallet-modal-content {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      background-color: #fff;
      padding: 20px;
      text-align: left;
      max-width: 400px;
      width: 100%;
      box-shadow:
        0px 4px 8px rgba(0, 0, 0, 0.06),
        0px 0px 0px 1px rgba(0, 0, 0, 0.06);
    }

    .ethereum-wallet-modal h2 {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      letter-spacing: -0.1px;
      color: #202020;
      margin: 0;
    }

    .ethereum-wallet-txs {
      margin: 20px 0 10px 0;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }

    .ethereum-wallet-tx {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .ethereum-wallet-tx:not(.ethereum-wallet-tx-single) {
      padding: 0 10px;
    }
    .ethereum-wallet-tx-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 10px;
      width: 100%;
    }
    .ethereum-wallet-tx-list-header p {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
      color: #202020;
      font-weight: 700;
    }
    .ethereum-wallet-tx-list-header svg {
      height: 24px;
      width: 24px;
    }

    .ethereum-wallet-tx-explorer-link {
      height: 24px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
    }
    .ethereum-wallet-tx-explorer-link:hover {
      background-color: #DDF3E4;
    }
    .ethereum-wallet-tx-explorer-link svg {
      height: 16px;
      width: 16px;
      color: #202020;
    }

    .ethereum-wallet-tx.ethereum-wallet-tx-signing {
      background-color: #F9F9F9;
      padding-bottom: 10px;
      border-radius: 8px;
    }
    .ethereum-wallet-tx.ethereum-wallet-tx-pending {
      background-color: #F9F9F9;
      border-radius: 8px;
    }
    .ethereum-wallet-tx.ethereum-wallet-tx-completed {
      background-color: #F2FCF5;
      border-radius: 8px;
    }

    .ethereum-wallet-tx-single .ethereum-wallet-tx-info-container {
      border-top: 1px solid #EBEBEB;
      border-bottom: 1px solid #EBEBEB;
    }
    .ethereum-wallet-tx-info-text > p {
      color: #646464;
      margin: 0;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.04px;
    }
    .ethereum-wallet-tx-info-text > p:not(:last-child) {
      margin-bottom: 8px;
    }

    .ethereum-wallet-tx-info-row {
      padding: 14px 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      column-gap: 20px;
    }
    .ethereum-wallet-tx-info-text {
      padding: 10px;
    }
    .ethereum-wallet-tx-params,
    .ethereum-wallet-tx-params dl {
      margin: 0;
    }
    .ethereum-wallet-tx .ethereum-wallet-tx-params {
      border-top: 1px solid #EBEBEB;
      border-bottom: 1px solid #EBEBEB;
    }
    .ethereum-wallet-tx-params div:not(:last-child) {
      border-bottom: 1px solid #EBEBEB;
    }
    .ethereum-wallet-tx-params dt {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
      color: #202020;
      font-weight: 500;
    }
    .ethereum-wallet-tx-params dd {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
      color: #202020;
      font-weight: 700;
      text-align: right;
      word-break: break-all;
      overflow-wrap: break-word;
    }

    .ethereum-wallet-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      color: #1C2024;
      border: 1px solid rgba(1, 6, 47, 0.173) !important;
      background-color: #fff !important;
      padding: 14px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
    }
    .ethereum-wallet-btn:hover {
      border: 1px solid rgba(1, 6, 47, 0.173);
      background-color: #F2F2F5 !important;
    }
    .ethereum-wallet-btn:focus-visible {
      outline: 2px solid;
      outline-offset: 2px;
      outline-color: #8B8D98;
      border: 1px solid rgba(1, 6, 47, 0.173);
    }
    .ethereum-wallet-btn-sm {
      padding: 10px 14px;
      font-size: 12px;
      line-height: 16px;
    }
    .ethereum-wallet-btn-xs {
      padding: 8px 12px;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.04px;
      border-radius: 9999px;
    }
    .ethereum-wallet-btn-confirm {
      width: 100%;
      margin-top: 24px;
    }
    .ethereum-wallet-btn-cancel {
      width: 100%;
      background-color: #FFF9F9 !important;
      color: #dc2626 !important;
      border: 1px solid #fecaca !important;
    }
    .ethereum-wallet-btn-cancel:hover {
      background-color: #fef2f2 !important;
    }
    .ethereum-wallet-btn-details {
      margin-top: 20px;
      border-radius: 9999px;
    }

    .ethereum-wallet-tx-error {
      font-size: 14px;
      line-height: 20px;
      color: #dc2626;
      font-weight: 700;
      text-align: center;
      text-wrap: balance;
      margin-top: 20px;
      margin-bottom: 0px;
    }

    .ethereum-wallet-txs-details {
      display: none;
      margin-top: 10px;
      padding: 10px;
      background: #F1F1F1;
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      overflow: auto;
    }
    .ethereum-wallet-txs-details p {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.04px;
      color: #646464;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: pre-wrap;
      margin: 0;
    }

    .ethereum-wallet-txs-status {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 14px;
      background: #F1F4FE;
      border-radius: 8px;
      width: 100%;
      margin-top: 24px;
      border: 1px solid rgba(0,0,0,0);
    }
    .ethereum-wallet-txs-status p {
      margin: 0;
      color: #384EAC;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
    }

    .ethereum-wallet-tx-highlight {
      position: relative;
      z-index: 1;
    }
    .ethereum-wallet-tx-highlight::before {
      content: "";
      position: absolute;
      top: -4px;
      left: -6px;
      right: -6px;
      bottom: -4px;
      z-index: -1;
      background-color: #DDF3E4;
      border-radius: 8px;
    }

    .ethereum-wallet-spinner {
      position: absolute;
      right: 14px;
      top: 16px;
      width: 16px;
      height: 16px;
      border: 2px solid #384EAC;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    }
  `;

  // Create a style element and append the CSS styles
  const styleElement = window.document.createElement("style");
  styleElement.textContent = modalStyles;
  window.document.head.appendChild(styleElement);

  // Container with display none/block
  const modalContainer = window.document.createElement("div");
  modalContainer.classList.add("ethereum-wallet-modal");
  modalContainer.setAttribute("aria-labelledby", "modal-title");
  modalContainer.setAttribute("role", "dialog");
  modalContainer.setAttribute("aria-modal", "true");

  // Backdrop
  const backdrop = window.document.createElement("div");
  backdrop.classList.add("ethereum-wallet-modal-backdrop");

  // Wrapper for modal
  const modalWrapper = window.document.createElement("div");
  modalWrapper.classList.add("ethereum-wallet-modal-wrapper");

  // Modal content container
  const modalContentContainer = window.document.createElement("div");
  modalContentContainer.classList.add("ethereum-wallet-modal-container");

  // Modal content
  const isLogIn = txs.find((tx) => tx.actions[0].type === "AddKey");
  const isOnboard = txs.find(
    (tx) =>
      tx.actions[0].type === "AddKey" &&
      tx.actions[0].params.publicKey === relayerPublicKey
  );
  const modalContent = window.document.createElement("div");
  modalContent.classList.add("ethereum-wallet-modal-content");
  modalContent.innerHTML = `
    ${
      txs.length === 1 && isLogIn
        ? `<h2>${isOnboard ? "Onboard" : "Log in"}</h2>`
        : txs.length === 1 &&
          txs[0].actions.length === 1 &&
          txs[0].actions[0].type === "DeleteKey"
        ? "<h2>Log out</h2>"
        : isLogIn
        ? `<h2>Log in: send ${txs.length} transaction${
            txs.length > 1 ? "s" : ""
          }</h2>`
        : `<h2>Send ${txs.length} transaction${txs.length > 1 ? "s" : ""}</h2>`
    }
    <div class="ethereum-wallet-txs"></div>
    <button class="ethereum-wallet-btn ethereum-wallet-btn-sm ethereum-wallet-btn-cancel">Cancel</button>
  `;

  // // Append the elements to form the complete structure
  modalContentContainer.appendChild(modalContent);
  modalWrapper.appendChild(modalContentContainer);
  modalContainer.appendChild(backdrop);
  modalContainer.appendChild(modalWrapper);

  // Append modal container to document body
  window.document.body.appendChild(modalContainer);

  // Function to show the modal
  const showModal = () => {
    modalContainer.style.display = "block";
  };

  // Function to hide the modal
  const hideModal = () => {
    // modalContainer.style.display = "none";
    modalContainer.remove();
  };

  // On cancel button click
  window.document
    .querySelector(".ethereum-wallet-btn-cancel")
    ?.addEventListener("click", () => {
      onCancel();
      hideModal();
    });

  const renderTxs = ({
    selectedIndex,
    ethTxHashes,
    error,
    onConfirm,
  }: {
    selectedIndex: number;
    ethTxHashes: Array<string>;
    error?: string | null;
    onConfirm?: () => void;
  }) => {
    const container = document.querySelector(
      ".ethereum-wallet-txs"
    ) as HTMLElement;
    container.innerHTML = "";

    txs.forEach((tx, i) => {
      const txNumber = i + 1;
      const singleTx = txs.length === 1;
      const txElement = document.createElement("div");

      txElement.classList.add("ethereum-wallet-tx");
      if (singleTx) {
        txElement.classList.add("ethereum-wallet-tx-single");
      }

      const isCompleted = i < selectedIndex;
      const isActive = i === selectedIndex;
      const isPending = i > selectedIndex;
      const isSent = selectedIndex < ethTxHashes.length;
      const explorerLink =
        i < ethTxHashes.length
          ? `${explorerUrl}/tx/${ethTxHashes[i]}`
          : undefined;

      if (!singleTx) {
        if (isCompleted) {
          txElement.classList.add("ethereum-wallet-tx-completed");
        }
        if (isActive) {
          txElement.classList.add("ethereum-wallet-tx-signing");
        }
        if (isPending) {
          txElement.classList.add("ethereum-wallet-tx-pending");
        }
      }
      txElement.innerHTML = `
        ${
          isCompleted
            ? `
                <div class="ethereum-wallet-tx-list-header">
                  <div style="display: flex; align-items: center; column-gap: 8px;">
                    <p>Transaction ${txNumber}</p>
                    ${
                      explorerLink
                        ? `
                      <a href="${explorerLink}" target="_blank" rel="noopener noreferrer" aria-label="Open explorer link" class="ethereum-wallet-tx-explorer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/></svg>
                      </a>
                        `
                        : ""
                    }
                  </div>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" fill-opacity=".01" d="M0 0h24v24H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.403C6.148 1.403 1.403 6.147 1.403 12c0 5.852 4.745 10.596 10.597 10.596 5.852 0 10.596-4.744 10.596-10.596 0-5.853-4.744-10.597-10.596-10.597ZM2.923 12a9.077 9.077 0 1 1 18.153 0 9.077 9.077 0 0 1-18.153 0Zm13.331-3.14a.8.8 0 1 0-1.308-.92l-4.514 6.414L8.57 12.46a.8.8 0 0 0-1.142 1.121l2.534 2.58a.8.8 0 0 0 1.225-.1l5.066-7.2Z" fill="#30A46C"/></svg>
                </div>
              `
            : isPending
            ? `
                <div class="ethereum-wallet-tx-list-header">
                  <p>Transaction ${txNumber}</p>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" fill-opacity=".01" d="M0 0h24v24H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.403 12C1.403 6.148 6.148 1.403 12 1.403c5.852 0 10.596 4.745 10.596 10.597 0 5.852-4.744 10.596-10.596 10.596S1.403 17.852 1.403 12ZM12 2.923a9.077 9.077 0 1 0 0 18.153 9.077 9.077 0 0 0 0-18.153Z" fill="#8D8D8D"/></svg>
                </div>
              `
            : `
              ${
                !singleTx
                  ? `
                <div class="ethereum-wallet-tx-list-header">
                  <p>Transaction ${txNumber}</p>
                  <svg class="ethereum-tx-circle" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" fill-opacity=".01" d="M0 0h24v24H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.403 12C1.403 6.148 6.148 1.403 12 1.403c5.852 0 10.596 4.745 10.596 10.597 0 5.852-4.744 10.596-10.596 10.596S1.403 17.852 1.403 12ZM12 2.923a9.077 9.077 0 1 0 0 18.153 9.077 9.077 0 0 0 0-18.153Z" fill="#8D8D8D"/></svg>
                </div>
              `
                  : ""
              }
              <div class="ethereum-wallet-tx-params">
                ${
                  tx.actions[0].type === "AddKey"
                    ? tx.actions[0].params.accessKey.permission === "FullAccess"
                      ? `
                        <div class="ethereum-wallet-tx-info-text">
                          <p>WARNING: The application is requesting a FullAccess key. You can lose your account and all your assets. Only approve this transaction if you know what you are doing!<p>
                        </div>`
                      : tx.actions[0].params.accessKey.permission.allowance ===
                          "0" &&
                        tx.actions[0].params.publicKey === relayerPublicKey &&
                        tx.actions[0].params.accessKey.permission.receiverId ===
                          tx.signerId &&
                        tx.actions[0].params.accessKey.permission.methodNames
                          ?.length === 1 &&
                        tx.actions[0].params.accessKey.permission
                          .methodNames[0] === RLP_EXECUTE
                      ? `
                        <div class="ethereum-wallet-tx-info-text">
                          <p>This one-time transaction will onboard your account and enable you to transact on NEAR Protocol.</p>
                        </div>`
                      : `
                      <div class="ethereum-wallet-tx-info-text">
                        <p>Connect to ${
                          tx.actions[0].params.accessKey.permission.receiverId
                        }</p>
                        <p>
                          Network Fee Allowance: ${
                            tx.actions[0].params.accessKey.permission
                              .allowance === "0"
                              ? "unlimited"
                              : formatUnits(
                                  BigInt(
                                    tx.actions[0].params.accessKey.permission
                                      .allowance ?? DEFAULT_ACCESS_KEY_ALLOWANCE
                                  ),
                                  24
                                )
                          } NEAR
                        </p>
                        ${
                          tx.actions[0].params.accessKey.permission
                            .allowance === "0"
                            ? "<p>WARNING: this key will have unlimited allowance spendable towards network fees, only approve this transaction if you trust the application and you know what you are doing!</p>"
                            : "<p>This allowance is spendable by the application towards network fees incurred during use.</p>"
                        }
                      </div>
                      `
                    : tx.actions[0].type === "DeleteKey"
                    ? `
                      <div class="ethereum-wallet-tx-info-text">
                        <p>This is an optional transaction which removes the application access key. If you reject the transaction, the key will be reused when you login next time.</p>
                      </div>
                      `
                    : tx.actions[0].type === "FunctionCall"
                    ? `
                    <dl>
                      <div class="ethereum-wallet-tx-info-row">
                        <dt>From</dt>
                        <dd>${tx.signerId}</dd>
                      </div>
                      <div class="ethereum-wallet-tx-info-row">
                        <dt>To</dt>
                        <dd>${tx.receiverId}</dd>
                      </div>
                      <div class="ethereum-wallet-tx-info-row">
                        <dt>Type</dt>
                        <dd class="ethereum-wallet-tx-highlight">${
                          tx.actions[0].params.methodName
                        }</dd>
                      </div>
                      ${
                        tx.actions[0].params.deposit === "1" ||
                        tx.actions[0].params.deposit === "0"
                          ? ""
                          : `
                          <div class="ethereum-wallet-tx-info-row">
                            <dt>Deposit</dt>
                            <dd class="ethereum-wallet-tx-highlight">${formatUnits(
                              BigInt(tx.actions[0].params.deposit),
                              24
                            )} NEAR</dd>
                          </div>
                        `
                      }
                    </dl>
                    `
                    : tx.actions[0].type === "Transfer"
                    ? `
                      <dl>
                        <div class="ethereum-wallet-tx-info-row">
                          <dt>From</dt>
                          <dd>${tx.signerId}</dd>
                        </div>
                        <div class="ethereum-wallet-tx-info-row">
                          <dt>To</dt>
                          <dd>${tx.receiverId}</dd>
                        </div>
                        <div class="ethereum-wallet-tx-info-row">
                          <dt>Type</dt>
                          <dd class="ethereum-wallet-tx-highlight">${
                            tx.actions[0].type
                          }</dd>
                        </div>
                        <div class="ethereum-wallet-tx-info-row">
                          <dt>Amount</dt>
                          <dd class="ethereum-wallet-tx-highlight">${formatUnits(
                            BigInt(tx.actions[0].params.deposit),
                            24
                          )} NEAR</dd>
                        </div>
                      </dl>
                      `
                    : `
                      <div class="ethereum-wallet-tx-info-text">
                        <p>Unknown transaction type.</p>
                      </div>
                    `
                }
              </div>
              <button class="ethereum-wallet-btn ethereum-wallet-btn-xs ethereum-wallet-btn-details">Show details</button>
              <div class="ethereum-wallet-txs-details">
                <p>${JSON.stringify(tx.actions[0], null, 2)}</p>
              </div>
              ${error ? `<p class="ethereum-wallet-tx-error">${error}</p>` : ""}
              ${
                onConfirm
                  ? `<button class="ethereum-wallet-btn ethereum-wallet-btn-confirm" id="confirm-btn-${i}">
                      Confirm transaction
                    </button>`
                  : `<div class="ethereum-wallet-txs-status">
                      <p>
                      ${
                        isSent
                          ? "Sending transaction"
                          : "Confirm in your wallet"
                      }
                      </p>
                      <div class="ethereum-wallet-spinner"></div>
                    </div>`
              }
            `
        }
      `;
      container.appendChild(txElement);
    });
    if (onConfirm) {
      window.document
        .querySelector(`#confirm-btn-${selectedIndex}`)
        ?.addEventListener("click", () => {
          onConfirm();
        });
    }

    const toggleButton = window.document.querySelector(
      ".ethereum-wallet-btn-details"
    );
    const detailsContainer = window.document.querySelector(
      ".ethereum-wallet-txs-details"
    ) as HTMLElement | null;

    toggleButton?.addEventListener("click", () => {
      if (!detailsContainer || !toggleButton) {
        return;
      }

      if (
        detailsContainer.style.display === "none" ||
        detailsContainer.style.display === ""
      ) {
        detailsContainer.style.display = "block";
        toggleButton.textContent = "Hide details";
      } else {
        detailsContainer.style.display = "none";
        toggleButton.textContent = "Show details";
      }
    });
  };
  return { showModal, hideModal, renderTxs };
}
