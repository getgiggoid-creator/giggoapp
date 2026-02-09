/**
 * Activity Fixtures
 * Mock data for live activity feeds and notifications
 * 
 * Represents various user actions on the platform
 * Used in landing pages and activity feeds
 */

import type { ActivityAction } from "./types";

// ============================================================================
// LIVE ACTIVITY FEED
// ============================================================================

/**
 * Mock live activity showing recent platform actions
 * Used on CreatorHub landing section
 */
export const liveActivity: ActivityAction[] = [
  {
    user: "@mike_dev",
    actionKey: "submittedProposal",
    time: "2m",
  },
  {
    user: "Brand Co.",
    actionKey: "releasedPayment",
    amount: "$450",
    time: "5m",
  },
  {
    user: "@lisa.art",
    actionKey: "joinedPlatform",
    time: "12m",
  },
];

// ============================================================================
// EXTENDED ACTIVITY FEED (For full activity view)
// ============================================================================

/**
 * Extended activity feed with more entries
 * Shows broader range of platform activities
 */
export const expandedActivityFeed: ActivityAction[] = [
  {
    user: "@mike_dev",
    actionKey: "submittedProposal",
    time: "2m",
  },
  {
    user: "Brand Co.",
    actionKey: "releasedPayment",
    amount: "$450",
    time: "5m",
  },
  {
    user: "@lisa.art",
    actionKey: "joinedPlatform",
    time: "12m",
  },
  {
    user: "@sarah.style",
    actionKey: "submittedProposal",
    time: "18m",
  },
  {
    user: "Creative Agency",
    actionKey: "releasedPayment",
    amount: "$1,200",
    time: "25m",
  },
  {
    user: "@jane_tech",
    actionKey: "joinedPlatform",
    time: "31m",
  },
  {
    user: "@fitness_hub",
    actionKey: "submittedProposal",
    time: "42m",
  },
  {
    user: "Brand X",
    actionKey: "releasedPayment",
    amount: "$750",
    time: "58m",
  },
];
