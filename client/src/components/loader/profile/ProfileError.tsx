import { RefreshCw, User, AlertCircle } from 'lucide-react';

export const ProfileError = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Error Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Failed to Load Profile
        </h3>
        <p className="text-gray-600 text-sm">
          We couldn&apos;t load your profile information. Please check your
          connection and try again.
        </p>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <div className="flex justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      )}

      {/* Fallback Profile Layout */}
      <div className="mt-8 opacity-30">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-28 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};
