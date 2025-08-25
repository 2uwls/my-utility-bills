"use client";
import MainTabNavigation from "@/components/main-tab-navigation";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';

// Dynamically import tab components
const ComprehensiveAnalysisTab = dynamic(() => import('@/components/analysis/ComprehensiveAnalysisTab'), { ssr: false, loading: () => <p>Loading...</p> });
const GasAnalysisTab = dynamic(() => import('@/components/analysis/GasAnalysisTab'), { ssr: false, loading: () => <p>Loading...</p> });
const ElectricAnalysisTab = dynamic(() => import('@/components/analysis/ElectricAnalysisTab'), { ssr: false, loading: () => <p>Loading...</p> });

export default function AnalysisPage() {
  const [analysisTab, setAnalysisTab] = useState("comprehensive");

  // Data definitions remain here as they are used by multiple components or for summary
  const monthlyExpenseData = [
    { month: "4월", total: 62370, electric: 37120, gas: 25250 },
    { month: "5월", total: 59810, electric: 35310, gas: 24500 },
    { month: "6월", total: 53440, electric: 38760, gas: 14680 },
    { month: "7월", total: 55270, electric: 42010, gas: 13260 },
    { month: "8월", total: 51990, electric: 39850, gas: 12140 },
    { month: "9월", total: 45988, electric: 30766, gas: 15222 },
  ];

  const cumulativeData = [
    { month: "4월", cumulative: 62370, electric: 37120, gas: 25250 },
    { month: "5월", cumulative: 122180, electric: 72430, gas: 49750 },
    { month: "6월", cumulative: 175620, electric: 111190, gas: 64430 },
    { month: "7월", cumulative: 230890, electric: 153200, gas: 77690 },
    { month: "8월", cumulative: 282880, electric: 193050, gas: 89830 },
    { month: "9월", cumulative: 328868, electric: 223816, gas: 105052 },
  ];

  const yearOverYearData = [
    { month: "4월", thisYear: 62370, lastYear: 65420, savings: 3050 },
    { month: "5월", thisYear: 59810, lastYear: 64300, savings: 4490 },
    { month: "6월", thisYear: 53440, lastYear: 60780, savings: 7340 },
    { month: "7월", thisYear: 55270, lastYear: 62100, savings: 6830 },
    { month: "8월", thisYear: 51990, lastYear: 59400, savings: 7410 },
    { month: "9월", thisYear: 45988, lastYear: 57220, savings: 11232 },
  ];

  const gasUsageData = [
    { month: "4월", usage: 20 },
    { month: "5월", usage: 19 },
    { month: "6월", usage: 12 },
    { month: "7월", usage: 10 },
    { month: "8월", usage: 10 },
    { month: "9월", usage: 12 },
  ];

  const gasExpenseData = [
    { month: "4월", thisYear: 25250, lastYear: 28250, savings: 3000 },
    { month: "5월", thisYear: 24500, lastYear: 26800, savings: 2300 },
    { month: "6월", thisYear: 14680, lastYear: 17680, savings: 3000 },
    { month: "7월", thisYear: 13260, lastYear: 16260, savings: 3000 },
    { month: "8월", thisYear: 12140, lastYear: 15140, savings: 3000 },
    { month: "9월", thisYear: 15222, lastYear: 18222, savings: 3000 },
  ];

  const electricUsageData = [
    { month: "4월", usage: 170, amount: 37120, bracket: 1 },
    { month: "5월", usage: 160, amount: 35310, bracket: 1 },
    { month: "6월", usage: 200, amount: 38760, bracket: 2 },
    { month: "7월", usage: 250, amount: 42010, bracket: 2 },
    { month: "8월", usage: 260, amount: 39850, bracket: 2 },
    { month: "9월", usage: 240, amount: 30766, bracket: 2 },
  ];

  const electricExpenseData = [
    { month: "4월", thisYear: 37120, lastYear: 41120, savings: 4000 },
    { month: "5월", thisYear: 35310, lastYear: 38810, savings: 3500 },
    { month: "6월", thisYear: 38760, lastYear: 43760, savings: 5000 },
    { month: "7월", thisYear: 42010, lastYear: 49010, savings: 7000 },
    { month: "8월", thisYear: 39850, lastYear: 45850, savings: 6000 },
    { month: "9월", thisYear: 30766, lastYear: 34766, savings: 4000 },
  ];

  const currentMonth = monthlyExpenseData[monthlyExpenseData.length - 1];
  const monthlyAverage =
    monthlyExpenseData.reduce((sum, item) => sum + item.total, 0) /
    monthlyExpenseData.length;
  const totalCumulative = cumulativeData[cumulativeData.length - 1].cumulative;
  const totalYearSavings = yearOverYearData.reduce(
    (sum, item) => sum + item.savings,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />

      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="analysis" />
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Key Metrics Summary */}
          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 whitespace-nowrap">
                    전년 대비 절약
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-[#E5C200]">
                    ₩{totalYearSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 누적</div>
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 whitespace-nowrap">
                    누적 지출
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">
                    ₩{totalCumulative.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 총액</div>
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 whitespace-nowrap">
                    월 평균
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">
                    ₩{Math.round(monthlyAverage).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 평균</div>
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 whitespace-nowrap">
                    이번 달
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">
                    ₩{currentMonth.total.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">9월 총액</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 h-12">
              <TabsTrigger
                value="comprehensive"
                className="rounded-xl text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                종합 분석
              </TabsTrigger>
              <TabsTrigger
                value="gas"
                className="rounded-xl text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                도시가스
              </TabsTrigger>
              <TabsTrigger
                value="electric"
                className="rounded-xl text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                전기요금
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comprehensive">
              <ComprehensiveAnalysisTab 
                yearOverYearData={yearOverYearData}
                totalYearSavings={totalYearSavings}
                monthlyExpenseData={monthlyExpenseData}
                cumulativeData={cumulativeData}
              />
            </TabsContent>

            <TabsContent value="gas">
              <GasAnalysisTab 
                gasExpenseData={gasExpenseData}
                gasUsageData={gasUsageData}
              />
            </TabsContent>

            <TabsContent value="electric">
              <ElectricAnalysisTab 
                electricExpenseData={electricExpenseData}
                electricUsageData={electricUsageData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}