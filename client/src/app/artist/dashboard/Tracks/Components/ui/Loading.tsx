import React from 'react'
import { LoadingSpinner } from '../../../components/LoadingSpinner'
function Loading() {
  return (
    <div>
         <div className="flex flex-col items-center justify-center py-20 space-y-4">
               <LoadingSpinner/>
                <p className="text-gray-400 text-sm">Loading your tracks...</p>
              </div>
    </div>
  )
}

export default Loading