"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar } from "lucide-react";

// Define interfaces directly in the file
interface Article {
  id: number;
  title: string;
  summary: string;
  category: "policy" | "tips" | "explanation";
  date: string;
  isNew?: boolean;
}

interface ArticlesTabProps {
  articles: Article[];
  getCategoryColor: (category: string) => string;
}

export default function ArticlesTab({ articles, getCategoryColor }: ArticlesTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold">에너지 정보</h2>
        <Badge variant="secondary" className="text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          실시간 업데이트
        </Badge>
      </div>

      {articles.map((article) => (
        <Card
          key={article.id}
          className="hover:shadow-md transition-shadow border-0 rounded-2xl bg-white">
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

            <h3 className="font-bold text-base mb-2 leading-tight">
              {article.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {article.date}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm h-7 px-2">
                자세히 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-0 border-blue-200 rounded-2xl">
        <CardContent className="p-4 text-center">
          <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-bold text-base mb-1">
            더 많은 정보가 필요하신가요?
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            전문가가 직접 답변하는 에너지 절약 상담 서비스를 이용해보세요.
          </p>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 rounded-lg">
            전문가 상담 신청
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
