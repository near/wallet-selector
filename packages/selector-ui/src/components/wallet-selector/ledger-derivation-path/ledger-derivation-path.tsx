import { Component, Event, EventEmitter, h, Prop, State, Watch } from "@stencil/core";
import { DEFAULT_DERIVATION_PATH } from "../../../../../core/src/lib/constants";
import { ChangeEvent } from "react";

@Component({
  tag: "ledger-derivation-path",
  styleUrl: "ledger-derivation-path.scss",
  shadow: true,
})
export class LedgerDerivationPath {
  @Prop() selector: any;
  @Watch("selector")
  watchSelector(newValue) {
    this.selector = newValue;
  }
  @State() isLoading: boolean;
  @State() ledgerError: string;
  @State() ledgerDerivationPath = DEFAULT_DERIVATION_PATH;

  @Event() nearBackEventLedger: EventEmitter<MouseEvent>;

  handleDerivationPathChange (e: ChangeEvent<HTMLInputElement>) {
    this.ledgerDerivationPath = e.target.value;
  };

  handleConnectClick() {
    this.isLoading = true;
    // TODO: Can't assume "ledger" once we implement more hardware wallets.
    const wallet = this.selector.wallet("ledger");

    if (wallet.type !== "hardware") {
      return;
    }

    this.isLoading = true;

    wallet
      .connect({ derivationPath: this.ledgerDerivationPath })
      .then(() => {
        // onConnected();
      })
      .catch((err) => this.ledgerError =`Error: ${err.message}`)
      .finally(() => this.isLoading = false)
  };

  handleEnterClick(e){
    if (e.key === "Enter") {
      this.handleConnectClick();
    }
  };

  componentWillLoad() {
    this.watchSelector(this.selector);
  }

  render() {
    return (
      <div class="Modal-body Modal-choose-ledger-derivation-path">
        <p>
          Make sure your Ledger is plugged in, then enter an account id to
          connect:
        </p>
        <div class="derivation-paths-list">
          <input
            type="text"
            class={this.ledgerError ? "input-error" : ""}
            placeholder="Derivation Path"
            value={this.ledgerDerivationPath}
            onChange={this.handleDerivationPathChange.bind(this)}
            readOnly={this.isLoading}
            onKeyPress={this.handleEnterClick.bind(this)}
          />
          {this.ledgerError && <p class="error">{this.ledgerError}</p>}
        </div>
        <div class="derivation-paths--actions">
          <button class="left-button" disabled={this.isLoading} onClick={(e) => {this.nearBackEventLedger.emit(e)}}>
            Back
          </button>
          <button
            class="right-button"
            onClick={this.handleConnectClick.bind(this)}
            disabled={this.isLoading}
          >
            {this.isLoading ? "Connecting..." : "Connect"}
          </button>
        </div>
      </div>
    );
  }
}
