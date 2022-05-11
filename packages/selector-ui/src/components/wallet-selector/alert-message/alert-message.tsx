import { FunctionalComponent, h } from "@stencil/core";

interface AlertMessageProps {
  message: string;
  onBack: () => void;
}

export const AlertMessage: FunctionalComponent<AlertMessageProps> = ({
  message,
  onBack,
}) => (
  <div class="alert-message-wrapper">
    <p>{message}</p>
    <div class="action-buttons">
      <button class="left-button" onClick={onBack}>
        OK
      </button>
    </div>
  </div>
);
