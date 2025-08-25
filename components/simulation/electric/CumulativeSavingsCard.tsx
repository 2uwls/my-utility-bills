'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CumulativeSavingsCardProps {
  generateCumulativeData: () => any[];
  calculateElectricSavings: () => number;
}

export default function CumulativeSavingsCard({ generateCumulativeData, calculateElectricSavings }: CumulativeSavingsCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold">
          연간 누적 절약 효과
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          현재 설정으로 1년간 절약할 수 있는 금액
        </CardDescription>
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
              <Bar dataKey="monthly" fill="#FFE300" name="월 절약액" />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#666666"
                strokeWidth={3}
                dot={{ fill: "#666666", strokeWidth: 2, r: 4 }}
                name="누적 절약액"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900">연간 총 절약 예상액</div>
              <div className="text-sm text-gray-700">
                현재 적용된 절약 팁 기준
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              ₩{(calculateElectricSavings() * 12).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
