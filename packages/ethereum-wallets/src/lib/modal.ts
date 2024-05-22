import type { Transaction } from "@near-wallet-selector/core";
import { formatUnits } from "viem";
import { DEFAULT_ACCESS_KEY_ALLOWANCE, RLP_EXECUTE } from "./utils";

export function createModal({
  onCancel,
  txs,
  relayerPublicKey,
}: {
  onCancel: () => void;
  txs: Array<Transaction>;
  relayerPublicKey: string;
}) {
  const modalStyles = `
    .ethereum-wallet-modal-container {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      overflow: auto;
    }
    .ethereum-wallet-modal-content {
      background-color: #efefef;
      border-radius: 10px;
      margin: 2% auto;
      padding: 20px;
      width: 40%;
      text-align: center;
      color: #4b4b4b;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .ethereum-wallet-tx {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #efefef;
      border-radius: 10px;
      color: #4b4b4b;
      border: solid;
      border-color: #4b4b4b;
      text-align: left
    }
    .ethereum-wallet-tx-completed {
      background-color: #75ba8b;
      color: #4b4b4b;
    }
    .ethereum-wallet-tx-signing {
      background-color: #fce4a2;
      color: #4b4b4b;
    }
    .cancel-ethereum-txs {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      margin-top: 10px;
      color: #4b4b4b;
      font-size: inherit;
      text-decoration: none;
    }
    .cancel-ethereum-txs:hover {
      text-decoration: underline;
    }
    .cancel-ethereum-txs:active {
      background: none;
    }
    @media only screen and (max-width: 800px) {
      .ethereum-wallet-modal-content {
        width: 100%; /* Full width for smaller screens */
      }
    }
  `;

  // Create a style element and append the CSS styles
  const styleElement = window.document.createElement("style");
  styleElement.textContent = modalStyles;
  window.document.head.appendChild(styleElement);

  // Create modal container
  const modalContainer = window.document.createElement("div");
  modalContainer.classList.add("ethereum-wallet-modal-container");

  // Create modal content
  const modalContent = window.document.createElement("div");
  modalContent.classList.add("ethereum-wallet-modal-content");
  modalContent.innerHTML = `
    ${
      txs.length === 1 &&
      txs[0].actions.length === 1 &&
      txs[0].actions[0].type === "AddKey"
        ? "<h2>Log in</h2>"
        : txs.length === 1 &&
          txs[0].actions.length === 1 &&
          txs[0].actions[0].type === "DeleteKey"
        ? "<h2>Log out</h2>"
        : `<h2>Execute ${txs.length} transaction(s)</h2>`
    }
    <div class="ethereum-wallet-txs"></div>
    <button class="cancel-ethereum-txs">Cancel</button>
  `;

  // Append modal content to modal container
  modalContainer.appendChild(modalContent);

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
    .querySelector(".cancel-ethereum-txs")
    ?.addEventListener("click", () => {
      onCancel();
      hideModal();
    });

  const renderTxs = ({ selectedIndex }: { selectedIndex: number }) => {
    const container = document.querySelector(
      ".ethereum-wallet-txs"
    ) as HTMLElement;
    container.innerHTML = "";

    txs.forEach((tx, i) => {
      const txElement = document.createElement("div");
      txElement.classList.add("ethereum-wallet-tx");
      if (i < selectedIndex) {
        txElement.classList.add("ethereum-wallet-tx-completed");
      }
      if (i === selectedIndex) {
        txElement.classList.add("ethereum-wallet-tx-signing");
      }
      txElement.innerHTML = `
        ${
          // Transaction description
          tx.actions[0].type === "AddKey"
            ? tx.actions[0].params.accessKey.permission === "FullAccess"
              ? "<p>WARNING: The application is requesting a FullAccess key, you can loose your account and all your assets, only approve this transaction if you know what you are doing !!!<p>"
              : tx.actions[0].params.accessKey.permission.allowance === "0" &&
                tx.actions[0].params.publicKey === relayerPublicKey &&
                tx.actions[0].params.accessKey.permission.receiverId ===
                  tx.signerId &&
                tx.actions[0].params.accessKey.permission.methodNames
                  ?.length === 1 &&
                tx.actions[0].params.accessKey.permission.methodNames[0] ===
                  RLP_EXECUTE
              ? "<p>This transaction will onboard your account and enable you to transact on NEAR Protocol.</p>"
              : `
                  <p>Connect to ${
                    tx.actions[0].params.accessKey.permission.receiverId
                  }</p>
                  <p>
                    Network Fee Allowance: ${
                      tx.actions[0].params.accessKey.permission.allowance ===
                      "0"
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
                    tx.actions[0].params.accessKey.permission.allowance === "0"
                      ? "<p>WARNING: this key will have unlimited allowance spendable towards network fees, only approve this transaction if you trust the application and you know what you are doing !!!</p>"
                      : "<p>This allowance is spendable by the application towards network fees incurred during use.</p>"
                  }
                `
            : tx.actions[0].type === "DeleteKey"
            ? "<p>This is an optional transaction which removes the application access key. If you reject the transaction, the key will be reused when you login again.</p>"
            : tx.actions[0].type === "FunctionCall"
            ? `
                <p>Contract execution:</p>
                <p>from: ${tx.signerId}</p>
                <p>to: ${tx.receiverId}</p>
                <p>function: ${tx.actions[0].params.methodName}</p>
                <p>
                  deposit: ${formatUnits(
                    BigInt(tx.actions[0].params.deposit),
                    24
                  )} NEAR
                </p>
            `
            : tx.actions[0].type === "Transfer"
            ? `
                <p>
                  Transfer ${formatUnits(
                    BigInt(tx.actions[0].params.deposit),
                    24
                  )} NEAR from ${tx.signerId} to ${tx.receiverId}
                </p>
              `
            : "Unknown transaction type."
        }
        <p>Transaction Details:</p>
        <p>${JSON.stringify(tx.actions[0], null, 2)}</p>
        <p>
          Status: ${
            i < selectedIndex
              ? "completed"
              : i === selectedIndex
              ? "sign the transaction in your wallet..."
              : "pending..."
          }
        </p>
      `;
      container.appendChild(txElement);
    });
  };
  return { showModal, hideModal, renderTxs };
}
