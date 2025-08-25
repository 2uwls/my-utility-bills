"use client";
import { Zap, Calculator, Bell, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function KakaoHeader() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025");
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFE300] rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-gray-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">내공과금</h1>
                <p className="text-xs text-gray-500">카카오뱅크와 함께</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-20 h-8 text-sm border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/simulation">
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <Calculator className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/rewards">
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <TreeDeciduous className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3 text-sm">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="h-8 px-2 sm:px-3 text-sm bg-[#FFE300] hover:bg-yellow-500 text-gray-900">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
