import { Skeleton } from "@/components/ui/skeleton";

/**
 * CleaningBoardSkeleton Component
 *
 * Loading skeleton that mimics the actual cleaning board structure
 * with grouped areas and small room grid buttons
 */
export const CleaningBoardSkeleton = () => {
  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Filters Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white py-3 px-4 rounded-full border backdrop-blur-sm shrink-0">
        <div className="flex gap-2 w-full md:w-auto">
          {/* Search Input Skeleton */}
          <Skeleton className="h-11 w-full md:w-80 rounded-3xl" />
          {/* Area Filter Skeleton */}
          <Skeleton className="h-11 w-full md:w-48 rounded-full" />
        </div>

        {/* Status Buttons Skeleton */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full" />
          ))}
        </div>
      </div>

      {/* Room Groups Skeleton */}
      <div className="flex-1 space-y-[3px] pb-24 pr-1 overflow-hidden">
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex flex-row items-start gap-4">
            {/* Floor Label Skeleton */}
            <Skeleton className="w-20 h-7 shrink-0 mt-3" />

            {/* Rooms Grid Skeleton */}
            <div className="flex flex-wrap gap-[3px] items-center flex-1">
              {[...Array(Math.floor(Math.random() * 8) + 6)].map(
                (_, roomIndex) => (
                  <Skeleton key={roomIndex} className="size-14 rounded" />
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend Skeleton - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-3 px-4 z-10">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
