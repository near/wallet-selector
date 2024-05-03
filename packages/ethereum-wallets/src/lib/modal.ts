import type {
  FunctionCallAction,
  Transaction,
  TransferAction,
} from "@near-wallet-selector/core";
import { RLP_EXECUTE } from "./utils";

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
          tx.actions[0].type === "AddKey" &&
          tx.actions[0].params.accessKey.permission === "FullAccess"
            ? "WARNING: you can loose your account and all your assets by giving FullAccess, only approve this transaction if you know what you are doing !!!"
            : ""
        }
        ${
          tx.actions[0].type === "AddKey" &&
          tx.actions[0].params.accessKey.permission !== "FullAccess" &&
          tx.actions[0].params.accessKey.permission.allowance === "0"
            ? tx.actions[0].params.publicKey === relayerPublicKey &&
              tx.actions[0].params.accessKey.permission.receiverId ===
                tx.signerId &&
              tx.actions[0].params.accessKey.permission.methodNames?.length ===
                1 &&
              tx.actions[0].params.accessKey.permission.methodNames[0] ===
                RLP_EXECUTE
              ? "This AddKey transaction will onboard your account and enable you to send the next transactions."
              : "WARNING: this key has unlimited allowance and can spend all your NEAR, only approve this transaction if you know what you are doing !!!"
            : ""
        }
        <p>Status: ${
          i < selectedIndex
            ? "completed"
            : i === selectedIndex
            ? "sign the transaction in your wallet..."
            : "pending..."
        }</p>
        <p>type: ${tx.actions[0].type}</p>
        <p>receiverId: ${tx.receiverId}</p>
        <p>params: ${JSON.stringify(
          (tx.actions[0] as FunctionCallAction | TransferAction).params,
          null,
          2
        )}</p>
      `;
      container.appendChild(txElement);
    });
  };
  return { showModal, hideModal, renderTxs };
}
