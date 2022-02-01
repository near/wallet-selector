import { PlaywrightTestConfig, devices } from "@playwright/test";

const runningInCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  testMatch: /.*\.e2e\.ts/,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  forbidOnly: runningInCI,
  retries: runningInCI ? 2 : 0,
  workers: runningInCI ? 1 : undefined,
  reporter: "list",
  use: {
    headless: runningInCI,
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
