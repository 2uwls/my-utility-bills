'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Percent, Home } from 'lucide-react';

interface DiscountCardProps {
  electricSavings: { essentialDeduction: boolean; [key: string]: any };
  handleElectricSavingToggle: (savingId: string) => void;
  monthlyUsage: number[];
  currentSeason: string;
  getEssentialDeductionData: () => any[];
  getElectricRates: (season: string) => any;
}

export default function DiscountCard({ 
  electricSavings,
  handleElectricSavingToggle,
  monthlyUsage,
  currentSeason,
  getEssentialDeductionData,
  getElectricRates
}: DiscountCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Percent className="h-5 w-5" />
          할인 혜택 적용
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          다양한 할인 혜택을 적용하여 요금을 절약하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 필수사용공제 */}
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">필수사용공제</div>
                <div className="text-sm text-gray-600 break-keep">
                  {getElectricRates(currentSeason).tier1.limit}kWh 이하 시
                  10% 할인
                </div>
              </div>
            </div>
            <Switch
              checked={electricSavings.essentialDeduction}
              onCheckedChange={() =>
                handleElectricSavingToggle("essentialDeduction")
              }
            />
          </div>

          <div className="border border-gray-200 rounded-xl p-2 sm:p-4">
            <div className="text-sm font-medium text-gray-900 mb-4 break-keep">
              {monthlyUsage[0] <=
              getElectricRates(currentSeason).tier1.limit
                ? `필수사용공제 혜택 비교 (현재 ${monthlyUsage[0]}kWh - 혜택 대상)`
                : `사용량 절약 + 필수사용공제 혜택 (현재 ${monthlyUsage[0]}kWh - 혜택 대상 아님)`}
            </div>

            <div className="h-48 mb-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getEssentialDeductionData()}
                  barSize={40}
                  margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `₩${value.toLocaleString()}`,
                      "요금",
                    ]}
                  />
                  <Bar dataKey="amount">
                    {getEssentialDeductionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {(() => {
                const data = getEssentialDeductionData();
                const savings = data[0].amount - data[1].amount;
                return (
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#FFE300] text-[#1E1E1E] px-3 py-2 rounded-lg text-sm font-bold relative">
                      ₩{savings.toLocaleString()} 절약!
                      <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FFE300]"></div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {(() => {
              const data = getEssentialDeductionData();
              const isEligible =
                monthlyUsage[0] <=
                getElectricRates(currentSeason).tier1.limit;

              return (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}></div>
                          <div className="font-medium text-gray-900 text-sm">
                            {item.type}
                          </div>
                        </div>
                        <div
                          className="text-base sm:text-lg font-bold"
                          style={{ color: item.color }}>
                          ₩{item.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 break-keep leading-relaxed">
                    {isEligible
                      ? `현재 ${monthlyUsage[0]}kWh 사용으로 혜택 대상입니다`
                      : `현재 ${monthlyUsage[0]}kWh → ${
                          getElectricRates(currentSeason).tier1.limit
                        }kWh로 줄이고 혜택 적용시`}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}