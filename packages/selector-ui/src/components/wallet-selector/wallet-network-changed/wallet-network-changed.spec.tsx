import { newSpecPage } from "@stencil/core/testing";
import { WalletNetworkChanged } from "./wallet-network-changed";

describe("wallet-network-changed", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [WalletNetworkChanged],
      html: "<wallet-network-changed></wallet-network-changed>",
    });
    expect(root).toEqualHtml(`
      <wallet-network-changed>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </wallet-network-changed>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [WalletNetworkChanged],
      html: `<wallet-network-changed first="Stencil" last="'Don't call me a framework' JS"></wallet-network-changed>`,
    });
    expect(root).toEqualHtml(`
      <wallet-network-changed first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </wallet-network-changed>
    `);
  });
});
