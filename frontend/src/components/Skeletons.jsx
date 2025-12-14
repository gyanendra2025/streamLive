import { memo } from 'react';

const UserCardSkeleton = memo(() => (
  <div className="card bg-base-200 animate-pulse">
    <div className="card-body p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="avatar size-16 rounded-full bg-base-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-3 bg-base-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-base-300 rounded-full w-20"></div>
        <div className="h-6 bg-base-300 rounded-full w-24"></div>
      </div>
      <div className="h-3 bg-base-300 rounded w-full"></div>
      <div className="h-10 bg-base-300 rounded w-full"></div>
    </div>
  </div>
));

UserCardSkeleton.displayName = 'UserCardSkeleton';

const FriendCardSkeleton = memo(() => (
  <div className="card bg-base-200 animate-pulse">
    <div className="card-body p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="avatar size-12 rounded-full bg-base-300"></div>
        <div className="h-4 bg-base-300 rounded w-24"></div>
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-base-300 rounded-full w-20"></div>
        <div className="h-5 bg-base-300 rounded-full w-24"></div>
      </div>
      <div className="h-9 bg-base-300 rounded w-full"></div>
    </div>
  </div>
));

FriendCardSkeleton.displayName = 'FriendCardSkeleton';

const NotificationSkeleton = memo(() => (
  <div className="card bg-base-200 animate-pulse">
    <div className="card-body p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar w-14 h-14 rounded-full bg-base-300"></div>
          <div className="space-y-2">
            <div className="h-4 bg-base-300 rounded w-32"></div>
            <div className="flex gap-2">
              <div className="h-5 bg-base-300 rounded-full w-16"></div>
              <div className="h-5 bg-base-300 rounded-full w-20"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-base-300 rounded"></div>
          <div className="h-9 w-20 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
));

NotificationSkeleton.displayName = 'NotificationSkeleton';

export const SkeletonGrid = memo(({ count = 3, type = 'user' }) => {
  const SkeletonComponent = {
    user: UserCardSkeleton,
    friend: FriendCardSkeleton,
    notification: NotificationSkeleton,
  }[type];

  return (
    <div className={`grid gap-4 ${
      type === 'friend' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
});

SkeletonGrid.displayName = 'SkeletonGrid';

export { UserCardSkeleton, FriendCardSkeleton, NotificationSkeleton };
