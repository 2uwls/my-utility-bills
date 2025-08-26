'use client';

import { useState, useCallback } from "react";
import SimulationHeader from "@/components/SimulationHeader";
import dynamic from 'next/dynamic';

// Loading skeleton component
const CardSkeleton = () => (
  <div className="border-0 rounded-2xl bg-white shadow-sm p-6 h-64 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

// Dynamically import card components
const ElectricStatusCard = dynamic(() => import('@/components/simulation/electric/ElectricStatusCard'), { loading: () => <CardSkeleton />, ssr: false });
const TimeBasedRatesCard = dynamic(() => import('@/components/simulation/electric/TimeBasedRatesCard'), { loading: () => <CardSkeleton />, ssr: false });
const ProgressiveTierCard = dynamic(() => import('@/components/simulation/electric/ProgressiveTierCard'), { loading: () => <CardSkeleton />, ssr: false });
const DiscountCard = dynamic(() => import('@/components/simulation/electric/DiscountCard'), { loading: () => <CardSkeleton />, ssr: false });
const CumulativeSavingsCard = dynamic(() => import('@/components/simulation/electric/CumulativeSavingsCard'), { loading: () => <CardSkeleton />, ssr: false });
const NotificationSettingsCard = dynamic(() => import('@/components/simulation/NotificationSettingsCard'), { loading: () => <CardSkeleton />, ssr: false });

export default function ElectricSimulationPage() {
  const [contractType, setContractType] = useState("general");
  const [currentSeason, setCurrentSeason] = useState("winter");
  const [monthlyUsage, setMonthlyUsage] = useState([240]);
  const [electricSavings, setElectricSavings] = useState({
    essentialDeduction: false,
    progressiveTierChange: false,
  });

  // All calculation logic remains in the parent component
  const getElectricRates = (season: string) => {
    const isSummer = season === "summer";
    return {
      tier1: { limit: isSummer ? 300 : 200, baseCharge: 910, unitPrice: 120.0 },
      tier2: { limit: isSummer ? 450 : 400, baseCharge: 1600, unitPrice: 214.6 },
      tier3: { baseCharge: 7300, unitPrice: 307.3 },
    };
  };

  const timeBasedRates = [
    { time: "06-09", 일반형: 120, 심야형: 180, usage: 15 },
    { time: "09-17", 일반형: 120, 심야형: 180, usage: 25 },
    { time: "17-23", 일반형: 120, 심야형: 180, usage: 35 },
    { time: "23-06", 일반형: 120, 심야형: 60, usage: 25 },
  ];

  const calculateBaseElectricBill = (usage: number, progressiveType = 3, season = currentSeason) => {
    const rates = getElectricRates(season);
    let bill = 0;
    let baseCharge = 0;
    if (progressiveType === 1) {
      bill = usage * rates.tier1.unitPrice;
      baseCharge = rates.tier1.baseCharge;
    } else if (progressiveType === 2) {
      if (usage <= rates.tier1.limit) {
        bill = usage * rates.tier1.unitPrice;
        baseCharge = rates.tier1.baseCharge;
      } else {
        bill = rates.tier1.limit * rates.tier1.unitPrice + (usage - rates.tier1.limit) * rates.tier2.unitPrice;
        baseCharge = rates.tier2.baseCharge;
      }
    } else {
      if (usage <= rates.tier1.limit) {
        bill = usage * rates.tier1.unitPrice;
        baseCharge = rates.tier1.baseCharge;
      } else if (usage <= rates.tier2.limit) {
        bill = rates.tier1.limit * rates.tier1.unitPrice + (rates.tier2.limit - rates.tier1.limit) * rates.tier2.unitPrice;
        baseCharge = rates.tier2.baseCharge;
      } else {
        bill = rates.tier1.limit * rates.tier1.unitPrice + (rates.tier2.limit - rates.tier1.limit) * rates.tier2.unitPrice + (usage - rates.tier2.limit) * rates.tier3.unitPrice;
        baseCharge = rates.tier3.baseCharge;
      }
    }
    return Math.round(bill + baseCharge);
  };

  const getCurrentTier = (usage: number, season = currentSeason) => {
    const rates = getElectricRates(season);
    if (usage <= rates.tier1.limit) return 1;
    if (usage <= rates.tier2.limit) return 2;
    return 3;
  };

  const calculateElectricSavings = () => {
    const usage = monthlyUsage[0];
    const rates = getElectricRates(currentSeason);
    const baseElectricBill = calculateBaseElectricBill(usage, 3, currentSeason);
    let totalSavings = 0;
    if (electricSavings.progressiveTierChange) {
      const currentTier = getCurrentTier(usage, currentSeason);
      if (currentTier > 1) {
        const tier1Bill = calculateBaseElectricBill(usage, 1, currentSeason);
        totalSavings += Math.max(0, baseElectricBill - tier1Bill);
      }
    }
    if (electricSavings.essentialDeduction) {
      if (usage <= rates.tier1.limit) {
        totalSavings += Math.round(baseElectricBill * 0.1);
      } else {
        const currentBill = baseElectricBill;
        const reducedUsageBill = calculateBaseElectricBill(rates.tier1.limit, 3, currentSeason) * 0.9;
        totalSavings += Math.max(0, currentBill - reducedUsageBill);
      }
    }
    return totalSavings;
  };

  const calculateDiscountedElectricBill = useCallback(() => {
    const usage = monthlyUsage[0];
    const rates = getElectricRates(currentSeason);
    let bill = calculateBaseElectricBill(usage, 3, currentSeason);
    if (electricSavings.progressiveTierChange) {
      const currentTier = getCurrentTier(usage, currentSeason);
      if (currentTier > 1) {
        bill = calculateBaseElectricBill(usage, 1, currentSeason);
      }
    }
    if (electricSavings.essentialDeduction && usage <= rates.tier1.limit) {
      bill *= 0.9;
    }
    return Math.max(0, Math.round(bill));
  }, [monthlyUsage, currentSeason, electricSavings]);

  const getProgressiveComparisonData = () => {
    const usage = monthlyUsage[0];
    const season = currentSeason;
    const currentTier = getCurrentTier(usage, season);
    if (currentTier === 3) {
      return [
        { type: "현재 (3구간)", amount: calculateBaseElectricBill(usage, 3, season), color: "#FF6B35" },
        { type: "2구간 적용시", amount: calculateBaseElectricBill(usage, 2, season), color: "#666666" },
        { type: "1구간 적용시", amount: calculateBaseElectricBill(usage, 1, season), color: "#FFE300" },
      ];
    } else if (currentTier === 2) {
      return [
        { type: "현재 (2구간)", amount: calculateBaseElectricBill(usage, 2, season), color: "#666666" },
        { type: "1구간 적용시", amount: calculateBaseElectricBill(usage, 1, season), color: "#FFE300" },
      ];
    }
    return [];
  };

  const getEssentialDeductionData = () => {
    const usage = monthlyUsage[0];
    const rates = getElectricRates(currentSeason);
    const isEligible = usage <= rates.tier1.limit;
    if (isEligible) {
      const withoutBenefit = calculateBaseElectricBill(usage, 3, currentSeason);
      return [
        { type: "혜택 미적용", amount: withoutBenefit, color: "#666666" },
        { type: "혜택 적용", amount: withoutBenefit * 0.9, color: "#FFE300" },
      ];
    } else {
      const currentBill = calculateBaseElectricBill(usage, 3, currentSeason);
      const reducedUsageBill = calculateBaseElectricBill(rates.tier1.limit, 3, currentSeason) * 0.9;
      return [
        { type: `현재 (${usage}kWh)`, amount: currentBill, color: "#666666" },
        { type: `${rates.tier1.limit}kWh + 혜택`, amount: reducedUsageBill, color: "#FFE300" },
      ];
    }
  };

  const generateCumulativeData = () => {
    const totalMonthlySaving = calculateElectricSavings();
    return Array.from({ length: 12 }, (_, i) => ({
      month: `${i + 1}월`,
      monthly: totalMonthlySaving,
      cumulative: totalMonthlySaving * (i + 1),
    }));
  };

  const handleElectricSavingToggle = (savingId: keyof typeof electricSavings) => {
    setElectricSavings((prev) => ({ ...prev, [savingId]: !prev[savingId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimulationHeader 
        title="전기요금 절약 시뮬레이션"
        description="전기 절약 팁과 효과 확인"
        link="/simulation/gas"
        linkText="도시가스"
        isElectric={true}
      />

      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        <ElectricStatusCard 
          monthlyUsage={monthlyUsage}
          getCurrentTier={getCurrentTier}
          currentSeason={currentSeason}
          calculateDiscountedElectricBill={calculateDiscountedElectricBill}
          calculateElectricSavings={calculateElectricSavings}
        />
        <NotificationSettingsCard 
          calculateBill={calculateDiscountedElectricBill}
          storageKeyEnabled="electricNotificationsEnabled"
          storageKeyThreshold="electricThresholdAmount"
          notificationTitle="전기요금 경고"
          notificationBody={(threshold) => `예상 전기요금이 설정하신 ${threshold.toLocaleString()}원을 초과했습니다.`}
          buttonClassName="bg-[#FFE300] text-[#1E1E1E] hover:bg-yellow-500"
          defaultThreshold={50000}
        />
        <TimeBasedRatesCard 
          contractType={contractType}
          setContractType={setContractType}
          timeBasedRates={timeBasedRates}
        />
        <ProgressiveTierCard 
          monthlyUsage={monthlyUsage}
          currentSeason={currentSeason}
          electricSavings={electricSavings}
          handleElectricSavingToggle={handleElectricSavingToggle}
          getProgressiveComparisonData={getProgressiveComparisonData}
          getCurrentTier={getCurrentTier}
          getElectricRates={getElectricRates}
        />
        <DiscountCard 
          electricSavings={electricSavings}
          handleElectricSavingToggle={handleElectricSavingToggle}
          monthlyUsage={monthlyUsage}
          currentSeason={currentSeason}
          getEssentialDeductionData={getEssentialDeductionData}
          getElectricRates={getElectricRates}
        />
        <CumulativeSavingsCard 
          generateCumulativeData={generateCumulativeData}
          calculateElectricSavings={calculateElectricSavings}
        />
      </div>
    </div>
  );
}