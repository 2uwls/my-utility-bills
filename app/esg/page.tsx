"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  TreePine,
  Leaf,
  Zap,
  CheckCircle,
  Circle,
  Bell,
  Droplets,
  TrendingDown,
  Calendar,
  Calculator,
  StickyNote,
} from "lucide-react";

import MainTabNavigation from "@/components/main-tab-navigation";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  category: "energy" | "water" | "gas";
}

interface Article {
  id: number;
  title: string;
  summary: string;
  category: "policy" | "tips" | "explanation";
  date: string;
  isNew?: boolean;
}

export default function ESGPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "대기전력 차단", completed: true, category: "energy" },
    { id: 2, text: "적정 온도 유지", completed: true, category: "energy" },
    { id: 3, text: "절수 실천", completed: false, category: "water" },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const articles: Article[] = [
    {
      id: 1,
      title: "2024년 여름철 전기요금 할인 정책 시행",
      summary:
        "정부가 여름철 전력 사용량 증가에 대비해 가정용 전기요금 20% 할인 정책을 발표했습니다.",
      category: "policy",
      date: "2024-07-20",
      isNew: true,
    },
    {
      id: 2,
      title: "누진세란? 전기요금 계산 방식 완벽 이해",
      summary:
        "복잡한 전기요금 누진세 구조를 쉽게 설명하고, 요금을 절약할 수 있는 방법을 안내합니다.",
      category: "explanation",
      date: "2024-07-18",
    },
    {
      id: 3,
      title: "에어컨 효율적 사용법으로 전기요금 50% 절약",
      summary:
        "적정 온도 설정과 타이머 활용으로 여름철 전기요금을 크게 줄일 수 있는 실용적인 팁들을 소개합니다.",
      category: "tips",
      date: "2024-07-15",
    },
    {
      id: 4,
      title: "탄소중립 실천을 위한 가정용 에너지 절약 가이드",
      summary:
        "개인이 실천할 수 있는 탄소 배출 감소 방법과 에너지 절약 실천 방안을 제시합니다.",
      category: "tips",
      date: "2024-07-12",
    },
  ];

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
          category: "energy",
        },
      ]);
      setNewTodo("");
    }
  };

  const cumulativeSavings = {
    electricity: 348, // kWh
    trees: 8, // 심은 나무
    yearTarget: 580, // kWh 연간 목표
  };
  const environmentalImpact = {
    treesSaved: Math.floor(cumulativeSavings.electricity / 43.5), // 1그루당 43.5kWh 절약 효과
    waterSaved: Math.floor(cumulativeSavings.electricity * 0.5), // 1kWh당 0.5L 물 절약
    paperSaved: Math.floor(cumulativeSavings.electricity / 10), // 1kWh당 10장 종이 절약
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const carbonReduction = completedTodos * 0.8; // 완료된 항목당 0.8톤 감소

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "policy":
        return "bg-red-100 text-red-800";
      case "tips":
        return "bg-green-100 text-green-800";
      case "explanation":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="esg" />

        {/* ESG 탭 내용 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">대시보드</TabsTrigger>
            <TabsTrigger value="articles">에너지 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="p-4 space-y-4">
            {/* Monthly Savings Card */}
            <Card className="border-0 rounded-2xl">
              <CardHeader className="rounded-2xl text-[#1E1E1E]pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      9월 공과금 절약 현황
                    </CardTitle>
                    <p className="text-sm opacity-90 ">
                      전월 대비 전기 58kWh, 가스 13㎥ 절약!
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#FFE300] bg-opacity-20 rounded-full flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="border-0 rounded-2xl bg-white">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">348kWh</div>
                  <div className="text-xs text-gray-500">6개월 누적 절약</div>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-2xl bg-white">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">8그루</div>
                  <div className="text-xs text-gray-500">심은 나무</div>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-2xl bg-white">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">580kWh</div>
                  <div className="text-xs text-gray-500">연말 예상 절약</div>
                </CardContent>
              </Card>
            </div>

            {/* ESG Section */}
            <Card className="bg-green-50 border-green-200 rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-3 h-3 text-white" />
                  </div>
                  <CardTitle className="text-sm">ESG 실천 현황</CardTitle>
                </div>
                <p className="text-xs text-gray-600">환경 보호 기여도</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    8.3그루
                  </div>
                  <p className="text-xs text-green-600">
                    이번 달까지 심은 나무
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `68%` }}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    연말 목표 대비 68% 달성
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                  onClick={() => router.push("/rewards")}>
                  <TreePine className="w-4 h-4 mr-2" />
                  절약숲 보러가기
                </Button>
              </CardContent>
            </Card>
            {/* 작은 선택이 살리는 환경 */}
            <Card className="border-0 rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  작은 선택이 살리는 환경
                </CardTitle>
                <CardDescription>나무 1그루, 물 10리터</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className=" bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                  <div className="text-base text-gray-700 mb-3 text-center">
                    전 세계에서 베어진 나무의 35%가 종이 생산에 사용됩니다.{" "}
                    <br></br>
                    전자문서와 모바일 청구서, 전자 증명서로 전환하면 <br></br>
                    A4 용지를 만드는 데 소요되는 나무와 물을 아낄 수 있습니다.
                    <br></br>
                    환경 보호실천에 함께해요!
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        1억 2,701만 건
                      </div>
                      <div className="text-xs text-gray-600">
                        전자 문서, 모바일 청구서, 전자 증명서
                      </div>
                      <div className="text-xs text-gray-500">
                        2023년 총 전환 건수
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">
                        종이 약 640톤 절감 효과
                      </div>
                    </div>
                  </div>
                </div>

                {/* 내 절약이 환경에 미치는 영향 */}
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-bold text-green-900 mb-3">
                    내 절약이 환경에 미치는 영향
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TreePine className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {environmentalImpact.treesSaved}그루
                      </div>
                      <div className="text-xs text-gray-600">
                        나무 보호 효과
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Droplets className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {environmentalImpact.waterSaved}L
                      </div>
                      <div className="text-xs text-gray-600">물 절약 효과</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <StickyNote className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="text-lg font-bold text-yellow-600">
                        {environmentalImpact.paperSaved}장
                      </div>
                      <div className="text-xs text-gray-600">
                        종이 절약 효과
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* This Month's Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  이번 달 실천 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Add New Todo Section */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">
                      새로운 목표 추가
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="예: LED 전구로 교체하기"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTodo()}
                      className="text-sm h-8"
                    />
                    <Button onClick={addTodo} size="sm" className="h-8 px-3">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Quick Add Suggestions */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      "대기전력 차단",
                      "적정온도 유지",
                      "절수 실천",
                      "LED 교체",
                    ].map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs bg-white hover:bg-blue-50 border-gray-200"
                        onClick={() => setNewTodo(suggestion)}>
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Existing Todos */}
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group">
                      <div
                        className="flex items-center gap-3 flex-1 cursor-pointer"
                        onClick={() => toggleTodo(todo.id)}>
                        {todo.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                        <span
                          className={`text-sm flex-1 ${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}>
                          {todo.text}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {todo.category === "energy"
                            ? "전기"
                            : todo.category === "water"
                            ? "수도"
                            : "가스"}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                        onClick={() => deleteTodo(todo.id)}>
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">에너지 정보</h2>
              <Badge variant="secondary" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                실시간 업데이트
              </Badge>
            </div>

            {articles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      className={`text-xs ${getCategoryColor(
                        article.category
                      )}`}>
                      {article.category === "policy"
                        ? "정책"
                        : article.category === "tips"
                        ? "절약팁"
                        : "용어설명"}
                    </Badge>
                    {article.isNew && (
                      <Badge variant="destructive" className="text-xs">
                        NEW
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-medium text-sm mb-2 leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {article.date}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2">
                      자세히 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm mb-1">
                  더 많은 정보가 필요하신가요?
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  전문가가 직접 답변하는 에너지 절약 상담 서비스를 이용해보세요.
                </p>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  전문가 상담 신청
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
