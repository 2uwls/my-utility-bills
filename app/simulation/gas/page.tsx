'use client';

import type React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, Flame, Snowflake, Sun, Calendar, Zap, Thermometer, Droplets, Home, AlertCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { GAS_SAVING_FORMULAS } from "@/lib/constants/gas-saving-formulas";

// Data and types can be moved to a separate file for better organization
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

const seasons: Season[] = ["winter", "spring", "summer", "fall"];

const getTipUniqueKey = (tipId: TipKey, season?: Season): string => {
  return season ? `${season}_${tipId}` : tipId;
};



// Loading skeleton component
const CardSkeleton = () => (
  <div className="border-0 rounded-2xl bg-white shadow-sm p-6 h-64 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

// Dynamically import card components
const GasStatusCard = dynamic(() => import('@/components/simulation/gas/GasStatusCard'), { loading: () => <CardSkeleton />, ssr: false });
const CommonTipsCard = dynamic(() => import('@/components/simulation/gas/CommonTipsCard'), { loading: () => <CardSkeleton />, ssr: false });
const SeasonalTipsCard = dynamic(() => import('@/components/simulation/gas/SeasonalTipsCard'), { loading: () => <CardSkeleton />, ssr: false });
const GasCumulativeSavingsCard = dynamic(() => import('@/components/simulation/gas/GasCumulativeSavingsCard'), { loading: () => <CardSkeleton />, ssr: false });

export default function GasSimulationPage() {
  const [currentSeason, setCurrentSeason] = useState<Season>("winter");
  const [savingTips, setSavingTips] = useState<Record<string, boolean>>({});
  const [showerTime, setShowerTime] = useState<number>(15);
  const [showerSavingAmount, setShowerSavingAmount] = useState<number>(0);
  const [areaInPyeong, setAreaInPyeong] = useState<number>(12); // 12평 기준

  const seasonalTips = {
    winter: [
      { id: "temperature", title: "실내 적정 난방 온도 설정", description: "18~20℃로 설정하기", icon: <Thermometer className="h-5 w-5" />, saving: 6000, detail: "1도만 낮춰도 7% 절약 가능" },
      { id: "humidity", title: "적정 습도 유지", description: "40~60% 습도 유지하기", icon: <Droplets className="h-5 w-5" />, saving: 2000, detail: "습도가 높으면 체감온도 상승" },
      { id: "awayMode", title: "외출모드 활용", description: '외출시 보일러 "외출모드"로 전환', icon: <Home className="h-5 w-5" />, saving: 4000, detail: "15도 정도로 자동 조절" },
      { id: "warmClothes", title: "보온용품 착용", description: "실내 내복, 수면양말 등 착용", icon: <Snowflake className="h-5 w-5" />, saving: 5000, detail: "체감온도 2-3도 상승 효과" },
      { id: "valveControl", title: "난방 밸브 조정", description: "사용하지 않는 방 밸브 잠그기", icon: <AlertCircle className="h-5 w-5" />, saving: GAS_SAVING_FORMULAS.MONTHLY.NO_USE_ROOM_HEATING_VALVE * areaInPyeong, detail: `월 ${ (GAS_SAVING_FORMULAS.MONTHLY.NO_USE_ROOM_HEATING_VALVE * areaInPyeong).toLocaleString() }원 절약` },
      { id: "boilerCleaning", title: "보일러 관리", description: "보일러 청소 및 배관 공기 빼기", icon: <AlertCircle className="h-5 w-5" />, saving: GAS_SAVING_FORMULAS.MONTHLY.BOILER_CLEANING * areaInPyeong, detail: `월 ${ (GAS_SAVING_FORMULAS.MONTHLY.BOILER_CLEANING * areaInPyeong).toLocaleString() }원 절약` },
    ],
    summer: [
      { id: "shower", title: "샤워 시간 단축", description: "온수 사용 시간 줄이기", icon: <Droplets className="h-5 w-5" />, saving: 0, detail: "5분 단축 시 월 4,000원 절약" },
    ],
    spring: [
      { id: "awayMode", title: "간헐적 난방 사용", description: "필요시에만 난방 가동", icon: <Home className="h-5 w-5" />, saving: 2000, detail: "봄철 온도 조절" },
      { id: "boilerCleaning", title: "보일러 점검", description: "난방 시즌 전 점검 및 청소", icon: <AlertCircle className="h-5 w-5" />, saving: 1000, detail: "효율성 향상" },
    ],
    fall: [
      { id: "temperature", title: "초기 난방 온도 조절", description: "서서히 온도 올리기", icon: <Thermometer className="h-5 w-5" />, saving: 4000, detail: "급격한 온도 변화 방지" },
      { id: "warmClothes", title: "보온용품 준비", description: "난방 전 보온용품 활용", icon: <Snowflake className="h-5 w-5" />, saving: 3000, detail: "난방 시작 시기 연기" },
    ],
  };

  const commonTips = [
    { id: "coldWater", title: "냉수 사용 습관", description: '평상시 수도꼭지 "냉수"쪽으로', icon: <Droplets className="h-5 w-5" />, saving: 1500, detail: "불필요한 온수 사용 방지" },
    { id: "autoPayment", title: "자동이체 할인", description: "자동이체 신청으로 할인", icon: <CreditCard className="h-5 w-5" />, saving: 500, detail: "월 500원 할인" },
    { id: "cardChange", title: "카드 할인", description: "가스요금 할인 카드 사용", icon: <CreditCard className="h-5 w-5" />, saving: 1000, detail: "월 1,000원 할인" },
    { id: "boilerWaterTempAdjustment", title: "보일러 온수 온도 조정", description: "55℃→40℃로 설정", icon: <Thermometer className="h-5 w-5" />, saving: GAS_SAVING_FORMULAS.MONTHLY.BOILER_WATER_TEMP_ADJUSTMENT * areaInPyeong, detail: `월 ${ (GAS_SAVING_FORMULAS.MONTHLY.BOILER_WATER_TEMP_ADJUSTMENT * areaInPyeong).toLocaleString() }원 절약` },
  ];

  useEffect(() => {
    const baseShowerTime = 15;
    const baseSavingFor5Min = 4000;
    const savingPerMinute = baseSavingFor5Min / 5;
    if (showerTime < baseShowerTime) {
      setShowerSavingAmount((baseShowerTime - showerTime) * savingPerMinute);
    } else {
      setShowerSavingAmount(0);
    }
  }, [showerTime]);

  const calculateTotalSavings = () => {
    let totalSavings = 0;
    commonTips.forEach((tip) => {
      if (savingTips[getTipUniqueKey(tip.id)]) {
        totalSavings += tip.saving;
      }
    });
    seasonalTips[currentSeason]?.forEach((tip) => {
      const uniqueKey = getTipUniqueKey(tip.id, currentSeason);
      if (savingTips[uniqueKey]) {
        if (tip.id === "shower" && currentSeason === "summer") {
          totalSavings += showerSavingAmount;
        } else {
          totalSavings += tip.saving;
        }
      }
    });
    return totalSavings;
  };

  const generateCumulativeData = () => {
    const data = [];
    let cumulative = 0;
    const monthToSeasonMap: Record<number, Season> = { 1: "winter", 2: "winter", 3: "spring", 4: "spring", 5: "spring", 6: "summer", 7: "summer", 8: "summer", 9: "fall", 10: "fall", 11: "fall", 12: "winter" };
    const orderedMonths = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    for (const monthNum of orderedMonths) {
      let monthlySavingForThisMonth = 0;
      const monthSeason = monthToSeasonMap[monthNum];
      commonTips.forEach((tip) => {
        if (savingTips[getTipUniqueKey(tip.id)]) {
          monthlySavingForThisMonth += tip.saving;
        }
      });
      seasonalTips[monthSeason]?.forEach((tip) => {
        const uniqueKey = getTipUniqueKey(tip.id, monthSeason);
        if (savingTips[uniqueKey]) {
          if (tip.id === "shower" && monthSeason === "summer") {
            monthlySavingForThisMonth += showerSavingAmount;
          } else {
            monthlySavingForThisMonth += tip.saving;
          }
        }
      });
      cumulative += monthlySavingForThisMonth;
      data.push({ month: `${monthNum}월`, monthly: monthlySavingForThisMonth, cumulative: cumulative });
    }
    return data;
  };

  const handleTipToggle = (tipId: TipKey, season?: Season) => {
    const uniqueKey = getTipUniqueKey(tipId, season);
    setSavingTips((prev) => ({ ...prev, [uniqueKey]: !prev[uniqueKey] }));
  };

  const getSeasonName = (season: Season) => ({ winter: "겨울", spring: "봄", summer: "여름", fall: "가을" }[season]);
  const getSeasonIcon = (season: Season) => ({ winter: <Snowflake className="h-4 w-4" />, spring: <Sun className="h-4 w-4" />, summer: <Sun className="h-4 w-4" />, fall: <Calendar className="h-4 w-4" /> }[season]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/simulation">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
                  도시가스 시뮬레이션
                </h1>
                <p className="text-xs text-gray-500">계절별 절약 팁과 효과 확인</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/simulation/electric">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent whitespace-nowrap">
                  <Zap className="h-4 w-4" />
                  전기요금
                </Button>
              </Link>
              <div className="w-8 h-8 bg-[#FFE300] rounded-full flex items-center justify-center">
                <Flame className="h-4 w-4 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <GasStatusCard 
          currentSeason={currentSeason}
          getSeasonName={getSeasonName}
          calculateTotalSavings={calculateTotalSavings}
        />
        <CommonTipsCard 
          commonTips={commonTips}
          savingTips={savingTips}
          handleTipToggle={handleTipToggle}
          getTipUniqueKey={getTipUniqueKey}
        />
        <SeasonalTipsCard 
          currentSeason={currentSeason}
          seasons={seasons}
          savingTips={savingTips}
          seasonalTips={seasonalTips}
          showerTime={showerTime}
          showerSavingAmount={showerSavingAmount}
          setCurrentSeason={setCurrentSeason}
          getSeasonName={getSeasonName}
          getSeasonIcon={getSeasonIcon}
          handleTipToggle={handleTipToggle}
          getTipUniqueKey={getTipUniqueKey}
          setShowerTime={setShowerTime}
        />
        <GasCumulativeSavingsCard 
          generateCumulativeData={generateCumulativeData}
          calculateTotalSavings={calculateTotalSavings}
        />
      </div>
    </div>
  );
}