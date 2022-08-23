import { modalState } from "../modal";

export function rendeAlertMessage(error: Error) {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-body")!.innerHTML = `
    <div class="alert-message-wrapper">
      <p>${error.message}</p>
      <div class="action-buttons">
        <button class="left-button">
          OK
        </button>
      </div>
    </div>
  `;
}
