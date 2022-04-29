import { newSpecPage } from "@stencil/core/testing";
import { AlertMessage } from "./alert-message";

describe("alert-message", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [AlertMessage],
      html: "<alert-message></alert-message>",
    });
    expect(root).toEqualHtml(`
      <alert-message>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </alert-message>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [AlertMessage],
      html: `<alert-message first="Stencil" last="'Don't call me a framework' JS"></alert-message>`,
    });
    expect(root).toEqualHtml(`
      <alert-message first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </alert-message>
    `);
  });
});
