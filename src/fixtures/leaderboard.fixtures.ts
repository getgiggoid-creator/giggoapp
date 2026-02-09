/**
 * Leaderboard Fixtures
 * Mock data for campaign leaderboards and rankings
 * 
 * Represents realistic leaderboard entries with engagement metrics
 * and quality scores for campaign submissions
 */

import type { LeaderboardEntry } from "./types";

// ============================================================================
// DEFAULT LEADERBOARD (Campaign submissions ranking)
// ============================================================================

/**
 * Default mock leaderboard with realistic engagement metrics
 * Shows ranking with view counts and engagement scores
 * Used in CampaignDetail page for preview
 */
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "creator_101",
    username: "creativemaya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    viewCount: 125000,
    engagementScore: 8.5,
    submissionDate: "2024-01-15",
    qualityScore: 9.2,
    verifiedStatus: true,
  },
  {
    rank: 2,
    userId: "creator_102",
    username: "viralking",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    viewCount: 98000,
    engagementScore: 7.2,
    submissionDate: "2024-01-14",
    qualityScore: 8.1,
    verifiedStatus: true,
  },
  {
    rank: 3,
    userId: "creator_103",
    username: "dancequeen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    viewCount: 87500,
    engagementScore: 9.1,
    submissionDate: "2024-01-13",
    qualityScore: 8.8,
    verifiedStatus: false,
  },
];

// ============================================================================
// EXPANDED LEADERBOARD (For full leaderboard view)
// ============================================================================

/**
 * Extended leaderboard with more entries
 * Shows broader distribution of submissions
 */
export const expandedLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "creator_101",
    username: "creativemaya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    viewCount: 125000,
    engagementScore: 8.5,
    submissionDate: "2024-01-15",
    qualityScore: 9.2,
    verifiedStatus: true,
  },
  {
    rank: 2,
    userId: "creator_102",
    username: "viralking",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    viewCount: 98000,
    engagementScore: 7.2,
    submissionDate: "2024-01-14",
    qualityScore: 8.1,
    verifiedStatus: true,
  },
  {
    rank: 3,
    userId: "creator_103",
    username: "dancequeen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    viewCount: 87500,
    engagementScore: 9.1,
    submissionDate: "2024-01-13",
    qualityScore: 8.8,
    verifiedStatus: false,
  },
  {
    rank: 4,
    userId: "creator_104",
    username: "techtutor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    viewCount: 72300,
    engagementScore: 6.8,
    submissionDate: "2024-01-12",
    qualityScore: 7.9,
    verifiedStatus: true,
  },
  {
    rank: 5,
    userId: "creator_105",
    username: "artisticvibe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    viewCount: 65400,
    engagementScore: 8.2,
    submissionDate: "2024-01-11",
    qualityScore: 8.6,
    verifiedStatus: false,
  },
  {
    rank: 6,
    userId: "creator_106",
    username: "fitnessguru",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop",
    viewCount: 58900,
    engagementScore: 7.4,
    submissionDate: "2024-01-10",
    qualityScore: 7.8,
    verifiedStatus: true,
  },
  {
    rank: 7,
    userId: "creator_107",
    username: "beautyblend",
    avatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop",
    viewCount: 51200,
    engagementScore: 8.7,
    submissionDate: "2024-01-09",
    qualityScore: 9.0,
    verifiedStatus: false,
  },
  {
    rank: 8,
    userId: "creator_108",
    username: "foodlover",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    viewCount: 43800,
    engagementScore: 6.9,
    submissionDate: "2024-01-08",
    qualityScore: 7.5,
    verifiedStatus: true,
  },
  {
    rank: 9,
    userId: "creator_109",
    username: "musicproducer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    viewCount: 38700,
    engagementScore: 8.0,
    submissionDate: "2024-01-07",
    qualityScore: 8.2,
    verifiedStatus: false,
  },
  {
    rank: 10,
    userId: "creator_110",
    username: "fashionista",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    viewCount: 32100,
    engagementScore: 7.5,
    submissionDate: "2024-01-06",
    qualityScore: 7.7,
    verifiedStatus: true,
  },
];
