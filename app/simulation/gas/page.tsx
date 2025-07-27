"use client";


import type React from "react"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Flame,
  AlertCircle,
  Thermometer,
  Droplets,
  Home,
  CreditCard,
  Calendar,
  Snowflake,
  Sun,
  Zap,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";
import Link from "next/link";

type Season = "winter" | "spring" | "summer" | "fall";
const seasons: Season[] = ["winter", "spring", "summer", "fall"];


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

// 팁의 고유 키를 생성하는 헬퍼 함수
// 계절 팁은 'season_tipId', 공통 팁은 'tipId' 형식으로 키를 생성
const getTipUniqueKey = (tipId: TipKey, season?: Season): string => {
  return season ? `${season}_${tipId}` : tipId;
};

// 계절별 기본 가스 요금 (동계가 높음) - Not used in saving calculation, but kept for context.
const baseGasBill = {
  winter: 85000,
  spring: 45000,
  summer: 25000,
  fall: 55000,
};

// Define saving values directly within the tip objects for each season
const seasonalTips: Record<
  Season,
  {
    id: TipKey;
    title: string;
    description: string;
    icon: React.ReactNode;
    saving: number;
    detail: string;
  }[]
> = {
  winter: [
    {
      id: "temperature",
      title: "실내 적정 난방 온도 설정",
      description: "18~20℃로 설정하기",
      icon: <Thermometer className="h-5 w-5" />,
      saving: 12000,
      detail: "1도만 낮춰도 7% 절약 가능",
    },
    {
      id: "humidity",
      title: "적정 습도 유지",
      description: "40~60% 습도 유지하기",
      icon: <Droplets className="h-5 w-5" />,
      saving: 5000,
      detail: "습도가 높으면 체감온도 상승",
    },
    {
      id: "awayMode",
      title: "외출모드 활용",
      description: '외출시 보일러 "외출모드"로 전환',
      icon: <Home className="h-5 w-5" />,
      saving: 8000,
      detail: "15도 정도로 자동 조절",
    },
    {
      id: "warmClothes",
      title: "보온용품 착용",
      description: "실내 내복, 수면양말 등 착용",
      icon: <Snowflake className="h-5 w-5" />,
      saving: 10000,
      detail: "체감온도 2-3도 상승 효과",
    },
    {
      id: "valveControl",
      title: "난방 밸브 조정",
      description: "사용하지 않는 방 밸브 잠그기",
      icon: <AlertCircle className="h-5 w-5" />,
      saving: 7000,
      detail: "불필요한 난방 차단",
    },
    {
      id: "boilerCleaning",
      title: "보일러 관리",
      description: "보일러 청소 및 배관 공기 빼기",
      icon: <AlertCircle className="h-5 w-5" />,
      saving: 6000,
      detail: "효율성 10-15% 향상",
    },
  ],
  summer: [
    {
      id: "shower",
      title: "샤워 시간 단축",
      description: "온수 사용 시간 줄이기",
      icon: <Droplets className="h-5 w-5" />,
      saving: 0, // 샤워 절약액은 슬라이더로 동적 계산되므로 초기값 0
      detail: "5분 단축 시 월 8,000원 절약",
    },
  ],
  spring: [
    {
      id: "awayMode",
      title: "간헐적 난방 사용",
      description: "필요시에만 난방 가동",
      icon: <Home className="h-5 w-5" />,
      saving: 3000,
      detail: "봄철 온도 조절",
    },
    {
      id: "boilerCleaning",
      title: "보일러 점검",
      description: "난방 시즌 전 점검 및 청소",
      icon: <AlertCircle className="h-5 w-5" />,
      saving: 2000,
      detail: "효율성 향상",
    },
  ],
  fall: [
    {
      id: "temperature",
      title: "초기 난방 온도 조절",
      description: "서서히 온도 올리기",
      icon: <Thermometer className="h-5 w-5" />,
      saving: 8000,
      detail: "급격한 온도 변화 방지",
    },
    {
      id: "warmClothes",
      title: "보온용품 준비",
      description: "난방 전 보온용품 활용",
      icon: <Snowflake className="h-5 w-5" />,
      saving: 6000,
      detail: "난방 시작 시기 연기",
    },
  ],
};

// 연중 공통 절약 팁
const commonTips: {
  id: TipKey;
  title: string;
  description: string;
  icon: React.ReactNode;
  saving: number;
  detail: string;
}[] = [
  {
    id: "coldWater",
    title: "냉수 사용 습관",
    description: '평상시 수도꼭지 "냉수"쪽으로',
    icon: <Droplets className="h-5 w-5" />,
    saving: 4000,
    detail: "불필요한 온수 사용 방지",
  },
  {
    id: "autoPayment",
    title: "자동이체 할인",
    description: "자동이체 신청으로 할인",
    icon: <CreditCard className="h-5 w-5" />,
    saving: 500,
    detail: "월 500원 할인",
  },
  {
    id: "cardChange",
    title: "카드 할인",
    description: "가스요금 할인 카드 사용",
    icon: <CreditCard className="h-5 w-5" />,
    saving: 1000,
    detail: "월 1,000원 할인",
  },
];

export default function GasSimulationPage() {
  const [gasReduction, setGasReduction] = useState([15]); // This state is not used in the current logic, can be removed if not needed.
  const [currentSeason, setCurrentSeason] = useState<Season>("winter");

  // 절약 팁 적용 상태: 각 팁의 고유 키를 사용하여 독립적으로 관리
  const [savingTips, setSavingTips] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    // 공통 팁 초기화
    commonTips.forEach((tip) => {
      initialState[getTipUniqueKey(tip.id)] = false;
    });
    // 계절 팁 초기화
    Object.values(seasonalTips).forEach((tips) => {
      tips.forEach((tip) => {
        // seasonalTips 객체에서 해당 팁이 속한 시즌을 찾아서 고유 키 생성
        for (const seasonKey in seasonalTips) {
          if (seasonalTips[seasonKey as Season].some((t) => t.id === tip.id)) {
            initialState[getTipUniqueKey(tip.id, seasonKey as Season)] = false;
          }
        }
      });
    });
    return initialState;
  });

  // 샤워 시간 관련 상태
  const [showerTime, setShowerTime] = useState<number>(15); // 현재 샤워 시간 (분)
  const [showerSavingAmount, setShowerSavingAmount] = useState<number>(0); // 샤워 절약액

  // 샤워 절약액 계산 로직 (15분 기준, 5분 단축 시 8000원 절약)
  useEffect(() => {
    const baseShowerTime = 15; // 기준 샤워 시간
    const baseSavingFor5Min = 8000; // 5분 단축 시 절약액
    const savingPerMinute = baseSavingFor5Min / 5; // 분당 절약액

    if (showerTime < baseShowerTime) {
      setShowerSavingAmount((baseShowerTime - showerTime) * savingPerMinute);
    } else {
      setShowerSavingAmount(0);
    }
  }, [showerTime]);

  // 현재 적용된 절약 효과 계산 (for the currently selected season in UI)
  const calculateTotalSavings = () => {
    let totalSavings = 0;

    // Add savings from common tips
    commonTips.forEach((tip) => {
      if (savingTips[getTipUniqueKey(tip.id)]) {
        totalSavings += tip.saving;
      }
    });

    // Add savings from seasonal tips for the currently selected season
    seasonalTips[currentSeason]?.forEach((tip) => {
      const uniqueKey = getTipUniqueKey(tip.id, currentSeason);
      if (savingTips[uniqueKey]) {
        if (tip.id === "shower" && currentSeason === "summer") {
          totalSavings += showerSavingAmount; // 샤워 팁은 동적 절약액 사용
        } else {
          totalSavings += tip.saving;
        }
      }
    });

    return totalSavings;
  };

  // 누적 절약 데이터 (12개월)
  const generateCumulativeData = () => {
    const data = [];
    let cumulative = 0;


    // Define month-to-season mapping
    const monthToSeasonMap: Record<number, Season> = {
      1: "winter", // January
      2: "winter", // February
      3: "spring", // March
      4: "spring", // April
      5: "spring", // May
      6: "summer", // June
      7: "summer", // July
      8: "summer", // August
      9: "fall", // September
      10: "fall", // October
      11: "fall", // November
      12: "winter", // December

    };

    // Desired order of months for the graph: Dec, Jan, Feb, ..., Nov
    const orderedMonths = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    for (const monthNum of orderedMonths) {
      const monthName = `${monthNum}월`;
      const monthSeason = monthToSeasonMap[monthNum];
      let monthlySavingForThisMonth = 0;


      // Add savings from common tips if they are active
      commonTips.forEach((tip) => {
        if (savingTips[getTipUniqueKey(tip.id)]) {
          monthlySavingForThisMonth += tip.saving;
        }
      });

      // Add savings from seasonal tips if they are active AND match the current month's season
      seasonalTips[monthSeason]?.forEach((tip) => {
        const uniqueKey = getTipUniqueKey(tip.id, monthSeason);
        if (savingTips[uniqueKey]) {
          if (tip.id === "shower" && monthSeason === "summer") {
            monthlySavingForThisMonth += showerSavingAmount; // 샤워 팁은 동적 절약액 사용
          } else {
            monthlySavingForThisMonth += tip.saving;
          }
        }
      });

      cumulative += monthlySavingForThisMonth;

      data.push({
        month: monthName,
        monthly: monthlySavingForThisMonth,
        cumulative: cumulative,
      });
    }
    return data;
  };

  const handleTipToggle = (tipId: TipKey, season?: Season) => {
    const uniqueKey = getTipUniqueKey(tipId, season);
    setSavingTips((prev) => ({
      ...prev,
      [uniqueKey]: !prev[uniqueKey],
    }));
  };


  const getSeasonName = (season: Season) => {
    const names = {
      winter: "겨울",
      spring: "봄",
      summer: "여름",
      fall: "가을",
    };
    return names[season];
  };

  const getSeasonIcon = (season: Season) => {
    const icons = {
      winter: <Snowflake className="h-4 w-4" />,
      spring: <Sun className="h-4 w-4" />,
      summer: <Sun className="h-4 w-4" />,
      fall: <Calendar className="h-4 w-4" />,
    };
    return icons[season];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/savings">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  도시가스 시뮬레이션
                </h1>
                <p className="text-xs text-gray-500">
                  계절별 절약 팁과 효과 확인
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/simulation/electric">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent">

                  <Zap className="h-4 w-4" />
                  전기요금
                </Button>
              </Link>
              <div className="w-8 h-8 bg-[#FFE300] rounded-full flex items-center justify-center">
                <Flame className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* 현재 절약 현황 */}
        <Card className="border-0 rounded-2xl bg-[#FFE300] text-[#1E1E1E]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">현재 절약 효과</h2>
                <p className="text-sm opacity-90">
                  {getSeasonName(currentSeason)}철 기준
                </p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">
                  ₩{calculateTotalSavings().toLocaleString()}
                </div>
                <div className="text-sm opacity-90">월 절약액</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₩{(calculateTotalSavings() * 12).toLocaleString()}
                </div>
                <div className="text-sm opacity-90">연간 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연중 공통 절약 팁 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              연중 공통 절약 팁
            </CardTitle>
            <CardDescription>
              계절에 관계없이 적용할 수 있는 절약 방법
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {commonTips.map((tip) => (
              <div
                key={tip.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    {tip.icon}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{tip.title}</div>
                    <div className="text-sm text-gray-600">
                      {tip.description}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {tip.detail}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ₩{tip.saving.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">월 절약</div>
                  </div>
                  <Switch
                    checked={savingTips[getTipUniqueKey(tip.id)]}
                    onCheckedChange={() => handleTipToggle(tip.id)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 계절 선택 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              계절별 절약 시뮬레이션
            </CardTitle>
            <CardDescription>
              계절을 선택하여 맞춤 절약 팁을 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {seasons.map((season) => (
                <Button
                  key={season}
                  variant={currentSeason === season ? "default" : "outline"}
                  className={`h-12 rounded-xl ${
                    currentSeason === season
                      ? "bg-[#FFE300] hover:bg-[#E5C200] text-[#1E1E1E]"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentSeason(season)}>
                  <div className="flex items-center gap-2">
                    {getSeasonIcon(season)}
                    <span className="text-sm">{getSeasonName(season)}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 계절별 절약 팁 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {getSeasonIcon(currentSeason)}
              {getSeasonName(currentSeason)}철 절약 팁
            </CardTitle>
            <CardDescription>
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{tip.title}</div>
                    <div className="text-sm text-gray-600">
                      {tip.description}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {tip.detail}
                    </div>

                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {tip.saving > 0 &&
                    tip.id !== "shower" && ( // 샤워 팁은 여기서 절약액 표시 안함
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₩{tip.saving.toLocaleString()}
                        </div>

                        <div className="text-xs text-gray-500">월 절약</div>
                      </div>
                    )}
                  {tip.id === "shower" &&
                    currentSeason === "summer" && ( // 샤워 팁은 동적 절약액 표시
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
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

        {/* 샤워 시간 시뮬레이션 (여름철 특별) */}
        {currentSeason === "summer" &&
          savingTips[getTipUniqueKey("shower", "summer")] && (
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  샤워 시간 절약 시뮬레이션
                </CardTitle>
                <CardDescription>
                  샤워 시간을 줄여서 온수 사용량을 절약해보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-gray-900">
                        현재 샤워 시간
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {showerTime}분
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">절약 예상액</div>
                      <div className="text-lg font-bold text-green-600">
                        ₩{showerSavingAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>목표 샤워 시간: {showerTime}분</span>
                      <span>절약 시간: {Math.max(0, 15 - showerTime)}분</span>
                    </div>
                    <Slider
                      min={5}
                      max={15}
                      step={1}
                      value={[showerTime]}
                      onValueChange={(value) => setShowerTime(value[0])}
                      className="w-full"
                    />
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-base text-gray-900 font-semibold mb-2">
                        💡 절약 팁
                      </div>
                      <div className="text-sm text-gray-700">
                        • 샤워 전 미리 물 온도 조절
                        <br />• 비누칠할 때 물 잠시 끄기
                        <br />• 타이머 사용으로 시간 관리
                      </div>

                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        {/* 누적 절약 그래프 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              연간 누적 절약 효과
            </CardTitle>
            <CardDescription>
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
                  <Bar
                    barSize={20}
                    dataKey="monthly"
                    fill="#FFE300"
                    name="월 절약액"
                  />
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
                  <div className="font-bold text-gray-900">
                    연간 총 절약 예상액
                  </div>
                  <div className="text-sm text-gray-700">
                    현재 적용된 절약 팁 기준
                  </div>

                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ₩{(calculateTotalSavings() * 12).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
