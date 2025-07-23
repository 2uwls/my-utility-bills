"use client"

import { ArrowLeft, Calculator, Lightbulb, Flame, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SimulationMainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">절약 시뮬레이션</h1>
                <p className="text-xs text-gray-500">다양한 절약 방법의 효과를 미리 확인</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Calculator className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 메인 소개 카드 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">절약 시뮬레이션</h2>
                <p className="text-sm opacity-90">절약 방법별 효과를 미리 계산해보세요</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Calculator className="h-6 w-6" />
              </div>
            </div>
            <div className="text-sm opacity-90">
              전기요금과 도시가스 요금을 각각 시뮬레이션하여 최적의 절약 방법을 찾아보세요.
            </div>
          </CardContent>
        </Card>

        {/* 시뮬레이션 선택 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 전기요금 시뮬레이션 */}
          <Link href="/simulation/electric">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl">⚡</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">전기요금 시뮬레이션</h3>
                <p className="text-sm text-gray-600 mb-4">
                  사용량 절약, 시간대별 요금제, 역률 개선 등 다양한 전기요금 절약 방법을 시뮬레이션해보세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>사용량 절약 시뮬레이션</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>시간대별 요금제 비교</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>역률 개선 효과</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">현재 월 요금: ₩85,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 30% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 도시가스 시뮬레이션 */}
          <Link href="/simulation/gas">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Flame className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl">🔥</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">도시가스 시뮬레이션</h3>
                <p className="text-sm text-gray-600 mb-4">
                  사용량 절약, 에너지 바우처, 계절별 사용 패턴 등 도시가스 요금 절약 방법을 시뮬레이션해보세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>사용량 절약 시뮬레이션</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>에너지 바우처 효과</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>계절별 사용량 분석</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">현재 월 요금: ₩52,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 25% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 통합 시뮬레이션 카드 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">통합 절약 효과</h3>
                <p className="text-sm opacity-90">전기 + 가스 절약 시 예상 효과</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">₩20,000</div>
                <div className="text-sm opacity-90">월 예상 절약액</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₩240,000</div>
                <div className="text-sm opacity-90">연간 예상 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 최근 시뮬레이션 결과 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">최근 시뮬레이션 결과</CardTitle>
            <CardDescription>지난 시뮬레이션 결과를 다시 확인해보세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">전기요금 15% 절약</div>
                  <div className="text-xs text-gray-500">2024.09.15</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">₩12,750</div>
                <div className="text-xs text-gray-500">월 절약액</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">도시가스 20% 절약</div>
                  <div className="text-xs text-gray-500">2024.09.10</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">₩10,400</div>
                <div className="text-xs text-gray-500">월 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Link href="/rewards">
            <Button className="h-12 bg-green-500 hover:bg-green-600 text-white rounded-2xl w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              절약 숲 보기
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="h-12 rounded-2xl border-gray-200 bg-white w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
