'use client';
import MainTabNavigation from '@/components/main-tab-navigation';
import MainSummarySection from '@/components/MainSummarySection';
import KakaoHeader from '@/components/KakaoHeader';
import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Zap,
  Flame,
  TrendingDown,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
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
} from 'recharts';

export default function AnalysisPage() {
  const [analysisTab, setAnalysisTab] = useState('comprehensive');

  // 월별 총 지출 데이터 (최근 6개월)
  const monthlyExpenseData = [
    { month: '4월', total: 158000, electric: 75000, gas: 55000, water: 28000 },
    { month: '5월', total: 145000, electric: 68000, gas: 50000, water: 27000 },
    { month: '6월', total: 135000, electric: 72000, gas: 38000, water: 25000 },
    { month: '7월', total: 142000, electric: 85000, gas: 32000, water: 25000 },
    { month: '8월', total: 138000, electric: 78000, gas: 35000, water: 25000 },
    { month: '9월', total: 130000, electric: 62000, gas: 42000, water: 26000 },
  ];

  // 누적 데이터
  const cumulativeData = [
    {
      month: '4월',
      cumulative: 158000,
      electric: 75000,
      gas: 55000,
      water: 28000,
    },
    {
      month: '5월',
      cumulative: 303000,
      electric: 143000,
      gas: 105000,
      water: 55000,
    },
    {
      month: '6월',
      cumulative: 438000,
      electric: 215000,
      gas: 143000,
      water: 80000,
    },
    {
      month: '7월',
      cumulative: 580000,
      electric: 300000,
      gas: 175000,
      water: 105000,
    },
    {
      month: '8월',
      cumulative: 718000,
      electric: 378000,
      gas: 210000,
      water: 130000,
    },
    {
      month: '9월',
      cumulative: 848000,
      electric: 440000,
      gas: 252000,
      water: 156000,
    },
  ];

  // 작년 동월 대비 데이터 (가장 중요)
  const yearOverYearData = [
    { month: '4월', thisYear: 130000, lastYear: 145000, savings: 15000 },
    { month: '5월', thisYear: 118000, lastYear: 135000, savings: 17000 },
    { month: '6월', thisYear: 110000, lastYear: 125000, savings: 15000 },
    { month: '7월', thisYear: 117000, lastYear: 140000, savings: 23000 },
    { month: '8월', thisYear: 113000, lastYear: 135000, savings: 22000 },
    { month: '9월', thisYear: 104000, lastYear: 125000, savings: 21000 },
  ];

  // 도시가스 사용량 데이터 (누진제 없음)
  const gasUsageData = [
    { month: '4월', usage: 65, amount: 55000 },
    { month: '5월', usage: 58, amount: 50000 },
    { month: '6월', usage: 42, amount: 38000 },
    { month: '7월', usage: 35, amount: 32000 },
    { month: '8월', usage: 38, amount: 35000 },
    { month: '9월', usage: 45, amount: 42000 },
  ];

  // 도시가스 지출 데이터
  const gasExpenseData = [
    { month: '4월', thisYear: 55000, lastYear: 62000, savings: 7000 },
    { month: '5월', thisYear: 50000, lastYear: 58000, savings: 8000 },
    { month: '6월', thisYear: 38000, lastYear: 45000, savings: 7000 },
    { month: '7월', thisYear: 32000, lastYear: 38000, savings: 6000 },
    { month: '8월', thisYear: 35000, lastYear: 42000, savings: 7000 },
    { month: '9월', thisYear: 42000, lastYear: 49000, savings: 7000 },
  ];

  // 전기 사용량 데이터 (누진구간 확인용)
  const electricUsageData = [
    { month: '4월', usage: 280, amount: 75000, bracket: 2 },
    { month: '5월', usage: 250, amount: 68000, bracket: 2 },
    { month: '6월', usage: 290, amount: 72000, bracket: 2 },
    { month: '7월', usage: 350, amount: 85000, bracket: 2 },
    { month: '8월', usage: 320, amount: 78000, bracket: 2 },
    { month: '9월', usage: 320, amount: 62000, bracket: 2 },
  ];

  // 전기 지출 데이터
  const electricExpenseData = [
    { month: '4월', thisYear: 75000, lastYear: 83000, savings: 8000 },
    { month: '5월', thisYear: 68000, lastYear: 77000, savings: 9000 },
    { month: '6월', thisYear: 72000, lastYear: 80000, savings: 8000 },
    { month: '7월', thisYear: 85000, lastYear: 102000, savings: 17000 },
    { month: '8월', thisYear: 78000, lastYear: 93000, savings: 15000 },
    { month: '9월', thisYear: 62000, lastYear: 76000, savings: 14000 },
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
    
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection/>
        <MainTabNavigation active="analysis"/>
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* 핵심 지표 요약 */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-sm opacity-90">전년 대비 절약</div>
                <div className="text-2xl font-bold">
                  ₩{totalYearSavings.toLocaleString()}
                </div>
                <div className="text-xs opacity-80">6개월 누적</div>
              </CardContent>
            </Card>
            <Card className="border-0 rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600">누적 지출</div>
                <div className="text-2xl font-bold text-blue-600">
                  ₩{totalCumulative.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">6개월 총액</div>
              </CardContent>
            </Card>
            <Card className="border-0 rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600">월 평균</div>
                <div className="text-2xl font-bold text-purple-600">
                  ₩{Math.round(monthlyAverage).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">6개월 평균</div>
              </CardContent>
            </Card>
            <Card className="border-0 rounded-2xl bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600">이번 달</div>
                <div className="text-2xl font-bold text-yellow-600">
                  ₩{currentMonth.total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">9월 총액</div>
              </CardContent>
            </Card>
          </div>

          {/* 탭 네비게이션 */}
          <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 h-12">
              <TabsTrigger
                value="comprehensive"
                className="rounded-xl text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                종합 분석
              </TabsTrigger>
              <TabsTrigger
                value="gas"
                className="rounded-xl text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                도시가스
              </TabsTrigger>
              <TabsTrigger
                value="electric"
                className="rounded-xl text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
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
                          formatter={(value, name) => [
                            `₩${value.toLocaleString()}`,
                            name === 'thisYear'
                              ? '올해'
                              : name === 'lastYear'
                              ? '작년'
                              : '절약액',
                          ]}
                        />
                        <Bar dataKey="thisYear" fill="#10B981" name="올해" />
                        <Bar dataKey="lastYear" fill="#EF4444" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#FFEB00"
                          strokeWidth={4}
                          dot={{ fill: '#FFEB00', strokeWidth: 2, r: 6 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-sm text-gray-600">올해 평균</div>
                      <div className="text-lg font-bold text-green-600">
                        ₩
                        {Math.round(
                          yearOverYearData.reduce(
                            (sum, item) => sum + item.thisYear,
                            0
                          ) / yearOverYearData.length
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <div className="text-sm text-gray-600">작년 평균</div>
                      <div className="text-lg font-bold text-red-600">
                        ₩
                        {Math.round(
                          yearOverYearData.reduce(
                            (sum, item) => sum + item.lastYear,
                            0
                          ) / yearOverYearData.length
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <div className="text-sm text-gray-600">월평균 절약</div>
                      <div className="text-lg font-bold text-yellow-600">
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
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => [
                            `₩${value.toLocaleString()}`,
                            '총 지출',
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
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
                          formatter={(value) => [
                            `₩${value.toLocaleString()}`,
                            '',
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="electric"
                          stackId="1"
                          stroke="#FFEB00"
                          fill="#FFEB00"
                          name="전기"
                        />
                        <Area
                          type="monotone"
                          dataKey="gas"
                          stackId="1"
                          stroke="#F97316"
                          fill="#F97316"
                          name="가스"
                        />
                        <Area
                          type="monotone"
                          dataKey="water"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          name="수도"
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
                            name === 'thisYear'
                              ? '올해'
                              : name === 'lastYear'
                              ? '작년'
                              : '절약액',
                          ]}
                        />
                        <Bar dataKey="thisYear" fill="#F97316" name="올해" />
                        <Bar dataKey="lastYear" fill="#FED7AA" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#10B981"
                          strokeWidth={4}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        전년 동월 대비
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        -15%
                      </div>
                      <div className="text-xs text-gray-500">
                        평균 ₩7,000 절약
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        6개월 누적 절약
                      </div>
                      <div className="text-2xl font-bold text-green-600">
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
                          formatter={(value) => [`${value}㎥`, '사용량']}
                        />
                        <Bar dataKey="usage" fill="#F97316" name="사용량(㎥)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-orange-900">
                          이번 달 사용량
                        </div>
                        <div className="text-sm text-orange-700">
                          9월 45㎥ 사용
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          ₩42,000
                        </div>
                        <div className="text-xs text-orange-500">
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
                            name === 'thisYear'
                              ? '올해'
                              : name === 'lastYear'
                              ? '작년'
                              : '절약액',
                          ]}
                        />
                        <Bar dataKey="thisYear" fill="#3B82F6" name="올해" />
                        <Bar dataKey="lastYear" fill="#BFDBFE" name="작년" />
                        <Line
                          type="monotone"
                          dataKey="savings"
                          stroke="#10B981"
                          strokeWidth={4}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                          name="절약액"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        전년 동월 대비
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        -18%
                      </div>
                      <div className="text-xs text-gray-500">
                        평균 ₩12,000 절약
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        6개월 누적 절약
                      </div>
                      <div className="text-2xl font-bold text-green-600">
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
                          formatter={(value) => [`${value}kWh`, '사용량']}
                        />
                        <Bar
                          dataKey="usage"
                          fill="#3B82F6"
                          name="사용량(kWh)"
                        />
                        <ReferenceLine
                          y={200}
                          stroke="#FFEB00"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          label="1구간 상한"
                        />
                        <ReferenceLine
                          y={400}
                          stroke="#EF4444"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          label="2구간 상한"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-blue-900">
                          현재 누진구간 현황
                        </div>
                        <div className="text-sm text-blue-700">
                          9월 320kWh 사용 중 (2구간)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          주의
                        </div>
                        <div className="text-xs text-blue-500">
                          3구간까지 80kWh 여유
                        </div>
                      </div>
                    </div>
                    <Progress value={80} className="h-2 bg-blue-100 mt-3" />
                    <div className="text-xs text-blue-600 mt-1">
                      2구간 상한(400kWh)까지 80kWh 남음
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
