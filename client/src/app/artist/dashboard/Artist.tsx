'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import OverviewTab from './components/OverviewTab';
import TrackTab from './Tabs/TrackTab';
import { stats, sidebarItems } from '@/helper/mock';
import ProfileTab from './Tabs/ProfileTab';
import FanTab from './Tabs/FanTab';
import UploadTrack from './Tabs/uploadTrack';

export default function TropiqkArtistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleAddTrackClick = () => {
    setShowUploadForm(true);
  };

  const handleCancelUpload = () => {
    setShowUploadForm(false);
  };

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
          {activeTab === 'overview' && <OverviewTab stats={stats} />}
          
          {activeTab === 'tracks' && !showUploadForm && (
            <TrackTab onAddTrackClick={handleAddTrackClick} />
          )}
          
          {activeTab === 'tracks' && showUploadForm && (
            <UploadTrack onCancel={handleCancelUpload} />
          )}
          
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