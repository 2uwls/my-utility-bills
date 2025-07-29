"use client";
import MainTabNavigation from "@/components/main-tab-navigation";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";
import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Zap,
  Flame,
  TrendingDown,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ReferenceLine,
  ComposedChart,
  Legend,
} from "recharts";

export default function AnalysisPage() {
  const [analysisTab, setAnalysisTab] = useState("comprehensive");

  // 월별 총 지출 데이터 (최근 6개월)
  const monthlyExpenseData = [
    { month: "4월", total: 62370, electric: 37120, gas: 25250 },
    { month: "5월", total: 59810, electric: 35310, gas: 24500 },
    { month: "6월", total: 53440, electric: 38760, gas: 14680 },
    { month: "7월", total: 55270, electric: 42010, gas: 13260 },
    { month: "8월", total: 51990, electric: 39850, gas: 12140 },
    { month: "9월", total: 45988, electric: 30766, gas: 15222 },
  ];

  // 누적 데이터
  const cumulativeData = [
    { month: "4월", cumulative: 62370, electric: 37120, gas: 25250 },
    { month: "5월", cumulative: 122180, electric: 72430, gas: 49750 },
    { month: "6월", cumulative: 175620, electric: 111190, gas: 64430 },
    { month: "7월", cumulative: 230890, electric: 153200, gas: 77690 },
    { month: "8월", cumulative: 282880, electric: 193050, gas: 89830 },
    { month: "9월", cumulative: 328868, electric: 223816, gas: 105052 },
  ];

  // 작년 동월 대비 데이터 (가장 중요)
  const yearOverYearData = [
    { month: "4월", thisYear: 62370, lastYear: 65420, savings: 3050 },
    { month: "5월", thisYear: 59810, lastYear: 64300, savings: 4490 },
    { month: "6월", thisYear: 53440, lastYear: 60780, savings: 7340 },
    { month: "7월", thisYear: 55270, lastYear: 62100, savings: 6830 },
    { month: "8월", thisYear: 51990, lastYear: 59400, savings: 7410 },
    { month: "9월", thisYear: 45988, lastYear: 57220, savings: 11232 },
  ];

  // 도시가스 사용량 데이터 (누진제 없음)
  const gasUsageData = [
    { month: "4월", usage: 20 },
    { month: "5월", usage: 19 },
    { month: "6월", usage: 12 },
    { month: "7월", usage: 10 },
    { month: "8월", usage: 10 },
    { month: "9월", usage: 12 },
  ];

  // 도시가스 지출 데이터
  const gasExpenseData = [
    { month: "4월", thisYear: 25250, lastYear: 28250, savings: 3000 },
    { month: "5월", thisYear: 24500, lastYear: 26800, savings: 2300 },
    { month: "6월", thisYear: 14680, lastYear: 17680, savings: 3000 },
    { month: "7월", thisYear: 13260, lastYear: 16260, savings: 3000 },
    { month: "8월", thisYear: 12140, lastYear: 15140, savings: 3000 },
    { month: "9월", thisYear: 15222, lastYear: 18222, savings: 3000 },
  ];

  // 전기 사용량 데이터 (누진구간 확인용)
  const electricUsageData = [
    { month: "4월", usage: 170, amount: 37120, bracket: 1 },
    { month: "5월", usage: 160, amount: 35310, bracket: 1 },
    { month: "6월", usage: 200, amount: 38760, bracket: 2 },
    { month: "7월", usage: 250, amount: 42010, bracket: 2 },
    { month: "8월", usage: 260, amount: 39850, bracket: 2 },
    { month: "9월", usage: 240, amount: 30766, bracket: 2 },
  ];

  // 전기 지출 데이터
  const electricExpenseData = [
    { month: "4월", thisYear: 37120, lastYear: 41120, savings: 4000 },
    { month: "5월", thisYear: 35310, lastYear: 38810, savings: 3500 },
    { month: "6월", thisYear: 38760, lastYear: 43760, savings: 5000 },
    { month: "7월", thisYear: 42010, lastYear: 49010, savings: 7000 },
    { month: "8월", thisYear: 39850, lastYear: 45850, savings: 6000 },
    { month: "9월", thisYear: 30766, lastYear: 34766, savings: 4000 },
  ];

  // 통계 계산
  const currentMonth = monthlyExpenseData[monthlyExpenseData.length - 1];
  const previousMonth = monthlyExpenseData[monthlyExpenseData.length - 2];
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
          {/* 핵심 지표 요약 */}
          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    전년 대비 절약
                  </div>
                  <div className="text-lg font-semibold text-[#E5C200]">
                    ₩{totalYearSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 누적</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">누적 지출</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₩{totalCumulative.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 총액</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">월 평균</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₩{Math.round(monthlyAverage).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">6개월 평균</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">이번 달</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₩{currentMonth.total.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">9월 총액</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 탭 네비게이션 */}
          <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 h-12">
              <TabsTrigger
                value="comprehensive"
                className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                종합 분석
              </TabsTrigger>
              <TabsTrigger
                value="gas"
                className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                도시가스
              </TabsTrigger>
              <TabsTrigger
                value="electric"
                className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-600">
                전기요금
              </TabsTrigger>
            </TabsList>

            {/* 종합 분석 탭 */}
            <TabsContent value="comprehensive" className="space-y-6 mt-6">
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-500" />
                    전년 동월 대비 공과금 비교
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={yearOverYearData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p
                                      key={index}
                                      style={{ color: entry.color }}>
                                      {entry.dataKey === "thisYear" && "올해"}
                                      {entry.dataKey === "lastYear" && "작년"}
                                      {entry.dataKey === "savings" && "절약액"}:
                                      ₩{entry.value?.toLocaleString()}
                                    </p>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="thisYear" fill="#FFE300" name="올해" />
                        <Bar dataKey="lastYear" fill="#AAAAAA" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#666666"
                          strokeWidth={3}
                          dot={{ fill: "#666666", strokeWidth: 2, r: 5 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-[#FFE300] bg-opacity-10 rounded-xl p-4 text-center">
                      <div className="text-sm text-gray-600">올해 평균</div>
                      <div className="text-lg font-bold text-gray-700">
                        ₩
                        {Math.round(
                          yearOverYearData.reduce(
                            (sum, item) => sum + item.thisYear,
                            0
                          ) / yearOverYearData.length
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                      <div className="text-sm text-gray-600">작년 평균</div>
                      <div className="text-lg font-bold text-gray-700">
                        ₩
                        {Math.round(
                          yearOverYearData.reduce(
                            (sum, item) => sum + item.lastYear,
                            0
                          ) / yearOverYearData.length
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                      <div className="text-sm text-gray-600">월평균 절약</div>
                      <div className="text-lg font-bold text-gray-600">
                        ₩
                        {Math.round(
                          totalYearSavings / yearOverYearData.length
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 월별 총 지출 흐름 */}
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    월별 총 지출 흐름 (최근 6개월)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyExpenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          domain={["dataMin - 5000", "dataMax + 5000"]}
                        />
                        <Tooltip
                          formatter={(value) => [
                            `₩${value.toLocaleString()}`,
                            "총 지출",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#FFE300"
                          strokeWidth={3}
                          dot={{ fill: "#FFE300", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 누적 지출 현황 비교 */}
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    누적 지출 현황 비교
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cumulativeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value, name) => [
                            `₩${value.toLocaleString()}`,
                            name === "electric"
                              ? "전기"
                              : name === "gas"
                              ? "가스"
                              : name,
                          ]}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="electric"
                          stackId="1"
                          stroke="#FFE300"
                          fill="#FFE300"
                          name="전기"
                        />
                        <Area
                          type="monotone"
                          dataKey="gas"
                          stackId="1"
                          stroke="#FF6B35"
                          fill="#FF6B35"
                          name="가스"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 도시가스 탭 */}
            <TabsContent value="gas" className="space-y-6 mt-6">
              {/* 전년 동월 대비 가스 지출 - 가장 중요 */}
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    전년 동월 대비 가스 지출
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={gasExpenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value, name) => [
                            `₩${value.toLocaleString()}`,
                            name === "thisYear"
                              ? "올해"
                              : name === "lastYear"
                              ? "작년"
                              : "절약액",
                          ]}
                        />
                        <Bar dataKey="thisYear" fill="#FFE300" name="올해" />
                        <Bar dataKey="lastYear" fill="#AAAAAA" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#666666"
                          strokeWidth={3}
                          dot={{ fill: "#666666", strokeWidth: 2, r: 5 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-[#FFE300] bg-opacity-10 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        전년 동월 대비
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                        -15%
                      </div>
                      <div className="text-xs text-gray-500">
                        평균 ₩7,000 절약
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">
                        6개월 누적 절약
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                        ₩
                        {gasExpenseData
                          .reduce((sum, item) => sum + item.savings, 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">작년 대비</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 가스 사용량 현황 */}
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    가스 사용량 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gasUsageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => [`${value}㎥`, "사용량"]}
                        />
                        <Bar
                          barSize={35}
                          dataKey="usage"
                          fill="#FFE300"
                          name="사용량(㎥)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">
                          이번 달 사용량
                        </div>
                        <div className="text-sm text-gray-700">
                          9월 45㎥ 사용
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-600">
                          ₩42,000
                        </div>
                        <div className="text-xs text-gray-500">
                          전년 동월 대비 ₩7,000 절약
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 청구 오류/이상 탐지 */}
              <Card className="bg-green-50 border-green-200 border-0 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <div className="font-bold text-green-900">
                        정상 사용량
                      </div>
                      <div className="text-sm text-green-700">
                        이번 달 가스 사용량이 정상 범위 내에 있습니다.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 전기요금 탭 */}
            <TabsContent value="electric" className="space-y-6 mt-6">
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    전년 동월 대비 전기 지출
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={electricExpenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value, name) => [
                            `₩${value.toLocaleString()}`,
                            name === "thisYear"
                              ? "올해"
                              : name === "lastYear"
                              ? "작년"
                              : "절약액",
                          ]}
                        />
                        <Bar dataKey="thisYear" fill="#FFE300" name="올해" />
                        <Bar dataKey="lastYear" fill="#AAAAAA" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#666666"
                          strokeWidth={3}
                          dot={{ fill: "#666666", strokeWidth: 2, r: 5 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-[#FFE300] bg-opacity-10 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        전년 동월 대비
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                        -18%
                      </div>
                      <div className="text-xs text-gray-500">
                        평균 ₩12,000 절약
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">
                        6개월 누적 절약
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                        ₩
                        {electricExpenseData
                          .reduce((sum, item) => sum + item.savings, 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">작년 대비</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 전기 사용량 및 누진구간 */}
              <Card className="border-0 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    전기 사용량 및 누진구간 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={electricUsageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => [`${value}kWh`, "사용량"]}
                        />
                        <Bar
                          barSize={35}
                          dataKey="usage"
                          fill="#FFE300"
                          name="사용량(kWh)"
                        />
                        <ReferenceLine
                          y={200}
                          stroke="#FF6B35"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          label="1구간 상한"
                        />
                        <ReferenceLine
                          y={400}
                          stroke="#FF6B35"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          label="2구간 상한"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">
                          현재 누진구간 현황
                        </div>
                        <div className="text-sm text-gray-700">
                          9월 240kWh 사용 중 (2구간)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-600">
                          주의
                        </div>
                        <div className="text-xs text-gray-900">
                          3구간까지 160kWh 여유
                        </div>
                      </div>
                    </div>
                    <Progress value={60} className="h-2 bg-gray-100 mt-3" />
                    <div className="text-xs text-gray-900 mt-1">
                      2구간 상한(400kWh)까지 160kWh 남음
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 청구 오류/이상 탐지 */}
              <Card className="bg-green-50 border-green-200 border-0 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <div className="font-bold text-green-900">
                        정상 사용량
                      </div>
                      <div className="text-sm text-green-700">
                        이번 달 전기 사용량이 정상 범위 내에 있습니다.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
