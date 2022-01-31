import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  testMatch: /.*\.e2e\.ts/,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    headless: !process.env.CI,
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};
export default config;
