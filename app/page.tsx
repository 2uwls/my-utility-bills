"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  Leaf,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  Gift,
  Calculator,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Flame,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
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
  ComposedChart,
} from "recharts"

export default function KakaoBankUtilityApp() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [analysisTab, setAnalysisTab] = useState("comprehensive")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  // 카드 데이터
  const cardData = [
    {
      id: 1,
      name: "카카오뱅크 체크카드",
      subtitle: "공과금 특화",
      benefits: ["공과금 1% 적립", "자동이체 수수료 면제", "연회비 무료"],
      color: "from-yellow-400 to-orange-400",
      emoji: "💳",
      cashback: "1%",
      annual: "무료",
    },
    {
      id: 2,
      name: "카카오뱅크 신용카드",
      subtitle: "생활비 특화",
      benefits: ["생활비 2% 적립", "온라인쇼핑 3% 적립", "카페 5% 적립"],
      color: "from-purple-400 to-pink-400",
      emoji: "💎",
      cashback: "2%",
      annual: "무료",
    },
    {
      id: 3,
      name: "카카오뱅크 프리미엄",
      subtitle: "프리미엄 혜택",
      benefits: ["모든 가맹점 1.5% 적립", "해외결제 수수료 면제", "공항라운지 무료"],
      color: "from-gray-700 to-gray-900",
      emoji: "👑",
      cashback: "1.5%",
      annual: "10만원",
    },
  ]

  // 타은행 카드 데이터
  const otherBankCards = [
    {
      name: "신한 Deep Dream",
      bank: "신한카드",
      benefit: "공과금 0.7% 적립",
      annual: "15,000원",
      color: "bg-blue-500",
    },
    {
      name: "KB국민 리브 Next",
      bank: "KB국민카드",
      benefit: "공과금 0.5% 적립",
      annual: "12,000원",
      color: "bg-yellow-600",
    },
    {
      name: "우리 MY WE:SH",
      bank: "우리카드",
      benefit: "공과금 0.8% 적립",
      annual: "20,000원",
      color: "bg-green-600",
    },
  ]

  // 전자 청구서 데이터
  const currentBill = {
    electric: {
      usage: 320,
      amount: 62000,
      previousAmount: 75000,
      savings: 13000,
      dueDate: "2024.09.25",
      status: "정상",
    },
    gas: {
      usage: 45,
      amount: 42000,
      previousAmount: 55000,
      savings: 13000,
      dueDate: "2024.09.28",
      status: "정상",
    },
    water: {
      usage: 18,
      amount: 26000,
      previousAmount: 28000,
      savings: 2000,
      dueDate: "2024.09.30",
      status: "이상 탐지",
    },
  }

  // 월별 총 지출 데이터 (최근 6개월)
  const monthlyExpenseData = [
    { month: "4월", total: 158000, electric: 75000, gas: 55000, water: 28000 },
    { month: "5월", total: 145000, electric: 68000, gas: 50000, water: 27000 },
    { month: "6월", total: 135000, electric: 72000, gas: 38000, water: 25000 },
    { month: "7월", total: 142000, electric: 85000, gas: 32000, water: 25000 },
    { month: "8월", total: 138000, electric: 78000, gas: 35000, water: 25000 },
    { month: "9월", total: 130000, electric: 62000, gas: 42000, water: 26000 },
  ]

  // 누적 데이터
  const cumulativeData = [
    { month: "4월", cumulative: 158000, electric: 75000, gas: 55000, water: 28000 },
    { month: "5월", cumulative: 303000, electric: 143000, gas: 105000, water: 55000 },
    { month: "6월", cumulative: 438000, electric: 215000, gas: 143000, water: 80000 },
    { month: "7월", cumulative: 580000, electric: 300000, gas: 175000, water: 105000 },
    { month: "8월", cumulative: 718000, electric: 378000, gas: 210000, water: 130000 },
    { month: "9월", cumulative: 848000, electric: 440000, gas: 252000, water: 156000 },
  ]

  // 작년 동월 대비 데이터
  const yearOverYearData = [
    { month: "4월", thisYear: 130000, lastYear: 145000 },
    { month: "5월", thisYear: 118000, lastYear: 135000 },
    { month: "6월", thisYear: 110000, lastYear: 125000 },
    { month: "7월", thisYear: 117000, lastYear: 140000 },
    { month: "8월", thisYear: 113000, lastYear: 135000 },
    { month: "9월", thisYear: 104000, lastYear: 125000 },
  ]

  // 도시가스 세부 데이터
  const gasDetailData = [
    { month: "4월", heating: 35000, hotWater: 15000, cooking: 5000, total: 55000 },
    { month: "5월", heating: 30000, hotWater: 15000, cooking: 5000, total: 50000 },
    { month: "6월", heating: 20000, hotWater: 13000, cooking: 5000, total: 38000 },
    { month: "7월", heating: 15000, hotWater: 12000, cooking: 5000, total: 32000 },
    { month: "8월", heating: 18000, hotWater: 12000, cooking: 5000, total: 35000 },
    { month: "9월", heating: 25000, hotWater: 12000, cooking: 5000, total: 42000 },
  ]

  // 전기요금 세부 데이터
  const electricDetailData = [
    { month: "4월", basic: 15000, usage: 55000, progressive: 5000, total: 75000, usage_kwh: 280 },
    { month: "5월", basic: 15000, usage: 48000, progressive: 5000, total: 68000, usage_kwh: 250 },
    { month: "6월", basic: 15000, usage: 52000, progressive: 5000, total: 72000, usage_kwh: 290 },
    { month: "7월", basic: 15000, usage: 65000, progressive: 5000, total: 85000, usage_kwh: 350 },
    { month: "8월", basic: 15000, usage: 58000, progressive: 5000, total: 78000, usage_kwh: 320 },
    { month: "9월", basic: 15000, usage: 42000, progressive: 5000, total: 62000, usage_kwh: 320 },
  ]

  // 또래/지역 비교 데이터
  const comparisonData = [
    { month: "4월", myUsage: 280, regionAvg: 320, peerAvg: 310 },
    { month: "5월", myUsage: 250, regionAvg: 315, peerAvg: 305 },
    { month: "6월", myUsage: 290, regionAvg: 340, peerAvg: 325 },
    { month: "7월", myUsage: 350, regionAvg: 380, peerAvg: 365 },
    { month: "8월", myUsage: 320, regionAvg: 375, peerAvg: 360 },
    { month: "9월", myUsage: 320, regionAvg: 356, peerAvg: 348 },
  ]

  // 누적 절약 통계
  const cumulativeSavings = {
    totalSaved: 180000, // 6개월간 총 절약액
    monthsUsed: 6,
    projectedYearEnd: 300000, // 12월까지 예상 절약액
    monthlyAverage: 30000,
  }

  // 통계 계산
  const currentMonth = monthlyExpenseData[monthlyExpenseData.length - 1]
  const previousMonth = monthlyExpenseData[monthlyExpenseData.length - 2]
  const monthlyAverage = monthlyExpenseData.reduce((sum, item) => sum + item.total, 0) / monthlyExpenseData.length
  const totalCumulative = cumulativeData[cumulativeData.length - 1].cumulative

  // 카드 슬라이드 함수
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cardData.length)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 카카오뱅크 스타일 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-gray-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">공과금 절약</h1>
                <p className="text-xs text-gray-500">카카오뱅크와 함께</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-20 h-8 text-sm border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/simulation">
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <Calculator className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/rewards">
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <Gift className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="h-8 px-3 text-sm">
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="h-8 px-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* 전자 청구서 형태 메인 카드 */}
        <Card className="border-0 rounded-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">9월 공과금 청구서</CardTitle>
                <p className="text-sm opacity-90">전월 대비 ₩28,000 절약!</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* 전기요금 */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">전기요금</div>
                  <div className="text-sm text-gray-600">{currentBill.electric.usage}kWh 사용</div>
                  <div className="text-xs text-gray-500">납기일: {currentBill.electric.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">₩{currentBill.electric.amount.toLocaleString()}</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />₩{currentBill.electric.savings.toLocaleString()} 절약
                </div>
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {currentBill.electric.status}
                </Badge>
              </div>
            </div>

            {/* 가스요금 */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔥</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">가스요금</div>
                  <div className="text-sm text-gray-600">{currentBill.gas.usage}㎥ 사용</div>
                  <div className="text-xs text-gray-500">납기일: {currentBill.gas.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">₩{currentBill.gas.amount.toLocaleString()}</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />₩{currentBill.gas.savings.toLocaleString()} 절약
                </div>
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {currentBill.gas.status}
                </Badge>
              </div>
            </div>

            {/* 수도요금 - 이상 탐지 */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💧</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">수도요금</div>
                  <div className="text-sm text-gray-600">{currentBill.water.usage}㎥ 사용</div>
                  <div className="text-xs text-gray-500">납기일: {currentBill.water.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">₩{currentBill.water.amount.toLocaleString()}</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />₩{currentBill.water.savings.toLocaleString()} 절약
                </div>
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {currentBill.water.status}
                </Badge>
              </div>
            </div>

            {/* 총 청구 금액 */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg text-gray-900">이번 달 총 청구액</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ₩
                    {(currentBill.electric.amount + currentBill.gas.amount + currentBill.water.amount).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    전월 대비 ₩
                    {(
                      currentBill.electric.savings +
                      currentBill.gas.savings +
                      currentBill.water.savings
                    ).toLocaleString()}{" "}
                    절약
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시뮬레이션 알림 카드 */}
        <Link href="/simulation">
          <Card className="border-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <div className="font-bold">절약 시뮬레이션 해보기</div>
                    <div className="text-sm opacity-90">다양한 절약 방법의 효과를 미리 확인</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 리워드 알림 카드 */}
        <Link href="/rewards">
          <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 text-white cursor-pointer hover:from-green-500 hover:to-green-600 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌳</div>
                  <div>
                    <div className="font-bold">새로운 나무가 자랐어요!</div>
                    <div className="text-sm opacity-90">절약 숲에서 확인해보세요</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 요약 통계 카드들 */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">₩{cumulativeSavings.totalSaved.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{cumulativeSavings.monthsUsed}개월 누적</div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">8그루</div>
              <div className="text-xs text-gray-500">심은 나무</div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">
                ₩{cumulativeSavings.projectedYearEnd.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">연말 예상</div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 탭 네비게이션 */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-2xl p-1 h-12">
            <TabsTrigger
              value="home"
              className="rounded-xl text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              홈
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="rounded-xl text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              분석
            </TabsTrigger>
            <TabsTrigger
              value="savings"
              className="rounded-xl text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              절약
            </TabsTrigger>
            <TabsTrigger
              value="benefits"
              className="rounded-xl text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              혜택
            </TabsTrigger>
            <TabsTrigger
              value="esg"
              className="rounded-xl text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              ESG
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4 mt-4">
            {/* 또래/지역 비교 */}
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-3 w-3 text-purple-600" />
                  </div>
                  또래와 지역 비교
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">상위 25% 절약가구</div>
                      <div className="text-sm text-gray-600">우수한 절약 실천 중이에요!</div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-lg">🏆</span>
                    </div>
                  </div>
                </div>

                {/* 비교 그래프 */}
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value, name) => [
                          `${value}kWh`,
                          name === "myUsage" ? "내 사용량" : name === "regionAvg" ? "지역평균" : "또래평균",
                        ]}
                      />
                      <Bar dataKey="myUsage" fill="#FFEB00" name="내 사용량" />
                      <Line
                        type="monotone"
                        dataKey="regionAvg"
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="지역평균"
                      />
                      <Line type="monotone" dataKey="peerAvg" stroke="#3B82F6" strokeWidth={2} name="또래평균" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-yellow-50 rounded-xl p-3">
                    <div className="text-sm font-medium text-gray-900">우리집</div>
                    <div className="text-lg font-bold text-yellow-600">320kWh</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-sm font-medium text-gray-900">지역평균</div>
                    <div className="text-lg font-bold text-gray-600">356kWh</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-sm font-medium text-gray-900">또래평균</div>
                    <div className="text-lg font-bold text-gray-600">348kWh</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 누적 할인 통계 */}
            <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-bold">누적 절약 통계</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm opacity-90">
                    "이 서비스를 {cumulativeSavings.monthsUsed}개월동안 이용하면서, 지금까지{" "}
                    <span className="font-bold text-xl">₩{cumulativeSavings.totalSaved.toLocaleString()}</span>을
                    아꼈어요!"
                  </div>
                  <div className="text-sm opacity-90">
                    "12월까지 유지시, 최대{" "}
                    <span className="font-bold text-xl">₩{cumulativeSavings.projectedYearEnd.toLocaleString()}</span>을
                    아낄 수 있어요!"
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">월 평균 절약액</span>
                      <span className="font-bold">₩{cumulativeSavings.monthlyAverage.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 현재 사용량 */}
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 text-blue-600" />
                  </div>
                  이번 달 사용량
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">전기</span>
                    <span className="text-sm text-gray-500">320kWh / 400kWh</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-100" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>80% 사용중</span>
                    <span className="font-medium text-gray-900">₩62,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">가스</span>
                    <span className="text-sm text-gray-500">45㎥ / 60㎥</span>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-100" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>75% 사용중</span>
                    <span className="font-medium text-gray-900">₩42,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">수도</span>
                    <span className="text-sm text-gray-500">18㎥ / 25㎥</span>
                  </div>
                  <Progress value={72} className="h-2 bg-gray-100" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>72% 사용중</span>
                    <span className="font-medium text-gray-900">₩26,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 분석 탭 */}
          <TabsContent value="analysis" className="space-y-4 mt-4">
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  상세 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 h-10">
                    <TabsTrigger
                      value="comprehensive"
                      className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      종합
                    </TabsTrigger>
                    <TabsTrigger
                      value="gas"
                      className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      도시가스
                    </TabsTrigger>
                    <TabsTrigger
                      value="electric"
                      className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      전기요금
                    </TabsTrigger>
                  </TabsList>

                  {/* 종합 탭 */}
                  <TabsContent value="comprehensive" className="space-y-6 mt-6">
                    {/* 통계 요약 */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-600">누적금액</div>
                        <div className="text-lg font-bold text-blue-600">₩{totalCumulative.toLocaleString()}</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-600">월 평균</div>
                        <div className="text-lg font-bold text-green-600">
                          ₩{Math.round(monthlyAverage).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-600">이번 달</div>
                        <div className="text-lg font-bold text-yellow-600">₩{currentMonth.total.toLocaleString()}</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-600">지난 달</div>
                        <div className="text-lg font-bold text-purple-600">₩{previousMonth.total.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* 월별 총 지출 흐름 */}
                    <div>
                      <h3 className="text-base font-bold mb-4">월별 총 지출 흐름 (최근 6개월)</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlyExpenseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "총 지출"]} />
                            <Line
                              type="monotone"
                              dataKey="total"
                              stroke="#3B82F6"
                              strokeWidth={3}
                              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 누적 막대 그래프 */}
                    <div>
                      <h3 className="text-base font-bold mb-4">누적 지출 현황</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={cumulativeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
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
                    </div>

                    {/* 작년 동월 대비 */}
                    <div>
                      <h3 className="text-base font-bold mb-4">작년 동월 대비 공과금 비교</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={yearOverYearData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
                            <Bar dataKey="thisYear" fill="#10B981" name="올해" />
                            <Bar dataKey="lastYear" fill="#EF4444" name="작년" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 응원 메시지 */}
                    <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Heart className="h-6 w-6 text-pink-500" />
                          <div>
                            <div className="font-bold text-gray-900">절약 잘하고 계세요! 🎉</div>
                            <div className="text-sm text-gray-600">
                              작년 동월 대비 평균 15% 절약하고 계시네요. 이 추세라면 연말까지 더 많은 절약이 가능할 것
                              같아요!
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* 도시가스 탭 */}
                  <TabsContent value="gas" className="space-y-6 mt-6">
                    {/* 가스 세부 항목 */}
                    <div>
                      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        도시가스 세부 지출 현황
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={gasDetailData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
                            <Area
                              type="monotone"
                              dataKey="heating"
                              stackId="1"
                              stroke="#EF4444"
                              fill="#EF4444"
                              name="난방"
                            />
                            <Area
                              type="monotone"
                              dataKey="hotWater"
                              stackId="1"
                              stroke="#F97316"
                              fill="#F97316"
                              name="온수"
                            />
                            <Area
                              type="monotone"
                              dataKey="cooking"
                              stackId="1"
                              stroke="#FFEB00"
                              fill="#FFEB00"
                              name="취사"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 전월/전년 대비 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-2">전월 대비</div>
                        <div className="text-2xl font-bold text-orange-600">+20%</div>
                        <div className="text-xs text-gray-500">₩7,000 증가 (계절적 요인)</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-2">전년 동월 대비</div>
                        <div className="text-2xl font-bold text-green-600">-15%</div>
                        <div className="text-xs text-gray-500">₩7,500 절약</div>
                      </div>
                    </div>

                    {/* 청구 오류/이상 탐지 */}
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <div>
                            <div className="font-bold text-green-900">정상 사용량</div>
                            <div className="text-sm text-green-700">이번 달 가스 사용량이 정상 범위 내에 있습니다.</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 누진구간 경고 */}
                    <div>
                      <h3 className="text-base font-bold mb-4">누진구간 현황</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">현재 사용량</span>
                          <span className="font-bold text-orange-600">45㎥</span>
                        </div>
                        <div className="relative">
                          <Progress value={45} className="h-4 bg-gray-200" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0㎥</span>
                            <span className="text-orange-600">50㎥ (1구간)</span>
                            <span>100㎥</span>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-green-400 rounded"></div>
                            <span>1구간 (~50㎥): 기본요금</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                            <span>2구간 (50~100㎥): 1.5배</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-red-400 rounded"></div>
                            <span>3구간 (100㎥~): 2배</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 전기요금 탭 */}
                  <TabsContent value="electric" className="space-y-6 mt-6">
                    {/* 전기 세부 항목 */}
                    <div>
                      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        전기요금 세부 지출 현황
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={electricDetailData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
                            <Area
                              type="monotone"
                              dataKey="basic"
                              stackId="1"
                              stroke="#94A3B8"
                              fill="#94A3B8"
                              name="기본요금"
                            />
                            <Area
                              type="monotone"
                              dataKey="usage"
                              stackId="1"
                              stroke="#3B82F6"
                              fill="#3B82F6"
                              name="사용요금"
                            />
                            <Area
                              type="monotone"
                              dataKey="progressive"
                              stackId="1"
                              stroke="#EF4444"
                              fill="#EF4444"
                              name="누진요금"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 전월/전년 대비 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-2">전월 대비</div>
                        <div className="text-2xl font-bold text-green-600">-20%</div>
                        <div className="text-xs text-gray-500">₩16,000 절약</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-2">전년 동월 대비</div>
                        <div className="text-2xl font-bold text-green-600">-18%</div>
                        <div className="text-xs text-gray-500">₩13,500 절약</div>
                      </div>
                    </div>

                    {/* 청구 오류/이상 탐지 */}
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <div>
                            <div className="font-bold text-green-900">정상 사용량</div>
                            <div className="text-sm text-green-700">이번 달 전기 사용량이 정상 범위 내에 있습니다.</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 누진구간 경고 */}
                    <div>
                      <h3 className="text-base font-bold mb-4">누진구간 현황</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">현재 사용량</span>
                          <span className="font-bold text-blue-600">320kWh</span>
                        </div>
                        <div className="relative">
                          <Progress value={80} className="h-4 bg-gray-200" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0kWh</span>
                            <span>200kWh</span>
                            <span className="text-blue-600">320kWh (2구간)</span>
                            <span>400kWh</span>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-green-400 rounded"></div>
                            <span>1구간 (~200kWh): 기본요금</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                            <span>2구간 (200~400kWh): 1.7배</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-red-400 rounded"></div>
                            <span>3구간 (400kWh~): 2.3배</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 절약 탭 - 시뮬레이션으로 연결 */}
          <TabsContent value="savings" className="space-y-4 mt-4">
            <Link href="/simulation">
              <Card className="border-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📊</div>
                      <div>
                        <div className="font-bold">절약 시뮬레이션 해보기</div>
                        <div className="text-sm opacity-90">다양한 절약 방법의 효과를 미리 확인</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </TabsContent>

          {/* 혜택 탭 */}
          <TabsContent value="benefits" className="space-y-4 mt-4">
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  카카오뱅크 혜택
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cardData.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">{card.emoji}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{card.name}</div>
                        <div className="text-sm text-gray-600">{card.subtitle}</div>
                        <ul className="list-disc list-inside text-xs text-gray-500 mt-2">
                          {card.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">적립률: {card.cashback}</div>
                      <div className="text-sm text-gray-500">연회비: {card.annual}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESG 탭 */}
          <TabsContent value="esg" className="space-y-4 mt-4">
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  카카오뱅크 ESG
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-sm opacity-90">
                  카카오뱅크는 환경 친화적인 운영을 위해 노력하고 있습니다. 카드 사용으로 인한 탄소 배출을 줄이고, 지속
                  가능한 발전을 추구하고 있습니다.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
