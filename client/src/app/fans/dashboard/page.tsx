// /fans/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/middlewares/ProtectedRoutes";

import DiscoverContent from "../discover/page";
import ArtistContent from "../artist/page";
import RewardContent from "../rewards/page";
import UserProfileInterface from "../profile/page";

const contentComponents = {
  discover: DiscoverContent,
  artists: ArtistContent,
  rewards: RewardContent,
  profile: UserProfileInterface,
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("discover");
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);

  // only for your custom "minimum loading" effect
  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingComplete(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const ActiveComponent =
    contentComponents[activeSection as keyof typeof contentComponents] ||
    DiscoverContent;

  return (
    <ProtectedRoute redirectTo="/auth/login">
      <DashboardLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isLoading={!minLoadingComplete} // ✅ only your timer loading
      >
        <ActiveComponent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
