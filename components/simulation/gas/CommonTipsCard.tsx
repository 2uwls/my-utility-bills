'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

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

interface CommonTipsCardProps {
  commonTips: Tip[];
  savingTips: Record<string, boolean>;
  handleTipToggle: (tipId: TipKey, season?: any) => void;
  getTipUniqueKey: (tipId: TipKey, season?: any) => string;
}

export default function CommonTipsCard({ 
  commonTips,
  savingTips,
  handleTipToggle,
  getTipUniqueKey
}: CommonTipsCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold">
          연중 공통 절약 팁
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          계절에 관계없이 적용할 수 있는 절약 방법
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {commonTips.map((tip) => (
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
              <div className="text-right">
                <div className="text-base sm:text-lg font-bold text-green-600">
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
  );
}
