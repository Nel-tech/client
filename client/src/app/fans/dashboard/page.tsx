// /fans/dashboard/page.tsx
'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Import all content components
import DiscoverContent from '../discover/page';
import ArtistContent from '../artist/[artistId]/page';
// import LibraryContent from "../components/LibraryContent";

const contentComponents = {
  discover: DiscoverContent,
  artists: ArtistContent,
  // tracks: TrackContent,
  // library: LibraryContent,
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('discover');

  // Get the active component
  const ActiveComponent =
    contentComponents[activeSection as keyof typeof contentComponents] ||
    DiscoverContent;

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <ActiveComponent />
    </DashboardLayout>
  );
}
