'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Flame } from 'lucide-react';

interface GasStatusCardProps {
  currentSeason: string;
  getSeasonName: (season: string) => string;
  calculateTotalSavings: () => number;
}

export default function GasStatusCard({ 
  currentSeason,
  getSeasonName,
  calculateTotalSavings
}: GasStatusCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-[#FFE300] text-[#1E1E1E]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold">현재 절약 효과</h2>
            <p className="text-sm opacity-90">
              {getSeasonName(currentSeason)}철 기준
            </p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Flame className="h-6 w-6" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">
              ₩{calculateTotalSavings().toLocaleString()}
            </div>
            <div className="text-sm opacity-90">월 절약액</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">
              ₩{(calculateTotalSavings() * 12).toLocaleString()}
            </div>
            <div className="text-sm opacity-90">연간 절약액</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
