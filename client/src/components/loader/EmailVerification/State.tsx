"use client"
import { useRouter } from 'next/navigation';

// LoadingState Component
const LoadingState = () => (
  <div className="max-w-md w-full text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#ff6b35] mx-auto mb-6"></div>
    <h1 className="text-3xl font-bold mb-3 text-white">
      Verifying your email...
    </h1>
    <p className="text-gray-400 text-lg">
      Please wait while we verify your new email address.
    </p>
  </div>
);

// ErrorState Component
const ErrorState = ({ error }: { error?: string }) => {
  const router = useRouter();
  
  return (
    <div className="max-w-md w-full text-center">
      <div className="bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <svg 
          className="w-10 h-10 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-3 text-red-500">
        Verification Failed
      </h1>
      
      <p className="text-gray-400 mb-6 text-lg">
        {error || 'The verification link is invalid or has expired.'}
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => router.push('/artist/verify-email-change')}
          className="w-full bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors font-medium"
        >
          Request New Link
        </button>
        
        <button
          onClick={() => router.push('/artist/dashboard/Profile')}
          className="w-full bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors font-medium"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

// SuccessState Component
const SuccessState = () => (
  <div className="max-w-md w-full text-center">
    <div className="bg-green-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
      <svg 
        className="w-10 h-10 text-green-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </svg>
    </div>
    
    <h1 className="text-3xl font-bold mb-3 text-green-500">
      Email Verified!
    </h1>
    
    <p className="text-gray-400 mb-4 text-lg">
      Your email has been successfully changed.
    </p>
    
    <p className="text-gray-500 text-sm">
      Redirecting you to your profile...
    </p>
    
    <div className="mt-6">
      <div className="animate-pulse flex space-x-2 justify-center">
        <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
        <div className="w-2 h-2 bg-[#ff6b35] rounded-full animation-delay-200"></div>
        <div className="w-2 h-2 bg-[#ff6b35] rounded-full animation-delay-400"></div>
      </div>
    </div>
  </div>
);

export { LoadingState, ErrorState, SuccessState };
