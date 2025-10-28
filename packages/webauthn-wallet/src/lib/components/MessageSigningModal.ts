import type { ModalOptions } from "./Modal";
import { Modal } from "./Modal";

export interface MessageSigningModalOptions
  extends Omit<ModalOptions, "title"> {
  message: string;
  recipient: string;
  nonce: Buffer;
  callbackUrl?: string;
  onApprove: () => Promise<void>;
  onReject: () => void;
}

export class MessageSigningModal extends Modal {
  private onApprove: () => Promise<void>;
  private onReject: () => void;

  constructor(private options: MessageSigningModalOptions) {
    super({
      ...options,
      title: "Sign Message",
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
      "Review the message details below, then sign with your biometric authentication.";
    this.modal.appendChild(description);

    // Message details card
    const detailsCard = document.createElement("div");
    detailsCard.style.backgroundColor = "#fff";
    detailsCard.style.border = "1px solid #e0e0e0";
    detailsCard.style.borderRadius = "12px";
    detailsCard.style.padding = "20px";
    detailsCard.style.marginBottom = "16px";

    // Message
    this.addDetailRow(detailsCard, "Message", this.options.message);

    // Recipient
    this.addDetailRow(detailsCard, "Recipient", this.options.recipient);

    // Callback URL (if provided)
    if (this.options.callbackUrl) {
      this.addDetailRow(detailsCard, "Callback URL", this.options.callbackUrl);
    }

    this.modal.appendChild(detailsCard);

    // Info box about NEP-413
    const infoBox = document.createElement("div");
    infoBox.style.backgroundColor = "#e3f2fd";
    infoBox.style.border = "1px solid #2196f3";
    infoBox.style.borderRadius = "8px";
    infoBox.style.padding = "12px";
    infoBox.style.marginBottom = "16px";
    infoBox.style.fontSize = "13px";
    infoBox.style.color = "#1565c0";
    infoBox.textContent =
      "ℹ️ This is a NEP-413 message signature request. Your signature proves ownership without sending a transaction.";
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
      "Sign Message",
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

  private async handleApprove() {
    try {
      this.showLoading("Signing message with biometric...");
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
      header.textContent = "Sign Message";
      this.modal.appendChild(header);

      this.render();

      const errorMessage =
        error instanceof Error ? error.message : "Message signing failed";
      this.showError(errorMessage);
    }
  }

  private handleReject() {
    this.onReject();
    this.close();
  }
}
