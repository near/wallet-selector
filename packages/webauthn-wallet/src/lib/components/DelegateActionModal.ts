import type { Action, Transaction } from "@near-wallet-selector/core";
import type { ModalOptions } from "./Modal";
import { Modal } from "./Modal";
import { formatNearAmount } from "@near-js/utils";

export interface DelegateActionModalOptions
  extends Omit<ModalOptions, "title"> {
  delegateAction: Transaction;
  onApprove: () => Promise<void>;
  onReject: () => void;
}

export class DelegateActionModal extends Modal {
  private onApprove: () => Promise<void>;
  private onReject: () => void;

  constructor(private options: DelegateActionModalOptions) {
    super({
      ...options,
      title: "Sign Delegate Action",
    });

    this.onApprove = options.onApprove;
    this.onReject = options.onReject;

    this.render();
  }

  private render() {
    const delegateAction = this.options.delegateAction;

    // Description
    const description = document.createElement("p");
    description.style.fontSize = "14px";
    description.style.color = "#666";
    description.style.marginBottom = "24px";
    description.style.lineHeight = "1.5";
    description.textContent =
      "Review the delegate action details below, then sign with your biometric authentication.";
    this.modal.appendChild(description);

    // Delegate action details card
    const detailsCard = document.createElement("div");
    detailsCard.style.backgroundColor = "#fff";
    detailsCard.style.border = "1px solid #e0e0e0";
    detailsCard.style.borderRadius = "12px";
    detailsCard.style.padding = "20px";
    detailsCard.style.marginBottom = "16px";

    // Signer
    if (delegateAction.signerId) {
      this.addDetailRow(detailsCard, "Signer", delegateAction.signerId);
    }

    // Receiver
    if (delegateAction.receiverId) {
      this.addDetailRow(detailsCard, "Receiver", delegateAction.receiverId);
    }

    // Actions
    if (delegateAction.actions && Array.isArray(delegateAction.actions)) {
      const actionsHeader = document.createElement("div");
      actionsHeader.style.fontWeight = "600";
      actionsHeader.style.marginTop = "16px";
      actionsHeader.style.marginBottom = "12px";
      actionsHeader.style.color = "#1a1a1a";
      actionsHeader.style.fontSize = "15px";
      actionsHeader.textContent = `Actions (${delegateAction.actions.length})`;
      detailsCard.appendChild(actionsHeader);

      delegateAction.actions.forEach((action: Action, index: number) => {
        const actionDetails = document.createElement("div");
        actionDetails.style.backgroundColor = "#f5f5f5";
        actionDetails.style.borderRadius = "8px";
        actionDetails.style.padding = "12px";
        actionDetails.style.marginBottom = "8px";

        // Try to extract action type
        let actionType = "Unknown";
        if (action.functionCall) {
          actionType = "FunctionCall";
        } else if (action.transfer) {
          actionType = "Transfer";
        } else if (action.addKey) {
          actionType = "AddKey";
        } else if (action.deleteKey) {
          actionType = "DeleteKey";
        } else if (action.createAccount) {
          actionType = "CreateAccount";
        } else if (action.deleteAccount) {
          actionType = "DeleteAccount";
        } else if (action.deployContract) {
          actionType = "DeployContract";
        } else if (action.stake) {
          actionType = "Stake";
        }

        const actionTitle = document.createElement("div");
        actionTitle.style.fontWeight = "600";
        actionTitle.style.marginBottom = "8px";
        actionTitle.style.fontSize = "13px";
        actionTitle.style.color = "#1a1a1a";
        actionTitle.textContent = `Action ${index + 1}: ${actionType}`;
        actionDetails.appendChild(actionTitle);

        // Add specific action details
        if (action.functionCall) {
          const fc = action.functionCall;
          if (fc.methodName) {
            this.addSmallDetailRow(actionDetails, "Method", fc.methodName);
          }
          if (fc.gas !== undefined) {
            this.addSmallDetailRow(
              actionDetails,
              "Gas",
              this.formatGas(fc.gas)
            );
          }
          if (fc.deposit !== undefined) {
            this.addSmallDetailRow(
              actionDetails,
              "Deposit",
              this.formatDeposit(fc.deposit)
            );
          }
          if (fc.args) {
            const argsStr =
              typeof fc.args === "object" && fc.args instanceof Uint8Array
                ? new TextDecoder().decode(fc.args)
                : JSON.stringify(fc.args);
            this.addSmallDetailRow(actionDetails, "Arguments", argsStr);
          }
        } else if (action.transfer) {
          this.addSmallDetailRow(
            actionDetails,
            "Amount",
            this.formatDeposit(action.transfer.deposit)
          );
        }

        detailsCard.appendChild(actionDetails);
      });
    }

    this.modal.appendChild(detailsCard);

    // Info box about delegate actions
    const infoBox = document.createElement("div");
    infoBox.style.backgroundColor = "#fff3e0";
    infoBox.style.border = "1px solid #ff9800";
    infoBox.style.borderRadius = "8px";
    infoBox.style.padding = "12px";
    infoBox.style.marginBottom = "16px";
    infoBox.style.fontSize = "13px";
    infoBox.style.color = "#e65100";
    infoBox.textContent =
      "ℹ️ Delegate actions allow another party to execute transactions on your behalf within specified limits.";
    this.modal.appendChild(infoBox);

    // Bottom confirmation text
    const confirmationText = document.createElement("p");
    confirmationText.style.color = "#666666";
    confirmationText.style.fontSize = "14px";
    confirmationText.style.lineHeight = "1.5";
    confirmationText.style.marginBottom = "20px";
    confirmationText.style.textAlign = "left";
    confirmationText.textContent =
      "Review and confirm. You'll authenticate using your device's biometric system.";
    this.modal.appendChild(confirmationText);

    // Buttons
    const approveButton = this.createButton(
      "Sign Delegate Action",
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
    row.style.marginBottom = "12px";
    row.style.fontSize = "14px";
    row.style.alignItems = "flex-start";

    const labelEl = document.createElement("span");
    labelEl.style.color = "#666";
    labelEl.style.fontWeight = "400";
    labelEl.style.minWidth = "100px";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.style.color = "#1a1a1a";
    valueEl.style.fontWeight = "bold";
    valueEl.style.wordBreak = "break-word";
    valueEl.style.marginLeft = "16px";
    valueEl.style.textAlign = "right";
    valueEl.style.flex = "1";
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    container.appendChild(row);
  }

  private addSmallDetailRow(
    container: HTMLElement,
    label: string,
    value: string
  ) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.marginBottom = "6px";
    row.style.fontSize = "12px";

    const labelEl = document.createElement("span");
    labelEl.style.color = "#666";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.style.color = "#333";
    valueEl.style.fontWeight = "500";
    valueEl.style.wordBreak = "break-all";
    valueEl.style.marginLeft = "12px";
    valueEl.style.textAlign = "right";
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    container.appendChild(row);
  }

  private formatGas(gas: string | bigint | number): string {
    const gasNum =
      typeof gas === "string"
        ? BigInt(gas)
        : typeof gas === "number"
        ? BigInt(gas)
        : gas;
    const tGas = Number(gasNum) / 1e12;
    return `${tGas.toFixed(2)} TGas`;
  }

  private formatDeposit(deposit: string | bigint | number): string {
    if (!deposit || deposit === "0" || deposit === BigInt(0)) {
      return "0 NEAR";
    }
    const depositStr =
      typeof deposit === "string" ? deposit : deposit.toString();
    return `${formatNearAmount(depositStr)} NEAR`;
  }

  private async handleApprove() {
    try {
      this.showLoading("Signing delegate action with biometric...");
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
      header.textContent = "Sign Delegate Action";
      this.modal.appendChild(header);

      this.render();

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Delegate action signing failed";
      this.showError(errorMessage);
    }
  }

  private handleReject() {
    this.onReject();
    this.close();
  }
}
