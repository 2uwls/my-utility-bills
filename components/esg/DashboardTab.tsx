"use client";

import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
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
import {
  Plus,
  TreePine,
  Leaf,
  Zap,
  CheckCircle,
  Circle,
  Droplets,
  TrendingDown,
  Calculator,
  StickyNote,
} from "lucide-react";

// Define interfaces directly in the file
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  category: "energy" | "water" | "gas";
}

interface EnvironmentalImpact {
  treesSaved: number;
  waterSaved: number;
  paperSaved: number;
}

interface DashboardTabProps {
  todos: TodoItem[];
  newTodo: string;
  environmentalImpact: EnvironmentalImpact;
  router: any; // Simplified for brevity, consider more specific type
  setNewTodo: (value: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function DashboardTab({ 
  todos,
  newTodo,
  environmentalImpact,
  router,
  setNewTodo,
  addTodo,
  toggleTodo,
  deleteTodo
}: DashboardTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">
                9월 공과금 절약 현황
              </CardTitle>
              <p className="text-sm text-gray-600">
                전월 대비 전기 21kWh, 가스 0㎥ 절약!
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FFE300] bg-opacity-20 rounded-full flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">228kWh</div>
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
            <div className="text-lg font-bold text-gray-900">520kWh</div>
            <div className="text-xs text-gray-500">연말 예상 절약</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-50 border-0 border-green-200 rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <CardTitle className="text-sm">ESG 실천 현황</CardTitle>
          </div>
          <p className="text-xs text-gray-600 pt-1">환경 보호 기여도</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white rounded-lg p-3 text-center">
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
            className="w-full border-green-300 text-green-700 hover:bg-green-100 bg-transparent rounded-lg"
            onClick={() => router.push("/rewards")}>
            <TreePine className="w-4 h-4 mr-2" />
            절약숲 보러가기
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            작은 선택이 살리는 환경
          </CardTitle>
          <CardDescription>나무 1그루, 물 10리터</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className=" bg-blue-50 rounded-xl p-4 flex flex-col items-center">
            <div className="text-sm text-gray-700 mb-3 text-center leading-relaxed">
              전 세계에서 베어진 나무의 35%가 종이 생산에 사용됩니다.
              <br />
              전자문서와 모바일 청구서, 전자 증명서로 전환하면 <br />
              A4 용지를 만드는 데 소요되는 나무와 물을 아낄 수 있습니다.
              <br />
              환경 보호실천에 함께해요!
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-xs text-gray-600">
                  전자 문서, 모바일 청구서, 전자 증명서
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  2023년 총 전환 건수
                </div>
                <div className="text-xl font-bold text-blue-600">
                  1.2억 건
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg flex flex-col justify-center">
                <div className="text-lg font-bold text-green-600">
                  종이 약 640톤 절감
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-bold text-green-900 mb-3">
              내 절약이 환경에 미치는 영향
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
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
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {environmentalImpact.waterSaved}L
                </div>
                <div className="text-xs text-gray-600">물 절약 효과</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
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

      <Card className="border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            이번 달 실천 현황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
                className="text-sm h-9 bg-white"
              />
              <Button onClick={addTodo} size="sm" className="h-9 px-3">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
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
                  className="h-7 px-2 text-xs bg-white hover:bg-blue-50 border-gray-200"
                  onClick={() => setNewTodo(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

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
                  size="icon"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(todo.id)}>
                  <span className="text-lg">×</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
