import { topFans } from '@/helper/mock';

import FanCard from '../components/FanCard';

function FanTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Fan Engagement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-lg font-semibold mb-4 text-white">Top Fans</h2>
          <div className="space-y-3">
            {topFans.map((fan) => (
              <FanCard key={fan.id} fan={fan} />
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Engagement Insights
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Average shares per fan</span>
              <span className="font-semibold text-white">5.3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Fan growth this week</span>
              <span className="font-semibold text-green-400">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Most active time</span>
              <span className="font-semibold text-white">8-PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FanTab;
