import { memo } from 'react';

const NoFriendsFound = memo(() => {
  return (
    <div className="card bg-base-200 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-24 h-24 text-base-content opacity-30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <div>
          <h3 className="font-semibold text-xl mb-2">No Friends Yet</h3>
          <p className="text-base-content opacity-70 max-w-sm">
            Start building your language learning network! Send friend requests to users below to begin practicing together.
          </p>
        </div>
      </div>
    </div>
  );
});

NoFriendsFound.displayName = 'NoFriendsFound';

export default NoFriendsFound;