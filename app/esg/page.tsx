import MainTabNavigation from "@/components/main-tab-navigation";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";

export default function ESGPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      {/* 헤더 등 필요시 복사 */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="esg" />
        {/* ESG 탭 내용 */}
      </div>
    </div>
  );
}
