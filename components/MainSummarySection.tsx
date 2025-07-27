"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Leaf,
  Calculator,
  Flame,
} from "lucide-react";

export default function MainSummarySection() {
  // 이 컴포넌트에서만 쓰는 데이터만 남김
  const currentBill = {
    electric: {
      usage: 230, // kWh
      amount: 33000, // ₩33,000 수준
      previousAmount: 38000, // 전월 대비 소폭 감소
      savings: 5000,
      dueDate: "2024.09.25",
      status: "정상",
    },
    gas: {
      usage: 15, // m³ (보일러·취사 기준 소량)
      amount: 22000, // ₩12,000 수준
      previousAmount: 15000,
      savings: 3000,
      dueDate: "2024.09.28",
      status: "이상 탐지", // 이상탐지 대신 정상으로 전환
    },
  };

  const cumulativeSavings = {
    totalSaved: 90000, // 약 3개월 누적 절약
    monthsUsed: 3,
    projectedYearEnd: 150000,
    monthlyAverage: 30000,
  };

  return (
    <>
      {/* 전자 청구서 형태 메인 카드 */}
      <Card className="border-0 rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-[#FFE300] text-[#333333]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">
                9월 공과금 청구서
              </CardTitle>
              <p className="text-sm opacity-90">전월 대비 ₩28,000 절약!</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-[#333333]" />
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
                <div className="text-sm text-gray-600">
                  {currentBill.electric.usage}kWh 사용
                </div>
                <div className="text-xs text-gray-500">
                  납기일: {currentBill.electric.dueDate}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ₩{currentBill.electric.amount.toLocaleString()}
              </div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />₩
                {currentBill.electric.savings.toLocaleString()} 절약
              </div>
              <Badge
                variant="outline"
                className="text-xs border-green-500 text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                {currentBill.electric.status}
              </Badge>
            </div>
          </div>

          {/* 가스요금 */}
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">가스요금</div>
                <div className="text-sm text-gray-600">
                  {currentBill.gas.usage}㎥ 사용
                </div>
                <div className="text-xs text-gray-500">
                  납기일: {currentBill.gas.dueDate}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ₩{currentBill.gas.amount.toLocaleString()}
              </div>
              {/* <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />₩
                {currentBill.gas.savings.toLocaleString()} 절약
              </div> */}
              <Badge
                variant={
                  currentBill.gas.status === "이상 탐지"
                    ? "destructive"
                    : "outline"
                }
                className={
                  currentBill.gas.status === "이상 탐지"
                    ? "text-xs"
                    : "text-xs border-green-500 text-green-600"
                }>
                {currentBill.gas.status === "이상 탐지" ? (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                ) : (
                  <CheckCircle className="h-3 w-3 mr-1" />
                )}
                {currentBill.gas.status}
              </Badge>
            </div>
          </div>

          {/* 총 청구 금액 */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-gray-900">
                이번 달 총 청구액
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₩
                  {(
                    currentBill.electric.amount + currentBill.gas.amount
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-green-600 font-medium">
                  전월 대비 ₩
                  {(
                    currentBill.electric.savings +
                    (currentBill.gas.status === "이상 탐지"
                      ? 0
                      : currentBill.gas.savings)
                  ).toLocaleString()}{" "}
                  절약
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 시뮬레이션 알림 카드
      <Link href="/simulation">
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <div className="font-bold">절약 시뮬레이션 해보기</div>
                  <div className="text-sm opacity-90">
                    다양한 절약 방법의 효과를 미리 확인
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </Link> */}

      {/* 리워드 알림 카드 */}
      {/* <Link href="/rewards">
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 text-white cursor-pointer hover:from-green-500 hover:to-green-600 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌳</div>
                <div>
                  <div className="font-bold">새로운 나무가 자랐어요!</div>
                  <div className="text-sm opacity-90">
                    절약 숲에서 확인해보세요
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </Link> */}

      {/* 요약 통계 카드들 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">
              ₩{cumulativeSavings.totalSaved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {cumulativeSavings.monthsUsed}개월 누적 할인 금액
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Leaf className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">8그루</div>
            <div className="text-sm text-gray-500">심은 나무</div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calculator className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">
              ₩{cumulativeSavings.projectedYearEnd.toLocaleString()}
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">예상 할인 금액</div>
              <div className="text-xs text-gray-400 mb-0.5">
                연말까지 유지 시
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
