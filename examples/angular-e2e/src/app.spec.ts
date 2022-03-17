import { baseUrl } from "./utils";

it("should start page", async () => {
  await page.goto(`${baseUrl}`);

  expect(true).toBeTruthy();
});
