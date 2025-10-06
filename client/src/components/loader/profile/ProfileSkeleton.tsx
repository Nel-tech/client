import React from 'react';

// Loading Skeleton Component
export const ProfileSkeleton = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      </div>

      {/* Name Skeleton */}
      <div className="mb-4">
        <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>

      {/* Email Skeleton */}
      <div className="mb-4">
        <div className="h-3 bg-gray-300 rounded w-12 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-48 mx-auto"></div>
      </div>

      {/* Referral Link Skeleton */}
      <div className="mb-4">
        <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
          <div className="h-4 bg-gray-300 rounded flex-1 mr-3"></div>
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
