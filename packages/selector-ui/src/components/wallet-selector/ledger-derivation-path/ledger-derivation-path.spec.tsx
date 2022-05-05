import { newSpecPage } from "@stencil/core/testing";
import { LedgerDerivationPath } from "./ledger-derivation-path";

describe("ledger-derivation-path", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [LedgerDerivationPath],
      html: "<ledger-derivation-path></ledger-derivation-path>",
    });
    expect(root).toEqualHtml(`
      <ledger-derivation-path>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </ledger-derivation-path>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [LedgerDerivationPath],
      html: `<ledger-derivation-path first="Stencil" last="'Don't call me a framework' JS"></ledger-derivation-path>`,
    });
    expect(root).toEqualHtml(`
      <ledger-derivation-path first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </ledger-derivation-path>
    `);
  });
});
