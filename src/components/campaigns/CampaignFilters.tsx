import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryChip } from "@/components/shared/CategoryChip";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CampaignFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  className?: string;
}

const categories = [
  { value: "all", label: "All" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "tech", label: "Tech" },
  { value: "beauty", label: "Beauty" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "gaming", label: "Gaming" },
  { value: "fitness", label: "Fitness" },
];

const types = [
  { value: "all", label: "All Types" },
  { value: "contest", label: "Challenge" },
  { value: "deal", label: "Collab" },
];

export const CampaignFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  className,
}: CampaignFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search gigs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 bg-card"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-full"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Category chips - horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
        {categories.map((category) => (
          <CategoryChip
            key={category.value}
            label={category.label}
            selected={selectedCategory === category.value}
            onClick={() => onCategoryChange(category.value)}
            className="shrink-0"
          />
        ))}
      </div>

      {/* Additional filters */}
      {showFilters && (
        <div className="flex gap-2 animate-fade-in">
          {types.map((type) => (
            <CategoryChip
              key={type.value}
              label={type.label}
              selected={selectedType === type.value}
              onClick={() => onTypeChange(type.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
