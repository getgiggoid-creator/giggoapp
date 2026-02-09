import { Skeleton } from "@/components/ui/skeleton";

const CreatorProfileSkeleton = () => (
  <div className="min-h-screen bg-[hsl(210,20%,98%)] dark:bg-background animate-in fade-in duration-300">
    {/* Top bar */}
    <div className="w-full py-3 text-center border-b border-border/50">
      <Skeleton className="h-4 w-16 mx-auto rounded" />
    </div>

    <div className="max-w-2xl mx-auto px-4">
      {/* Header skeleton */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <Skeleton className="w-28 h-28 rounded-full" />
        <Skeleton className="mt-5 h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-24" />
        <Skeleton className="mt-3 h-4 w-56" />
        <Skeleton className="mt-1 h-4 w-44" />

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-5">
          <Skeleton className="h-12 w-28 rounded-full" />
          <Skeleton className="h-12 w-28 rounded-full" />
        </div>

        {/* Share button */}
        <Skeleton className="mt-5 h-9 w-36 rounded-full" />
      </div>

      {/* Grid skeleton */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="rounded-xl" style={{ aspectRatio: "9/16" }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CreatorProfileSkeleton;
