import { injectStyles } from "./styles";

export interface ModalOptions {
  title: string;
  onClose: () => void;
}

export class Modal {
  protected overlay: HTMLElement;
  protected modal: HTMLElement;
  protected onClose: () => void;
  private initialViewportHeight = 0;

  constructor(options: ModalOptions) {
    this.onClose = options.onClose;

    injectStyles();

    this.overlay = document.createElement("div");
    this.overlay.className = "webauthn-modal-overlay";
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    this.modal = document.createElement("div");
    this.modal.className = "webauthn-modal";
    this.modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "webauthn-modal__close";
    closeButton.innerHTML = "×";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.addEventListener("click", () => this.close());
    this.modal.appendChild(closeButton);

    const header = document.createElement("h2");
    header.className = "webauthn-modal__header";
    header.textContent = options.title;
    this.modal.appendChild(header);

    this.overlay.appendChild(this.modal);

    this.handleEscape = this.handleEscape.bind(this);
    document.addEventListener("keydown", this.handleEscape);
  }

  protected handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  show() {
    document.body.appendChild(this.overlay);
    document.body.style.overflow = "hidden";

    // Store initial viewport height for mobile keyboard handling
    this.initialViewportHeight = window.innerHeight;

    // Add viewport resize listener for mobile keyboard
    window.addEventListener("resize", this.handleViewportResize.bind(this));
  }

  close() {
    if (this.overlay.parentNode) {
      document.body.removeChild(this.overlay);
    }
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.handleEscape);
    window.removeEventListener("resize", this.handleViewportResize.bind(this));
    this.onClose();
  }

  protected createButton(
    text: string,
    onClick: () => void,
    primary = true,
    disabled = false
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "webauthn-button";

    if (disabled) {
      button.classList.add("disabled");
      button.disabled = true;
    } else if (primary) {
      button.classList.add("primary");
    } else {
      button.classList.add("secondary");
    }

    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  protected showLoading(message: string) {
    this.modal.innerHTML = "";

    const loadingContainer = document.createElement("div");
    loadingContainer.className = "webauthn-loading";

    const spinner = document.createElement("div");
    spinner.className = "webauthn-spinner";
    loadingContainer.appendChild(spinner);

    const text = document.createElement("p");
    text.textContent = message;
    text.style.color = "#666";
    loadingContainer.appendChild(text);

    this.modal.appendChild(loadingContainer);
  }

  protected showError(message: string) {
    const error = document.createElement("div");
    error.className = "webauthn-error";
    error.textContent = message;
    this.modal.insertBefore(error, this.modal.firstChild);
  }

  private handleViewportResize() {
    // Handle mobile keyboard appearance/disappearance
    const currentHeight = window.innerHeight;
    const heightDifference = this.initialViewportHeight - currentHeight;

    // If viewport height decreased significantly (likely keyboard appeared)
    if (heightDifference > 150) {
      this.modal.style.maxHeight = "70vh";
      this.modal.style.transform = "translateY(-20px)";
    } else {
      this.modal.style.maxHeight = "90vh";
      this.modal.style.transform = "";
    }
  }
}
