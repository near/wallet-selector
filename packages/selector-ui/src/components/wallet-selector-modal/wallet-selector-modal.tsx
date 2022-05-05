// import type { WalletSelector, WalletSelectorUIComponent } from "@near-wallet-selector/core";

import {
  Component,
  Element,
  h,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { Components } from "../../components";

export type Theme = "auto" | "dark" | "light";
@Component({
  tag: "wallet-selector-modal",
  styleUrl: "wallet-selector-modal.scss",
  shadow: true,
})
export class WalletSelectorModal {
  @Element() el: HTMLWalletSelectorModalElement;

  @State()
  opened = false;

  /**
   * The prefered theme for the modal.
   */
  @Prop() theme: Theme = "auto";

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
  @Listen("nearModalCloseEvent")
  async hide() {
    this.opened = false;
  }

  getThemeClass() {
    return this.theme ? `Modal-${this.theme}-theme` : "";
  }

  @Method()
  async setSelector(selector: unknown): Promise<void> {
    console.log("setSelector", selector);
    const component = this.el.shadowRoot.querySelector("wallet-selector");
    component.setSelector(selector as unknown as Components.WalletSelector);
  }

  render() {
    // if (!this.opened) return null;
    return (
      <div
        class={this.getThemeClass()}
        style={{ display: this.opened ? "block" : "none" }}
      >
        <div class="Modal">
          <wallet-selector>
            <close-button slot="close-btn" />
          </wallet-selector>
        </div>
      </div>
    );
  }
}
