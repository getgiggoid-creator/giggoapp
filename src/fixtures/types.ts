/**
 * Fixture Type Definitions
 * Defines types for all mock data used in Giggo testing and development
 * 
 * These types mirror the actual database schemas and API responses
 * to ensure fixtures remain realistic and maintainable.
 */

// ============================================================================
// CREATOR FIXTURES
// ============================================================================

export interface CreatorStats {
  followers: number;
  engagement: number; // decimal ratio (e.g., 0.085 = 8.5%)
  totalEarnings: number;
  completedGigs: number;
  rating: number;
  responseTime: string;
  portfolioCount: number;
}

export interface CreatorFixture {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverVideo: string;
  coverPoster: string;
  niche: string;
  platform: "TikTok" | "Instagram" | "YouTube" | "Twitter";
  stats: CreatorStats;
  badges: string[];
  status: "Open to Work" | "Busy" | "On Hiatus";
}

export interface SpotlightCreatorFixture {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverVideo: string;
  coverPoster: string;
  niche: string;
  platform: "TikTok" | "Instagram" | "YouTube" | "Twitter";
}

// ============================================================================
// ACTIVITY FIXTURES
// ============================================================================

export interface ActivityAction {
  user: string;
  actionKey: "submittedProposal" | "releasedPayment" | "joinedPlatform" | "likedSubmission";
  amount?: string;
  time: string; // relative time (e.g., "2m", "5m", "12m")
}

// ============================================================================
// LEADERBOARD FIXTURES
// ============================================================================

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  viewCount: number;
  engagementScore: number; // 0-10 scale
  submissionDate?: string;
  qualityScore?: number;
  verifiedStatus?: boolean;
}

// ============================================================================
// CAMPAIGN FIXTURES (Future)
// ============================================================================

export interface CampaignFixture {
  id: string;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  coverImage: string;
  type: "contest" | "deal";
  status: "draft" | "live" | "judging" | "completed";
  category: string;
  budget: number;
  submissionCount: number;
  viewCount: number;
  startDate: string;
  endDate: string;
}

// ============================================================================
// BRAND FIXTURES (Future)
// ============================================================================

export interface BrandFixture {
  id: string;
  companyName: string;
  logo: string;
  website: string;
  description: string;
  verificationStatus: "verified" | "pending" | "unverified";
  activeGigs: number;
  totalSpent: number;
}

// ============================================================================
// PAYMENT FIXTURES (Future)
// ============================================================================

export interface PaymentFixture {
  id: string;
  fromUser: string;
  toUser: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  transactionDate: string;
  description: string;
}

// ============================================================================
// SUBMISSION FIXTURES (Future)
// ============================================================================

export interface SubmissionFixture {
  id: string;
  campaignId: string;
  creatorId: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  engagementScore: number;
  submittedAt: string;
  status: "pending" | "under_review" | "approved" | "rejected";
}
