import { Component, Prop, h, State, Method } from "@stencil/core";
import { format } from "../../utils/utils";
import { WalletSelectorParams, setupWalletSelector } from "@near-wallet-selector/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss",
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() open: boolean = false;

  @Method()
  show(){
    this.open = true;
  }

  @Method()
  close(){
    this.open = false;
  }


  @Method()
  async init(params: WalletSelectorParams) {
    params?.ui().then(ui => ui.setSelector(selector))

  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="mydiv">Hello, World! I'm {this.getText()}</div>;
  }
}
