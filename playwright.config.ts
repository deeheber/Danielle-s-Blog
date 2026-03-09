import { defineConfig, devices } from "@playwright/test"

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4321"
const isCI = !!process.env.CI

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? "github" : "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Starts a local preview server unless PLAYWRIGHT_BASE_URL is set.
  // TODO: add a workflow to run these against Cloudflare branch deploys
  ...(!process.env.PLAYWRIGHT_BASE_URL && {
    webServer: {
      command: "npm run preview",
      url: "http://localhost:4321",
      reuseExistingServer: !isCI,
    },
  }),
})
