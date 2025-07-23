"use client"

import { ArrowLeft, Flame, Snowflake, Sun, Calendar, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function GasSimulationMainPage() {
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
                <h1 className="text-lg font-bold text-gray-900">도시가스 시뮬레이션</h1>
                <p className="text-xs text-gray-500">계절별 맞춤 절약 방법</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <Flame className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 메인 소개 카드 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">계절별 도시가스 절약</h2>
                <p className="text-sm opacity-90">계절에 맞는 맞춤 절약 방법을 확인하세요</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6" />
              </div>
            </div>
            <div className="text-sm opacity-90">
              계절별로 다른 가스 사용 패턴에 맞춘 최적의 절약 방법을 시뮬레이션해보세요.
            </div>
          </CardContent>
        </Card>

        {/* 계절별 시뮬레이션 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 겨울철 시뮬레이션 */}
          <Link href="/simulation/gas/winter">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Snowflake className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl">❄️</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">겨울철 난방비 절약</h3>
                <p className="text-sm text-gray-600 mb-4">
                  적정 온도 설정, 보온용품 활용, 외출모드 등 겨울철 핵심 난방비 절약 방법을 시뮬레이션해보세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>적정 온도 설정 (18-20℃)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>보온용품 활용</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>외출모드 활용</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">평균 월 요금: ₩85,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 50% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 여름철 시뮬레이션 */}
          <Link href="/simulation/gas/summer">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl">☀️</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">여름철 온수 절약</h3>
                <p className="text-sm text-gray-600 mb-4">
                  샤워 시간 단축, 냉수 사용 습관 등 여름철 온수 사용량을 줄이는 방법을 시뮬레이션해보세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>샤워 시간 단축</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>냉수 사용 습관</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>온수 온도 조절</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">평균 월 요금: ₩25,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 40% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 봄철 시뮬레이션 */}
          <Link href="/simulation/gas/spring">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl">🌸</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">봄철 전환기 절약</h3>
                <p className="text-sm text-gray-600 mb-4">
                  간헐적 난방 사용, 보일러 점검 등 봄철 전환기에 적용할 수 있는 절약 방법을 확인하세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>간헐적 난방 사용</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>보일러 점검 및 청소</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>환기 시간 조절</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">평균 월 요금: ₩45,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 30% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 가을철 시뮬레이션 */}
          <Link href="/simulation/gas/fall">
            <Card className="border-0 rounded-2xl bg-white cursor-pointer hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl">🍂</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">가을철 난방 준비</h3>
                <p className="text-sm text-gray-600 mb-4">
                  초기 난방 온도 조절, 보온용품 준비 등 겨울 난방 시즌을 대비한 절약 방법을 확인하세요.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>초기 난방 온도 조절</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>보온용품 미리 준비</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>단열 점검</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">평균 월 요금: ₩55,000</div>
                  <div className="text-xs text-green-600 font-medium">최대 35% 절약 가능</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 연간 절약 효과 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">연간 통합 절약 효과</h3>
                <p className="text-sm opacity-90">모든 계절 절약 방법 적용 시</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">₩180,000</div>
                <div className="text-sm opacity-90">연간 예상 절약액</div>
              </div>
              <div>
                <div className="text-2xl font-bold">35%</div>
                <div className="text-sm opacity-90">평균 절약률</div>
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
              절약 숲 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
