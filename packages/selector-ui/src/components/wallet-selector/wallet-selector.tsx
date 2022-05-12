import { Component, Method, h, State } from "@stencil/core";
import { AlertMessage } from "./alert-message/alert-message";
import { WalletNetworkChanged } from "./wallet-network-changed/wallet-network-changed";
import { LedgerDerivationPath } from "./ledger-derivation-path/ledger-derivation-path";
import { WalletOptions } from "./wallet-options/wallet-options";
import { WalletSelector } from "@near-wallet-selector/core";
import appState from "../../store";

@Component({
  tag: "wallet-selector",
  styleUrl: "wallet-selector.scss",
  shadow: true,
})
export class WalletSelectorComponent {
  @State() errorMessage: string;

  @Method()
  async setSelector(selector: WalletSelector): Promise<void> {
    if (!appState.selector) {
      appState.selector = selector;
    }

    appState.selector.on("networkChanged", ({ networkId }) => {
      if (networkId === appState.selector.options.network.networkId) {
        return this.handleDismissClick();
      }

      appState.routeName = "WalletNetworkChanged";
    });
  }

  handleDismissClick() {
    const component = document.querySelector("wallet-selector-modal");
    component.hide();
    appState.routeName = "WalletOptions";
    this.errorMessage = null;
  }

  render() {
    return (
      <div class="wallet-selector-wrapper">
        {appState.routeName === "AlertMessage" && (
          <AlertMessage
            message={this.errorMessage}
            onBack={() => {
              this.errorMessage = null;
              appState.routeName = "WalletOptions";
            }}
          />
        )}
        {appState.routeName === "WalletOptions" && (
          <WalletOptions
            onConnectHardwareWallet={() => {
              appState.routeName = "LedgerDerivationPath";
            }}
            onError={(err) => {
              this.errorMessage = err.message;
              appState.routeName = "AlertMessage";
            }}
            onConnected={this.handleDismissClick}
          />
        )}
        {appState.routeName === "LedgerDerivationPath" && (
          <LedgerDerivationPath
            onConnected={this.handleDismissClick}
            onBack={() => {
              {
                appState.routeName = "WalletOptions";
              }
            }}
          />
        )}

        {appState.routeName === "WalletNetworkChanged" && (
          <WalletNetworkChanged
            onSwitchWallet={() => {
              appState.routeName = "WalletOptions";
            }}
            onDismiss={this.handleDismissClick}
          />
        )}
      </div>
    );
  }
}
