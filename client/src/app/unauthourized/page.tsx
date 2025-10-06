'use client';

import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

export default function Unauthorized() {
  const router = useRouter();
  const user = useAuthUser();

  const handleBack = () => {
    if (user) {
      if (user?.role === 'Fans') {
        router.push('/fans/dashboard');
      } else if (user.role === 'Artist') {
        router.push('/artists/dashboard');
      } else {
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-gray-400 mb-6 text-center">
        You don’t have permission to view this page.
      </p>
      <Button
        onClick={handleBack}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 shadow-lg transition"
      >
        Go Back
      </Button>
    </div>
  );
}
