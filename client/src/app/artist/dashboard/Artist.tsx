'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import OverviewTab from './components/OverviewTab';
import TrackTab from './Tabs/TrackTab';
import {
  tracks,
  stats,
  profileTasks,
  sidebarItems,
  topFans,
} from '@/helper/mock';
import ProfileTab from './Tabs/ProfileTab';
import FanTab from './Tabs/FanTab';
// import other tabs...

export default function TropiqkArtistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completedTasks = profileTasks.filter((task) => task.completed).length;
  const progressPercentage = Math.round(
    (completedTasks / profileTasks.length) * 100
  );

  // mock data here (stats, profileTasks, etc.)

  return (
    <div className="min-h-screen">
      <MobileHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarItems={sidebarItems}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
              profileTasks={profileTasks}
              progressPercentage={progressPercentage}
            />
          )}
          {activeTab === 'tracks' && <TrackTab />}
          {activeTab === 'fans' && <FanTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
