import { newE2EPage } from "@stencil/core/testing";

describe("wallet-network-changed", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<wallet-network-changed></wallet-network-changed>");
    const element = await page.find("wallet-network-changed");
    expect(element).toHaveClass("hydrated");
  });

  it("renders changes to the name data", async () => {
    const page = await newE2EPage();

    await page.setContent("<wallet-network-changed></wallet-network-changed>");
    const component = await page.find("wallet-network-changed");
    const element = await page.find("wallet-network-changed >>> div");
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
