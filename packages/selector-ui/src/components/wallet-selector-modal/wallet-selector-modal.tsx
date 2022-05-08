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
import { MouseEvent } from "react";

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
    return this.theme ? `${this.theme}-theme` : "";
  }

  @Method()
  async setSelector(selector: unknown): Promise<void> {
    console.log("setSelector", selector);
    const component = this.el.shadowRoot.querySelector("wallet-selector");
    component.setSelector(selector as unknown as Components.WalletSelector);
  }

  @Listen("keydown", { target: "document" })
  handleKeyDownEvent(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.hide().then();
    }
  }

  handleDismissOutsideClick(e: MouseEvent) {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      this.hide().then();
    }
  }

  //TODO: Check for other solutions.
  attachFontsUrlToHead() {
    // Add custom font to page DOM since font-face doesn't work within Shadow DOM.
    const fontCssUrl =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap";
    let element = document.querySelector(`link[href="${fontCssUrl}"]`);

    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("href", fontCssUrl);
      document.head.appendChild(element);
    }
  }

  componentDidLoad() {
    this.attachFontsUrlToHead();
  }

  render() {
    return (
      <div
        class={this.getThemeClass()}
        style={{ display: this.opened ? "block" : "none" }}
      >
        <div class="modal" onClick={this.handleDismissOutsideClick.bind(this)}>
          <wallet-selector>
            <close-button slot="close-btn" />
          </wallet-selector>
        </div>
      </div>
    );
  }
}
