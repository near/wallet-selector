import { newSpecPage } from "@stencil/core/testing";
import { WalletOptions } from "./wallet-options";

describe("wallet-options", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [WalletOptions],
      html: "<wallet-options></wallet-options>",
    });
    expect(root).toEqualHtml(`
      <wallet-options>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </wallet-options>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [WalletOptions],
      html: `<wallet-options first="Stencil" last="'Don't call me a framework' JS"></wallet-options>`,
    });
    expect(root).toEqualHtml(`
      <wallet-options first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </wallet-options>
    `);
  });
});
