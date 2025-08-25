
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Percent, Home, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export default function GasDiscountCard() {
  const [hasHeatingDiscount, setHasHeatingDiscount] = useState(false);

  const handleDiscountToggle = () => {
    setHasHeatingDiscount(prev => !prev);
  };

  return (
    <Card className="border-0 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Percent className="h-5 w-5" />
          할인 혜택 적용
        </CardTitle>
        <CardDescription className="break-keep leading-relaxed">
          주택용 난방 요금 할인을 적용하여 요금을 절약하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 flex items-center gap-1">
                  주택용 난방 요금 할인
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-wrap">
                        <p>
                          동절기(12월~3월)에 주택용(취사용 및 개별난방용) 도시가스 요금을 할인해주는 제도입니다.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-sm text-gray-600 break-keep">
                  동절기(12~3월) 월별 요금 2,400원 할인
                </div>
              </div>
            </div>
            <Switch
              checked={hasHeatingDiscount}
              onCheckedChange={handleDiscountToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
