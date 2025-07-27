"use client";
import { Users, TrendingUp, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

export default function HomeTabContent() {
  // 홈 탭에서만 쓰는 데이터만 남김
  const comparisonData = [
    { month: "4월", myUsage: 320, regionAvg: 356, peerAvg: 348 },
    { month: "5월", myUsage: 310, regionAvg: 350, peerAvg: 340 },
    { month: "6월", myUsage: 300, regionAvg: 340, peerAvg: 330 },
    { month: "7월", myUsage: 330, regionAvg: 360, peerAvg: 350 },
    { month: "8월", myUsage: 340, regionAvg: 370, peerAvg: 360 },
    { month: "9월", myUsage: 320, regionAvg: 356, peerAvg: 348 },
  ];

  return (
    <>
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
              <span className="text-sm font-medium text-gray-700 ">전기</span>
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
        </CardContent>
      </Card>

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
                <div className="text-sm text-gray-600">
                  우수한 절약 실천 중이에요!
                </div>
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
                  labelFormatter={(label) => `${label}`}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.dataKey === "myUsage" && "내 사용량"}
                              {entry.dataKey === "regionAvg" && "지역평균"}
                              {entry.dataKey === "peerAvg" && "또래평균"}:{" "}
                              {entry.value}kWh
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="myUsage"
                  fill="#FFE300"
                  name="내 사용량"
                  barSize={40}
                />
                <Line
                  type="monotone"
                  dataKey="regionAvg"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="지역평균"
                />
                <Line
                  type="monotone"
                  dataKey="peerAvg"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="또래평균"
                />
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

      {/* 누적 할인 통계
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
              "이 서비스를 {cumulativeSavings.monthsUsed}개월동안 이용하면서,
              지금까지{" "}
              <span className="font-bold text-xl">
                ₩{cumulativeSavings.totalSaved.toLocaleString()}
              </span>
              을 아꼈어요!"
            </div>
            <div className="text-sm opacity-90">
              "12월까지 유지시, 최대{" "}
              <span className="font-bold text-xl">
                ₩{cumulativeSavings.projectedYearEnd.toLocaleString()}
              </span>
              을 아낄 수 있어요!"
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">월 평균 절약액</span>
                <span className="font-bold">
                  ₩{cumulativeSavings.monthlyAverage.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}
