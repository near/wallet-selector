import { newE2EPage } from "@stencil/core/testing";

describe("ledger-derivation-path", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<ledger-derivation-path></ledger-derivation-path>");
    const element = await page.find("ledger-derivation-path");
    expect(element).toHaveClass("hydrated");
  });

  it("renders changes to the name data", async () => {
    const page = await newE2EPage();

    await page.setContent("<ledger-derivation-path></ledger-derivation-path>");
    const component = await page.find("ledger-derivation-path");
    const element = await page.find("ledger-derivation-path >>> div");
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty("first", "James");
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty("last", "Quincy");
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty("middle", "Earl");
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
