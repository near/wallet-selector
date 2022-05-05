import {
  Component,
  h,
  Prop,
  Watch,
  State,
  Event,
  EventEmitter,
} from "@stencil/core";
import { Wallet, WalletState } from "@near-wallet-selector/core";
import { ModalOptions } from "../modal.types";

@Component({
  tag: "wallet-options",
  styleUrl: "wallet-options.scss",
  shadow: true,
})
export class WalletOptions {
  @Prop() selector: any;
  @Watch("selector")
  watchSelector(newValue: any) {
    this.selector = newValue;
    if (this.selector) {
      this.selector.store.observable.subscribe((state) => {
        this.getAvailableWallets(state.wallets).then(
          (availableWallets) => (this.availableWallets = availableWallets)
        );
      });
    }
  }

  @Prop() options?: ModalOptions;
  @Watch("options")
  watchOptions(newValue: ModalOptions) {
    this.options = newValue;
  }

  @State() availableWallets: Array<WalletState> = [];
  @State() connecting = false;
  @State() walletInfoVisible = false;

  @Event() nearConnectHardwareWallet: EventEmitter<MouseEvent>;
  @Event() nearErrorWalletOptions: EventEmitter<string>;
  @Event() nearConnected: EventEmitter<void>;

  async getAvailableWallets(wallets: Array<WalletState>) {
    const result: Array<WalletState> = [];

    for (let i = 0; i < wallets.length; i += 1) {
      const wallet = this.selector.wallet(wallets[i].id);

      if (await wallet.isAvailable()) {
        result.push(wallets[i]);
      }
    }

    return result;
  }

  handleWalletClick(wallet: Wallet) {
    if (this.connecting) {
      return;
    }

    if (wallet.type === "hardware") {
      return this.nearConnectHardwareWallet.emit();
    }

    this.connecting = true;

    wallet
      .connect()
      .then(() => this.nearConnected.emit())
      .catch((err) => {
        // if (errors.isWalletNotInstalledError(err)) {
        //   return onWalletNotInstalled(wallet);
        // }

        console.log(`Failed to select ${wallet.name}`);
        console.log(err);
        // logger.log(`Failed to select ${wallet.name}`);
        // logger.error(err);

        this.nearErrorWalletOptions.emit(
          `Failed to connect with ${wallet.name}: ${err.message}`
        );
      })
      .finally(() => (this.connecting = false));
  }

  componentWillLoad() {
    this.watchSelector(this.selector);
    this.watchOptions(this.options);
  }
  render() {
    return [
      <div class="Modal-body Modal-select-wallet-option">
        <p class="Modal-description">
          {this.options?.description ||
            "Please select a wallet to connect to this dApp:"}
        </p>
        <ul
          class={
            "Modal-option-list " + (this.connecting ? "selection-process" : "")
          }
        >
          {this.availableWallets.reduce((result, { id, selected }) => {
            const wallet = this.selector.wallet(id);

            const { name, description, iconUrl } = wallet;

            result.push(
              <li
                key={id}
                id={id}
                class={selected ? "selected-wallet" : ""}
                onClick={
                  selected
                    ? undefined
                    : this.handleWalletClick.bind(this, wallet)
                }
              >
                <div title={description || ""}>
                  <img src={iconUrl} alt={name} />
                  <div>
                    <span>{name}</span>
                  </div>
                  {selected && (
                    <div class="selected-wallet-text">
                      <span>selected</span>
                    </div>
                  )}
                </div>
              </li>
            );

            return result;
          }, [])}
        </ul>
      </div>,
      <div class="info">
        <span
          onClick={() => {
            this.walletInfoVisible = !this.walletInfoVisible;
          }}
        >
          What is a Wallet?
        </span>
        <div
          class={`info-description ${
            this.walletInfoVisible ? "show" : "hide"
          }-explanation`}
        >
          <p>
            Wallets are used to send, receive and store digital assets. There
            are different types of wallets. They can be an extension added to
            your browser, a hardware device plugged into your computer,
            web-based or an app on your mobile device.
          </p>
        </div>
      </div>,
    ];
  }
}
