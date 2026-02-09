/**
 * Fixtures Index
 * Central export point for all mock data and fixtures
 * 
 * Usage:
 * import { featuredCreator, mockLeaderboard } from "@/fixtures";
 */

// Re-export types
export type {
  CreatorStats,
  CreatorFixture,
  SpotlightCreatorFixture,
  ActivityAction,
  LeaderboardEntry,
  CampaignFixture,
  BrandFixture,
  PaymentFixture,
  SubmissionFixture,
} from "./types";

// Re-export creator fixtures
export {
  featuredCreator,
  spotlightCreators,
  creators,
} from "./creators.fixtures";

// Re-export leaderboard fixtures
export {
  mockLeaderboard,
  expandedLeaderboard,
} from "./leaderboard.fixtures";

// Re-export activity fixtures
export {
  liveActivity,
  expandedActivityFeed,
} from "./activity.fixtures";
