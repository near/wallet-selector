// import type { WalletSelector, WalletSelectorUIComponent } from "@near-wallet-selector/core";
import { Component, Method, h } from "@stencil/core";

@Component({
  tag: "wallet-selector",
  styleUrl: "wallet-selector.scss",
  shadow: true,
})
export class WalletSelectorComponen {
  private selector: unknown;

  @Method()
  async setSelector(selector: unknown): Promise<void> {
    this.selector = selector;
    console.log(this.selector);
  }

  render() {
    return <div class="Modal-content">
          <div class="Modal-header">
            <slot name="title">
              <h2>Connect Wallet</h2>
            </slot>
            <slot name="close-btn" />
          </div>
          {/* {routeName === "AlertMessage" && alertMessage && (
            <AlertMessage
              message={alertMessage}
              onBack={() => {
                setAlertMessage(null);
                setRouteName("WalletOptions");
              }}
            />
          )} */}
          {/* {routeName === "WalletOptions" && (
            <WalletOptions
              selector={selector}
              options={options}
              onWalletNotInstalled={(wallet) => {
                setNotInstalledWallet(wallet);
                return setRouteName("WalletNotInstalled");
              }}
              onConnectHardwareWallet={() => {
                setRouteName("LedgerDerivationPath");
              }}
              onConnected={handleDismissClick}
              onError={(message) => {
                setAlertMessage(message);
                setRouteName("AlertMessage");
              }}
            />
          )} */}
          {/* {routeName === "LedgerDerivationPath" && (
            <LedgerDerivationPath
              selector={selector}
              onConnected={handleDismissClick}
              onBack={() => setRouteName("WalletOptions")}
            />
          )} */}
          {/* {routeName === "WalletNotInstalled" && notInstalledWallet && (
            <WalletNotInstalled
              notInstalledWallet={notInstalledWallet}
              onBack={() => {
                setNotInstalledWallet(null);
                setRouteName("WalletOptions");
              }}
            />
          )} */}
          {/* {routeName === "WalletNetworkChanged" && (
            <WalletNetworkChanged
              selector={selector}
              onSwitchWallet={() => setRouteName("WalletOptions")}
              onDismiss={handleDismissClick}
            />
          )} */}
        </div>;
  }
}
