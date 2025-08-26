'use client';

import MainTabNavigation from '@/components/main-tab-navigation';
import HomeTabContent from './home/page';
import MainSummarySection from '@/components/MainSummarySection';
import KakaoHeader from '@/components/KakaoHeader';
import GasMeterUpload from '@/components/home/GasMeterUpload';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <GasMeterUpload />
        <MainTabNavigation active="home" />
        <HomeTabContent />
      </div>
    </div>
  );
}
