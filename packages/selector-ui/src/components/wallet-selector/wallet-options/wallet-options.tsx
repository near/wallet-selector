import {
  Component,
  h,
  Prop,
  Watch,
  State,
  Event,
  EventEmitter,
} from "@stencil/core";
import { ModuleState } from "@near-wallet-selector/core";

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
        this.modules = state.modules;
      });
    }
  }

  @State() modules: Array<ModuleState> = [];
  @State() connecting = false;
  @State() walletInfoVisible = false;

  @Event() nearConnectHardwareWallet: EventEmitter<MouseEvent>;
  @Event() nearErrorWalletOptions: EventEmitter<string>;
  @Event() nearConnected: EventEmitter<void>;

  async handleWalletClick(module: ModuleState) {
    if (this.connecting) {
      return;
    }

    try {
      this.connecting = true;
      const wallet = await module.wallet();

      if (wallet.type === "hardware") {
        return this.nearConnectHardwareWallet.emit();
      }

      await wallet.connect();
      this.nearConnected.emit();
    } catch (err) {
      const { name } = module.metadata;

      // logger.log(`Failed to select ${name}`);
      // logger.error(err);
      console.log(`Failed to select ${name}`);
      console.error(err);

      const message =
        err instanceof Error ? err.message : "Something went wrong";

      this.nearErrorWalletOptions.emit(
        `Failed to connect with ${name}: ${message}`
      );
    } finally {
      this.connecting = false;
    }
  }
  componentWillLoad() {
    this.watchSelector(this.selector);
  }
  render() {
    return [
      <div class="wallet-options-wrapper">
        <p class="description">
          Please select a wallet to connect to this dApp:
        </p>
        <ul
          class={"options-list " + (this.connecting ? "selection-process" : "")}
        >
          {this.modules.reduce((result, module) => {
            const { selectedWalletId } = this.selector.store.getState();
            const { name, description, iconUrl } = module.metadata;
            const selected = module.id === selectedWalletId;

            result.push(
              <li
                key={module.id}
                id={module.id}
                class={selected ? "selected-wallet" : ""}
                onClick={
                  selected
                    ? undefined
                    : this.handleWalletClick.bind(this, module)
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
