import { FunctionalComponent, h } from "@stencil/core";
import appState from "../../../store";

interface WalletNetworkChangedProps {
  onDismiss: () => void;
  onSwitchWallet: () => void;
}
export const WalletNetworkChanged: FunctionalComponent<
  WalletNetworkChangedProps
> = ({ onDismiss, onSwitchWallet }) => (
  <div class="switch-network-message-wrapper">
    <div class="header">
      <h2>You Must Change Networks</h2>
    </div>

    <div class="content">
      <p>
        We've detected that you need to change your wallet's network to
        <strong>{` ${appState.selector.options.network.networkId}`}</strong> for
        this dApp.
      </p>
      <p>
        Some wallets may not support changing networks. If you can not change
        networks you may consider switching to another wallet.
      </p>
    </div>
    <div class="action-buttons">
      <button class="left-button" onClick={onDismiss}>
        Dismiss
      </button>
      <button class="right-button" onClick={onSwitchWallet}>
        Switch Wallet
      </button>
    </div>
  </div>
);
