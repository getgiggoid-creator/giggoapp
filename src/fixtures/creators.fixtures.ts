/**
 * Creator Fixtures
 * Mock data for creator profiles, featured creators, and spotlight creators
 * Used in landing page and testing scenarios
 * 
 * Data is designed to be realistic and representative of actual creator profiles
 */

import type {
  CreatorFixture,
  SpotlightCreatorFixture,
} from "./types";

// ============================================================================
// FEATURED CREATOR
// ============================================================================

/**
 * Featured creator displayed prominently on landing page
 * Represents a top-performing, verified creator with substantial following
 */
export const featuredCreator: CreatorFixture = {
  id: "creator_001",
  name: "Sarah Milano",
  handle: "@sarah.style",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  coverVideo: "https://cdn.coverr.co/videos/coverr-fashion-photoshoot-model-5348/1080p.mp4",
  coverPoster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  niche: "Fashion & Style",
  platform: "TikTok",
  stats: {
    followers: 2400000,
    engagement: 0.085, // 8.5%
    totalEarnings: 14250,
    completedGigs: 42,
    rating: 4.8,
    responseTime: "2h",
    portfolioCount: 12,
  },
  badges: ["Verified", "Top Rated"],
  status: "Open to Work",
};

// ============================================================================
// SPOTLIGHT CREATORS (Featured in secondary carousel)
// ============================================================================

/**
 * Collection of spotlight creators showcasing diversity of niches
 * Each represents a strong performer in their respective category
 */
export const spotlightCreators: SpotlightCreatorFixture[] = [
  {
    id: "creator_004",
    name: "Jake Fitness",
    handle: "@jake.fit",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-man-doing-crossfit-exercises-5120/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    niche: "Fitness",
    platform: "Instagram",
  },
  {
    id: "creator_005",
    name: "Emma Glow",
    handle: "@emma.beauty",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-applying-makeup-in-mirror-5432/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    niche: "Beauty",
    platform: "YouTube",
  },
];

// ============================================================================
// ADDITIONAL CREATORS (For expanded listings)
// ============================================================================

/**
 * Pool of creators for populated creator listings
 * Each has distinct niche and personality
 */
export const creators: CreatorFixture[] = [
  {
    id: "creator_001",
    name: "Sarah Milano",
    handle: "@sarah.style",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-fashion-photoshoot-model-5348/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    niche: "Fashion & Style",
    platform: "TikTok",
    stats: {
      followers: 2400000,
      engagement: 0.085,
      totalEarnings: 14250,
      completedGigs: 42,
      rating: 4.8,
      responseTime: "2h",
      portfolioCount: 12,
    },
    badges: ["Verified", "Top Rated"],
    status: "Open to Work",
  },
  {
    id: "creator_002",
    name: "Mike DeVera",
    handle: "@mike_dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-man-working-on-laptop-2845/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1516534775068-bb57c9c0a8d5?auto=format&fit=crop&w=800&q=80",
    niche: "Technology & Code",
    platform: "YouTube",
    stats: {
      followers: 850000,
      engagement: 0.065,
      totalEarnings: 8500,
      completedGigs: 28,
      rating: 4.6,
      responseTime: "4h",
      portfolioCount: 18,
    },
    badges: ["Verified"],
    status: "Open to Work",
  },
  {
    id: "creator_003",
    name: "Lisa Arora",
    handle: "@lisa.art",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-woman-painting-art-3120/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1578926314433-8e82e1a8c937?auto=format&fit=crop&w=800&q=80",
    niche: "Art & Design",
    platform: "Instagram",
    stats: {
      followers: 650000,
      engagement: 0.095,
      totalEarnings: 12300,
      completedGigs: 35,
      rating: 4.9,
      responseTime: "6h",
      portfolioCount: 24,
    },
    badges: ["Top Rated"],
    status: "Open to Work",
  },
  {
    id: "creator_004",
    name: "Jake Fitness",
    handle: "@jake.fit",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-man-doing-crossfit-exercises-5120/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    niche: "Fitness",
    platform: "Instagram",
    stats: {
      followers: 1200000,
      engagement: 0.072,
      totalEarnings: 16800,
      completedGigs: 48,
      rating: 4.7,
      responseTime: "1h",
      portfolioCount: 15,
    },
    badges: ["Verified", "Top Rated"],
    status: "Open to Work",
  },
  {
    id: "creator_005",
    name: "Emma Glow",
    handle: "@emma.beauty",
    avatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=150&q=80",
    coverVideo: "https://cdn.coverr.co/videos/coverr-applying-makeup-in-mirror-5432/1080p.mp4",
    coverPoster: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    niche: "Beauty",
    platform: "YouTube",
    stats: {
      followers: 980000,
      engagement: 0.088,
      totalEarnings: 15600,
      completedGigs: 44,
      rating: 4.8,
      responseTime: "3h",
      portfolioCount: 20,
    },
    badges: ["Verified"],
    status: "Open to Work",
  },
];
