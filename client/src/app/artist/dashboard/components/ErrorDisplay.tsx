export const ErrorDisplay = ({ onRetry, message }: { 
  onRetry: () => void; 
  message?: string;
}) => (
  <div className="text-center text-red-400 p-8">
    <p>{message || 'Failed to load profile data'}</p>
    <button onClick={onRetry} className="mt-2 text-[#ff6b35] hover:underline">
      Try again
    </button>
  </div>
);