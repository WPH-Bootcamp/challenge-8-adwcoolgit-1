import { Skeleton } from '@/components/ui/skeleton';

const MovieCardSkeleton = () => (
  <div
    className="flex flex-col"
    style={{ width: 'var(--spacing-card-w)', height: 'var(--spacing-card-h)' }}
  >
    <Skeleton className="flex-1 min-h-0 w-full rounded-card" />
    <div className="mt-2 flex flex-col gap-1.5 px-0.5">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  </div>
);

export default MovieCardSkeleton;
