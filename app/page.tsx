"use client";

import MainTabNavigation from "@/components/main-tab-navigation";
import HomeTabContent from "./home/page";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="home" />
        <HomeTabContent />
      </div>

      
    </div>
  );
}
