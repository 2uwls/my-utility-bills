'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from 'lucide-react';

interface ElectricStatusCardProps {
  monthlyUsage: number[];
  getCurrentTier: (usage: number) => number;
  currentSeason: string;
  calculateDiscountedElectricBill: () => number;
  calculateElectricSavings: () => number;
}

export default function ElectricStatusCard({ 
  monthlyUsage,
  getCurrentTier,
  currentSeason,
  calculateDiscountedElectricBill,
  calculateElectricSavings
}: ElectricStatusCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-[#FFE300] text-[#1E1E1E]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold">전기요금 시뮬레이션</h2>
            <p className="text-xs sm:text-sm opacity-90 break-keep">
              월 사용량: {monthlyUsage[0]}kWh (
              {getCurrentTier(monthlyUsage[0])}구간) |
              {currentSeason === "summer" ? "하계" : "기타계절"} 요금제 적용
            </p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">
              ₩{calculateDiscountedElectricBill().toLocaleString()}
            </div>
            <div className="text-sm opacity-90">할인 적용 요금</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">
              ₩{calculateElectricSavings().toLocaleString()}
            </div>
            <div className="text-sm opacity-90">월 절약액</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}