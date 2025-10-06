import { Skeleton } from '@/components/ui/skeleton';

function ContentSkeleton() {
  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 bg-gray-800" />
          <Skeleton className="h-4 w-96 bg-gray-800" />
        </div>

        {/* Content lines skeleton */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full bg-gray-700" />
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full bg-gray-700 rounded-lg" />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-3 w-1/2 bg-gray-700" />
            </div>
          ))}
        </div>

        {/* Additional content skeleton */}
        <div className="space-y-3 mt-8">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full bg-gray-700" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentSkeleton;
