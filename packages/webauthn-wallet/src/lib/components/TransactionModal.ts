import { najActionToInternal } from "@near-wallet-selector/core";
import type { ModalOptions } from "./Modal";
import { Modal } from "./Modal";
import { formatNearAmount } from "@near-js/utils";

export interface Transaction {
  receiverId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Array<any>;
}

export interface TransactionModalOptions extends Omit<ModalOptions, "title"> {
  transactions: Array<Transaction>;
  onApprove: () => Promise<void>;
  onReject: () => void;
}

export class TransactionModal extends Modal {
  private onApprove: () => Promise<void>;
  private onReject: () => void;

  constructor(private options: TransactionModalOptions) {
    super({
      ...options,
      title:
        options.transactions.length > 1
          ? `Approve ${options.transactions.length} Transactions`
          : "Approve Transaction",
    });

    this.onApprove = options.onApprove;
    this.onReject = options.onReject;

    this.render();
  }

  private render() {
    // Description
    const description = document.createElement("p");
    description.style.fontSize = "14px";
    description.style.color = "#666";
    description.style.marginBottom = "24px";
    description.style.lineHeight = "1.5";
    description.textContent =
      this.options.transactions.length > 1
        ? `Review the ${this.options.transactions.length} transactions below, then approve with your biometric authentication.`
        : "Review the transaction details below, then approve with your biometric authentication.";
    this.modal.appendChild(description);

    // Render each transaction
    this.options.transactions.forEach((transaction, txIndex) => {
      // Transaction header (if multiple transactions)
      if (this.options.transactions.length > 1) {
        const txHeader = document.createElement("div");
        txHeader.style.fontWeight = "700";
        txHeader.style.marginTop = txIndex === 0 ? "0" : "24px";
        txHeader.style.marginBottom = "12px";
        txHeader.style.color = "#1a1a1a";
        txHeader.style.fontSize = "16px";
        txHeader.textContent = `Transaction ${txIndex + 1}`;
        this.modal.appendChild(txHeader);
      }

      // Transaction details card
      const detailsCard = document.createElement("div");
      detailsCard.style.backgroundColor = "#fff";
      detailsCard.style.border = "1px solid #e0e0e0";
      detailsCard.style.borderRadius = "12px";
      detailsCard.style.padding = "20px";
      detailsCard.style.marginBottom = "16px";

      // Receiver
      this.addDetailRow(detailsCard, "To", transaction.receiverId);

      // Actions
      const actions = transaction.actions.map((action) =>
        najActionToInternal(action)
      );
      actions.forEach((action, index) => {
        const actionHeader = document.createElement("div");
        actionHeader.style.fontWeight = "600";
        actionHeader.style.marginTop = index === 0 ? "16px" : "20px";
        actionHeader.style.marginBottom = "12px";
        actionHeader.style.color = "#1a1a1a";
        actionHeader.style.fontSize = "15px";
        actionHeader.textContent = `Action ${index + 1}: ${action.type}`;
        detailsCard.appendChild(actionHeader);

        const actionDetails = document.createElement("div");
        actionDetails.style.backgroundColor = "#f5f5f5";
        actionDetails.style.borderRadius = "8px";
        actionDetails.style.padding = "16px";

        if (action.type === "FunctionCall") {
          this.addDetailRow(actionDetails, "Method", action.params.methodName);
          this.addDetailRow(
            actionDetails,
            "Gas",
            this.formatGas(action.params.gas)
          );
          this.addDetailRow(
            actionDetails,
            "Deposit",
            this.formatDeposit(action.params.deposit)
          );

          // Show args if they exist
          if (action.params.args) {
            const argsStr = JSON.stringify(action.params.args);
            if (argsStr.length < 200) {
              this.addDetailRow(actionDetails, "Arguments", argsStr);
            } else {
              this.addDetailRow(
                actionDetails,
                "Arguments",
                argsStr.substring(0, 200) + "..."
              );
            }
          }
        } else if (action.type === "Transfer") {
          this.addDetailRow(
            actionDetails,
            "Amount",
            formatNearAmount(action.params.deposit.toString())
          );
        } else if (action.type === "AddKey") {
          this.addDetailRow(
            actionDetails,
            "Public Key",
            action.params.publicKey.substring(0, 20) + "..."
          );
        } else if (action.type === "DeleteKey") {
          this.addDetailRow(
            actionDetails,
            "Public Key",
            action.params.publicKey.substring(0, 20) + "..."
          );
        }

        detailsCard.appendChild(actionDetails);
      });

      this.modal.appendChild(detailsCard);
    });

    // Warning for sensitive operations (check all transactions)
    const hasSensitiveAction = this.options.transactions.some((tx) =>
      tx.actions.some(
        (action) =>
          action.type === "DeleteKey" || action.type === "DeleteAccount"
      )
    );

    if (hasSensitiveAction) {
      const warning = document.createElement("div");
      warning.style.backgroundColor = "#fff8e1";
      warning.style.border = "1px solid #ffeb3b";
      warning.style.borderRadius = "8px";
      warning.style.padding = "12px";
      warning.style.marginBottom = "16px";
      warning.style.fontSize = "14px";
      warning.style.color = "#f57c00";
      warning.textContent =
        "⚠️ This transaction includes sensitive operations. Please review carefully.";
      this.modal.appendChild(warning);
    }

    // Bottom confirmation text
    const confirmationText = document.createElement("p");
    confirmationText.style.color = "#666666";
    confirmationText.style.fontSize = "14px";
    confirmationText.style.lineHeight = "1.5";
    confirmationText.style.marginBottom = "20px";
    confirmationText.style.textAlign = "left";
    confirmationText.textContent =
      this.options.transactions.length > 1
        ? `Review and confirm all ${this.options.transactions.length} transactions. You'll authenticate using your device's biometric system.`
        : "Review and confirm. You'll authenticate using your device's biometric system.";
    this.modal.appendChild(confirmationText);

    // Buttons
    const approveButton = this.createButton(
      "Approve",
      () => this.handleApprove(),
      true
    );
    this.modal.appendChild(approveButton);

    const rejectButton = this.createButton(
      "Reject",
      () => this.handleReject(),
      false
    );
    this.modal.appendChild(rejectButton);
  }

  private addDetailRow(container: HTMLElement, label: string, value: string) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.marginBottom = "8px";
    row.style.fontSize = "14px";

    const labelEl = document.createElement("span");
    labelEl.style.color = "#666";
    labelEl.style.fontWeight = "400";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.style.color = "#1a1a1a";
    valueEl.style.fontWeight = "bold";
    valueEl.style.wordBreak = "break-all";
    valueEl.style.marginLeft = "16px";
    valueEl.style.textAlign = "right";
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    container.appendChild(row);
  }

  private formatGas(gas: string | bigint): string {
    const gasNum = typeof gas === "string" ? BigInt(gas) : gas;
    const tGas = Number(gasNum) / 1e12;
    return `${tGas.toFixed(2)} TGas`;
  }

  private formatDeposit(deposit: string | bigint): string {
    if (!deposit || deposit === "0" || deposit === BigInt(0)) {
      return "0 NEAR";
    }
    return `${formatNearAmount(deposit.toString())} NEAR`;
  }

  private async handleApprove() {
    try {
      const message =
        this.options.transactions.length > 1
          ? `Signing ${this.options.transactions.length} transactions with biometric...`
          : "Signing transaction with biometric...";
      this.showLoading(message);
      await this.onApprove();
      // Modal will be closed by parent
    } catch (error) {
      // Recreate the form
      this.modal.innerHTML = "";
      const header = document.createElement("h2");
      header.style.fontSize = "24px";
      header.style.fontWeight = "bold";
      header.style.marginBottom = "16px";
      header.style.color = "#1a1a1a";
      header.textContent =
        this.options.transactions.length > 1
          ? `Approve ${this.options.transactions.length} Transactions`
          : "Approve Transaction";
      this.modal.appendChild(header);

      this.render();

      const errorMessage =
        error instanceof Error ? error.message : "Transaction approval failed";
      this.showError(errorMessage);
    }
  }

  private handleReject() {
    this.onReject();
    this.close();
  }
}
