'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Clock, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimeBasedRatesCardProps {
  contractType: string;
  setContractType: (value: string) => void;
  timeBasedRates: any[];
}

export default function TimeBasedRatesCard({ contractType, setContractType, timeBasedRates }: TimeBasedRatesCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-700" />
          시간대별 요금제 비교
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">일반형 vs 심야형 요금제 비교</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Select value={contractType} onValueChange={setContractType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">
                <div className="flex items-center gap-1">
                  일반형
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-gray-400 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-wrap">
                        <p>
                          시간대에 상관없이 동일한 요금 단가가 적용되는 요금제입니다.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </SelectItem>
              <SelectItem value="night">
                <div className="flex items-center gap-1">
                  심야형
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-gray-400 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-wrap">
                        <p>
                          주로 심야 시간대(23시~06시)에 전기 요금 할인이 적용되는 요금제입니다.
                          심야 전기 사용량이 많은 가구에 유리합니다.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="font-bold text-gray-900 mb-3">요금제 추천</div>
          <div className="text-sm text-gray-700 break-keep leading-relaxed">
            {contractType === "general" ? (
              <>
                현재 일반형 계약입니다. <br />
                심야 시간대 사용량이 많다면 심야형으로 변경을 고려해보세요.
              </>
            ) : (
              <>
                심야형 계약 시 23시-06시 요금이 50% 할인됩니다. <br />
                겨울 난방 시에는 일반형이 더 유리할 수 있습니다.
              </>
            )}
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer
            className="border border-gray-200 rounded-xl p-2 sm:p-6"
            width="100%"
            height="100%">
            <BarChart
              data={timeBasedRates}
              margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, "dataMax + 20"]} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-medium text-sm">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-xs">
                            {entry.name}: {entry.value}원/kWh
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="일반형"
                fill={contractType === "general" ? "#FFE300" : "#AAAAAA"}
                name="일반형"
              />
              <Bar
                dataKey="심야형"
                fill={contractType === "night" ? "#FFE300" : "#AAAAAA"}
                name="심야형"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
