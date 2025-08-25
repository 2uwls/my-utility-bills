'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Gift, Link as LinkIcon } from 'lucide-react';

export default function GovernmentProgramsCard() {
  const [kepcoPayback, setKepcoPayback] = useState(false);
  const [gasCashback, setGasCashback] = useState(false);

  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          정부 프로그램 연계
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          정부에서 제공하는 캐시백 및 페이백 프로그램을 확인하고 관리하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 한전 페이백 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
              <Gift className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">한전 에너지 캐시백</div>
              <div className="text-sm text-gray-600">절감량 1kWh당 30~100원</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://en-ter.co.kr/ec/main/main.do"
              target="_blank"
              rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600">
                사이트
              </Button>
            </a>
            <Switch
              checked={kepcoPayback}
              onCheckedChange={setKepcoPayback}
            />
          </div>
        </div>

        {/* 도시가스 캐시백 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100">
              <Gift className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">도시가스 캐시백</div>
              <div className="text-sm text-gray-600">절감량 1m³당 최대 70원</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://k-gascashback.or.kr/ko/intro/cashback/"
              target="_blank"
              rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-orange-50 hover:bg-orange-100 text-orange-600">
                사이트
              </Button>
            </a>
            <Switch
              checked={gasCashback}
              onCheckedChange={setGasCashback}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
