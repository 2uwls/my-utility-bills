"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Check, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function CardDetailPage() {
  const [selectedCard, setSelectedCard] = useState(0);

  const cardImages = [
    {
      type: "front",
      title: "카카오뱅크 그린플랜 카드 - 옐로우",
      image: "/images/card/card-front1.png",
    },
    {
      type: "front",
      title: "카카오뱅크 그린플랜 카드 - 그린",
      image: "/images/card/card-front2.png",
    },
    {
      type: "back",
      title: "카드 뒷면",
      image: "/images/card/card-back.png",
    },
  ];

  const benefits = [
    {
      category: "일상 카테고리",
      items: [
        {
          name: "배달의민족",
          benefit: "2만 원 이상 결제 시 1천 원 캐시백",
          conditions: "'배민페이' 및 '카카오뱅크' 결제 선택 시 적용",
          exclusions:
            "간편결제(카카오페이/네이버페이/토스페이 등), 선물하기, 광고비, 현장결제, 배민상회, 테이블 오더 등",
        },
        {
          name: "GS25",
          benefit: "5천 원 이상 결제 시 100원 캐시백",
          conditions: "오프라인 GS25편의점 실물카드 및 삼성페이 결제",
          exclusions:
            "온라인, 우리동네GS앱(픽업/배달/택배 등), 임대매장(대형마트·쇼핑몰 입점 매장), 상품권, 기프티콘 결제",
        },
        {
          name: "커피 프랜차이즈",
          benefit: "2천 원 이상 결제 시 100원 캐시백",
          conditions: "오프라인 매장 실물카드 및 삼성페이 결제",
          brands:
            "컴포즈커피, 메가MGC커피, 빽다방, 이디야, 매머드커피, 바나프레소",
          exclusions:
            "온라인/앱 결제, 일부 키오스크, 임대매장(대형마트·쇼핑몰 입점 매장), 상품권, 기프티콘 결제",
        },
        {
          name: "올리브영",
          benefit: "할인 혜택 제공",
          conditions: "오프라인 매장 및 온라인 결제",
        },
        {
          name: "영화관",
          benefit: "CGV, 롯데시네마, 메가박스 할인",
          conditions: "온라인 예매 및 현장 결제",
        },
        {
          name: "대형마트",
          benefit: "이마트 에브리데이, 롯데마트, 이마트 할인",
          conditions: "오프라인 매장 결제",
        },
      ],
    },
    {
      category: "생활용품 / 택시",
      items: [
        {
          name: "다이소",
          benefit: "2만 원 이상 결제 시 1천 원 캐시백",
          conditions:
            "오프라인 실물카드 및 삼성페이 결제, 온라인 결제 시 '카카오뱅크 신용·체크카드' 또는 삼성페이 등록 필수",
          exclusions: "간편결제(카카오페이/네이버페이/토스페이/페이코 등)",
        },
        {
          name: "택시 (카카오T)",
          benefit: "3만 원 이상 결제 시 1천 원 캐시백",
          conditions: "KB국민카드 가맹점 업종 분류 기준 적용",
          exclusions: "온라인 결제(PG 업종)",
        },
      ],
    },
    {
      category: "온라인 쇼핑",
      items: [
        {
          name: "쿠팡",
          benefit: "5만 원 이상 결제 시 3천 원 캐시백",
          conditions: "'쿠페이'에 카드 등록 또는 '카카오뱅크카드' 선택 후 결제",
          exclusions:
            "쿠팡플레이, 쿠팡이츠, 교환권, 상품권, 선불전자지급수단 등",
        },
        {
          name: "ABLY / ZIGZAG / 무신사",
          benefit: "5만 원 이상 결제 시 2천 원 캐시백",
          conditions: "'카카오뱅크 카드' 선택 후 결제",
          exclusions:
            "간편결제(카카오페이/네이버페이/토스페이/페이코 등), 쇼핑 외 기타 서비스(포인트 충전, 웹툰 등)",
        },
      ],
    },
    {
      category: "주유 / 통신",
      items: [
        {
          name: "GS칼텍스",
          benefit: "5만 원 이상 결제 시 3천 원 캐시백",
          conditions: "LPG충전소 포함",
          exclusions: "",
        },
        {
          name: "휴대전화 요금 자동결제",
          benefit: "5만 원 이상 결제 시 3천 원 캐시백",
          conditions:
            "SKT, KT, LG U+ 대상, 카드 자동결제 등록 시 'KB국민카드' 선택 후 카카오뱅크 체크카드 등록 필요",
          exclusions:
            "유선요금, 유무선통합요금, 약정요금 대납, 지점 월납, 알뜰폰 결제",
        },
      ],
    },
    {
      category: "학원",
      items: [
        {
          name: "학원",
          benefit: "20만 원 이상 결제 시 1만 원 캐시백",
          conditions: "학원, 자동차학원, 독서실 (KB국민카드 업종 기준)",
          exclusions: "학습지 업종, 온라인 결제(PG 업종)",
        },
      ],
    },
    {
      category: "후불교통",
      items: [
        {
          name: "대중교통",
          benefit: "월 합산 5만 원 이상 이용 시 4천 원 캐시백",
          conditions: "버스, 지하철 대상, 혜택은 카드 번호 기준 개별 집계",
          exclusions: "택시, 시외·고속·공항버스, 삼성페이(선불교통) 등",
        },
      ],
    },
    {
      category: "공과금",
      items: [
        {
          name: "도시가스 요금",
          benefit: "자동이체 시 할인 혜택",
          conditions: "카카오뱅크 계좌 자동이체",
        },
        {
          name: "전기 요금",
          benefit: "자동이체 시 할인 혜택",
          conditions: "카카오뱅크 계좌 자동이체",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/benefits">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">카드 상세보기</h1>
              <p className="text-xs text-gray-500">카카오뱅크 그린플랜 카드</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* 카드 이미지 섹션 */}
        <Card className="border-0 rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="border border-[#FFE300] bg-[#FFE300] bg-opacity-90 rounded-2xl">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2 pt-4">
                  카카오뱅크 그린플랜 카드
                </h2>
                <p className="text-sm text-gray-700">
                  환경을 생각하는 똑똑한 선택
                </p>
              </div>

              <div className="flex justify-center mb-4">
                <img
                  src={cardImages[selectedCard].image || "/placeholder.svg"}
                  alt={cardImages[selectedCard].title}
                  className="w-[186px] h-[315px] object-cover rounded-xl"
                />
              </div>

              <div className="flex justify-center gap-2 pb-4">
                {cardImages.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCard(index)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCard === index
                        ? "bg-gray-900 text-white"
                        : "bg-white bg-opacity-30 text-gray-900 hover:bg-opacity-50"
                    }`}>
                    {card.type === "front" ? `앞면 ${index + 1}` : "뒷면"}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 카드 기본 정보 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-3 w-3 text-gray-900" />
              </div>
              카드 기본 특징
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-gray-900">연회비 무료</div>
                <div className="text-xs text-gray-600">평생 무료</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-gray-900">안전한 결제</div>
                <div className="text-xs text-gray-600">24시간 모니터링</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-gray-900">즉시 발급</div>
                <div className="text-xs text-gray-600">앱에서 바로</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 혜택 제공 조건 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">
              혜택 제공 조건
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    전월 실적 조건
                  </div>
                  <div className="text-sm text-gray-700">
                    전월 실적 30만 원 이상 충족 시 혜택 제공
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    혜택 제공 횟수
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    혜택 구분별 월 1회 제공
                  </div>
                  <div className="text-xs text-gray-600">
                    일부 혜택(GS25, 커피 프랜차이즈) → 통합 월 10회 제공
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    결제 방식 제한
                  </div>
                  <div className="text-sm text-gray-700">
                    일부 혜택은 실물카드 및 삼성페이 결제 시에만 적용
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 혜택 상세 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">혜택 상세</CardTitle>
            <CardDescription className="text-sm">
              카테고리별 상세 혜택 안내
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {benefits.map((category, categoryIndex) => (
                <AccordionItem
                  key={categoryIndex}
                  value={`category-${categoryIndex}`}
                  className="border border-gray-100 rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-700">
                          {categoryIndex + 1}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {category.category}
                      </span>
                      <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">
                        {category.items.length}개 혜택
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4 mt-2">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-bold text-gray-900 mb-1">
                                {item.name}
                              </div>
                              <div className="text-sm font-medium text-blue-600">
                                {item.benefit}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">
                                조건:{" "}
                              </span>
                              <span className="text-gray-600">
                                {item.conditions}
                              </span>
                            </div>

                            {item.brands && (
                              <div>
                                <span className="font-medium text-gray-700">
                                  대상 브랜드:{" "}
                                </span>
                                <span className="text-gray-600">
                                  {item.brands}
                                </span>
                              </div>
                            )}

                            {item.exclusions && (
                              <div>
                                <span className="text-xs text-gray-600">
                                  제외 항목:{" "}
                                </span>
                                <br />
                                <span className="text-gray-600 text-xs">
                                  {item.exclusions}
                                </span>{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* 신청 버튼 */}
        <div className="sticky bottom-4 z-10">
          <Card className="border-0 rounded-2xl bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">
                    카카오뱅크 그린플랜 카드
                  </div>
                  <div className="text-sm text-gray-600">
                    연회비 무료 · 즉시 발급
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    월 최대
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    ₩50,000
                  </div>
                  <div className="text-xs text-gray-500">캐시백</div>
                </div>
              </div>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl h-12 font-bold">
                카드 신청하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
