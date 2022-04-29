import { newSpecPage } from "@stencil/core/testing";
import { CloseButton } from "./close-button";

describe("close-button", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [CloseButton],
      html: "<close-button></close-button>",
    });
    expect(root).toEqualHtml(`
      <close-button>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </close-button>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [CloseButton],
      html: `<close-button first="Stencil" last="'Don't call me a framework' JS"></close-button>`,
    });
    expect(root).toEqualHtml(`
      <close-button first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </close-button>
    `);
  });
});
