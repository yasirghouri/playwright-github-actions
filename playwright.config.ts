import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 0 : 0,
  reporter: process.env.CI
    ? [
        // CI reporters
        ["list", { printSteps: true }],
        ["html", { outputFile: "playwright-report", open: "never" }],
        ["json", { outputFile: "playwright-report/test-results.json" }],
      ]
    : [
        // Local reporters
        ["list", { printSteps: true }],
        ["html", { open: "on-failure", outputFile: "playwright-report" }],
        ["json", { outputFile: "playwright-report/test-results.json" }],
      ],

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  use: {
    baseURL: "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    testIdAttribute: "data-test",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
