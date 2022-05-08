import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "wallet-network-changed",
  styleUrl: "wallet-network-changed.scss",
  shadow: true,
})
export class WalletNetworkChanged {
  @Prop() selector: any;

  @Event() nearWalletNetworkDismiss: EventEmitter<string>;
  @Event() nearSwitchWallet: EventEmitter<string>;

  render() {
    return (
      <div class="switch-network-message-wrapper">
        <div class="header">
          <h2>You Must Change Networks</h2>
        </div>

        <div class="content">
          <p>
            We've detected that you need to change your wallet's network to
            <strong>{` ${this.selector.options.network.networkId}`}</strong> for
            this dApp.
          </p>
          <p>
            Some wallets may not support changing networks. If you can not
            change networks you may consider switching to another wallet.
          </p>
        </div>
        <div class="actions">
          <button
            class="left-button"
            onClick={() => {
              this.nearWalletNetworkDismiss.emit();
            }}
          >
            Dismiss
          </button>
          <button
            class="right-button"
            onClick={() => {
              this.nearSwitchWallet.emit();
            }}
          >
            Switch Wallet
          </button>
        </div>
      </div>
    );
  }
}
