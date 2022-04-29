import { newSpecPage } from "@stencil/core/testing";
import { WalletSelector } from "./wallet-selector";

describe("wallet-selector", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [WalletSelector],
      html: "<wallet-selector></wallet-selector>",
    });
    expect(root).toEqualHtml(`
      <wallet-selector>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </wallet-selector>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [WalletSelector],
      html: `<wallet-selector first="Stencil" last="'Don't call me a framework' JS"></wallet-selector>`,
    });
    expect(root).toEqualHtml(`
      <wallet-selector first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </wallet-selector>
    `);
  });
});
