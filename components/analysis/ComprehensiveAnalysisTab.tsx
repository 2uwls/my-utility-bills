"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ComposedChart,
  LineChart,
  AreaChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingDown } from "lucide-react";

// Props 타입 정의
interface ComprehensiveAnalysisTabProps {
  yearOverYearData: any[];
  totalYearSavings: number;
  monthlyExpenseData: any[];
  cumulativeData: any[];
}

export default function ComprehensiveAnalysisTab({ 
  yearOverYearData,
  totalYearSavings,
  monthlyExpenseData,
  cumulativeData
}: ComprehensiveAnalysisTabProps) {
  return (
    <div className="space-y-6 mt-6">
      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FFE300] bg-opacity-10 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600">올해 평균</div>
              <div className="text-base sm:text-lg font-bold text-gray-700">
                ₩
                {Math.round(
                  yearOverYearData.reduce(
                    (sum, item) => sum + item.thisYear,
                    0
                  ) / yearOverYearData.length
                ).toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">작년 평균</div>
              <div className="text-base sm:text-lg font-bold text-gray-700">
                ₩
                {Math.round(
                  yearOverYearData.reduce(
                    (sum, item) => sum + item.lastYear,
                    0
                  ) / yearOverYearData.length
                ).toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">월평균 절약</div>
              <div className="text-base sm:text-lg font-bold text-gray-600">
                ₩
                {Math.round(
                  totalYearSavings / yearOverYearData.length
                ).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold">
            월별 총 지출 흐름 (최근 6개월)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 5000", "dataMax + 5000"]}
                />
                <Tooltip
                  formatter={(value) => [
                    `₩${value.toLocaleString()}`,
                    "총 지출",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#FFE300"
                  strokeWidth={3}
                  dot={{ fill: "#FFE300", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold">
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
                  formatter={(value, name) => [
                    `₩${value.toLocaleString()}`,
                    name === "electric"
                      ? "전기"
                      : name === "gas"
                      ? "가스"
                      : name,
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="electric"
                  stackId="1"
                  stroke="#FFE300"
                  fill="#FFE300"
                  name="전기"
                />
                <Area
                  type="monotone"
                  dataKey="gas"
                  stackId="1"
                  stroke="#FF6B35"
                  fill="#FF6B35"
                  name="가스"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
