'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import dynamic from 'next/dynamic';

const ShowerSimulationCard = dynamic(() => import('./ShowerSimulationCard'), { ssr: false });

type Season = "winter" | "spring" | "summer" | "fall";
type TipKey =
  | "temperature"
  | "humidity"
  | "awayMode"
  | "coldWater"
  | "boilerCleaning"
  | "warmClothes"
  | "valveControl"
  | "shower"
  | "autoPayment"
  | "cardChange";

interface Tip {
  id: TipKey;
  title: string;
  description: string;
  icon: React.ReactNode;
  saving: number;
  detail: string;
}

interface SeasonalTipsCardProps {
  currentSeason: Season;
  seasons: Season[];
  savingTips: Record<string, boolean>;
  seasonalTips: Record<Season, Tip[]>;
  showerTime: number;
  showerSavingAmount: number;
  setCurrentSeason: (season: Season) => void;
  getSeasonName: (season: Season) => string;
  getSeasonIcon: (season: Season) => React.ReactNode;
  handleTipToggle: (tipId: TipKey, season?: Season) => void;
  getTipUniqueKey: (tipId: TipKey, season?: Season) => string;
  setShowerTime: (value: number) => void;
}

export default function SeasonalTipsCard({ 
  currentSeason,
  seasons,
  savingTips,
  seasonalTips,
  showerTime,
  showerSavingAmount,
  setCurrentSeason,
  getSeasonName,
  getSeasonIcon,
  handleTipToggle,
  getTipUniqueKey,
  setShowerTime
}: SeasonalTipsCardProps) {
  return (
    <>
      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold">
            계절별 절약 시뮬레이션
          </CardTitle>
          <CardDescription className="break-keep leading-relaxed">
            계절을 선택하여 맞춤 절약 팁을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {seasons.map((season) => (
              <Button
                key={season}
                variant={currentSeason === season ? "default" : "outline"}
                className={`h-12 rounded-xl text-xs sm:text-sm ${
                  currentSeason === season
                    ? "bg-[#FFE300] hover:bg-[#E5C200] text-[#1E1E1E]"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => setCurrentSeason(season)}>
                <div className="flex items-center gap-2">
                  {getSeasonIcon(season)}
                  <span>{getSeasonName(season)}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
            {getSeasonIcon(currentSeason)}
            {getSeasonName(currentSeason)}철 절약 팁
          </CardTitle>
          <CardDescription className="break-keep leading-relaxed">
            {currentSeason === "winter" && "난방비 절약을 위한 핵심 팁들"}
            {currentSeason === "summer" && "온수 사용 절약 팁"}
            {currentSeason === "spring" && "봄철 가스 절약 방법"}
            {currentSeason === "fall" && "가을철 난방 준비 절약 팁"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {seasonalTips[currentSeason]?.map((tip) => (
            <div
              key={tip.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4 mb-3 sm:mb-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{tip.title}</div>
                  <div className="text-sm text-gray-600 break-keep">
                    {tip.description}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {tip.detail}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                {tip.saving > 0 &&
                  tip.id !== "shower" && (
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-green-600">
                        ₩{tip.saving.toLocaleString()}
                      </div>

                      <div className="text-xs text-gray-500">월 절약</div>
                    </div>
                  )}
                {tip.id === "shower" &&
                  currentSeason === "summer" && (
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-green-600">
                        ₩{showerSavingAmount.toLocaleString()}
                      </div>

                      <div className="text-xs text-gray-500">월 절약</div>
                    </div>
                  )}
                <Switch
                  checked={savingTips[getTipUniqueKey(tip.id, currentSeason)]}
                  onCheckedChange={() =>
                    handleTipToggle(tip.id, currentSeason)
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {currentSeason === "summer" &&
        savingTips[getTipUniqueKey("shower", "summer")] && (
          <ShowerSimulationCard 
            showerTime={showerTime}
            setShowerTime={setShowerTime}
            showerSavingAmount={showerSavingAmount}
          />
        )}
    </>
  );
}
