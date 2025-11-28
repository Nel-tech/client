import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
function Error() {
  return (
    <div>
         <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="p-4 rounded-full bg-red-500/10">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    Failed to load tracks
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Something went wrong. Please try again later.
                  </p>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-[#ff6b35] text-white font-medium rounded-lg transition-all"
                >
                  Retry
                </Button>
              </div>
    </div>
  )
}

export default Error