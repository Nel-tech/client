'use client';
import StatCard from './StatCard';
import { useProfileCompletionStatus } from '@/lib/queries/artist-queries';
import {  OverviewTabProps } from '@/helper/type';
import { TrendingUp, Heart, Star } from 'lucide-react';
import Spinner from '@/components/loader/spinner';
import ProfileProgressCard from './ProfileProgressCard';

export default function OverviewTab({
  stats,
}: OverviewTabProps) {
  const { data: completionData, isLoading } = useProfileCompletionStatus();

  const profileTasks = completionData?.profileCompletion?.missingFields?.map(
    (field: string) => ({
      id: field,
      task: `Complete ${field}`,
      completed: false,
    })
  ) || [];

  const progressPercentage = completionData?.profileCompletion?.percentage || 0;
  

   if (isLoading) {
    return <div><Spinner/></div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#FF6B35] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Artist! 🎵</h1>
        <p className="opacity-90">
          Ready to boost your music and connect with fans?
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

 <ProfileProgressCard
  progressPercentage={progressPercentage}
  profileTasks={profileTasks}
  message={completionData?.profileCompletion?.message}
/>

      <div className=" text-white  p-6 ">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm">
              Sarah M. shared your track &quot;Summer Vibes&quot;
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              2 hours ago
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm">
              You earned 50 coins from fan engagement
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              5 hours ago
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm">
              &quot;Midnight Dreams&quot; reached 100 shares milestone
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              1 day ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
