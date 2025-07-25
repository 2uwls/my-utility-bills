"use client";
import React from "react";
import MainSummarySection from "@/components/MainSummarySection";
import MainTabNavigation from "@/components/main-tab-navigation";
import KakaoHeader from "@/components/KakaoHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const BenefitsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="benefits" />
        <Tabs value="cards" className="w-full">
          <TabsContent value="cards" className="space-y-4 mt-4">
            {/* 카카오뱅크 추천 카드 */}
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-gray-900" />
                  </div>
                  카카오뱅크 추천 혜택
                </CardTitle>
                <CardDescription className="text-sm">
                  공과금 할인 혜택 카드
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">
                          카카오
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">
                          카카오뱅크 체크카드
                        </div>
                        <div className="text-xs text-gray-600">
                          • 공과금 자동이체 시 1% 적립
                        </div>
                        <div className="text-xs text-gray-600">
                          • 자동이체 수수료 면제
                        </div>
                        <div className="text-xs text-gray-600">
                          • 연회비 무료
                        </div>
                      </div>
                    </div>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm h-8">
                      신청하기
                    </Button>
                  </div>
                  <div className="text-xs text-gray-600">
                    월 예상 적립: ₩1,300 | 연간 적립: ₩15,600
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">KB</span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">
                          KB국민 라이프카드
                        </div>
                        <div className="text-xs text-gray-600">
                          • 공과금 3% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 공과금 자동이체 시 3% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 연회비 무료
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl text-sm h-8 bg-transparent">
                      비교하기
                    </Button>
                  </div>
                  <div className="text-xs text-gray-600">
                    월 예상 절약: ₩3,900 | 연간 절약: ₩46,800
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 자동이체 관리 */}
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">
                  자동이체 관리
                </CardTitle>
                <CardDescription className="text-sm">
                  카카오뱅크 계좌 연동
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        전기료 자동이체
                      </div>
                      <div className="text-sm text-gray-500">
                        카카오뱅크 ****1234
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    연결됨
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">○</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        가스료 자동이체
                      </div>
                      <div className="text-sm text-gray-500">
                        설정하고 1% 적립받기
                      </div>
                    </div>
                  </div>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm h-8">
                    설정하기
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">○</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        수도료 자동이체
                      </div>
                      <div className="text-sm text-gray-500">
                        설정하고 1% 적립받기
                      </div>
                    </div>
                  </div>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm h-8">
                    설정하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BenefitsPage;
