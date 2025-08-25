'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Droplets } from 'lucide-react';

interface ShowerSimulationCardProps {
  showerTime: number;
  setShowerTime: (value: number) => void;
  showerSavingAmount: number;
}

export default function ShowerSimulationCard({ 
  showerTime,
  setShowerTime,
  showerSavingAmount
}: ShowerSimulationCardProps) {
  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          샤워 시간 절약 시뮬레이션
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
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
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {showerTime}분
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">절약 예상액</div>
              <div className="text-base sm:text-lg font-bold text-green-600">
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
              <div className="text-sm text-gray-700 break-keep leading-relaxed">
                • 샤워 전 미리 물 온도 조절
                <br />• 비누칠할 때 물 잠시 끄기
                <br />• 타이머 사용으로 시간 관리
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
