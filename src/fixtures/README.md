# Giggo Fixtures

Central repository for mock data and test fixtures used throughout the Giggo platform.

## Overview

Fixtures are organized by domain:
- **Creators** - Creator profiles, spotlight creators, featured creators
- **Leaderboards** - Campaign submission rankings and leaderboard data
- **Activity** - Live activity feeds and notifications
- **Types** - TypeScript type definitions for all fixtures

## Usage

### Import fixtures

```tsx
import {
  featuredCreator,
  spotlightCreators,
  mockLeaderboard,
  liveActivity,
} from "@/fixtures";
```

### Use in components

```tsx
import { CreatorHub } from "@/components/landing/CreatorHub";
import { featuredCreator, spotlightCreators } from "@/fixtures";

export default function Page() {
  return (
    <div>
      {/* components can now reference fixtures */}
      <CreatorCard creator={featuredCreator} />
    </div>
  );
}
```

## File Structure

```
src/fixtures/
├── index.ts                    # Central exports
├── types.ts                    # Type definitions
├── creators.fixtures.ts        # Creator mock data
├── leaderboard.fixtures.ts     # Leaderboard mock data
├── activity.fixtures.ts        # Activity & notifications
└── README.md                   # This file
```

## Fixture Details

### Creators

**Files:** `creators.fixtures.ts`

**Available exports:**
- `featuredCreator` - Top-performing creator for landing hero
- `spotlightCreators` - Array of 2-5 featured creators
- `creators` - Full pool of creators for populated lists

**Data structure:**
```typescript
{
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverVideo: string;
  coverPoster: string;
  niche: string;
  platform: "TikTok" | "Instagram" | "YouTube" | "Twitter";
  stats: {
    followers: number;
    engagement: number;     // decimal ratio (0.085 = 8.5%)
    totalEarnings: number;
    completedGigs: number;
    rating: number;
    responseTime: string;
    portfolioCount: number;
  };
  badges: string[];
  status: "Open to Work" | "Busy" | "On Hiatus";
}
```

### Leaderboards

**Files:** `leaderboard.fixtures.ts`

**Available exports:**
- `mockLeaderboard` - Default 3-entry leaderboard
- `expandedLeaderboard` - 10-entry full leaderboard

**Data structure:**
```typescript
{
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  viewCount: number;
  engagementScore: number;       // 0-10 scale
  submissionDate?: string;
  qualityScore?: number;
  verifiedStatus?: boolean;
}
```

### Activity

**Files:** `activity.fixtures.ts`

**Available exports:**
- `liveActivity` - Default 3-entry activity feed
- `expandedActivityFeed` - Extended activity feed

**Data structure:**
```typescript
{
  user: string;
  actionKey: "submittedProposal" | "releasedPayment" | "joinedPlatform" | "likedSubmission";
  amount?: string;
  time: string;                  // relative time (e.g., "2m", "5h")
}
```

## Guidelines

### When to use fixtures

✅ Landing pages with preview data  
✅ E2E tests  
✅ Component development & storybook  
✅ Demo environments  
✅ Development without database

### When NOT to use fixtures

❌ Production environments (use real database)  
❌ Sensitive user data  
❌ Real transaction testing  

### Best practices

1. **Keep fixtures realistic** - Mock data should represent actual platform behavior
2. **Use consistent patterns** - Follow established fixture structure
3. **Add types** - Always add TypeScript types for new fixtures
4. **Document changes** - Update this README when adding fixtures
5. **Don't hardcode URLs** - Use fixture system instead of inline data
6. **Version fixtures** - Track fixture changes with data evolution

## Future Fixtures

The following fixtures are planned for future implementation:

- `campaigns.fixtures.ts` - Campaign/gig mock data
- `brands.fixtures.ts` - Brand profile mock data
- `payments.fixtures.ts` - Payment & transaction mock data
- `submissions.fixtures.ts` - Submission & video mock data
- `applications.fixtures.ts` - Application/proposal mock data

## Contributing

When adding new fixtures:

1. Create new file in `src/fixtures/`
2. Define types in `types.ts`
3. Add TypeScript interfaces
4. Export from `index.ts`
5. Document in this README
6. Keep data realistic and representative

## Resources

- [Fixtures Types](./types.ts)
- [Creator Fixtures](./creators.fixtures.ts)
- [Leaderboard Fixtures](./leaderboard.fixtures.ts)
- [Activity Fixtures](./activity.fixtures.ts)
