'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";


interface ProgressiveTierCardProps {
  monthlyUsage: number[];
  currentSeason: string;
  electricSavings: { progressiveTierChange: boolean;[key: string]: any };
  handleElectricSavingToggle: (savingId: string) => void;
  getProgressiveComparisonData: () => any[];
  getCurrentTier: (usage: number) => number;
  getElectricRates: (season: string) => any;
}

export default function ProgressiveTierCard({ 
  monthlyUsage,
  currentSeason,
  electricSavings,
  handleElectricSavingToggle,
  getProgressiveComparisonData,
  getCurrentTier,
  getElectricRates
}: ProgressiveTierCardProps) {
  const isMobile = useIsMobile();
  const data = getProgressiveComparisonData();
  if (data.length === 0) return null;

  const rates = getElectricRates(currentSeason);
  const currentTier = getCurrentTier(monthlyUsage[0]);

  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          누진제 구간 변경 시 절약 효과
          {isMobile ? (
            <Popover>
              <PopoverTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="max-w-xs text-wrap">
                <p>
                  사용량이 많을수록 전기 요금 단가가 비싸지는 요금 체계입니다.
                  절약을 통해 낮은 구간의 요금을 적용받을 수 있습니다.
                </p>
              </PopoverContent>
            </Popover>
          ) : (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-wrap">
                  <p>
                    사용량이 많을수록 전기 요금 단가가 비싸지는 요금 체계입니다.
                    절약을 통해 낮은 구간의 요금을 적용받을 수 있습니다.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          현재 구간에서 낮은 구간으로 변경 시 절약할 수 있는 금액
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Calculator className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">
                누진제 구간 변경
              </div>
              <div className="text-sm text-gray-600">
                {currentTier}구간 → 1구간 적용
              </div>
            </div>
          </div>
          <Switch
            checked={electricSavings.progressiveTierChange}
            onCheckedChange={() =>
              handleElectricSavingToggle("progressiveTierChange")
            }
          />
        </div>

        <div className="mb-4 p-4 rounded-xl bg-gray-50">
          <div className="text-sm font-semibold text-gray-900 mb-2">
            {currentSeason === "summer" ? "하계" : "기타계절"}{" "}
            누진제 구간 기준 (현재: {currentTier}
            구간)
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
            <div className="text-center">
              <div className="font-medium">1구간</div>
              <div>0~{rates.tier1.limit}kWh</div>
              <div className="text-blue-600">
                {rates.tier1.unitPrice}원/kWh
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">2구간</div>
              <div>
                {rates.tier1.limit + 1}~{rates.tier2.limit}kWh
              </div>
              <div className="text-green-600">
                {rates.tier2.unitPrice}원/kWh
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">3구간</div>
              <div>{rates.tier2.limit + 1}kWh 이상</div>
              <div className="text-red-600">
                {rates.tier3.unitPrice}원/kWh
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-2 sm:p-4 mb-4">
          <div className="h-64 mb-4 relative">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="p-2">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [
                    `₩${value.toLocaleString()}`,
                    "요금",
                  ]}
                />
                <Bar dataKey="amount" barSize={40}>
                  {data.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {(() => {
              if (data.length >= 2) {
                let savings = 0;
                let message = "";
                if (currentTier === 3) {
                  savings = data[0].amount - data[2].amount;
                  message = "최대 절약액";
                } else if (currentTier === 2) {
                  savings = data[0].amount - data[1].amount;
                  message = "절약액";
                }

                return (
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#FFE300] text-[#1E1E1E] px-3 py-2 rounded-lg text-sm font-bold relative">
                      ₩{savings.toLocaleString()} {message}!
                      <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FFE300]"></div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

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

          {currentTier === 3 && (
            <div className="mt-3 p-3 bg-[#FFE300] bg-opacity-10 rounded-lg">
              <div className="text-sm text-gray-700 break-keep leading-relaxed">
                💡 <strong>3구간 사용자 혜택</strong>
                <br />• 2구간 적용시: ₩
                {(
                  data[0].amount - data[1].amount
                ).toLocaleString()}{" "}
                절약
                <br />• 1구간 적용시: ₩
                {(
                  data[0].amount - data[2].amount
                ).toLocaleString()}{" "}
                절약 (최대)
              </div>
            </div>
          )}
        </div>

        {currentTier === 1 && (
          <div className="mt-4 p-4 bg-green-50 rounded-xl">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-bold text-green-900">
                  이미 최적 구간입니다!
                </div>
                <div className="text-sm text-green-700 break-keep leading-relaxed">
                  현재 1구간으로 가장 저렴한 요금을 적용받고 있습니다.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
