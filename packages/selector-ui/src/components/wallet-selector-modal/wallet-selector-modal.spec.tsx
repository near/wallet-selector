import { newSpecPage } from "@stencil/core/testing";
import { WalletSelectorModal } from "./wallet-selector-modal";

describe("wallet-selector-modal", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [WalletSelectorModal],
      html: "<wallet-selector-modal></wallet-selector-modal>",
    });
    expect(root).toEqualHtml(`
      <wallet-selector-modal>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </wallet-selector-modal>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [WalletSelectorModal],
      html: `<wallet-selector-modal first="Stencil" last="'Don't call me a framework' JS"></wallet-selector-modal>`,
    });
    expect(root).toEqualHtml(`
      <wallet-selector-modal first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </wallet-selector-modal>
    `);
  });
});
