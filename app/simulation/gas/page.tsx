"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Flame,
  TrendingUp,
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
import Link from "next/link";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

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

export default function GasSimulationPage() {
  const [gasReduction, setGasReduction] = useState([15]);
  const [currentSeason, setCurrentSeason] = useState<
    "winter" | "spring" | "summer" | "fall"
  >("winter"); // winter, summer, spring, fall

  // 절약 팁 적용 상태
  const [savingTips, setSavingTips] = useState<Record<TipKey, boolean>>({
    temperature: false,
    humidity: false,
    awayMode: false,
    coldWater: false,
    boilerCleaning: false,
    warmClothes: false,
    valveControl: false,
    shower: false,
    autoPayment: false,
    cardChange: false,
  });

  // 계절별 기본 가스 요금 (동계가 높음)
  const baseGasBill = {
    winter: 85000,
    spring: 45000,
    summer: 25000,
    fall: 55000,
  };

  // 절약 팁별 절감 효과 (원/월)
  const savingEffects = {
    temperature:
      currentSeason === "winter" ? 12000 : currentSeason === "fall" ? 8000 : 0,
    humidity:
      currentSeason === "winter" ? 5000 : currentSeason === "fall" ? 3000 : 0,
    awayMode:
      currentSeason === "winter"
        ? 8000
        : currentSeason === "fall"
        ? 5000
        : currentSeason === "spring"
        ? 3000
        : 0,
    coldWater: 4000, // 연중 동일
    boilerCleaning:
      currentSeason === "winter"
        ? 6000
        : currentSeason === "fall"
        ? 4000
        : currentSeason === "spring"
        ? 2000
        : 0,
    warmClothes:
      currentSeason === "winter" ? 10000 : currentSeason === "fall" ? 6000 : 0,
    valveControl:
      currentSeason === "winter" ? 7000 : currentSeason === "fall" ? 4000 : 0,
    shower: 8000, // 연중 동일 (온수 사용)
    autoPayment: 500, // 연중 동일
    cardChange: 1000, // 연중 동일
  };

  // 현재 적용된 절약 효과 계산
  const calculateTotalSavings = () => {
    return (Object.keys(savingTips) as TipKey[]).reduce((total, tip) => {
      return total + (savingTips[tip] ? savingEffects[tip] : 0);
    }, 0);
  };

  // 누적 절약 데이터 (12개월)
  const generateCumulativeData = () => {
    const totalMonthlySaving = calculateTotalSavings();
    const data = [];
    let cumulative = 0;

    for (let i = 1; i <= 12; i++) {
      cumulative += totalMonthlySaving;
      data.push({
        month: `${i}월`,
        monthly: totalMonthlySaving,
        cumulative: cumulative,
      });
    }
    return data;
  };

  // 계절별 절약 팁 데이터
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
        saving: savingEffects.temperature,
        detail: "1도만 낮춰도 7% 절약 가능",
      },
      {
        id: "humidity",
        title: "적정 습도 유지",
        description: "40~60% 습도 유지하기",
        icon: <Droplets className="h-5 w-5" />,
        saving: savingEffects.humidity,
        detail: "습도가 높으면 체감온도 상승",
      },
      {
        id: "awayMode",
        title: "외출모드 활용",
        description: '외출시 보일러 "외출모드"로 전환',
        icon: <Home className="h-5 w-5" />,
        saving: savingEffects.awayMode,
        detail: "15도 정도로 자동 조절",
      },
      {
        id: "warmClothes",
        title: "보온용품 착용",
        description: "실내 내복, 수면양말 등 착용",
        icon: <Snowflake className="h-5 w-5" />,
        saving: savingEffects.warmClothes,
        detail: "체감온도 2-3도 상승 효과",
      },
      {
        id: "valveControl",
        title: "난방 밸브 조정",
        description: "사용하지 않는 방 밸브 잠그기",
        icon: <AlertCircle className="h-5 w-5" />,
        saving: savingEffects.valveControl,
        detail: "불필요한 난방 차단",
      },
      {
        id: "boilerCleaning",
        title: "보일러 관리",
        description: "보일러 청소 및 배관 공기 빼기",
        icon: <AlertCircle className="h-5 w-5" />,
        saving: savingEffects.boilerCleaning,
        detail: "효율성 10-15% 향상",
      },
    ],
    summer: [
      {
        id: "shower",
        title: "샤워 시간 단축",
        description: "온수 사용 시간 줄이기",
        icon: <Droplets className="h-5 w-5" />,
        saving: savingEffects.shower,
        detail: "5분 단축 시 월 8,000원 절약",
      },
    ],
    spring: [
      {
        id: "awayMode",
        title: "간헐적 난방 사용",
        description: "필요시에만 난방 가동",
        icon: <Home className="h-5 w-5" />,
        saving: savingEffects.awayMode,
        detail: "봄철 온도 조절",
      },
      {
        id: "boilerCleaning",
        title: "보일러 점검",
        description: "난방 시즌 전 점검 및 청소",
        icon: <AlertCircle className="h-5 w-5" />,
        saving: savingEffects.boilerCleaning,
        detail: "효율성 향상",
      },
    ],
    fall: [
      {
        id: "temperature",
        title: "초기 난방 온도 조절",
        description: "서서히 온도 올리기",
        icon: <Thermometer className="h-5 w-5" />,
        saving: savingEffects.temperature,
        detail: "급격한 온도 변화 방지",
      },
      {
        id: "warmClothes",
        title: "보온용품 준비",
        description: "난방 전 보온용품 활용",
        icon: <Snowflake className="h-5 w-5" />,
        saving: savingEffects.warmClothes,
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
      saving: savingEffects.coldWater,
      detail: "불필요한 온수 사용 방지",
    },
    {
      id: "autoPayment",
      title: "자동이체 할인",
      description: "자동이체 신청으로 할인",
      icon: <CreditCard className="h-5 w-5" />,
      saving: savingEffects.autoPayment,
      detail: "월 500원 할인",
    },
    {
      id: "cardChange",
      title: "카드 할인",
      description: "가스요금 할인 카드 사용",
      icon: <CreditCard className="h-5 w-5" />,
      saving: savingEffects.cardChange,
      detail: "월 1,000원 할인",
    },
  ];

  const handleTipToggle = (tipId: TipKey) => {
    setSavingTips((prev) => ({
      ...prev,
      [tipId]: !prev[tipId],
    }));
  };

  const getSeasonName = (season: "winter" | "spring" | "summer" | "fall") => {
    const names = {
      winter: "겨울",
      spring: "봄",
      summer: "여름",
      fall: "가을",
    };
    return names[season];
  };

  const getSeasonIcon = (season: "winter" | "spring" | "summer" | "fall") => {
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
              <Link href="/simulation/gas">
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
                    checked={savingTips[tip.id]}
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
                      ? "bg-[#FFE300] hover:bg-[#E5C200] text-s[#1E1E1E]"
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
                  {tip.saving > 0 && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ₩{tip.saving.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">월 절약</div>
                    </div>
                  )}
                  <Switch
                    checked={savingTips[tip.id]}
                    onCheckedChange={() => handleTipToggle(tip.id)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 샤워 시간 시뮬레이션 (여름철 특별) */}
        {currentSeason === "summer" && (
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
                    <div className="text-2xl font-bold text-gray-900">15분</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">목표 시간</div>
                    <div className="text-lg font-bold text-gray-900">10분</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>절약 시간: 5분</span>
                    <span>월 절약액: ₩8,000</span>
                  </div>
                  <div className=" bg-blue-50 rounded-lg p-3">
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

        {/* 절약 팁 요약
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">적용 중인 절약 팁</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">
                  {Object.values(savingTips).filter(Boolean).length}개
                </div>
                <div className="text-sm opacity-90">활성화된 절약 팁</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₩{calculateTotalSavings().toLocaleString()}
                </div>
                <div className="text-sm opacity-90">월 예상 절약액</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        {/* <div className="grid grid-cols-2 gap-3 pb-6">
          <Link href="/simulation/electric">
            <Button className="h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-2xl w-full">
              전기요금 시뮬레이션
            </Button>
          </Link>
          <Link href="/rewards">
            <Button
              variant="outline"
              className="h-12 rounded-2xl border-gray-200 bg-white w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              절약 숲 보기
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
