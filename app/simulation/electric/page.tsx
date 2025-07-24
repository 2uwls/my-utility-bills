"use client"

import { useState } from "react"
import { ArrowLeft, Lightbulb, Clock, Target, TrendingUp, AlertCircle, Calculator, Flame, Gift, Home, Percent, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Cell, LineChart } from "recharts"
import { Switch } from "@radix-ui/react-switch"

export default function ElectricSimulationPage() {
  const [electricReduction, setElectricReduction] = useState([10])
  const [contractType, setContractType] = useState("general")
  //const [powerFactor, setPowerFactor] = useState([0.85])

  // 전기요금 절약 시뮬레이션 데이터
  const electricSimulation = [
    { reduction: "현재", amount: 85000, savings: 0 },
    { reduction: "5%", amount: 80750, savings: 4250 },
    { reduction: "10%", amount: 76500, savings: 8500 },
    { reduction: "15%", amount: 72250, savings: 12750 },
    { reduction: "20%", amount: 68000, savings: 17000 },
    { reduction: "25%", amount: 63750, savings: 21250 },
    { reduction: "30%", amount: 59500, savings: 25500 },
  ]

  // 시간대별 요금 비교
  const timeBasedRates = [
    { time: "06-09", 일반형: 120, 심야형: 180, usage: 15 },
    { time: "09-17", 일반형: 120, 심야형: 180, usage: 25 },
    { time: "17-23", 일반형: 120, 심야형: 180, usage: 35 },
    { time: "23-06", 일반형: 120, 심야형: 60, usage: 25 },
  ]

  const [currentSeason, setCurrentSeason] = useState("winter") // winter, summer, spring, fall

  // 전기요금 시뮬레이션 상태
  const [monthlyUsage, setMonthlyUsage] = useState([350]) // kWh
  const [electricSavings, setElectricSavings] = useState({
    essentialDeduction: false, // 필수사용공제
    kepcoPayback: false, // 한전 페이백
    progressiveTierChange: false, // 누진제 구간 변경
  })

  // 전기요금 누진제 구간별 요금 (계절별)
  const getElectricRates = (season: string) => {
    const isSummer = season === "summer"
    return {
      tier1: {
        limit: isSummer ? 300 : 200,
        baseCharge: 910,
        unitPrice: 120.0,
      },
      tier2: {
        limit: isSummer ? 450 : 400,
        baseCharge: 1600,
        unitPrice: 214.6,
      },
      tier3: {
        baseCharge: 7300,
        unitPrice: 307.3,
      },
    }
  }

  // 전기요금 계산 함수 (할인 적용 전)
  const calculateBaseElectricBill = (usage: number, progressiveType = 3, season = currentSeason) => {
    const rates = getElectricRates(season)
    let bill = 0
    let baseCharge = 0

    if (progressiveType === 1) {
      // 1구간만 적용
      bill = usage * rates.tier1.unitPrice
      baseCharge = rates.tier1.baseCharge
    } else if (progressiveType === 2) {
      // 2구간까지 적용
      if (usage <= rates.tier1.limit) {
        bill = usage * rates.tier1.unitPrice
        baseCharge = rates.tier1.baseCharge
      } else {
        bill = rates.tier1.limit * rates.tier1.unitPrice + (usage - rates.tier1.limit) * rates.tier2.unitPrice
        baseCharge = rates.tier2.baseCharge
      }
    } else {
      // 3구간 모두 적용 (현행)
      if (usage <= rates.tier1.limit) {
        bill = usage * rates.tier1.unitPrice
        baseCharge = rates.tier1.baseCharge
      } else if (usage <= rates.tier2.limit) {
        bill = rates.tier1.limit * rates.tier1.unitPrice + (usage - rates.tier1.limit) * rates.tier2.unitPrice
        baseCharge = rates.tier2.baseCharge
      } else {
        bill =
          rates.tier1.limit * rates.tier1.unitPrice +
          (rates.tier2.limit - rates.tier1.limit) * rates.tier2.unitPrice +
          (usage - rates.tier2.limit) * rates.tier3.unitPrice
        baseCharge = rates.tier3.baseCharge
      }
    }

    return Math.round(bill + baseCharge)
  }

  // 전기요금 계산 함수 (할인 적용)
  const calculateElectricBill = (usage: number, progressiveType = 3, season = currentSeason) => {
    let bill = calculateBaseElectricBill(usage, progressiveType, season)
    const rates = getElectricRates(season)

    // 할인 적용
    if (electricSavings.essentialDeduction && usage <= rates.tier1.limit) {
      bill *= 0.9 // 10% 할인
    }
    if (electricSavings.kepcoPayback) {
      bill -= 2000
    }

    return Math.round(bill)
  }

  // 현재 사용량의 구간 확인
  const getCurrentTier = (usage: number, season = currentSeason) => {
    const rates = getElectricRates(season)
    if (usage <= rates.tier1.limit) return 1
    if (usage <= rates.tier2.limit) return 2
    return 3
  }

  // 누진제 변경 시뮬레이션 데이터 (현재 구간에 따라)
  const getProgressiveComparisonData = () => {
    const usage = monthlyUsage[0]
    const season = currentSeason
    const currentTier = getCurrentTier(usage, season)

    if (currentTier === 3) {
      const tier3Bill = calculateElectricBill(usage, 3, season)
      const tier2Bill = calculateElectricBill(usage, 2, season)
      const tier1Bill = calculateElectricBill(usage, 1, season)

      return [
        {
          type: "현재 (3구간)",
          amount: tier3Bill,
          color: "#EF4444",
        },
        {
          type: "2구간 적용시",
          amount: tier2Bill,
          color: "#F59E0B",
        },
        {
          type: "1구간 적용시",
          amount: tier1Bill,
          color: "#10B981",
        },
      ]
    } else if (currentTier === 2) {
      const tier2Bill = calculateElectricBill(usage, 2, season)
      const tier1Bill = calculateElectricBill(usage, 1, season)

      return [
        {
          type: "현재 (2구간)",
          amount: tier2Bill,
          color: "#F59E0B",
        },
        {
          type: "1구간 적용시",
          amount: tier1Bill,
          color: "#10B981",
        },
      ]
    }

    return []
  }

  // 필수사용공제 비교 데이터
  const getEssentialDeductionData = () => {
    const usage = monthlyUsage[0]
    const rates = getElectricRates(currentSeason)
    const isEligible = usage <= rates.tier1.limit

    if (isEligible) {
      // 200kWh 이하: 혜택 미적용 vs 적용
      const withoutBenefit = calculateBaseElectricBill(usage, 3, currentSeason)
      const withBenefit = withoutBenefit * 0.9
      return [
        {
          type: "혜택 미적용",
          amount: withoutBenefit,
          color: "#EF4444",
        },
        {
          type: "혜택 적용",
          amount: withBenefit,
          color: "#10B981",
        },
      ]
    } else {
      // 200kWh 초과: 현재 vs 200kWh로 줄였을 때 혜택 적용
      const currentBill = calculateBaseElectricBill(usage, 3, currentSeason)
      const reducedUsageBill = calculateBaseElectricBill(rates.tier1.limit, 3, currentSeason) * 0.9
      return [
        {
          type: `현재 (${usage}kWh)`,
          amount: currentBill,
          color: "#EF4444",
        },
        {
          type: `${rates.tier1.limit}kWh + 혜택`,
          amount: reducedUsageBill,
          color: "#10B981",
        },
      ]
    }
  }

  // 전기요금 할인 혜택 절약 효과 계산
  const calculateElectricSavings = () => {
    const usage = monthlyUsage[0]
    const rates = getElectricRates(currentSeason)
    const baseElectricBill = calculateBaseElectricBill(usage, 3, currentSeason)

    let totalSavings = 0

    // 누진제 구간 변경 혜택
    if (electricSavings.progressiveTierChange) {
      const currentTier = getCurrentTier(usage, currentSeason)
      if (currentTier === 3) {
        // 3구간 → 1구간으로 변경시 절약액
        const tier1Bill = calculateBaseElectricBill(usage, 1, currentSeason)
        totalSavings += Math.max(0, baseElectricBill - tier1Bill)
      } else if (currentTier === 2) {
        // 2구간 → 1구간으로 변경시 절약액
        const tier1Bill = calculateBaseElectricBill(usage, 1, currentSeason)
        totalSavings += Math.max(0, baseElectricBill - tier1Bill)
      }
    }

    // 필수사용공제 (200kWh 이하 시 10% 할인)
    if (electricSavings.essentialDeduction) {
      if (usage <= rates.tier1.limit) {
        // 현재 혜택 대상인 경우
        totalSavings += Math.round(baseElectricBill * 0.1)
      } else {
        // 혜택 대상이 아닌 경우: 200kWh로 줄이고 혜택 적용시와 현재의 차이
        const currentBill = baseElectricBill
        const reducedUsageBill = calculateBaseElectricBill(rates.tier1.limit, 3, currentSeason) * 0.9
        totalSavings += Math.max(0, currentBill - reducedUsageBill)
      }
    }

    // 한전 페이백
    if (electricSavings.kepcoPayback) {
      totalSavings += 2000
    }

    return totalSavings
  }

  // 누적 절약 데이터 (12개월)
  const generateCumulativeData = () => {
    const totalMonthlySaving = calculateElectricSavings()
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

  const handleElectricSavingToggle = (savingId: keyof typeof electricSavings) => {
    setElectricSavings((prev) => ({
      ...prev,
      [savingId]: !prev[savingId],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/simulation">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">전기요금 절약 시뮬레이션</h1>
                <p className="text-xs text-gray-500">전기 절약 팁과 효과 확인</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/gas">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Flame className="h-4 w-4" />
                  도시가스
                </Button>
              </Link>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 전기요금 현황 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">전기요금 시뮬레이션</h2>
                <p className="text-sm opacity-90">
                  월 사용량: {monthlyUsage[0]}kWh ({getCurrentTier(monthlyUsage[0])}구간) |
                  {currentSeason === "summer" ? "하계" : "기타계절"} 요금제 적용
                </p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">₩{calculateElectricBill(monthlyUsage[0]).toLocaleString()}</div>
                <div className="text-sm opacity-90">현재 예상 요금</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₩{calculateElectricSavings().toLocaleString()}</div>
                <div className="text-sm opacity-90">월 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 요금제 비교 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-3 w-3 text-white" />
              </div>
              시간대별 요금제 비교
            </CardTitle>
            <CardDescription>일반형 vs 심야형 요금제 비교</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반형</SelectItem>
                  <SelectItem value="night">심야형</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="font-bold text-blue-900 mb-3">요금제 추천</div>
              <div className="text-sm text-blue-800">
                {contractType === "general"
                  ? "현재 일반형 계약입니다. 심야 시간대 사용량이 많다면 심야형으로 변경을 고려해보세요."
                  : "심야형 계약 시 23시-06시 요금이 50% 할인됩니다. 겨울 난방 시에는 일반형이 더 유리할 수 있습니다."}
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeBasedRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}원/kWh`, ""]} />
                  <Bar dataKey="일반형" fill="#94A3B8" name="일반형" />
                  <Bar dataKey="심야형" fill="#3B82F6" name="심야형" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 누진제 구간별 요금 비교 */}
        {getProgressiveComparisonData().length > 0 && (
          <Card className="border-0 rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                누진제 구간 변경 시 절약 효과
              </CardTitle>
              <CardDescription>현재 구간에서 낮은 구간으로 변경 시 절약할 수 있는 금액</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 누진제 구간 변경 스위치 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">누진제 구간 변경 혜택</div>
                    <div className="text-sm text-gray-600">낮은 구간 요금 적용 시뮬레이션</div>
                  </div>
                </div>
                <Switch
                  checked={electricSavings.progressiveTierChange}
                  onCheckedChange={() => handleElectricSavingToggle("progressiveTierChange")}
                />
              </div>

              {/* 구간 정보 표시 */}
              {(() => {
                const rates = getElectricRates(currentSeason)
                const currentTier = getCurrentTier(monthlyUsage[0])

                return (
                  <>
                    <div className="mb-4 p-4 bg-yellow-50 rounded-xl">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {currentSeason === "summer" ? "하계" : "기타계절"} 누진제 구간 기준 (현재: {currentTier}
                        구간)
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium">1구간</div>
                          <div>0~{rates.tier1.limit}kWh</div>
                          <div className="text-blue-600">{rates.tier1.unitPrice}원/kWh</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">2구간</div>
                          <div>
                            {rates.tier1.limit + 1}~{rates.tier2.limit}kWh
                          </div>
                          <div className="text-green-600">{rates.tier2.unitPrice}원/kWh</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">3구간</div>
                          <div>{rates.tier2.limit + 1}kWh 이상</div>
                          <div className="text-red-600">{rates.tier3.unitPrice}원/kWh</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                      <div className="h-64 mb-4 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={getProgressiveComparisonData()}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "요금"]} />
                            <Bar dataKey="amount">
                              {getProgressiveComparisonData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>

                        {/* 절약액 말풍선 */}
                        {(() => {
                          const data = getProgressiveComparisonData()
                          const currentTier = getCurrentTier(monthlyUsage[0])

                          if (data.length >= 2) {
                            let savings = 0
                            let message = ""

                            if (currentTier === 3) {
                              // 3구간 → 1구간 최대 절약액
                              savings = data[0].amount - data[2].amount
                              message = "최대 절약액"
                            } else if (currentTier === 2) {
                              // 2구간 → 1구간 절약액
                              savings = data[0].amount - data[1].amount
                              message = "절약액"
                            }

                            return (
                              <div className="absolute top-4 right-4">
                                <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold relative">
                                  ₩{savings.toLocaleString()} {message}!
                                  <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })()}
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {getProgressiveComparisonData().map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <div className="font-medium text-gray-900">{item.type}</div>
                            </div>
                            <div className="text-lg font-bold" style={{ color: item.color }}>
                              ₩{item.amount.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 3구간일 때 추가 설명 */}
                      {getCurrentTier(monthlyUsage[0]) === 3 && (
                        <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                          <div className="text-sm text-yellow-800">
                            💡 <strong>3구간 사용자 혜택</strong>
                            <br />• 2구간 적용시: ₩
                            {(
                              getProgressiveComparisonData()[0].amount - getProgressiveComparisonData()[1].amount
                            ).toLocaleString()}{" "}
                            절약
                            <br />• 1구간 적용시: ₩
                            {(
                              getProgressiveComparisonData()[0].amount - getProgressiveComparisonData()[2].amount
                            ).toLocaleString()}{" "}
                            절약 (최대)
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )
              })()}

              {getCurrentTier(monthlyUsage[0]) === 1 && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎉</div>
                      <div className="font-bold text-green-900">이미 최적 구간입니다!</div>
                      <div className="text-sm text-green-700">현재 1구간으로 가장 저렴한 요금을 적용받고 있습니다.</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 할인 혜택 적용 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Percent className="h-5 w-5" />
              할인 혜택 적용
            </CardTitle>
            <CardDescription>다양한 할인 혜택을 적용하여 요금을 절약하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 필수사용공제 */}
            <div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">필수사용공제</div>
                    <div className="text-sm text-gray-600">
                      {getElectricRates(currentSeason).tier1.limit}kWh 이하 시 10% 할인
                    </div>
                  </div>
                </div>
                <Switch
                  checked={electricSavings.essentialDeduction}
                  onCheckedChange={() => handleElectricSavingToggle("essentialDeduction")}
                />
              </div>

              {/* 필수사용공제 비교 차트 */}
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-900 mb-4">
                  {monthlyUsage[0] <= getElectricRates(currentSeason).tier1.limit
                    ? `필수사용공제 혜택 비교 (현재 ${monthlyUsage[0]}kWh - 혜택 대상)`
                    : `사용량 절약 + 필수사용공제 혜택 (현재 ${monthlyUsage[0]}kWh - 혜택 대상 아님)`}
                </div>

                <div className="h-48 mb-4 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getEssentialDeductionData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "요금"]} />
                      <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                        {getEssentialDeductionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  {/* 절약액 말풍선 */}
                  {(() => {
                    const data = getEssentialDeductionData()
                    const savings = data[0].amount - data[1].amount
                    return (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold relative">
                          ₩{savings.toLocaleString()} 절약!
                          <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {(() => {
                  const data = getEssentialDeductionData()
                  const isEligible = monthlyUsage[0] <= getElectricRates(currentSeason).tier1.limit

                  return (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        {data.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <div className="font-medium text-gray-900">{item.type}</div>
                            </div>
                            <div className="text-lg font-bold" style={{ color: item.color }}>
                              ₩{item.amount.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600">
                        {isEligible
                          ? `현재 ${monthlyUsage[0]}kWh 사용으로 혜택 대상입니다`
                          : `현재 ${monthlyUsage[0]}kWh → ${getElectricRates(currentSeason).tier1.limit}kWh로 줄이고 혜택 적용시`}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* 한전 페이백 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">한전 페이백</div>
                  <div className="text-sm text-gray-600">월 2,000원 할인</div>
                </div>
              </div>
              <Switch
                checked={electricSavings.kepcoPayback}
                onCheckedChange={() => handleElectricSavingToggle("kepcoPayback")}
              />
            </div>
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
                  <Bar dataKey="monthly" fill="#3B82F6" name="월 절약액" />
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
                  ₩{(calculateElectricSavings() * 12).toLocaleString()}
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
                <div className="text-2xl font-bold">{Object.values(electricSavings).filter(Boolean).length}개</div>
                <div className="text-sm opacity-90">활성화된 절약 팁</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₩{calculateElectricSavings().toLocaleString()}</div>
                <div className="text-sm opacity-90">월 예상 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Link href="/gas">
            <Button className="h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl w-full">
              <Flame className="h-4 w-4 mr-2" />
              도시가스 시뮬레이션
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

