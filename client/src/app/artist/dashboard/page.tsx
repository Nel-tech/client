'use client'

import StatCard from './components/StatCard';
import { useProfileCompletionStatus } from '@/lib/queries/artist-queries';
import { TrendingUp, Heart, Star, Clock } from 'lucide-react';
import Spinner from '@/components/loader/spinner';
import ProfileProgressCard from './Profile/Components/ProfileProgressCard';
import { Card } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
  const { data: completionData, isLoading } = useProfileCompletionStatus();
  
  const completedFields = completionData?.data?.profileCompletion?.completedFields || [];
  const missingFields = completionData?.data?.profileCompletion?.missingFields || [];
  const allFields = [...completedFields, ...missingFields];
  const completedFieldsSet = new Set(completedFields);
  
  const profileTasks = allFields.map((field: string) => ({
    id: field,
    task: `Complete ${field}`,
    completed: completedFieldsSet.has(field),
  }));
  
  const progressPercentage = completionData?.data?.profileCompletion?.completionPercentage || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Welcome Section - Enhanced */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rounded-2xl p-8 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Welcome back, Artist! 🎵
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Ready to boost your music and connect with fans?
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />
      </div>

      <StatCard value='200' icon='' label='stats'/>

      {/* Profile Progress */}
      <ProfileProgressCard
        progressPercentage={progressPercentage}
        profileTasks={profileTasks}
        message={completionData?.data?.profileCompletion?.message}
      />

      {/* Recent Activity Section - Redesigned */}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-zinc-400 hover:text-white transition-colors">
              View All
            </button>
          </div>
          
          {/* <Separator className="mb-6 bg-zinc-800" /> */}
          
          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="group relative overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600 rounded-xl p-4 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">
                    Sarah M. shared your track &quot;Summer Vibes&quot;
                  </p>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="group relative overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600 rounded-xl p-4 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">
                    You earned 50 coins from fan engagement
                  </p>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="group relative overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600 rounded-xl p-4 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">
                    &quot;Midnight Dreams&quot; reached 100 shares milestone
                  </p>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}