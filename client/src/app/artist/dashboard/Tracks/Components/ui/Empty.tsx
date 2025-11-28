"use client";
import { Music } from 'lucide-react'
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
function Empty() {
      const router = useRouter();
  return (
    <div>
       <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="absolute inset-0  blur-3xl opacity-20 rounded-full" />
                <div className="relative p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                  <Music className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="text-center space-y-2 max-w-md">
                <h3 className="text-2xl font-bold text-white">No tracks yet</h3>
                <p className="text-gray-400">
                  Upload your first track to start building your music collection
                </p>
              </div>
              {/* <Button
                onClick={() => router.push("/artist/dashboard/Tracks/")}
                className="px-8 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Upload Your First Track
              </Button> */}
            </div>  
    </div>
  )
}

export default Empty