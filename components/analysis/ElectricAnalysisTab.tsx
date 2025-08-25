"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Zap, CheckCircle } from "lucide-react";

// Props 타입 정의
interface ElectricAnalysisTabProps {
  electricExpenseData: any[];
  electricUsageData: any[];
}

export default function ElectricAnalysisTab({ electricExpenseData, electricUsageData }: ElectricAnalysisTabProps) {
  return (
    <div className="space-y-6 mt-6">
      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
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
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-medium text-sm">{label}</p>
                          {payload.map((entry, index) => (
                            <p
                              key={index}
                              className="text-xs"
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FFE300] bg-opacity-10 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">
                전년 동월 대비
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-600">
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
              <div className="text-xl sm:text-2xl font-bold text-gray-600">
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

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold">
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
                <div className="text-xl sm:text-2xl font-bold text-gray-600">
                  주의
                </div>
                <div className="text-xs text-gray-900">
                  3구간까지 160kWh 여유
                </div>
              </div>
            </div>
            <Progress value={60} className="h-2 bg-gray-100 mt-3" />
            <div className="text-[10px] sm:text-xs text-gray-900 mt-1">
              2구간 상한(400kWh)까지 160kWh 남음
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}
