import { Component, h, Listen, Method, Prop, State } from "@stencil/core";

export type Theme = 'auto' | 'dark' | 'light';
@Component({
  tag: "wallet-selector-modal",
  styleUrl: "wallet-selector-modal.scss",
  shadow: true,
})
export class WalletSelectorModal {
  @State()
  opened: boolean = true;

  /**
   * The prefered theme for the modal.
   */
  @Prop() theme: Theme = 'auto';

  /**
   * Method to show the modal.
   */
  @Method()
  async show() {
    this.opened = true;
  }

  /**
   * Method to hide the modal
   */
  @Method()
  @Listen('nearModalCloseEvent')
  async hide() {
    this.opened = false;
  }

  getThemeClass() {
    return this.theme ? `Modal-${this.theme}-theme` : '';
  }

  render() {
    if(!this.opened) return null;
    return  <div class={this.getThemeClass()}>
      <div class="Modal">
        <div class="Modal-content">
          <div class="Modal-header">
            <slot name="title">
              <h2>Connect Wallet</h2>
            </slot>
            <close-button></close-button>
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
        </div>
      </div>
    </div>

  }
}
