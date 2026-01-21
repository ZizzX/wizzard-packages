import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * Testing a library requires a test application
 */
export default defineConfig({
  testDir: './e2e/tests',
  timeout: process.env.CI ? 60 * 1000 : 30 * 1000,
  expect: {
    timeout: 5000,
  },

  // Global timeout for entire test run on CI
  globalTimeout: process.env.CI ? 20 * 60 * 1000 : undefined,

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:5173/wizzard-stepper-react/',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Navigation timeout
    navigationTimeout: process.env.CI ? 30000 : 15000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'react',
      testMatch: /react\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173/wizzard-stepper-react/',
      },
    },
    {
      name: 'vue',
      testMatch: /vue\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:5174/',
      },
    },
  ],

  // Run your local dev servers before starting the tests
  webServer: [
    {
      command: 'pnpm --filter demo dev',
      url: 'http://localhost:5173/wizzard-stepper-react/',
      reuseExistingServer: !process.env.CI,
      timeout: process.env.CI ? 180 * 1000 : 120 * 1000,
      stdout: 'pipe',
      stderr: 'pipe',
      // Add retries for readiness check
      ignoreHTTPSErrors: true,
    },
    {
      command: 'pnpm --filter @examples/vue-demo dev --host 127.0.0.1 --port 5174 --strictPort',
      url: 'http://127.0.0.1:5174/',
      reuseExistingServer: !process.env.CI,
      timeout: process.env.CI ? 180 * 1000 : 120 * 1000,
      stdout: 'pipe',
      stderr: 'pipe',
      // Add retries for readiness check
      ignoreHTTPSErrors: true,
    },
  ],

  // Maximum time for the entire test run
  maxFailures: process.env.CI ? 10 : undefined,
});
