"use client"

import { useState } from "react"
import { ArrowLeft, Lightbulb, Clock, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ElectricSimulationPage() {
  const [electricReduction, setElectricReduction] = useState([10])
  const [contractType, setContractType] = useState("general")
  const [powerFactor, setPowerFactor] = useState([0.85])

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
                <h1 className="text-lg font-bold text-gray-900">전기요금 시뮬레이션</h1>
                <p className="text-xs text-gray-500">전기 사용량 절약 효과 계산</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 현재 요금 정보 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">현재 전기요금</h2>
                <p className="text-sm opacity-90">이번 달 예상 요금</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">₩85,000</div>
            <div className="text-sm opacity-90">320kWh 사용 예정</div>
          </CardContent>
        </Card>

        {/* 사용량 절약 시뮬레이션 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Lightbulb className="h-3 w-3 text-white" />
              </div>
              전기 사용량 절약 시뮬레이션
            </CardTitle>
            <CardDescription>사용량을 줄였을 때 요금 절감 효과</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold text-gray-900">현재 월 전기요금</div>
                  <div className="text-2xl font-bold text-yellow-600">₩85,000</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">절약 목표</div>
                  <div className="text-lg font-bold text-green-600">{electricReduction[0]}% 절약</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>절약률</span>
                  <span>{electricReduction[0]}%</span>
                </div>
                <Slider
                  value={electricReduction}
                  onValueChange={setElectricReduction}
                  max={30}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <div className="text-sm text-green-800">예상 절약액</div>
                <div className="text-xl font-bold text-green-600">
                  ₩{((85000 * electricReduction[0]) / 100).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={electricSimulation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="reduction" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
                  <Bar dataKey="amount" fill="#FFEB00" name="예상 요금" />
                  <Bar dataKey="savings" fill="#10B981" name="절약액" />
                </BarChart>
              </ResponsiveContainer>
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

        {/* 역률 개선 시뮬레이션 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Target className="h-3 w-3 text-white" />
              </div>
              역률 개선 시뮬레이션
            </CardTitle>
            <CardDescription>역률 개선 시 요금 절감 효과</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold text-gray-900">현재 역률</div>
                  <div className="text-2xl font-bold text-purple-600">{powerFactor[0]}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">목표 역률</div>
                  <div className="text-lg font-bold text-green-600">0.95</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>역률</span>
                  <span>{powerFactor[0]}</span>
                </div>
                <Slider
                  value={powerFactor}
                  onValueChange={setPowerFactor}
                  max={0.95}
                  min={0.7}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.7</span>
                  <span>0.95</span>
                </div>
              </div>
              {powerFactor[0] < 0.9 && (
                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <div className="text-sm text-orange-800">역률이 0.9 미만일 경우 역률 요금이 부과됩니다.</div>
                  <div className="text-lg font-bold text-orange-600">
                    월 추가 요금: ₩{((0.9 - powerFactor[0]) * 50000).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Link href="/simulation/gas">
            <Button className="h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl w-full">
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
