'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainSummarySection from '@/components/MainSummarySection';
import MainTabNavigation from '@/components/main-tab-navigation';
import KakaoHeader from '@/components/KakaoHeader';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GovernmentProgramsCard from '@/components/benefits/GovernmentProgramsCard';
import CardComparisonDialog from '@/components/benefits/CardComparisonDialog'; // Import the new component

interface CardData {
  name: string;
  discounts: string[];
  annualFee: string;
  logoText: string;
  logoBgColor: string;
}

const BenefitsPage: React.FC = () => {
  const router = useRouter();
  const [gasConnected, setGasConnected] = useState(false);
  const [isComparisonDialogOpen, setIsComparisonDialogOpen] = useState(false);
  const [comparedCard, setComparedCard] = useState<CardData | null>(null);

  const greenPlanCardData: CardData = {
    name: '그린플랜 카드',
    discounts: [
      '도시가스·전기요금 할인(조건별 캐시백)',
      '휴대전화 요금 자동결제 시 캐시백 제공',
    ],
    annualFee: '국내 7,900원 / 해외겸용 19,000원',
    logoText: 'GREEN',
    logoBgColor: 'bg-green-500',
  };

  const handleGasConnect = () => {
    setGasConnected(true);
  };

  const handleGreenPlanCardClick = () => {
    router.push('/benefits/card-detail');
  };

  const handleCompareClick = (card: CardData) => {
    setComparedCard(card);
    setIsComparisonDialogOpen(true);
  };

  const handleCloseComparisonDialog = () => {
    setIsComparisonDialogOpen(false);
    setComparedCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
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
                {/* 그린플랜 카드 */}
                <div
                  className="bg-yellow-50 rounded-xl p-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={handleGreenPlanCardClick}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          GREEN
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">
                          그린플랜 카드
                        </div>
                        <div className="text-xs text-gray-600">
                          • 도시가스·전기요금 할인(조건별 캐시백)
                        </div>
                        <div className="text-xs text-gray-600">
                          • 휴대전화 요금 자동결제 시 캐시백 제공
                        </div>
                        <div className="text-xs text-gray-600">
                          • 연회비: 국내 7,900원 / 해외겸용 19,000원
                        </div>
                      </div>
                    </div>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm h-8">
                      신청하기
                    </Button>
                  </div>
                  {/* <div className="text-xs text-gray-600">
                    월 예상 적립: 약 ○○원 | 연간 적립: 약 ○○원
                  </div> */}
                </div>

                {/* 롯데카드 LOCA 365 카드 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          롯데
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">
                          LOCA 365 카드
                        </div>
                        <div className="text-xs text-gray-600">
                          • 아파트 관리비·공과금 10% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 교통·통신·배달앱 10% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 연회비: 20,000원
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl text-sm h-8 bg-transparent"
                      onClick={() => handleCompareClick({
                        name: 'LOCA 365 카드',
                        discounts: [
                          '아파트 관리비·공과금 10% 할인',
                          '교통·통신·배달앱 10% 할인',
                        ],
                        annualFee: '20,000원',
                        logoText: '롯데',
                        logoBgColor: 'bg-red-600',
                      })}
                    >
                      비교하기
                    </Button>
                  </div>
                  {/* <div className="text-xs text-gray-600">
                    월 예상 적립: 약 ○○원 | 연간 적립: 약 ○○원
                  </div> */}
                </div>

                {/* 신한카드 Mr.Life */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          신한
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">
                          Mr.Life 카드
                        </div>
                        <div className="text-xs text-gray-600">
                          • 공과금 10% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 마트·편의점 10% 할인
                        </div>
                        <div className="text-xs text-gray-600">
                          • 연회비: 15,000원
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl text-sm h-8 bg-transparent"
                      onClick={() => handleCompareClick({
                        name: 'Mr.Life 카드',
                        discounts: [
                          '공과금 10% 할인',
                          '마트·편의점 10% 할인',
                        ],
                        annualFee: '15,000원',
                        logoText: '신한',
                        logoBgColor: 'bg-blue-700',
                      })}
                    >
                      비교하기
                    </Button>
                  </div>
                  {/* <div className="text-xs text-gray-600">
                    월 예상 적립: 약 ○○원 | 연간 적립: 약 ○○원
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* 정부 프로그램 연계 */}
            <GovernmentProgramsCard />

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

                {gasConnected ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          가스료 자동이체
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
                ) : (
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
                    <Button onClick={handleGasConnect} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm h-8">
                      설정하기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {comparedCard && (
        <CardComparisonDialog
          isOpen={isComparisonDialogOpen}
          onClose={handleCloseComparisonDialog}
          card1={greenPlanCardData}
          card2={comparedCard}
        />
      )}
    </div>
  );
};

export default BenefitsPage;