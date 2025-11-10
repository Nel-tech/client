'use client';

import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  const router = useRouter();
  const user = useAuthUser();

  const handleBack = () => {
    if (user) {
      // Convert role to lowercase for comparison
      // const role = user.role.toLowerCase();
      
      if (user?.role === 'Fan') {
        router.push('/fans/dashboard');
      } else if (user?.role === 'Artist') {
        router.push('/artist/dashboard');
      } else {
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  text-white p-6">
      {/* Animated Illustration */}
      <div className="relative mb-8">
        {/* Pulsing background circle */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-orange-500/10 rounded-full animate-pulse" />
        </div> */}
        
        {/* Shield Icon */}
        <div className="relative z-10">
          <ShieldAlert className="w-24 h-24 text-orange-500" strokeWidth={1.5} />
        </div>
        
        {/* Floating question marks */}
        <div className="absolute -top-4 -right-4 text-4xl opacity-50 animate-bounce">
          ❓
        </div>
        <div className="absolute -bottom-4 -left-4 text-3xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}>
          ❓
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Whoa There! 🛑
        </h1>
        
        <p className="text-xl font-semibold text-gray-300">
          Where are you going?
        </p>
        
        <p className="text-gray-400 leading-relaxed">
          Looks like you stumbled into a restricted area. This page isn&apos;t meant for you, 
          but don&apos;t worry – let&apos;s get you back to where you belong!
        </p>

        {/* {user && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-400">
              Logged in as: <span className="text-orange-500 font-semibold">{user.role}</span>
            </p>
          </div>
        )} */}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button
          onClick={handleBack}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-6 py-6 shadow-lg transition-all transform hover:scale-105 font-semibold text-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>
      </div>

      {/* Fun Footer Message */}
      <p className="text-gray-600 text-sm mt-12 text-center max-w-sm">
        💡 <span className="italic">Pro tip: If you think this is a mistake, contact support or check your permissions.</span>
      </p>
    </div>
  );
}