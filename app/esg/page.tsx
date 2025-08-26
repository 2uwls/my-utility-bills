"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainTabNavigation from "@/components/main-tab-navigation";
import MainSummarySection from "@/components/MainSummarySection";
import KakaoHeader from "@/components/KakaoHeader";
import dynamic from 'next/dynamic';
import { Spinner } from "@/components/ui/spinner";



// Dynamically import tab components
const DashboardTab = dynamic(() => import('@/components/esg/DashboardTab'), { ssr: false, loading: () => <div className="flex justify-center p-4"><Spinner /></div> });
const ArticlesTab = dynamic(() => import('@/components/esg/ArticlesTab'), { ssr: false, loading: () => <div className="flex justify-center p-4"><Spinner /></div> });

// Interfaces can be defined here or moved to a types file
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
    treesSaved: Math.floor(cumulativeSavings.electricity / 43.5),
    waterSaved: Math.floor(cumulativeSavings.electricity * 0.5),
    paperSaved: Math.floor(cumulativeSavings.electricity / 10),
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-2xl p-1 h-12">
            <TabsTrigger
              value="dashboard"
              className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-900">
              대시보드
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-900">
              에너지 정보
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab 
              todos={todos}
              newTodo={newTodo}
              environmentalImpact={environmentalImpact}
              router={router}
              setNewTodo={setNewTodo}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </TabsContent>

          <TabsContent value="articles">
            <ArticlesTab 
              articles={articles}
              getCategoryColor={getCategoryColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
