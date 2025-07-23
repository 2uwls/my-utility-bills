"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Flame,
  TrendingUp,
  AlertCircle,
  Thermometer,
  Droplets,
  Home,
  CreditCard,
  Calendar,
  Snowflake,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function WinterGasSimulationPage() {
  const [currentSeason, setCurrentSeason] = useState("winter")

  // 절약 팁 적용 상태
  const [savingTips, setSavingTips] = useState({
    temperature: false, // 적정 온도 설정
    humidity: false, // 적정 습도 유지
    awayMode: false, // 외출모드 사용
    coldWater: false, // 냉수 사용
    boilerCleaning: false, // 보일러 청소
    warmClothes: false, // 보온용품 착용
    valveControl: false, // 밸브 조정
    shower: false, // 샤워 시간 단축
    autoPayment: false, // 자동이체
    cardChange: false, // 카드 변경
  })

  // 계절별 기본 가스 요금 (동계가 높음)
  const baseGasBill = {
    winter: 85000,
    spring: 45000,
    summer: 25000,
    fall: 55000,
  }

  // 절약 팁별 절감 효과 (원/월)
  const savingEffects = {
    temperature: currentSeason === "winter" ? 12000 : currentSeason === "fall" ? 8000 : 0,
    humidity: currentSeason === "winter" ? 5000 : currentSeason === "fall" ? 3000 : 0,
    awayMode:
      currentSeason === "winter" ? 8000 : currentSeason === "fall" ? 5000 : currentSeason === "spring" ? 3000 : 0,
    coldWater: 4000, // 연중 동일
    boilerCleaning:
      currentSeason === "winter" ? 6000 : currentSeason === "fall" ? 4000 : currentSeason === "spring" ? 2000 : 0,
    warmClothes: currentSeason === "winter" ? 10000 : currentSeason === "fall" ? 6000 : 0,
    valveControl: currentSeason === "winter" ? 7000 : currentSeason === "fall" ? 4000 : 0,
    shower: 8000, // 연중 동일 (온수 사용)
    autoPayment: 500, // 연중 동일
    cardChange: 1000, // 연중 동일
  }

  // 현재 적용된 절약 효과 계산
  const calculateTotalSavings = () => {
    return Object.keys(savingTips).reduce((total, tip) => {
      return total + (savingTips[tip] ? savingEffects[tip] : 0)
    }, 0)
  }

  // 누적 절약 데이터 (12개월)
  const generateCumulativeData = () => {
    const totalMonthlySaving = calculateTotalSavings()
    const data = []
    let cumulative = 0

    for (let i = 1; i <= 12; i++) {
      cumulative += totalMonthlySaving
      data.push({
        month: `${i}월`,
        monthly: totalMonthlySaving,
        cumulative: cumulative,
      })
    }
    return data
  }

  // 계절별 절약 팁 데이터
  const seasonalTips = {
    winter: [
      {
        id: "temperature",
        title: "실내 적정 난방 온도 설정",
        description: "18~20℃로 설정하기",
        icon: <Thermometer className="h-5 w-5" />,
        saving: savingEffects.temperature,
        detail: "1도만 낮춰도 7% 절약 가능",
      },
      {
        id: "humidity",
        title: "적정 습도 유지",
        description: "40~60% 습도 유지하기",
        icon: <Droplets className="h-5 w-5" />,
        saving: savingEffects.humidity,
        detail: "습도가 높으면 체감온도 상승",
      },
      {
        id: "awayMode",
        title: "외출모드 활용",
        description: '외출시 보일러 "외출모드"로 전환',
        icon: <Home className="h-5 w-5" />,
        saving: savingEffects.awayMode,
        detail: "15도 정도로 자동 조절",
      },
      {
        id: "warmClothes",
        title: "보온용품 착용",
        description: "실내 내복, 수면양말 등 착용",
        icon: <Snowflake className="h-5 w-5" />,
        saving: savingEffects.warmClothes,
        detail: "체감온도 2-3도 상승 효과",
      },
      {
        id: "valveControl",
        title: "난방 밸브 조정",
        description: "사용하지 않는 방 밸브 잠그기",
        icon: <AlertCircle className="h-5 w-5" />,
        saving: savingEffects.valveControl,
        detail: "불필요한 난방 차단",
      },
      {
        id: "boilerCleaning",
        title: "보일러 관리",
        description: "보일러 청소 및 배관 공기 빼기",
        icon: <AlertCircle className="h-5 w-5" />,
        saving: savingEffects.boilerCleaning,
        detail: "효율성 10-15% 향상",
      },
    ],
  }

  // 연중 공통 절약 팁
  const commonTips = [
    {
      id: "coldWater",
      title: "냉수 사용 습관",
      description: '평상시 수도꼭지 "냉수"쪽으로',
      icon: <Droplets className="h-5 w-5" />,
      saving: savingEffects.coldWater,
      detail: "불필요한 온수 사용 방지",
    },
    {
      id: "autoPayment",
      title: "자동이체 할인",
      description: "자동이체 신청으로 할인",
      icon: <CreditCard className="h-5 w-5" />,
      saving: savingEffects.autoPayment,
      detail: "월 500원 할인",
    },
    {
      id: "cardChange",
      title: "카드 할인",
      description: "가스요금 할인 카드 사용",
      icon: <CreditCard className="h-5 w-5" />,
      saving: savingEffects.cardChange,
      detail: "월 1,000원 할인",
    },
  ]

  const handleTipToggle = (tipId) => {
    setSavingTips((prev) => ({
      ...prev,
      [tipId]: !prev[tipId],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/simulation/gas">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">도시가스 시뮬레이션</h1>
                <p className="text-xs text-gray-500">계절별 절약 팁과 효과 확인</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <Flame className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 현재 절약 현황 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">현재 절약 효과</h2>
                <p className="text-sm opacity-90">겨울철 기준</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">₩{calculateTotalSavings().toLocaleString()}</div>
                <div className="text-sm opacity-90">월 절약액</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₩{(calculateTotalSavings() * 12).toLocaleString()}</div>
                <div className="text-sm opacity-90">연간 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 계절 선택 탭 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">계절별 절약 시뮬레이션</CardTitle>
            <CardDescription>계절을 선택하여 맞춤 절약 팁을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              <Link href="/simulation/gas/winter">
                <Button variant="default" className="h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white w-full">
                  <div className="flex items-center gap-2">
                    <Snowflake className="h-4 w-4" />
                    <span className="text-sm">겨울</span>
                  </div>
                </Button>
              </Link>
              <Link href="/simulation/gas/spring">
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 w-full">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">봄</span>
                  </div>
                </Button>
              </Link>
              <Link href="/simulation/gas/summer">
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 w-full">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">여름</span>
                  </div>
                </Button>
              </Link>
              <Link href="/simulation/gas/fall">
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 w-full">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">가을</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 겨울철 절약 팁 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-blue-500" />
              겨울철 절약 팁
            </CardTitle>
            <CardDescription>난방비 절약을 위한 핵심 팁들</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {seasonalTips[currentSeason]?.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{tip.title}</div>
                    <div className="text-sm text-gray-600">{tip.description}</div>
                    <div className="text-xs text-orange-600 mt-1">{tip.detail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {tip.saving > 0 && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">₩{tip.saving.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">월 절약</div>
                    </div>
                  )}
                  <Switch checked={savingTips[tip.id]} onCheckedChange={() => handleTipToggle(tip.id)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 연중 공통 절약 팁 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">연중 공통 절약 팁</CardTitle>
            <CardDescription>계절에 관계없이 적용할 수 있는 절약 방법</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {commonTips.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{tip.title}</div>
                    <div className="text-sm text-gray-600">{tip.description}</div>
                    <div className="text-xs text-blue-600 mt-1">{tip.detail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">₩{tip.saving.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">월 절약</div>
                  </div>
                  <Switch checked={savingTips[tip.id]} onCheckedChange={() => handleTipToggle(tip.id)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 누적 절약 그래프 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">연간 누적 절약 효과</CardTitle>
            <CardDescription>현재 설정으로 1년간 절약할 수 있는 금액</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateCumulativeData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name) => [
                      `₩${value.toLocaleString()}`,
                      name === "monthly" ? "월 절약액" : "누적 절약액",
                    ]}
                  />
                  <Bar dataKey="monthly" fill="#F97316" name="월 절약액" />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    name="누적 절약액"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-green-900">연간 총 절약 예상액</div>
                  <div className="text-sm text-green-700">현재 적용된 절약 팁 기준</div>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ₩{(calculateTotalSavings() * 12).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 절약 팁 요약 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">적용 중인 절약 팁</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">{Object.values(savingTips).filter(Boolean).length}개</div>
                <div className="text-sm opacity-90">활성화된 절약 팁</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₩{calculateTotalSavings().toLocaleString()}</div>
                <div className="text-sm opacity-90">월 예상 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Link href="/simulation/electric">
            <Button className="h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-2xl w-full">
              전기요금 시뮬레이션
            </Button>
          </Link>
          <Link href="/rewards">
            <Button variant="outline" className="h-12 rounded-2xl border-gray-200 bg-white w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              절약 숲 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
