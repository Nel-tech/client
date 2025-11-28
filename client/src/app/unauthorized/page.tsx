

'use client';

import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  const router = useRouter();
  const user = useAuthUser();

  const handleBack = () => {
    if (!user) {
      router.replace('/auth/login');
      return;
    }

    const dashboardPath = user.role === 'Artist' 
      ? '/artist/dashboard' 
      : '/fans/dashboard';
    
    router.replace(dashboardPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
            <ShieldX className="w-16 h-16 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Access Denied
          </h1>
          <p className="text-gray-400">
            You don&apos;t have permission to access this page.
          </p>
        </div>

        <Button
          onClick={handleBack}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-6 py-3 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <p className="text-gray-500 text-sm">
          Need help? <a href="mailto:support@tropiqk.com" className="text-gray-300 hover:text-white underline">Contact support</a>
        </p>
      </div>
    </div>
  );
}
