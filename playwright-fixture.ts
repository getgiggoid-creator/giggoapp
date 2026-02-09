/**
 * Giggo Playwright Fixtures
 * 
 * Extends lovable-agent-playwright-config with Giggo-specific test utilities
 * and fixtures for E2E testing of marketplace features.
 */

import {
  test as base,
  expect,
} from "lovable-agent-playwright-config/fixture";

// ============================================================================
// FIXTURE TYPES
// ============================================================================

type TestContext = {
  /**
   * Helper for navigating and authenticating as creator
   * Sets up authenticated creator session
   */
  creatorPage: any;

  /**
   * Helper for navigating and authenticating as brand
   * Sets up authenticated brand session
   */
  brandPage: any;

  /**
   * Helper for seeding test data
   * Currently not used - future enhancement for database fixtures
   */
  testData: any;
};

// ============================================================================
// EXTENDED TEST FIXTURE
// ============================================================================

/**
 * Giggo test fixture extending lovable config
 * 
 * Usage in tests:
 * import { test } from "./playwright-fixture";
 * 
 * test("creator flow", async ({ creatorPage }) => {
 *   await creatorPage.goto("/campaigns");
 * });
 */
export const test = base.extend<TestContext>({
  /**
   * Creator authentication context
   * Provides authenticated page object for creator role
   */
  creatorPage: async ({ page }, use) => {
    // Setup: Navigate to auth
    // In real implementation, would authenticate with test credentials
    // For now, just provide the page object
    await use(page);
    // Cleanup: Sign out (when implemented)
  },

  /**
   * Brand authentication context
   * Provides authenticated page object for brand role
   */
  brandPage: async ({ page }, use) => {
    // Setup: Navigate to auth
    // In real implementation, would authenticate with test credentials
    // For now, just provide the page object
    await use(page);
    // Cleanup: Sign out (when implemented)
  },

  /**
   * Test data helpers
   * Future: Seed test data to database before tests
   */
  testData: async ({}, use) => {
    const helpers = {
      // Future: Add database seeding helpers
      // async seedCreator() { ... }
      // async seedCampaign() { ... }
      // async seedSubmission() { ... }
    };
    await use(helpers);
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export { expect };
