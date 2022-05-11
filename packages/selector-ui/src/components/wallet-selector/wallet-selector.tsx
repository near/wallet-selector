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
  @State() routeName = "WalletOptions";
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

      this.routeName = "WalletNetworkChanged";
    });
  }

  @Method()
  async setRouteName(route: string) {
    this.routeName = route;
  }

  handleDismissClick() {
    const component = document.querySelector("wallet-selector-modal");
    component.hide();
    this.routeName = "WalletOptions";
    this.errorMessage = null;
  }

  render() {
    return (
      <div class="wallet-selector-wrapper">
        {this.routeName === "AlertMessage" && (
          <AlertMessage
            message={this.errorMessage}
            onBack={() => {
              this.errorMessage = null;
              this.routeName = "WalletOptions";
            }}
          />
        )}
        {this.routeName === "WalletOptions" && (
          <WalletOptions
            onConnectHardwareWallet={() => {
              this.routeName = "LedgerDerivationPath";
            }}
            onError={(err) => {
              this.errorMessage = err.message;
              this.routeName = "AlertMessage";
            }}
            onConnected={this.handleDismissClick}
          />
        )}
        {this.routeName === "LedgerDerivationPath" && (
          <LedgerDerivationPath
            onConnected={this.handleDismissClick}
            onBack={() => {
              {
                this.routeName = "WalletOptions";
              }
            }}
          />
        )}

        {this.routeName === "WalletNetworkChanged" && (
          <WalletNetworkChanged
            onSwitchWallet={() => {
              this.routeName = "WalletOptions";
            }}
            onDismiss={this.handleDismissClick}
          />
        )}
      </div>
    );
  }
}
